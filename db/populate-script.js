// prepopulates the dog schema with dummy data
// command is npm run populate

var mongoose = require('mongoose');
var Dog = require('./dogModel.js');

mongoose.connect('mongodb://localhost/database');

var dummyData = [
	{name: 'dummy1', favoriteFood: [{item: 'dogFood', cost: 1}, {item: 'dogFood', cost: 1}]},
	{name: 'dummy2', favoriteFood: [{item: 'dogFood', cost: 1}, {item: 'dogFood', cost: 1}]},
	{name: 'dummy3', favoriteFood: [{item: 'dogFood', cost: 1}, {item: 'dogFood', cost: 1}]}
];

// Clear collection
Dog.remove({}, function(err, removed){
	console.log('Removed');
	console.log(removed.result);

	Dog.collection.insert(dummyData, function(err, dogs){
		console.log('Insertion completed');
		console.log(dogs)
	});
});
