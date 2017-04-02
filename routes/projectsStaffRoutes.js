var express = require('express');
var router = express.Router();
//var app = express();
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

router.get('/allTask', function(req, res){
  Server.displayTaskDB().then(function(result){
    res.send(result);
  }, function(err){
    var err = error.err;
    res.status(500);
  });
});

router.get('/addTask/:name/:date/:assignees/:description',function(req, res){
  var params = req.params;
  Server.addTask(params.name, params.date, params.assignees, params.description).then(function(result){
    res.send(result);
  }, function(err){
    res.status(500);
  });
});
//app.use(router);
//app.listen(5000);
module.exports = router;
