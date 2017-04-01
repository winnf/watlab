var mongoose = require('mongoose');

var ExperimentSchema = mongoose.Schema({
    name: String,
    startDate: Date,
    dueDate: Date,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    status: String,
    protocolIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Entry'}],
    equipmentIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Equipment'}],
    assignedUserIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    authorIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    labbookIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'LabBook'}],
    entryIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Entry'}]
});

ExperimentSchema.methods.editExperiment = function(obj){
    for(var field in obj){
        this[field] = obj[field];
    }
};

module.exports = mongoose.model('Experiment', ExperimentSchema);