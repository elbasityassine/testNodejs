$(function(){
function affiche (){
 $.ajax({
  type :'GET',
  url : '/api/affiche',
  success : function(data){
   $('#liste').html('');
   $('#liste').append('<h2>Liste des étudiants</h2>');
   $('#liste').append('<table class=\'maTab\'');
   $('#liste').append('<tr><th>Identifiant</th><th>Nom</th><th>Prénom</th></tr>');
   for (var i=0;i<data.length;i++){
	$('#liste').append('<tr><td>'+(i+1)+'</td><td>'+data[i].nom+'</td><td>'+data[i].prenom+'</td></tr>');
   }
    $('#liste').append('</table>');
  }
 })
}
$('#monForm').on('submit',function(e){
 e.preventDefault();
 var nomForm=$('#nom').val();
 var prenomForm=$('#prenom').val();
 if(nomForm.length != 0 && prenomForm.length!= 0){
 $.ajax({
  type:'POST',
  url:'/api/formulaire',
  data:{nom:nomForm,prenom:prenomForm},
  success:function(){
   affiche();
   $('#nom').val('');
   $('#prenom').val('');
  }
 });
 }
})
affiche();
});