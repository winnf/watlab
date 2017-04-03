/*jslint node: true */
//publications service
'use strict';
var Q = require('q');
var Publication = require('../../db/publicationModel');

var PublicationService = function () {};

PublicationService.prototype.createPublication = function (pubName) {
    var publication = new Publication({pubName: pubName}),
        deferred = Q.defer();
    
    publication.save(function (err, pubInstance) {
        if (err) {
            deferred.reject({err: err});
        } else {
            //console.log(pubInstance);
            deferred.resolve(pubInstance);
        }
    });
    
    return deferred.promise;
};

PublicationService.prototype.displayDB = function () {
    var deferred = Q.defer();
    
    Publication.find().populate('authors versions').exec( function (err, pubs) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(pubs);
        }
    });
    
    return deferred.promise;
};

PublicationService.prototype.getPublication = function (name) {
    var deferred = Q.defer();
    
    Publication.findOne({pubName: name}, function (err, pubs) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(pubs);
        }
    });
    
    return deferred.promise;
};

PublicationService.prototype.editPublication = function (pubName, authors, date, status, version, experimentId) {
    var deferred = Q.defer();
    
    Publication.findOne({pubName: name}, function (err, pubs) {
        if (err) {
            deferred.reject(err);
        } else {
            pubs.addVersion(version);
            pubs.addAuthor(authors);
            pubs.addExperimentId(experimentId);
            
            pubs.save(function (err, pubInstance) {
                if (err) {
                    deferred.reject({err: err});
                } else {
                    //console.log(pubInstance);
                    deferred.resolve(pubInstance);
                }
            });
        }
    });
    return deferred.promise;
};

module.exports = new PublicationService();
