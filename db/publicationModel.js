/*jslint node: true */
'use strict';
var mongoose = require('mongoose');

var PublicationSchema = mongoose.Schema({
    pubName: {type: String, unique: true},
    experimentIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Experiment'}],
    authors: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    versions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Version'}],
});

PublicationSchema.methods.addVersion = function (objectId) {
    this.versions.push(objectId);
};

PublicationSchema.methods.addAuthor = function (objectId) {
    this.authors.push(objectId);
};

PublicationSchema.methods.addExperimentId = function (objectId) {
    this.experimentIds.push(objectId);
};

module.exports = mongoose.model('Publication', PublicationSchema);