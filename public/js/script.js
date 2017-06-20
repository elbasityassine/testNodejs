/*
$(function(){
 $('h1').html('Hello MQL!')
});
*/

$(function(){
$('#buttonliste').on('click',function(){
 $.ajax({
  type :'GET',
  url : '/api/affiche',
  success : function(data){
   $('#liste').html('<h1>Liste des étudiants</h1>');
   for (var i=0;i<data.length;i++){
    $('#liste').append('<h3>Identifiant : '+data[i].id+'</h3>');
    $('#liste').append('<p>Nom : '+data[i].nom+'</p>');
    $('#liste').append('<p>Prénom : '+data[i].prenom+'</p>');
   }
  }
 })
})
});