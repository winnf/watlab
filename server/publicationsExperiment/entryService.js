var fs = require('fs');
var Q = require('q');
var uuidV4 = require('uuid/v4');

var Entry = require('../../db/entryModel');

var EntryService = function(){};

EntryService.prototype.addEntry = function(files){
	var promises = Q.all(files.map(file => {
		var deferred = Q.defer();
		var buffer = file.buffer;
		var originalname = file.originalname;
		var uniqueName = uuidV4();

		var filepath = './db/fileSystem/' + uniqueName;
		fs.writeFile(filepath, buffer, function (err,data) {
		  if (err) {
		  	deferred.reject(err);
		  } else {
		  	var entry = new Entry({
		  		name: originalname, 
		  		description: '', 
		  		date: '',
		  		filePath: filepath
		  	});
		  	entry.save()
		  	deferred.resolve()
		  }
		});
		return deferred.promise;
	}));
	return promises;
};

module.exports = new EntryService();
