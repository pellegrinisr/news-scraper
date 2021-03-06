const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');
const router = express.Router();

//require db models
const db = require('../models');

//this is the primary root get route
//this route handles axios calls to the NYT politics section
//uses cheerio to scrape the results and pull info about each article
//also resposible for inserting new articles to the database
router.get('/', function(req, res) {
  const articleArray = [];
  axios.get("https://www.nytimes.com/section/politics/").then(function(response) {
    const $ = cheerio.load(response.data);
    $("article").each(function(i, element) {
      // console.log(element);
      //check if articles are from "hidden" section
      if ($(element).parent('li').parent('ol').parent('div').parent('div').parent("section").hasClass('hidden')) {
        return;
      } else {
        //grab the various elements of the articles
        let link = $(element).children('div').children('a').attr('href');
        let headline = $(element).children('div').children('a').children('div').children('h2').text().trim();
        let summary = $(element).children('div').children('a').children('div').children('p.summary').text().trim();
        let byline = $(element).children('div').children('a').children('div').children('p.byline').text().trim();
        //check if the articles in question are from the top section (with different styling)
        if (!link) {
          link = $(element).children('div').children('h2').children('a').attr('href');
        }
        if (!headline) {
          headline = $(element).children('div').children('h2').children('a').text().trim();
        } 
        if (!summary) {
          summary = $(element).children('div').children('p.summary').text().trim();
        }
        if (!byline) {
          byline = $(element).children('div').children('p.byline').text().trim();
        }
        if (!byline) {
          byline = '';
        }
        // console.log(headline);
        //create the object for submission to the database
        const newArticle = {
          link: link,
          headline: headline,
          summary: summary,
          byline: byline
        };
        //check if article with matching headline already exists in the database
        db.Article.find({headline: newArticle.headline}, function(error, docs) {
          if (error) {
            return res.json(error);
          } else if (docs.length === 0) {
            db.Article.create(newArticle)
              .then(function(dbArticle) {
                articleArray.push(newArticle);
                // console.log(dbArticle);
              })
              .catch(function(error) {
                return res.json(error);
              });
          } 
        });
      }
    });
    res.redirect('/articles');
  });
});

//this route renders the articles to the page
//using home.handlebars template
router.get('/articles', function(req, res) {
  db.Article.find({}, function(error, data) {
    if (error) {
      res.sendStatus(404);
    } else {
      // console.log(data);
      res.render('home', {articles: data.reverse()});
    }
  });
});

//update an article document
//adds new comments
router.put('/articles/:id', function(req, res) {
  console.log(req.body);
  db.Article.updateOne(
    {
      _id: req.params.id
    },
    { $push: {'comments' : {
        name: req.body.name,
        body: req.body.body,
      }
    }}, 
    function(error, data) {
      if (error) {
        res.sendStatus(404);
      } else {
        console.log('back to the client');
        res.sendStatus(200);
      }
  });
});

module.exports = router;