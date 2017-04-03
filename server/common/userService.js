/*jslint node: true */
'use strict';
var Q = require('q');
var User = require('../../db/userModel');
var UserService = function () {};

UserService.prototype.getRandomUser = function () {
	var deferred = Q.defer();

	User.findOne({}, function (err, user) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(user);
        }
    });

	return deferred.promise;
};

module.exports = new UserService();