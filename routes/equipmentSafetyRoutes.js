var express = require('express');
var router = express.Router();

/* 
	Routes for the manage lab equipment and safety compliance group
	Root route is '/esr'
	*/
	
router.get(['/'], function(req, res) {
  res.render('equipmentSafety/index');
});


router.get('/view/:fileName', function(req, res) {
	res.render('equipmentSafety/templates/' + req.params.fileName);
});

module.exports = router;