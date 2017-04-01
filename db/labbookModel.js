var mongoose = require('mongoose');
var LabbookSchema = mongoose.Schema({
    name: String,
    entryids: [mongoose.Types.ObjectId]
});
module.exports = mongoose.model('labbook' , LabbookSchema);