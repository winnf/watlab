'use strict';
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
<<<<<<< HEAD
	name: String,
=======
	name: String
>>>>>>> 3116250da2f5cf2d33d11a621eaded48b8f3b5f9
});

module.exports = mongoose.model('User', UserSchema);