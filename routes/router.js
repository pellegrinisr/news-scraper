const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    const test = {
        title: 'Hello World',
        author: 'Stpehen'
    }
    res.render('home', {test: test});
});

module.exports = router;