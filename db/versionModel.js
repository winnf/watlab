/*jslint node: true */
'use strict';
var mongoose = require('mongoose');

var VersionSchema = mongoose.Schema({
		order: Number,
        verName: String,
        submittedDate: Date,
        versionFilePath: String
    });

module.exports = mongoose.model('Version', VersionSchema);