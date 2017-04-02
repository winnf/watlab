'use strict';
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	name: String,
});

module.exports = mongoose.model('User', UserSchema);