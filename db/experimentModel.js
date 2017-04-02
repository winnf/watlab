var mongoose = require('mongoose');

var ExperimentSchema = mongoose.Schema({
    name: String,
    startDate: Date,
    dueDate: Date,
    ownerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    assignedUserIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    status: String,
    protocolIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Protocol'}],
    equipmentIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Equipment'}],
    entryIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Entry'}]
});

ExperimentSchema.methods.editExperiment = function(obj){
    for(var field in obj){
        this[field] = obj[field];
    }
};

module.exports = mongoose.model('Experiment', ExperimentSchema);