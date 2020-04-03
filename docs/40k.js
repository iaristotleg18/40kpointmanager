$(document).ready(function() {

console.log("I did not steal the reliquary from the spaceship.");

$.ajax({
    method: 'get',
    url: 'http://localhost:8080' + '/api/army',
    contentType: "application/json"
  }).done(function(data){
    console.log(data)
  });

$.ajax({
  method: 'get',
  url: 'http://localhost:8080' + '/api/detachment',
  contentType: "application/json"
}).done(function(data) {
  console.log(data)
});

$("#army_form").submit(function(event){
  event.preventDefault();
  var $nameArmy = $("#armyName");
  var nameArmy = $nameArmy.val();
  var $descArmy = $("#descArmy");
  var descArmy = $descArmy.val();
  $.ajax({
    method: 'post',
    url: 'http://localhost:8080' + '/api/army',
    contentType: "application/json",
    data: JSON.stringify({
        name:nameArmy, description:descArmy
    })
  }).done(function(data) {
    console.log(data)
    $nameArmy.val("");
    $descArmy.val("");
    var $list = $("#listArmy");
    var element = "<li>" + nameArmy + "</li>";
    $list.append(element);
  })

});

});
