var Q = require('q');
var Experiment = require('../../db/experimentModel');
<<<<<<< HEAD:server/publicationsExperiment/experimentController.js
Server.prototype.createExperiment = function(obj) {
	console.log(obj);
	var experiment = new Experiment(obj);
	console.log(experiment);
=======

var ExperimentService = function(){};

ExperimentService.prototype.createExperiment = function(obj) {
	console.log(obj.viewableData);
	var experiment = new Experiment(obj.viewableData);
>>>>>>> 3116250da2f5cf2d33d11a621eaded48b8f3b5f9:server/publicationsExperiment/experimentService.js
	var deferred = Q.defer();

	experiment.save(function(err , expInstance){
		if(err) {
			console.log(err);
		    deferred.reject({err: err})
		} else {
		    //console.log(expInstance);
		    deferred.resolve({expInstance: expInstance});
	  }
	});

	return deferred.promise;
};

ExperimentService.prototype.displayDB = function() {
    var deferred = Q.defer();
    
    Experiment.find({}, function (err, pubs) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(pubs);
        }
    });
    
    return deferred.promise;
};

module.exports = new ExperimentService();