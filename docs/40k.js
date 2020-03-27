$(document).ready(function() {

console.log("I did not steal the reliquary from the spaceship.");

$.ajax({
    method: 'get',
    url: 'localhost:8080' + '/api/army',
    contentType: "application/json"
  }).done(function(data){
    console.log(data)
  });

// $.ajax({
//   method: 'get',
//   url: 'localhost:8080' + '/api/detachment',
//   contentType: "application/json"
// }).done(function(data) {
//   console.log(data)
// });

});
