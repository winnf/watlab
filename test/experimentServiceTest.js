var assert = require('assert');

var ExperimentService = require('../server/publicationsExperiment/experimentService');
var DB = require('../db/DB-setup');

// Run by using "npm test"
describe('ExperimentService', function() {
	before(function() { // runs before all tests in this block
		DB.setup(); // Setup database
  });

  after(function(){ // runs after all tests in this block
  	DB.close();
  });

  describe('#displayDB()', function() {
  	it('should return an array type', function(done) {
    	ExperimentService.displayDB().then(function(result){
    		assert(result instanceof Array, 'result is not an Array');
    		done();
    	}, done);
    });

    it('_id field should not be undefined', function(done) {
    	ExperimentService.displayDB().then(function(result){
    		result.forEach(x => assert(typeof x._id !== 'undefined', '_id is undefined'));
    		done();
    	}, done);
    });

    it('name should be a String and not empty', function(done) {
    	ExperimentService.displayDB().then(function(result){
    		result.forEach(x => assert(typeof x.name === 'string' && x.name.length > 0, 'name is not correct string'));
    		done();
    	}, done);
    });

    it('startDate should be a date instance', function(done) {
    	ExperimentService.displayDB().then(function(result){
    		result.forEach(x => assert(x.startDate instanceof Date, 'startDate is not correct date'));
    		done();
    	}, done);
    });


    it('dueDate should be a date instance', function(done) {
    	ExperimentService.displayDB().then(function(result){
    		result.forEach(x => assert(x.dueDate instanceof Date, 'dueDate is not correct date'));
    		done();
    	}, done);
    });

    it('ownerId field should not be undefined', function(done) {
    	ExperimentService.displayDB().then(function(result){
    		result.forEach(x => assert(typeof x.ownerId !== 'undefined', '_id is undefined'));
    		done();
    	}, done);
    });

    it('assigneeIds should be an array type', function(done) {
    	ExperimentService.displayDB().then(function(result){
    		result.forEach(x => {
    			var assigneeIds = x.assigneeIds;
    			assert(assigneeIds instanceof Array, 'assigneeIds is not an Array');
    		});
    		done();
    	}, done);
    });

    it('entryIds should be an array type', function(done) {
    	ExperimentService.displayDB().then(function(result){
    		result.forEach(x => {
    			var entryIds = x.entryIds;
    			assert(entryIds instanceof Array, 'entryIds is not an Array');
    		});
    		done();
    	}, done);
    });

    it('assigneeIds should have name field which is a string', function(done) {
    	ExperimentService.displayDB().then(function(result){
    		result.forEach(x => {
    			var assigneeIds = x.assigneeIds;
	    		assigneeIds.forEach(y => assert(typeof y.name === 'string' && y.name.length > 0, 'name is not correct string'));
    		});
    		done();
    	}, done);
    });

    it('entryIds should have name field which is a string', function(done) {
    	ExperimentService.displayDB().then(function(result){
    		result.forEach(x => {
    			var entryIds = x.entryIds;
	    		entryIds.forEach(y => assert(typeof y.name === 'string' && y.name.length > 0, 'name is not correct string'));
    		});
    		done();
    	}, done);
    });
	});
});