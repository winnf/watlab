var Task = require('../../db/psrTaskModel');
var Q = require('q');
var Server = function() {};


Server.prototype.displayTaskDB = function() {
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

Server.prototype.addTask = function(name, date, assignees, description){
  var deferred = Q.defer();
  var task = new Task({
    name: name,
    dueDate: date,
    assignees: assignees,
    description: description
  });

  task.save(function(err, taskInstance){
    if(err){
      deferred.reject(err);
    }
    else{
      console.log(taskInstance);
      deferred.resolve(taskInstance);
    }
  });
  return deferred.promise;
};

Server.prototype.updateTask = function(name, date, assignees, description, id){
  var deferred = Q.defer();
  var query = {'_id': id};
  var update = {
    name: name,
    dueDate: date,
    assignees: assignees,
    description: description
  };

  Task.findOneAndUpdate(query, update, function(err, taskInstance){
    if(err){
      deferred.reject(err);
    }
    else{
      console.log(taskInstance);
      deferred.resolve(taskInstance);
    }
  });
  return deferred.promise;
};

Server.prototype.deleteTask = function(id){
  var deferred = Q.defer();
  Task.find({_id: id}).remove(function(err, task){
    if(err){
      deferred.reject(err);
    }
    else{
      deferred.resolve(task);
    }
  });
}

module.exports = new Server();
