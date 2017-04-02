'use strict';
var mongoose = require('mongoose');

var TaskSchema = mongoose.Schema({
  name: String,
  dueDate: Date,
  assignees: String,
  description: String
});

module.exports = mongoose.model('Task', TaskSchema);
