var mongoose = require('mongoose');

var LabBookSchema = mongoose.Schema({
    name: String,
});

module.exports = mongoose.model('LabBook' , LabBookSchema);