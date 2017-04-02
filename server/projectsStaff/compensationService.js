var Compensation = require('../../db/psrCompensationModel');
var Q = require('q');
var Server = function() {};

Server.prototype.displayCompensationDB = function() {
  var deferred = Q.defer();
  Compensation.find({}, function(err, compensations){
    if(err){
      deferred.reject(err);
    }
    else{
      deferred.resolve(compensations);
    }
  });
  return deferred.promise;
};

Server.prototype.addCompensation = function(assignee, amount, date){
  var deferred = Q.defer();
  var compensation = new Compensation({
    assignee: assignee,
    amount: amount,
    date: date
  });

  compensation.save(function(err, compensationInstance){
    if(err){
      deferred.reject(err);
    }
    else{
      deferred.resolve(compensationInstance);
    }
  });
  return deferred.promise;
};


module.exports = new Server();
