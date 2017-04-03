'use strict';
var mongoose = require('mongoose');

var CompensationSchema = mongoose.Schema({
  assignee: String,
  amount: String,
  date: Date
});

module.exports = mongoose.model('Compensation', CompensationSchema);
