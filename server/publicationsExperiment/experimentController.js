var Server = function(){};
var Q = require('q');
var Experiment = require('../../db/experimentModel');
Server.prototype.createExperiment = function(obj) {
	console.log(obj.viewableData);
	var experiment = new Experiment(obj.viewableData);
	var deferred = Q.defer();

	experiment.save(function(err , expInstance){
		if(err) {
			console.log(err);
		    deferred.reject({err: err})
		} else {
		    console.log(expInstance);
		    deferred.resolve({expInstance: expInstance});
	  }
	});

	return deferred.promise;
};
Server.prototype.displayDB = function() {
    var deferred = Q.defer();
    
    experiment.find({}, function (err, pubs) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(pubs);
        }
    });
    
    return deferred.promise;
};
module.exports = new Server();