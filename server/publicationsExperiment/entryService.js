var fs = require('fs');
var Q = require('q');
var uuidV4 = require('uuid/v4');

var Entry = require('../../db/entryModel');

var EntryService = function(){};

EntryService.prototype.addEntry = function(files, fileName, format, description, owner){
	var promises = Q.all(files.map(file => {
		var deferred = Q.defer();
		var buffer = file.buffer;
		var originalname = file.originalname;
		
		var uniqueName = uuidV4() + originalname; // use uuid to prevent collision while retaining file type
		var filepath = './db/fileSystem/' + uniqueName;
		
		fs.writeFile(filepath, buffer, function (err,data) {
		  if (err) {
		  	deferred.reject(err);
		  } else {
		  	var entry = new Entry({
		  		name: fileName, 
		  		format: format,
		  		description: description, 
		  		filePath: filepath,
		  		owner: owner
		  	});

		  	entry.save(function(err){
		  		if(err) deferred.reject(err);
		  		else deferred.resolve(entry);
		  	});
		  }
		});

		return deferred.promise;
	}));

	return promises;
};

module.exports = new EntryService();
