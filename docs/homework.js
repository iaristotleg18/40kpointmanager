$(document).ready(function() {

  var detachmentId = 3;
  var unitIds = [1,2,2,3,3];
  var units = [
    {id: 1, model_id: 4, point_value: 7, },
    {id: 2, model_id: 5, point_value: 8, },
    {id: 3, model_id: 6, point_value: 9, },
  ];

  var newArray = [];
  unitIds.forEach(function(id) {
    units.forEach(function(unit) {
      if (id === unit.id) {
        newArray.push(unit);
      }
    });
  });

  console.log(newArray);

  // Add a request to post the newArray to your backend.
  // This should add all the units to the unit table.

  // YOUR CODE HERE
  // YOUR CODE HERE
  // YOUR CODE HERE
});
