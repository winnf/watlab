var express = require('express');
var router = express.Router();
//var app = express();
var taskServer = require('../server/projectsStaff/taskService');
var noticeServer = require('../server/projectsStaff/noticeService');
var projectServer = require('../server/projectsStaff/projectService');
var compensationServer = require('../server/projectsStaff/compensationService');
var budgetServer = require('../server/projectsStaff/budgetService');

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
  taskServer.displayTaskDB().then(function(result){
    res.send(result);
  }, function(err){
    var err = error.err;
    res.sendStatus(500);
  });
});

router.get('/addTask/:name/:date/:assignees/:description',function(req, res){
  var params = req.params;
  taskServer.addTask(params.name, params.date, params.assignees, params.description).then(function(result){
    res.send(result);
  }, function(err){
    res.sendStatus(500);
  });
});

router.get('/updateTask/:name/:date/:assignees/:description/:id', function(req, res){
  var params = req.params;
  taskServer.updateTask(params.name, params.date, params.assignees, params.description, params.id).then(function(result){
    res.send(result);
  }, function(err){
    res.sendStatus(500);
  });
});

router.get('/deleteTask/:id', function(req, res){
  var params = req.params;
  taskServer.deleteTask(params.id).then(function(result){
    res.send(result);
  }, function(err){
    res.sendStatus(500);
  });
});

router.get('/allNotice', function(req, res){
  noticeServer.displayNoticeDB().then(function(result){
    res.send(result);
  }, function(err){
    var err = error.err;
    res.sendStatus(500);
  });
});

router.get('/addNotice/:name/:date/:assignees/:description', function(req, res){
  var params = req.params;
  noticeServer.addNotice(params.name, params.date, params.assignees, params.description).then(function(result){
    res.send(result);
  }, function(err){
    res.sendStatus(500);
  });
});

router.get('/updateNotice/:title/:date/:assignees/:description/:id', function(req, res){
  var params = req.params;
  noticeServer.updateNotice(params.title, params.date, params.assignees, params.description, params.id).then(function(result){
    res.send(result);
  }, function(err){
    res.sendStatus(500);
  });
});

router.get('/deleteNotice/:id', function(req, res){
  var params = req.params;
  noticeServer.deleteNotice(params.id).then(function(result){
    res.send(result);
  }, function(err){
    res.sendStatus(500);
  });
});

router.get('/allProject', function(req, res){
  projectServer.displayProjectDB().then(function(result){
    res.send(result);
  }, function(err){
    var err= error.err;
    res.sendStatus(500);
  });
});

router.get('/addProject/:name/:assignees/:description', function(req, res){
  var params = req.params;
  projectServer.addProject(params.name, params.assignees, params.description).then(function(result){
    res.send(result);
  }, function(err){
    res.sendStatus(500);
  });
});

router.get('/allCompensation', function(req, res){
  compensationServer.displayCompensationDB().then(function(result){
    res.send(result);
  }, function(err){
    var err= error.err;
    res.sendStatus(500);
  });
});

router.get('/addCompensation/:assignee/:amount/:date', function(req, res){
  var params = req.params;
  compensationServer.addCompensation(params.assignee, params.amount, params.date).then(function(result){
    res.send(result);
  }, function(err){
    res.sendStatus(500);
  });
});

router.get('/allBudget', function(req, res){
  budgetServer.displayBudgetDB().then(function(result){
    res.send(result);
  }, function(err){
    var err= error.err;
    res.sendStatus(500);
  });
});

router.get('/addBudget/:name/:amount/:category', function(req, res){
  var params = req.params;
  budgetServer.addBudget(params.name, params.amount, params.category).then(function(result){
    res.send(result);
  }, function(err){
    res.sendStatus(500);
  });
});
//app.use(router);
//app.listen(5000);
module.exports = router;
