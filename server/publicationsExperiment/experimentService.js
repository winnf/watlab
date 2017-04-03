/*jslint node: true */
'use strict';
var Q = require('q');
var Experiment = require('../../db/experimentModel');
var ExperimentService = function () {};
var Users = require('../../db/userModel');
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
    Experiment.find().populate('ownerId entryIds assigneeIds').exec( function (err, experiments) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(experiments);
        }
    });
    
    return deferred.promise;
};

module.exports = new ExperimentService();