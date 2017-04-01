var mongoose = require('mongoose');
var EntrySchema = mongoose.Schema({
    name: String,
    description: String,
    date: Date,
    owner: mongoose.Schema.ObjectId,
    format: String,
    archive: Boolean,
    filepath: [String]
});
module.exports = mongoose.module('Entry' , EntrySchema);