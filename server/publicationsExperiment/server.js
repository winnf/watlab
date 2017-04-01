var Q = require('q');
var Experiment = require('../../db/experimentModel');
var Server = function() {};


Server.prototype.createExperiment = function(name , startDate , dueDate , assignees , status ) {

	var experiment = new Experiment({name: name , startdate: startDate , duedate: dueDate ,
	assigneduserids: assignees , status: status});
	var deferred = Q.defer();

};

module.exports = new Server();