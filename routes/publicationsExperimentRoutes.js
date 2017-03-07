var express = require('express');
var router = express.Router();

/* 
	Routes for the manage publications and experiment group
	Root route is '/per'
	*/


router.get(['/', '/experiments', '/publications', '/experiment/:experimentId'], function(req, res) {
  res.render('publicationsExperiment/index');
});


router.get('/view/:fileName', function(req, res) {
	res.render('publicationsExperiment/templates/' + req.params.fileName);
});
module.exports = router;