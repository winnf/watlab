/*jslint node: true */

'use strict';
var express = require('express');
var Server = require('../server/publicationsExperiment/server');
var pubService = require('../server/publicationsExperiment/publicationService');
var router = express.Router();
var experimentService = require('../server/publicationsExperiment/experimentController');

/* 
	Routes for the manage publications and experiment group
	Root route is '/per'
	*/


router.get(['/', '/experiments', '/publications', '/experiment/:experimentId'], function (req, res) {
    res.render('publicationsExperiment/index');
});

router.post('/createExperiment', function (req, res) {
	//console.log('ssssd' , req.body);
	experimentService.createExperiment(req.body).then(
		function(result){
		var experimentInstance = result.expInstance;
		//console.log(result);
		res.send(result);
	}
	, function(err){
		console.log(err);
		var err = err.err;
		res.status(500);
	});
	});

router.get('/allExperiments' , function(req , res){
	experimentService.displayDB().then(function (result) {
        res.send(result);
    }, function (error) {
        var err = error.err;
        res.status(500);
    });
});
router.get('/createPublication/:pubName', function (req, res) {
    pubService.createPublication(req.params.pubName).then(function (result) {
        var pubInstance = result.pubInstance;
        res.send(result);
    }, function (error) {
        var err = error.err;
        res.status(500);
    });
});

router.get('/allPublications', function (req, res) {
    pubService.displayDB().then(function (result) {
        res.send(result);
    }, function (error) {
        var err = error.err;
        res.status(500);
    });
});

router.get('/view/:fileName', function (req, res) {
	res.render('publicationsExperiment/templates/' + req.params.fileName);
});


module.exports = router;