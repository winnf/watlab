var mongoose = require('mongoose');

var EntrySchema = mongoose.Schema({
    name: String,
    description: String,
    date: Date,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    archive: {type: Boolean, default: false},
    filePath: String
});

module.exports = mongoose.model('Entry' , EntrySchema);