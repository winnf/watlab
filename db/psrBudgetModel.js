'use strict';
var mongoose = require('mongoose');

var BudgetSchema = mongoose.Schema({
  assignee: String,
  amount: String,
  category: String
});

module.exports = mongoose.model('Budget', BudgetSchema);
