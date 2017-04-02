var Task = require('../../db/psrTaskModel');
var Q = require('q');
var Server = function() {};


Server.prototype.displayDB = function() {
  var deferred = Q.defer();

  Task.find({}, function(err, tasks){
    if(err){
      deferred.reject(err);
    }
    else{
      deferred.resolve(tasks);
    }
  });
  return deferred.promise;
};

module.exports = new Server();
