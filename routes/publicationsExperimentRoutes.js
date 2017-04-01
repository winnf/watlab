/*jslint node: true */

'use strict';
var express = require('express');
var Server = require('../server/publicationsExperiment/server');
var pubService = require('../server/publicationsExperiment/publicationService')
var router = express.Router();

/* 
	Routes for the manage publications and experiment group
	Root route is '/per'
	*/


router.get(['/', '/experiments', '/publications', '/experiment/:experimentId'], function (req, res) {
    res.render('publicationsExperiment/index');
});

router.get(['/createExperiment'], function(req,res){
	//Server.createExperiment
});

router.get('/createDog/:pubName', function (req, res) {
    pubService.createPub(req.params.pubName).then(function (result) {
        var pubInstance = result.pubInstance;
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