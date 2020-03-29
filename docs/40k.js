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
  $.ajax({
    method: 'post',
    url: 'http://localhost:8080' + '/api/army',
    contentType: "application/json/",
    data: JSON.stringify({
      name: "The Hammers of Levion",
      description: "Mighty warriors with more strength than sense who believe they are getting a better deal while turning into Chaos Spawn."
    })
  }).done(function(data) {
    console.log(data)
  })

});

});
