/*jslint node: true */
//publications service
//
//get publications

var Q = require('q');
var Publication = require('../../db/publicationModel');
var Server = function () {};

Server.prototype.createPublication = function (pubName) {
    var pub = new Publication({pubName: pubName});
    var deferred = Q.defer();
    
    pub.save(function (err, pubInstance) {
        if (err) {
            deferred.reject({err: err});
        } else {
            console.log(pubInstance);
            deferred.resolve(pubInstance);
        }
    });
    
    return deferred.promise;
};

Server.prototype.displayDB = function() {
    var deferred = Q.defer();
    
    Publication.find({}, function (err, pubs) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(pubs);
        }
    });
    
    return deferred.promise;
};

module.exports = new Server();
