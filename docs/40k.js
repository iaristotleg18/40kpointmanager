$(document).ready(function() {

console.log("I did not steal the reliquary from the spaceship.");
// var currentArmy = armyID;

$.ajax({
    method: 'get',
    url: 'http://localhost:8080' + '/api/army',
    contentType: "application/json"
  }).done(function(data){
    console.log(data)
    data.forEach(function(armee){
      console.log(armee)
      addArmyNameToList(armee.name, armee.id)
    })
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
    addArmyNameToList(data.name, data.id);
  })

});

$( "#listArmy" ).on("click", ".armyElement", function() {
  console.log("Let the legions of the Emperor blaze forth in glory, and let the foes of the Emperor be slain by their hand!");
});

function addArmyNameToList(name, id){
    var $list = $("#listArmy");
    var element = "<li class='armyElement' data-armyID=" + id + ">" + name + "</li>";
    $list.append(element);
}


});
