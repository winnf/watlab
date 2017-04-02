var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;

var Entries = require('./entryModel.js');
var Experiment = require('./experimentModel.js');
var LabBook = require('./labBookModel.js');
var Publication = require('./publicationModel.js');
var User = require('./userModel.js');
var Version = require('./versionModel.js');

mongoose.connect('mongodb://localhost/database');

/**
	Populates Entries, Experiment, LabBook, Publication, User, and Version
*/

// http://stackoverflow.com/questions/17891173/javascript-how-to-efficiently-randomly-select-array-item-without-repeats
function randomNoRepeats(array) {
  var copy = array.slice(0);
  return function() {
    if (copy.length < 1) { copy = array.slice(0); }
    var index = Math.floor(Math.random() * copy.length);
    var item = copy[index];
    copy.splice(index, 1);
    return item;
  };
}

function generateRandom(data, minLength, maxLength) {
	var N = Math.floor(Math.random() * (maxLength-minLength)) + minLength;
	var res = [];
	var generator = randomNoRepeats(data);
	for(var i = 0; i < N; i++) {
		res.push(generator());
	}
	return res;
}

var dummyUserData = [
	{name: 'Andrew', _id: new ObjectID()},
	{name: 'Jason', _id: new ObjectID()},
	{name: 'Sam', _id: new ObjectID()}
];

var dummyEntriesData = [
	{name: "Cell Sample Data", description: 'Sample', date: "Jan 1, 1928", owner: '', labBook: '', archive: false, filepath: [] },
	{name: "Microwave Data", description: 'Wave', date: "Jan 1, 1952", owner: '', labBook: '', archive: false, filepath: []},
	{name: "Radiation Data", description: 'Gamma', date: "Jun 1, 1964", owner: '', labBook: '', archive: false, filepath: [] },
	{name: "Bird Calls", description: 'Chicken', date: "Jul 1, 1995", owner: '', labBook: '', archive: false, filepath: [] },
	{name: "Seisometer", description: 'Earth', date: "Feb 1, 1974", owner: '', labBook: '', archive: false, filepath: []},
	{name: "Lochness Monster Sighting", description: 'Whale', date: "Jan 1, 1964", owner: '', labBook: '', archive: false, filepath: [] }
];

var dummyExperimentData = [
	{name: "Correlated diffusion imaging (CDI) for cancer imaging", startDate: "Jan 1, 1928", dueDate: "Feb 1, 1928", owner: "", assigneeIds: [], status: "In Progress",
		protocolIds: [], equipmentIds: [], entryIds: []} ,
	{name: "Evolutionary deep intelligence for operational deep intelligence", startDate: "Jan 1, 1952", dueDate: "Nov 1, 1952", owner: "", assigneeIds: [], status: "Complete",
		protocolIds: [], equipmentIds: [], entryIds: []} ,
	{name: "Musculoskeletal kinematic analysis using video fluoroscopy", startDate: "Jan 1, 1964", dueDate: "Apr 1, 1964", owner: "", assigneeIds: [], status: "Approaching Deadline",
		protocolIds: [], equipmentIds: [], entryIds: []} ,
	{name: "Ocular morphological analysis", startDate: "Jan 1, 1964", dueDate: "Jun 1, 1964", owner: "", assigneeIds: [], status: "Overdue",
		protocolIds: [], equipmentIds: [], entryIds: []} ,
	{name: "Sea ice analysis using synthetic aperture radar ", startDate: "Jul 1, 1995", dueDate: "Feb 1, 1995", owner: "", assigneeIds: [], status: "In Progress",
		protocolIds: [], equipmentIds: [], entryIds: []} ,
	{name: "Image and video noise reduction and artifact reduction", startDate: "Feb 1, 1974", dueDate: "Jan 1, 1974", owner: "", assigneeIds: [], status: "Complete",
		protocolIds: [], equipmentIds: [], entryIds: []} ,
	{name: "Spectral demultiplexed imaging (SDI) for single-shot", startDate: "Jun 1, 1974", dueDate: "Dec 1, 1974", owner: "", assigneeIds: [], status: "Approaching Deadline",
		protocolIds: [], equipmentIds: [], entryIds: []} 
];

var dummyVersionData = [
	{_id: new ObjectID(), order: 0, verName: "Correlated diffusion imaging - v1", submittedDate: "Jun 1, 1964", versionFilePath: ''},
	{_id: new ObjectID(), order: 0, verName: "Deep De-Noising Autoencoders - v1", submittedDate: "Jan 1, 1952", versionFilePath: ''},
	{_id: new ObjectID(), order: 0, verName: "Convolutional Nets and Radon - v1", submittedDate: "Jan 1, 1928", versionFilePath: ''},
	{_id: new ObjectID(), order: 0, verName: "Evolutionary Projection - v1", submittedDate: "Jul 1, 1995", versionFilePath: ''},
	{_id: new ObjectID(), order: 0, verName: "ROI Estimation - v1", submittedDate: "Feb 1, 1974", versionFilePath: ''},
	{_id: new ObjectID(), order: 0, verName: "Image Segmentation - v1", submittedDate: "Jun 1, 1964", versionFilePath: ''},
	{_id: new ObjectID(), order: 0, verName: "Learning Opposites with Evolving - v1", submittedDate: "Dec 1, 1974", versionFilePath: ''},
	{_id: new ObjectID(), order: 0, verName: "Validation of Atlas-Based - v1", submittedDate: "Feb 1, 1995", versionFilePath: ''},
];

var dummyPublicationData = [
	{pubName: "Correlated diffusion imaging (CDI) for cancer imaging", experimentIds: [], authors: [], versions: [], status: "In Progress"} ,
	{pubName: "Deep De-Noising Autoencoders", experimentIds: [], authors: [], versions: [], status: "In Progress"}  ,
	{pubName: "Convolutional Nets and Radon Transform", experimentIds: [], authors: [], versions: [], status: "Complete"} ,
	{pubName: "Evolutionary Projection Selection", experimentIds: [], authors: [], versions: [], status: "Approaching Deadline"} ,
	{pubName: "ROI Estimation in Ultrasound Images", experimentIds: [], authors: [], versions: [], status: "Overdue"} ,
	{pubName: "Image Segmentation with Self-Configuration", experimentIds: [], authors: [], versions: [], status: "In Progress"} ,
	{pubName: "Learning Opposites with Evolving Rules", experimentIds: [], authors: [], versions: [], status: "Complete"} ,
	{pubName: "Validation of Atlas-Based Segmentation", experimentIds: [], authors: [], versions: [], status: "Approaching Deadline"} 
];

dummyPublicationData.forEach((publication, i) => {
	publication.versions.push(dummyVersionData[i]._id);
});

function clearAndInsert(model, tableName, data, callback) {
	model.remove({}, function(err, removed){
		console.log('Cleared table ' + tableName);
		console.log(removed.result);

		model.collection.insert(data, function(err, insertedData){
			console.log('Insertion completed ' + tableName);
			if(typeof insertedData.ops === 'undefined') console.log(insertedData);
			callback(insertedData.ops);
		});
	})
}

clearAndInsert(User, 'User', dummyUserData, function(){});

var dummyLabBookData = [];
var counter = 0;
dummyExperimentData.forEach(experiment => {
	experiment.startDate = new Date(experiment.startDate);
	experiment.dueDate = new Date(experiment.dueDate);
	experiment.owner = generateRandom(dummyUserData, 1, 1)[0]._id;
	experiment.assigneeIds = generateRandom(dummyUserData, 1, dummyUserData.length).map(y => y._id);

	var entries = generateRandom(dummyEntriesData, 1, dummyEntriesData.length);

	entries.forEach(entry => {
		var newLabBook = {name: 'labbook' + (counter++), _id: new ObjectID()};
		dummyLabBookData.push(newLabBook);
		entry.owner = generateRandom(dummyUserData, 1, 1)[0]._id;
		entry.labBook = newLabBook._id;
		entry._id = new ObjectID();
	});

	experiment.entryIds = entries.map(y => y._id);
});

clearAndInsert(LabBook, 'LabBook', dummyLabBookData, function(){});
clearAndInsert(Experiment, 'Experiment', dummyExperimentData, function(){});
clearAndInsert(Version, 'Version', dummyVersionData, function(){});
clearAndInsert(Publication, 'Publication', dummyPublicationData, function(){});



