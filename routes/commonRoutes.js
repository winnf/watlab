var express = require('express');
var router = express.Router();

/* 
	Common routes between the three areas which includes login page
	Root route is '/'
	*/

// Home page	
router.get(['/', '/login', '/dashboard'], function(req, res) {
  res.render('common/index');
});

router.get('/view/:fileName', function(req, res) {
	res.render('common/templates/' + req.params.fileName);
});

module.exports = router;
