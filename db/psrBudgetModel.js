'use strict';
var mongoose = require('mongoose');

var BudgetSchema = mongoose.Schema({
  name: String,
  amount: String,
  category: String
});

module.exports = mongoose.model('Budget', BudgetSchema);
