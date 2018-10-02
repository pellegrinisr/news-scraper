const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');
const router = express.Router();

//require db models
const db = require('../models');

router.get('/', function(req, res) {
  axios.get("https://www.nytimes.com/section/politics/").then(function(response) {
    let $ = cheerio.load(response.data);
    // console.log($);
    $("article").each(function(i, element) {
      let link = $(element).children('div').children('a').attr('href');
      let headline = $(element).children('div').children('a').children('div').children('h2').text().trim();
      let summary = $(element).children('div').children('a').children('div').children('p.summary').text().trim();
      let byline = $(element).children('div').children('a').children('div').children('p.byline').text().trim();
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
      console.log('link ', link);
      console.log('headline ', headline);
      console.log('summary ', summary);
      console.log('byline ', byline);
      const newArticle = {
        link: link,
        headline: headline,
        summary: summary,
        byline: byline
      };
    })
    res.render('home', {test: {title: 'Hello', author: 'Stephen'}});
  })
});

module.exports = router;