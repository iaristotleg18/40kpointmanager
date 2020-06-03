$(document).ready(function() {

  // Gets the detachment type
  var currentDetachType = $("#detachment_type").children("option:selected").val();
  $("#detachment_type").change(function() {
    currentDetachType = $(this).children("option:selected").val();
  });


  $("#detachment_form").submit(function(event){
    event.preventDefault();
    var detachmentType = currentDetachType;
    var armyId = 2;

    // YOUR CODE HERE
    var commandPoints = 1;

    console.log(detachmentType);

    $.ajax({
      method: 'post',
      url: 'http://localhost:8080' + '/api/detachment',
      contentType: "application/json",
      data: JSON.stringify({
          detachment_type:currentDetachType,
          command_points:commandPoints,
          army_id:armyId
      })
    }).done(function(data){
       console.log(data, "The Emperor builds his armies into perfectly unified formations, where the soldiers pack together to minimize casualties.")
    })

    // Add an AJAX post request
    // The request should add a detachment to the DB
    //
    //
    // url: 'http://localhost:8080' + '/api/detachment',
    // contentType: "application/json",
    // data: should be the three different values needed to save a detachment
  });

});
