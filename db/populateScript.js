/*jslint node: true */
'use strict';
var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;

var Entries = require('./entryModel.js');
var Experiment = require('./experimentModel.js');
var Publication = require('./publicationModel.js');
var User = require('./userModel.js');
var Version = require('./versionModel.js');

var Q = require('q');

mongoose.connect('mongodb://localhost/database');

/**
	Populates Entries, Experiment, Publication, User, and Version
*/

// http://stackoverflow.com/questions/17891173/javascript-how-to-efficiently-randomly-select-array-item-without-repeats
function randomNoRepeats(array) {
    var copy = array.slice(0);
    return function () {
        if (copy.length < 1) { copy = array.slice(0); }
        var index = Math.floor(Math.random() * copy.length),
            item = copy[index];
        copy.splice(index, 1);
        return item;
    };
}

function generateRandom(data, minLength, maxLength) {
	var N = Math.floor(Math.random() * (maxLength - minLength)) + minLength,
        res = [],
        generator = randomNoRepeats(data);
	for (var i = 0; i < N; i++) {
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
	{name: "Cell Sample Data", description: 'Collection of blood, saliva, and buccal cell samples in a pilot study on the Danish nurse cohort: comparison of the response rate and quality of genomic DNA.',
			date: "Jan 1, 1928", format: '.csv', owner: '', filePath: '' },
	{name: "Microwave Data", description: 'We present a full-sky 100 μm map that is a reprocessed composite of the COBE/DIRBE and IRAS/ISSA maps, with the zodiacal foreground and confirmed point sources removed. Before using the ISSA maps, we remove the remaining artifacts',
			date: "Jan 1, 1952", format: '.py', owner: '', filePath: '' },
	{name: "Radiation Data", description: 'The phenomenon of growth, decline and death—aging—has been the source of considerable speculation. This cycle seems to be a more or less direct function of the metabolic rate and this in turn depends on the species (animal or plant)',
			date: "Jun 1, 1964", format: '.mat', owner: '', filePath: '' },
	{name: "Bird Calls", description: 'Automatic identification of bird calls without manual intervention has been a challenging task for meaningful research on the taxonomy and monitoring of bird migrations in ornithology',
			date: "Jul 1, 1995", format: '.mp3', owner: '', filePath: '' },
	{name: "Seisometer", description: 'A tomographic image of the upper mantle beneath central Tibet from INDEPTH data has revealed a subvertical high-velocity zone from∼ 100-to∼ 400-kilometers depth, located approximately south of the Bangong-Nujiang Suture',
			date: "Feb 1, 1974", format: '.jpeg', owner: '', filePath: ''},
	{name: "Lochness Monster Sighting", description: 'Recent publicity concerning new claims for the existence of the Loch Ness monster has focused on the evidence offered by Sir Peter Scott and Robert Rines.',
			date: "Jan 1, 1964", format: '.mp4', owner: '', filePath: '' }
];

var dummyExperimentData = [
	{name: "Correlated diffusion imaging (CDI) for cancer imaging", startDate: "Jan 1, 1928", dueDate: "Feb 1, 1928", ownerId: "", assigneeIds: [],
		protocolIds: [], equipmentIds: [], entryIds: []},
	{name: "Evolutionary deep intelligence for operational deep intelligence", startDate: "Jan 1, 1952", dueDate: "Nov 1, 1952", ownerId: "", assigneeIds: [],
		protocolIds: [], equipmentIds: [], entryIds: []},
	{name: "Musculoskeletal kinematic analysis using video fluoroscopy", startDate: "Jan 1, 1964", dueDate: "Apr 1, 1964", ownerId: "", assigneeIds: [],
		protocolIds: [], equipmentIds: [], entryIds: []},
	{name: "Ocular morphological analysis", startDate: "Jan 1, 1964", dueDate: "Jun 1, 1964", ownerId: "", assigneeIds: [],
		protocolIds: [], equipmentIds: [], entryIds: []},
	{name: "Sea ice analysis using synthetic aperture radar ", startDate: "Jul 1, 1995", dueDate: "Feb 1, 1995", ownerId: "", assigneeIds: [],
		protocolIds: [], equipmentIds: [], entryIds: []},
	{name: "Image and video noise reduction and artifact reduction", startDate: "Feb 1, 1974", dueDate: "Jan 1, 1974", ownerId: "", assigneeIds: [],
		protocolIds: [], equipmentIds: [], entryIds: []},
	{name: "Spectral demultiplexed imaging (SDI) for single-shot", startDate: "Jun 1, 1974", dueDate: "Dec 1, 1974", ownerId: "", assigneeIds: [],
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
	{_id: new ObjectID(), order: 0, verName: "Validation of Atlas-Based - v1", submittedDate: "Apr 5, 2017", versionFilePath: ''}
];

var dummyPublicationData = [
	{pubName: "Correlated diffusion imaging (CDI) for cancer imaging", experimentIds: [], authors: [], versions: []},
	{pubName: "Deep De-Noising Autoencoders", experimentIds: [], authors: [], versions: []},
	{pubName: "Convolutional Nets and Radon Transform", experimentIds: [], authors: [], versions: []},
	{pubName: "Evolutionary Projection Selection", experimentIds: [], authors: [], versions: []},
	{pubName: "ROI Estimation in Ultrasound Images", experimentIds: [], authors: [], versions: []},
	{pubName: "Image Segmentation with Self-Configuration", experimentIds: [], authors: [], versions: []},
	{pubName: "Learning Opposites with Evolving Rules", experimentIds: [], authors: [], versions: []},
	{pubName: "Validation of Atlas-Based Segmentation", experimentIds: [], authors: [], versions: []}
];

var dummyProtocolsData = [
	{name: "Protocol 1", description: 'Collection of blood, saliva, and buccal cell samples in a pilot study on the Danish nurse cohort: comparison of the response rate and quality of genomic DNA.',
			date: "Jan 1, 1928", owner: '', filePath: '' , isProtocol: true},
	{name: "Protocol 2", description: 'We present a full-sky 100 μm map that is a reprocessed composite of the COBE/DIRBE and IRAS/ISSA maps, with the zodiacal foreground and confirmed point sources removed. Before using the ISSA maps, we remove the remaining artifacts',
			date: "Jan 1, 1952", owner: '', filePath: '' , isProtocol: true},
	{name: "Protocol 3", description: 'The phenomenon of growth, decline and death—aging—has been the source of considerable speculation. This cycle seems to be a more or less direct function of the metabolic rate and this in turn depends on the species (animal or plant)',
			date: "Jun 1, 1964", owner: '', filePath: '' , isProtocol: true},
	{name: "Protocol 4", description: 'Automatic identification of bird calls without manual intervention has been a challenging task for meaningful research on the taxonomy and monitoring of bird migrations in ornithology',
			date: "Jul 1, 1995", owner: '', filePath: '' , isProtocol: true},
	{name: "Protocol 5", description: 'A tomographic image of the upper mantle beneath central Tibet from INDEPTH data has revealed a subvertical high-velocity zone from∼ 100-to∼ 400-kilometers depth, located approximately south of the Bangong-Nujiang Suture',
			date: "Feb 1, 1974", owner: '', filePath: ''},
	{name: "Protocol 6", description: 'Recent publicity concerning new claims for the existence of the Loch Ness monster has focused on the evidence offered by Sir Peter Scott and Robert Rines.',
			date: "Jan 1, 1964", owner: '', filePath: '' , isProtocol: true}
];

function clearAndInsert(model, tableName, data) {
	var deferred = Q.defer();
	model.remove({}, function (err, removed) {
		console.log('Cleared table ' + tableName);
		console.log(removed.result);

		model.collection.insert(data, function (err, insertedData) {
			console.log('Insertion completed ' + tableName);
			if (typeof insertedData.ops === 'undefined') {
                console.log(insertedData);
            }
			deferred.resolve(insertedData.ops);
		});
	});
	return deferred.promise;
}

var entriesArr = [];
var protocolsArr = [];
dummyExperimentData.forEach(experiment => {
	experiment._id = new ObjectID();
	experiment.startDate = new Date(experiment.startDate);
	experiment.dueDate = new Date(experiment.dueDate);
	experiment.ownerId = generateRandom(dummyUserData, 1, 1)[0]._id;
	experiment.assigneeIds = generateRandom(dummyUserData, 1, dummyUserData.length).map(y => y._id);

	var entries = generateRandom(dummyEntriesData, 1, dummyEntriesData.length);

	entries.forEach(entry => {
		entry.owner = generateRandom(dummyUserData, 1, 1)[0]._id;
		entry._id = new ObjectID();
		entriesArr.push({name: entry.name, description: entry.description, 
			date: entry.date, format: entry.format, owner: entry.owner, filePath: '', _id: entry._id});
	});

	var protocols = generateRandom(dummyProtocolsData, 1, dummyProtocolsData.length);

	protocols.forEach(protocol => {
		protocol.owner = generateRandom(dummyUserData, 1, 1)[0]._id;
		protocol._id = new ObjectID();
		protocolsArr.push({name: protocol.name, description: protocol.description, 
			date: protocol.date, owner: protocol.owner, filePath: '', _id: protocol._id , isProtocol: true});
	});

	experiment.entryIds = entries.concat(protocols).map(y => y._id);
});

dummyPublicationData.forEach((publication, i) => {
	publication.versions.push(dummyVersionData[i]._id);
	publication.experimentIds = generateRandom(dummyExperimentData, 1, dummyExperimentData.length).map(y => y._id);
  publication.authors = (generateRandom(dummyUserData, 1, dummyUserData.length).map(y => y._id));
});


Q.all([
	clearAndInsert(User, 'User', dummyUserData),
	clearAndInsert(Experiment, 'Experiment', dummyExperimentData),
	clearAndInsert(Version, 'Version', dummyVersionData),
	clearAndInsert(Publication, 'Publication', dummyPublicationData),
	clearAndInsert(Entries, 'Entries', entriesArr),
	clearAndInsert(Entries, 'Protocols', protocolsArr)
	]).then(function(result){
		mongoose.connection.close();
	});
