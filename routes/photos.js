var express = require('express');
var router = express.Router();
var path = require('path');

var photos = [];
photos.push({
name: 'Photo 1',
path: path.join('img', 'porto1.jpg')
});

photos.push({
name: 'Photo 2',
path: path.join('img', 'porto2.jpg')
});


router.route('/')
				.get(function(req, res) {
								res.render('photos.ejs', {
															title: 'Photos',
															photos: photos
														});
				});

module.exports = router;