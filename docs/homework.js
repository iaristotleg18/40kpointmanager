$(document).ready(function() {

$("#theQuestion").on("click", function(event){
  var answer = $(this).data("answer")
  $("#theAnswer").text(answer);
  console.log(answer)
});

});
