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

module.exports = new Server();
