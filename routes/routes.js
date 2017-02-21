var express = require('express');
var router = express.Router();

/* GET home page. */
router.get(['/', '/login', '/experiments', '/publications'], function(req, res, next) {
  res.render('index');
});


router.get('/view/:fileName', function(req, res) {
	res.render(req.params.fileName);
});

module.exports = router;
