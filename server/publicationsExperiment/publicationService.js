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

module.exports = new Server();
