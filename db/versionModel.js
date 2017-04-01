/*jslint node: true */
/*global $, jQuery, alert, angular*/
'use strict';
var mongoose = require('mongoose');

var VersionSchema = mongoose.Schema({
    verName: String,
    submittedDate: Date,
    versionFile: String
});

module.exports = mongoose.model('Version', VersionSchema);