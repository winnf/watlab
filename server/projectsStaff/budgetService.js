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

Server.prototype.addBudget = function(name, amount, category){
  var deferred = Q.defer();
  var budget = new Budget({
    name: name,
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

Server.prototype.deleteBudget = function(id){
  var deferred = Q.defer();
  Budget.find({_id: id}).remove(function(err, instance){
    if(err){
      deferred.reject(err);
    }
    else {
      deferred.resolve(instance);
    }
  });
};



module.exports = new Server();
