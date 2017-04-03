'use strict';
var Q = require('q');
var UserService = function () {};
var Users = require('../../db/userModel');
UserService.prototype.getUsers = function () {
    var deferred = Q.defer();
    Users.find({} ,  function (err, users) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(users);
        }
    });
    
    return deferred.promise;
};
module.exports = new UserService();