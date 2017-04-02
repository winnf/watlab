'use strict';
var mongoose = require('mongoose');

var ProjectSchema = mongoose.Schema({
  name: String,
  assignees: String,
  description: String
});

module.exports = mongoose.model('Project', ProjectSchema);
