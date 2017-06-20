var express = require('express');
var router = express.Router();
var path = require('path');

router.route('/').get(function(req, res) {
	res.render('rech.ejs');
});

module.exports = router;