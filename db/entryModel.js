var mongoose = require('mongoose');

var EntrySchema = mongoose.Schema({
    name: String,
    description: String,
    date: {type: Date, default: Date.now},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    archive: {type: Boolean, default: false},
    format: String,
    mimetype: String,
    filePath: String
});

module.exports = mongoose.model('Entry' , EntrySchema);