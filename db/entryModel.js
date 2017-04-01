var mongoose = require('mongoose');

var EntrySchema = mongoose.Schema({
    name: String,
    description: String,
    date: Date,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    format: String,
    archive: Boolean,
    filepath: [String]
});

module.exports = mongoose.module('Entry' , EntrySchema);