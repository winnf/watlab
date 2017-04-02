var Q = require('q');
var Experiment = require('../../db/experimentModel');
var Server = function() {};




// /per/createDog/{name}
Server.prototype.createDog = function(name) {
	var dog = new Dog({name: name});
	var deferred = Q.defer();

	dog.save(function (err, dogInstance) {
	  if (err) {
	  	deferred.reject({err: err, waterBottle: 'errorMessage'});
	  } else {
	  	console.log(dogInstance);
		  dogInstance.sayName();
		  deferred.resolve({dogInstance: dogInstance, waterBottle: 'message'});
	  }
	});

	return deferred.promise;
};

// /per/listAll
Server.prototype.displayDB = function() {
	var deferred = Q.defer();

	Dog.find({}, function(err, dogs){
		if(err) {
			deferred.reject(err);
		} else {
			deferred.resolve(dogs);
		}
	});

	return deferred.promise;
};

// /per/clearAll
Server.prototype.clearAll = function() {
	return Dog.remove({});
};

// /per/addFood/{name}/{cost}/{item}
Server.prototype.addFood = function(name, cost, item) {
	var deferred = Q.defer();

	Dog.findOne({name: name}, function(err, dog){
		if(err) {
			deferred.reject(err);
		} else {
			dog.addFood(cost, item);
			dog.save(function (err, dogInstance) {
			  if (err) {
			  	deferred.reject({err: err, waterBottle: 'errorMessage'});
			  } else {
			  	deferred.resolve(dogInstance);
			  }
			});
		}
	});

	return deferred.promise;
	var experiment = new Experiment({name: name , startdate: startDate , duedate: dueDate ,
	assigneduserids: assignees , status: status});
	var deferred = Q.defer();
};

module.exports = new Server();