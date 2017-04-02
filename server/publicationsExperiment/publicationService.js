/*jslint node: true */
//publications service
var Q = require('q');
var Publication = require('../../db/publicationModel');

var PublicationService = function () {};

PublicationService.prototype.createPublication = function (pubName) {
    var publication = new Publication({pubName: pubName});
    var deferred = Q.defer();
    
    publication.save(function (err, pubInstance) {
        if (err) {
            deferred.reject({err: err});
        } else {
            console.log(pubInstance);
            deferred.resolve(pubInstance);
        }
    });
    
    return deferred.promise;
};

PublicationService.prototype.displayDB = function() {
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

module.exports = new PublicationService();
