// prepopulates the dog schema with dummy data
// run by node ./db/populate-script.js

var mongoose = require('mongoose');
var Dog = require('./dogModel.js');

mongoose.connect('mongodb://localhost/database');

var dummyData = [
	{name: 'dummy1', favoriteFood: [{item: 'dogFood', cost: 1}, {item: 'dogFood', cost: 1}]},
	{name: 'dummy2', favoriteFood: [{item: 'dogFood', cost: 1}, {item: 'dogFood', cost: 1}]},
	{name: 'dummy3', favoriteFood: [{item: 'dogFood', cost: 1}, {item: 'dogFood', cost: 1}]}
];

Dog.collection.insert(dummyData, function(err, dogs){
	console.log('insertion completed');
	console.log(dogs)
});