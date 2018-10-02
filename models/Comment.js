const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  name: {
    type: String,
    trim: true,
    default: "Anonymous"
  },
  body: {
    type: String,
    validate: [
      function(input) {
        return input.length >= 1;
      },
      'Cannot submit empty comment.'
    ]
  },
  Date: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;