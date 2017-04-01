/*jslint node: true */
/*global $, jQuery, alert, angular*/
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PublicationSchema = mongoose.Schema({
    pubName: String,
    pubID: String,
    linkedExperimentIDs: [Number],
    authors: String,
    author: Schema.ObjectId,
    versions: [Schema.ObjectId]
});

PublicationSchema.methods.addVersion = function (objectId) {
    this.versions.push(objectId);
};

module.exports = mongoose.model('Publication', PublicationSchema);