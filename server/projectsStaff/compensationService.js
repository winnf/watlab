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

Server.prototype.updateCompensation = function(assignee, amount, date, id){
  var deferred = Q.defer();
  var query = {'_id': id};
  var update = {
    assignee: assignee,
    amount: amount,
    date: date
  };

  Compensation.findOneAndUpdate(query, update, function(err, instance){
    if(err){
      deferred.reject(err);
    }
    else{
      deferred.resolve(instance);
    }
  });
  return deferred.promise;
};

Server.prototype.deleteCompensation = function(id){
  var deferred = Q.defer();
  Compensation.find({_id: id}).remove(function(err, instance){
    if(err){
      deferred.reject(err);
    }
    else {
      deferred.resolve(instance);
    }
  });
};


module.exports = new Server();
