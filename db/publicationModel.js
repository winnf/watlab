'use strict';
var mongoose = require('mongoose');

var PublicationSchema = mongoose.Schema({
    pubName: String,
    experimentIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Experiment'}],
    authors: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    versions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Version'}],
    status: String
});

PublicationSchema.methods.addVersion = function (objectId) {
    this.versions.push(objectId);
};

module.exports = mongoose.model('Publication', PublicationSchema);