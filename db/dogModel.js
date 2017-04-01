/*jslint node: true */
/*global $, jQuery, alert, angular*/
'use strict';
var mongoose = require('mongoose');

var DogSchema = mongoose.Schema({
    name: String,
    favoriteFood: [{
        cost: Number,
        item: String
    }]
});

DogSchema.methods.addFood = function (cost, item) {
    this.favoriteFood.push({
        cost: cost,
        item: item
    });

    this.save(function (err) {
        if (err) {
            console.error('addFood failure: ' + err);
        }
    });
};

DogSchema.methods.sayName = function () {
	console.log('Hi my name is ' + this.name);
};


module.exports = mongoose.model('Dog', DogSchema);
