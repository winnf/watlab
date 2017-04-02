/*jslint node: true */

'use strict';
var express = require('express');
var multer = require('multer');
var upload = multer();

var PublicationService = require('../server/publicationsExperiment/publicationService');
var EntryService = require('../server/publicationsExperiment/entryService');

var router = express.Router();
var experimentService = require('../server/publicationsExperiment/experimentService');

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
		res.sendStatus(500);
	});
	});

router.get('/allExperiments' , function(req , res){
	experimentService.displayDB().then(function (result) {
        res.send(result);
    }, function (error) {
        var err = error.err;
        res.sendStatus(500);
    });
});
router.get('/createPublication/:pubName', function (req, res) {
    PublicationService.createPublication(req.params.pubName).then(function (result) {
        var pubInstance = result.pubInstance;
        res.send(result);
    }, function (error) {
        var err = error.err;
        res.sendStatus(500);
    });
});

router.get('/allPublications', function (req, res) {
    PublicationService.displayDB().then(function (result) {
        res.send(result);
    }, function (error) {
        var err = error.err;
        res.sendStatus(500);
    });
});

router.post('/uploadFile', upload.any(), function (req, res) {
    var body = req.body;
    var fileName = body.fileName;
    var format = body.format;
    var description = body.description;

    EntryService.addEntry(req.files, fileName, format, description).then(function(result){
        res.send(result);
    }, function(err){
        res.status(500).send(err);
    });
});

router.get('/getPublication/:name', function (req, res) {
    PublicationService.getPublication(req.params.name).then(function (result) {
        res.send(result);
    }, function (error) {
        var err = error.err;
        res.sendStatus(500);
    });
});

router.post('/editPublication', function (req, res) {
    var d = req.body.viewableData;
    PublicationService.editPublication(d.pubName, d.authors, d.date, d.sendStatus, d.version, d.experimentId).then(function (result) {
        res.send(result);
    }, function (error) {
        var err = error.err;
        res.sendStatus(500);
    });
});

router.get('/view/:fileName', function (req, res) {
	res.render('publicationsExperiment/templates/' + req.params.fileName);
});


module.exports = router;