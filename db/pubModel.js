/*jslint node: true */
/*global $, jQuery, alert, angular, Schema*/
'use strict';
var mongoose = require('mongoose');

var PublicationSchema = mongoose.Schema({
    pubName: String,
    pubID: String,
    linkedExperimentIDs: [Number],
    authors: String,
    author: Schema.Types.ObjectId,
    versions: [Schema.Types.ObjectId]
});

PublicationSchema.methods.addVersion = function (objectId) {
    this.versions.push(objectId);
};

module.exports = mongoose.model('Publication', PublicationSchema);