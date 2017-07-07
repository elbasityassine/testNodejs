$(document).ready(function(){
	var socket = io.connect('http://localhost');
	
	$('#monForm').on('submit', function(e){
		e.preventDefault();
		var nomForm = $('#nom').val();
		var prenomForm = $('#prenom').val();
		
		if(nomForm.length != 0 && prenomForm.length!= 0){
			socket.emit("inscrit", {nom : nomForm, prenom : prenomForm});
		}
	});

	socket.on('affiche', function(data) {
		
		$('#liste').html('');
		$('#liste').append('<h2>Liste des étudiants</h2>');
		$('#liste').append('<table class=\'maTab\'');
		$('#liste').append('<tr><th>Identifiant</th><th>Nom</th><th>Prénom</th></tr>');
		
		for (var i=0;i<data.length;i++){
			$('#liste').append('<tr><td>'+data[i].id+'</td><td>'+data[i].nom+'</td><td>'+data[i].prenom+'</td></tr>');
		}
		
		$('#liste').append('</table>');
	});
	
	$('#FormCherche').on('submit', function(e){
		e.preventDefault();
		
		var id = $('#ident').val();
		var nom = $('#nom').val();
		
		if(id != ''){
			$('#ident').val('');
			socket.emit("recherche", {type : "id", value : id});
		}
		else if(nom != ''){
			$('#nom').val('');
			socket.emit("recherche", {type : "nom", value : nom});
		}
	});
	
	socket.on("resultRecherche", function(data){
		$('#resultat-rech').html("");
		if(data != null){
			$('#resultat-rech').append('<h3>Identifiant : n° '+data.id+'</h3>');
			$('#resultat-rech').append('<p>Nom : '+data.nom+'</p>');
			$('#resultat-rech').append('<p>Prénom : '+data.prenom+'</p>');
		}
		else{
			$('#resultat-rech').append("<p>Désolé, cet étudiant  n'existe plus</p>");
		}
	});
	
});