/*jslint node: true */
'use strict';
var Q = require('q');
var Experiment = require('../../db/experimentModel');
var ExperimentService = function () {};

ExperimentService.prototype.createExperiment = function (obj) {
	console.log(obj);
	var experiment = new Experiment(obj),
        deferred = Q.defer();

	experiment.save(function (err, expInstance) {
		if (err) {
			console.log(err);
		    deferred.reject({err: err});
		} else {
		    //console.log(expInstance);
		    deferred.resolve({expInstance: expInstance});
	    }
	});

	return deferred.promise;
};

ExperimentService.prototype.displayDB = function () {
    var deferred = Q.defer();
    
<<<<<<< HEAD
    Experiment.find({}).populate('ownerId').exec( function (err, experiments) {
=======
    Experiment.find({}).populate('ownerId').exec(function (err, pubs) {
>>>>>>> d15c2e598aa58c775533f1b39d03fd27f04533c1
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(experiments);
        }
    });
    
    return deferred.promise;
};

module.exports = new ExperimentService();