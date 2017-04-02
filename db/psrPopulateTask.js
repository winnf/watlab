var mongoose = require('mongoose');
var task = require('./psrTaskModel.js');

mongoose.connect('mongodb://localhost/database');

var dummyData = [
  {name: 'blah', dueDate: '2016-04-06', assignees:'someone', description:'akdljfalkwejf'},
  {name: 'bleh', duedate: '2017-04-01', assignees: 'adsfksjf', description:'lawlz'}
];

task.remove({}, function(err, removed){
  console.log('Removed');
  console.log(removed.result);

  task.collection.insert(dummyData, function(err, tasks) {
    console.log("inserted");
    console.log(tasks);
  });
})
