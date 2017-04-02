var mongoose = require('mongoose');

var EntrySchema = mongoose.Schema({
    name: String,
    description: String,
    date: Date,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    labBook: {type: mongoose.Schema.Types.ObjectId, ref: 'LabBook'},
    archive: Boolean,
    filepath: [String]
});

module.exports = mongoose.model('Entry' , EntrySchema);