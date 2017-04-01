var mongoose = require('mongoose');

var ExperimentSchema = mongoose.Schema({
    name: String,
    startdate: Date,
    duedate: Date,
    owner: mongoose.Schema.ObjectId,
    status: String,
    protocolids: [mongoose.Schema.ObjectId],
    equipmentids: [mongoose.Schema.ObjectId],
    assigneduserids: [mongoose.Schema.ObjectId],
    authorids: [mongoose.Schema.ObjectId],
    labbookids: [mongoose.Schema.ObjectId],
    entryids: [mongoose.Schema.ObjectId]
});
ExperimentSchema.methods.editExperiment = function(obj){
    for(var field in obj){
        this[field] = obj[field];
    }
};
module.exports = mongoose.model('Experiment', ExperimentSchema);