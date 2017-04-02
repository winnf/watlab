'use strict';
var mongoose = require('mongoose');

var TaskSchema = mongoose.Schema({
  name: String,
  dueDate: Date,
  assignees: String,
  description: String
});

TaskSchema.methods.addTask = function (name, dueDate, assignees, description) {
  this.push({
    name: name,
    dueDate: dueDate,
    assignees: assignees,
    description: description
  });

  this.save(function (err){
    if(err){
      console.error('addTask failure: '+ err);
    }
  });
};

module.exports = mongoose.model('Task', TaskSchema);
