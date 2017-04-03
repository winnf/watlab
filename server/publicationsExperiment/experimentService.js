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

ExperimentService.prototype.addEntryToExperiment = function(experimentId, entryId) {
    var deferred = Q.defer();
    
    Experiment.findOne({_id: experimentId}, function (err, experiment) {
        if (err) {
            deferred.reject(err);
        } else {
            experiment.addEntry(entryId);
            experiment.save(function(err, exp){
                if (err) {
                    deferred.reject({err: err});
                } else {
                    deferred.resolve();
                }
            })
        }
    });
    
    return deferred.promise;
};

ExperimentService.prototype.getExperimentById = function(id) {
	var deferred = Q.defer();
    
    Experiment.findOne({_id: id}).populate({
        path: 'ownerId entryIds assigneeIds ',
        populate: {
            path: 'owner',
            model: 'User',
        }
    }).exec( function (err, experiment) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(experiment);
        }
    });
    
    return deferred.promise;
}

module.exports = new ExperimentService();