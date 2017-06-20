var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));
var port = process.env.PORT || process.env.port || process.env.OPENSHIFT_NODEJS_PORT || 8080;



// express utilise le parseur json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));

// Journalisation
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'logger.log'),
		{
			flags : 'a'
		})
app.use(morgan('combined', {
	stream : accessLogStream
}));

// Appel à la page d'index
//app.use(express.static('views/html/'));
app.get('/', function (req, res) {
 res.render('index.ejs');
});

// Partie les routes

var inscrire = require('./routes/inscrire');
var chercher = require('./routes/chercher');
var portofolio = require('./routes/photos');
var download = require('./routes/download');


app.use('/inscrire', inscrire);
app.use('/chercher', chercher);
app.use('/portofolio', portofolio);
app.use('/telechargement', download);

// partie ajax et express


var ficheInfo = [ 
{
	id : 1,
	nom : "ELBASIT",
	prenom : "Yassine"
},
{
	id : 2,
	nom : "Mohamed",
	prenom : "Chekroud"
}
];

app.get('/api/affiche', function(req, res) {
	if (req.query.limit >= 0) {
		res.json(ficheInfo.slice(0, req.query.limit));
	} else {
		res.json(ficheInfo);
	}
});

app.post('/api/formulaire', function(req, res) {
	monPerso = req.body;
	monPerso.id = 1 + ficheInfo.length
	ficheInfo.push(monPerso);
	res.send();
});

app.get('/api/affiche/:data', function(req, res) {
	var flag = false;
	var dataMin = req.params.data.toLowerCase();
	for (var i = 0; i < ficheInfo.length; i++) {
		var nomMIN = ficheInfo[i].nom.toLowerCase();
		if (ficheInfo[i].id == req.params.data || nomMIN == dataMin) {
			flag = true;
			res.json(ficheInfo[i]);
		}
	}
	if (!flag) {
		res.json({
			stat : 'no'
		});
	}
});

app.use(function(req, res, next) {
	console.log('%s %s', req.method, req.url);
	next();
});

app.listen(port, function () {
  console.log('Démarage du serveur: ' + app.get('host') + ':' + app.get('port') + '/');
});