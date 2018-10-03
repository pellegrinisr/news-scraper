const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  link: {
    type: String,
    required: true
  },
  headline: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  byline: {
    type: String,
    required: false
  },
  comments: [{
    name: {
      type: String
    },
    body: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;