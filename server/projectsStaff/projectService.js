var Project = require('../../db/psrProjectModel');
var Q = require('q');
var Server = function() {};


Server.prototype.displayProjectDB = function() {
  var deferred = Q.defer();

  Project.find({}, function(err, projects){
    if(err){
      deferred.reject(err);
    }
    else{
      deferred.resolve(projects);
    }
  });
  return deferred.promise;
};

Server.prototype.addProject = function(name, assignees, description){
  var deferred = Q.defer();
  var project = new Project({
    name: name,
    assignees: assignees,
    description: description
  });

  project.save(function(err, projectInstance){
    if(err){
      deferred.reject(err);
    }
    else{
      deferred.resolve(projectInstance);
    }
  });
  return deferred.promise;
};

Server.prototype.updateProject = function(name, assignees, description, id){
  var deferred = Q.defer();
  var query = {'_id': id};
  var update = {
    name: name,
    assignees: assignees,
    description: description
  };

  Project.findOneAndUpdate(query, update, function(err, instance){
    if(err){
      deferred.reject(err);
    }
    else{
      deferred.resolve(instance);
    }
  });
  return deferred.promise;
};

module.exports = new Server();
