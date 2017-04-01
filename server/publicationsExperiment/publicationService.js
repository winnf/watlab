/*jslint node: true */
//publications service
//
//get publications

var Q = require('q');
var Publication = require('../../db/pubModel');
var Server = function () {};

Server.prototype.createPublication = function (pubName) {
    var pub = new Publication({pubName: pubName});
    var deferred = Q.defer();
    
    pub.save(function (err) {
        if (err) {
            deferred.reject({err: err});
        } else {
            deferred.resolve();
        }
    });
    
    return deferred.promise;
};
