var mongoose = require('mongoose');

var LabBookSchema = mongoose.Schema({
    name: String,
    entryIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Entry'}]
});

module.exports = mongoose.model('LabBook' , LabBookSchema);