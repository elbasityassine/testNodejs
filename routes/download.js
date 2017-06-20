var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.route('/')
				.get(function(req, res) {});
				
router.route('/img/:photo')
				.get(function(req, res) {
						let photo = decodeURIComponent(req.params.photo);
						res.download(path.join(__dirname, "..", "public", "img", photo));
						});
						
module.exports = router;