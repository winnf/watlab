'use strict';
var mongoose = require('mongoose');

var NoticeSchema = mongoose.Schema({
  name: String,
  postDate: Date,
  assignees: String,
  description: String
});

module.exports = mongoose.model('Notice', NoticeSchema);
