var fs = require('fs');
var Q = require('q');
var uuidV4 = require('uuid/v4');

var Entry = require('../../db/entryModel');

var EntryService = function(){};

EntryService.prototype.addEntry = function(files, fileName, format, description, owner, isProtocol){
	console.log(files);
	var promises = Q.all(files.map(file => {
		var deferred = Q.defer();
		var buffer = file.buffer;
		var originalname = file.originalname;
		
		var uniqueName = uuidV4() + '$' + originalname; // use uuid to prevent collision while retaining file type
		var filepath = './db/fileSystem/' + uniqueName;
		var mimetype = file.mimetype;

		console.log(file);
		fs.writeFile(filepath, buffer, function (err,data) {
		  if (err) {
		  	deferred.reject(err);
		  } else {
		  	console.log('Uploaded ' + filepath);
		  	var entry = new Entry({
		  		name: fileName, 
		  		format: format,
		  		description: description, 
		  		filePath: filepath,
		  		owner: owner,
		  		mimetype: mimetype,
		  		isProtocol: isProtocol
		  	});

		  	entry.save(function(err, entry1){
		  		if(err) {
		  			deferred.reject(err);
		  		} else {
		  			Entry.populate(entry1, {path: 'owner'}, function(err, item){
				  		console.log(item);
				  		if(err) deferred.reject(err);
				  		else deferred.resolve(item);
				  	});
		  		}
		  		
		  	})
		  }
		});

		return deferred.promise;
	}));

	return promises;
};


EntryService.prototype.getFile = function(entryId) {
	var deferred = Q.defer();
	Entry.findOne({_id: entryId}, function(err, entry){
		if(err || entry === null){
			deferred.reject({err: err});
		} else {
			console.log('Got file');
			console.log(entry);
			deferred.resolve(entry);
		}
	})
	return deferred.promise;
};
module.exports = new EntryService();
