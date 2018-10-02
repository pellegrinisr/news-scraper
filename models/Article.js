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
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;