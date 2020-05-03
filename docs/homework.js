$(document).ready(function() {

$("#theQuestion").on("click", function(event){
  var answer = $(this).data("#theQuestion")
  $("#theAnswer").text(answer);

});

});
