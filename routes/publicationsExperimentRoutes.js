/*jslint node: true */

'use strict';
var express = require('express');
var multer = require('multer');
var Q = require('Q');
var upload = multer();

var EntryService = require('../server/publicationsExperiment/entryService');
var ExperimentService = require('../server/publicationsExperiment/experimentService');
var PublicationService = require('../server/publicationsExperiment/publicationService');
var UserService = require('../server/publicationsExperiment/userService')
var router = express.Router();

/* 
	Routes for the manage publications and experiment group
	Root route is '/per'
	*/


router.get(['/', '/experiments', '/publications', '/experiment/:experimentId'], function (req, res) {
    res.render('publicationsExperiment/index');
});

router.post('/createExperiment', function (req, res) {
	console.log('ssssd' , req.body);
	ExperimentService.createExperiment(req.body).then(
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
router.get('/allUsers' , function(req , res){
    UserService.getUsers().then(function (result) {
        console.log(result);
    res.send(result);
}, function (error){
    var err = error.err;
    res.sendStatus(500);
});
});
router.get('/allExperiments' , function(req , res){
	ExperimentService.displayDB().then(function (result) {
        res.send(result);
    }, function (error) {
        res.status(500).send(error.err);
    });
});

router.get('/getExperimentData/:id' , function(req , res){
    ExperimentService.getExperimentById(req.params.id).then(function (result) {
        res.send(result);
    }, function (error) {
        res.status(500).send(error.err);
    });
});


router.get('/createPublication/:pubName', function (req, res) {
    PublicationService.createPublication(req.params.pubName).then(function (result) {
        res.send(result);
    }, function (error) {
        res.status(500).send(error.err);
    });
});

router.get('/allPublications', function (req, res) {
    PublicationService.displayDB().then(function (result) {
        res.send(result);
    }, function (error) {
        res.status(500).send(error.err);
    });
});

router.post('/uploadFile', upload.any(), function (req, res) {
    var body = req.body;
    var fileName = body.fileName;
    var format = body.format;
    var description = body.description;
    var experimentId = body.experimentId;
    var owner = body.owner;
    var isProtocol = body.isProtocol;
    console.log(req.files);
    EntryService.addEntry(req.files, fileName, format, description, owner, isProtocol).then(function(entries){
        Q.all(entries.map(entry => ExperimentService.addEntryToExperiment(experimentId, entry._id))).then(function(){
            res.send(entries);
        }, function(err){
            res.status(500).send(err);
        });
        
    }, function(err){
        res.status(500).send(err);
    });
});

router.get('/downloadFile/:entryId', function(req, res){
    var entryId = req.params.entryId;
    EntryService.getFile(entryId).then(function (entry) {
        var filePath = entry.filePath;
        res.download(filePath);
    }, function (error) {
        res.status(500).send(error.err);
    });
});

router.get('/getPublication/:name', function (req, res) {
    PublicationService.getPublication(req.params.name).then(function (result) {
        res.send(result);
    }, function (error) {
        res.status(500).send(error.err);
    });
});

router.post('/editPublication', function (req, res) {
    var d = req.body.viewableData;
    PublicationService.editPublication(d.pubName, d.authors, d.date, d.sendStatus, d.version, d.experimentId).then(function (result) {
        res.send(result);
    }, function (error) {
        res.status(500).send(error.err);
    });
});

router.get('/view/:fileName', function (req, res) {
	res.render('publicationsExperiment/templates/' + req.params.fileName);
});


module.exports = router;