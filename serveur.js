var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var fs = require('fs');

var server = require("http").createServer(app);
var io = require("socket.io").listen(server); 

app.use(express.static(path.join(__dirname, 'public')));
app.set('port', (process.env.PORT || 80));
app.set('host', (process.env.HOST || '127.0.0.1'));


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

function Personne(id, nom, prenom){
	if(arguments.length == 3){
		this.id = id;
		this.nom = nom;
		this.prenom = prenom;
	}
}

var ficheInfo = [ 
					new Personne(1, "ELBASIT", "Yassine"),
					new Personne(2, "Chekroud", "Mohammed")
				];

io.sockets.on("connection", function(socket){
	
	socket.on("inscrit", function(data){
		let id = 1 + ficheInfo.length;
		let monPerso = new Personne(id, data.nom, data.prenom);
		ficheInfo.push(monPerso);
		io.emit("affiche", ficheInfo);
	});
	
	socket.on("recherche", function(data){
		let flag = false;
		
		if(data.type == "id"){
			for(var i=0; i<ficheInfo.length; i++){
				if(ficheInfo[i].id == data.value){
					socket.emit("resultRecherche", ficheInfo[i]);
					flag = true;
				}
			}
		}
		else if(data.type == "nom"){
			for(var i=0; i<ficheInfo.length; i++){
				if(ficheInfo[i].nom.toLowerCase() == data.value.toLowerCase()){
					socket.emit("resultRecherche", ficheInfo[i]);
					flag = true;
				}
			}
		}
		
		if(!flag){
			socket.emit("resultRecherche", null);
		}
	});
});

app.use(function(req, res, next) {
	console.log('%s %s', req.method, req.url);
	next();
});

server.listen(app.get('port'));
