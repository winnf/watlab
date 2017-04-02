/*jslint node: true */

'use strict';
var express = require('express');
var multer = require('multer');
var upload = multer();

var PublicationService = require('../server/publicationsExperiment/publicationService');
var EntryService = require('../server/publicationsExperiment/entryService');

var router = express.Router();

/* 
	Routes for the manage publications and experiment group
	Root route is '/per'
	*/


router.get(['/', '/experiments', '/publications', '/experiment/:experimentId'], function (req, res) {
    res.render('publicationsExperiment/index');
});

router.get(['/createExperiment'], function (req, res) {
	//Server.createExperiment
});

router.get('/createPublication/:pubName', function (req, res) {
    PublicationService.createPublication(req.params.pubName).then(function (result) {
        var pubInstance = result.pubInstance;
        res.send(result);
    }, function (error) {
        var err = error.err;
        res.status(500);
    });
});

router.get('/allPublications', function (req, res) {
    PublicationService.displayDB().then(function (result) {
        res.send(result);
    }, function (error) {
        var err = error.err;
        res.status(500);
    });
});

router.post('/uploadFile', upload.any(), function (req, res) {
    EntryService.addEntry(req.files);
});

router.get('/getPublication/:name', function (req, res) {
    PublicationService.getPublication(req.params.name).then(function (result) {
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