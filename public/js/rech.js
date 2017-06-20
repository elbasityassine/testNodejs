$(function(){
	
function afficheListeInfo(data){
	$('#resultat-rech').append('<h3>Identifiant : n° '+data.id+'</h3>');
    $('#resultat-rech').append('<p>Nom : '+data.nom+'</p>');
    $('#resultat-rech').append('<p>Prénom : '+data.prenom+'</p>');
}

function afficheFiche (){
 var id=$('#ident').val();
 var nom = $('#nom').val();
 
 if(id != ''){
 $('#ident').val('');

 $.ajax({
  type:'GET',
  url:'/api/affiche/'+id,
  success:function(data){
   $('#resultat-rech').html('');
   if (data.stat!='no'){
   afficheListeInfo(data, id);
   }
   else{
    $('#resultat-rech').append('<p>Désolé, l\'étudiant n° <b>'+id+'</b> n\'existe pas</p>');
   }
  }
 });
 }else if(nom != ''){
	$('#nom').val('');
	
$.ajax({
  type:'GET',
  url:'/api/affiche/'+nom,
  success:function(data){
   $('#resultat-rech').html('');
   
   if(data.stat!='no'){
   afficheListeInfo(data);
   }
   else{
    $('#resultat-rech').append('<p>Désolé, l\'étudiant <b>'+nom+'</b> n\'existe pas</p>');
   }
  }
});
 }
}

$('#monForm').on('submit',function(e){
 e.preventDefault();
 afficheFiche();
});
});