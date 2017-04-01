var express = require('express');
var router = express.Router();
var Server = require('../../server/legacy/dogServer')

router.get('/createDog/:name', function(req, res) {
	Server.createDog(req.params.name).then(function(result){
		// result is whatever was passed in to deferred.resolve()
		var dogInstance = result.dogInstance;
		var waterBottle = result.waterBottle;

		res.send(result); // send json back to client
	}, function(err){
		var err = err.err;
		var waterBottle = err.waterBottle;
		res.status(500); // send error back to client
	});
});

router.get('/listAll', function(req, res) {
	Server.displayDB().then(function(result){
		res.send(result);
	}, function(err){
		res.status(500);
	});
});

router.get('/clearAll', function(req, res) {
	Server.clearAll().then(function(result){
		res.send(result);
	}, function(err){
		res.status(500);
	});
});

router.get('/addFood/:name/:cost/:item', function(req, res) {
	var params = req.params;
	Server.addFood(params.name, params.cost, params.item).then(function(result){
		res.send(result);
	}, function(err){
		res.status(500);
	});
});

module.exports = router;