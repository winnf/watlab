var Budget = require('../../db/psrBudgetModel');
var Q = require('q');
var Server = function() {};

Server.prototype.displayBudgetDB = function() {
  var deferred = Q.defer();
  Budget.find({}, function(err, budgets){
    if(err){
      deferred.reject(err);
    }
    else{
      deferred.resolve(budgets);
    }
  });
  return deferred.promise;
};

Server.prototype.addBudget = function(assignee, amount, category){
  var deferred = Q.defer();
  var budget = new Budget({
    assignee: assignee,
    amount: amount,
    category: category
  });

  budget.save(function(err, budgetInstance){
    if(err){
      deferred.reject(err);
    }
    else{
      deferred.resolve(budgetInstance);
    }
  });
  return deferred.promise;
};


module.exports = new Server();
