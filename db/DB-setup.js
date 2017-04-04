var mongoose = require('mongoose');

var DB = function() {};
DB.prototype.setup = function() {
	// setup database
	mongoose.connect('mongodb://localhost/database');

	// insert all the models
	require('./entryModel');
	require('./experimentModel');
	require('./psrNoticeModel');
	require('./psrProjectModel');
	require('./psrTaskModel');
	require('./userModel');
	require('./versionModel');
};

DB.prototype.close = function(){
	mongoose.connection.close();
};

module.exports = new DB();