var express = require('express');
var router = express.Router();
var Server = require('../server/projectsStaff/server');
/*
	Routes for the manage lab projects and lab staff group
	Root route is '/psr'
	*/

router.get(['/','/tasks', '/notices', '/projects', '/compensation', '/budget'], function(req, res) {
  res.render('projectsStaff/index');
});


router.get('/view/:fileName', function(req, res) {
	res.render('projectsStaff/templates/' + req.params.fileName);
});

router.get('/listAll', function(req, res){
  Server.displayDB().then(function(result){
    res.send(result);
  }, function(err){
    var err = error.err;
    res.status(500);
  });
});

module.exports = router;
