var Entry = require('../../db/entryModel');
var fs = require('fs');

var EntryService = function(){};

EntryService.prototype.addEntry = function(files){
	console.log(files.length);
	files.forEach(file => {
		var buffer = file.buffer;
		var originalname = file.originalname;
		console.log(originalname);
		fs.writeFile('./db/fileSystem/' + originalname, buffer, function (err,data) {
		  if (err) {
		    return console.log(err);
		  }
		});
	});
};

module.exports = new EntryService();
