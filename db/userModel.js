'use strict';
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
});

module.exports = mongoose.model('User', UserSchema);