var express = require('express');
var router = express.Router();

/*
	Routes for the manage lab projects and lab staff group
	Root route is '/psr'
	*/

router.get(['/','/tasks'], function(req, res) {
  res.render('projectsStaff/index');
});


router.get('/view/:fileName', function(req, res) {
	res.render('projectsStaff/templates/' + req.params.fileName);
});

module.exports = router;
