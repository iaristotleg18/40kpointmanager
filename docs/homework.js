$(document).ready(function() {

  // Gets the detachment type
  var currentDetachType = $("#detachment_type").children("option:selected").val();
  $("#detachment_type").change(function() {
    currentDetachType = $(this).children("option:selected").val();
  });


  $("#detachment_form").submit(function(event){
    event.preventDefault();
    var detachmentType = currentDetachType;

    // YOUR CODE HERE
    var commandPoints; // Set this equal to the command points value in the input

    console.log(detachmentType);

    // Add an AJAX post request
    // The request should add a detachment to the DB
    //
    //
    // url: 'http://localhost:8080' + '/api/detachment',
    // contentType: "application/json",
    // data: should be the three different values needed to save a detachment
  });

});
