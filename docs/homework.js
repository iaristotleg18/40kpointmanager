$(document).ready(function() {

  // IDs of the units we want to add
  var detachmentUnits = [1,2,2,3,3];

  // Models we want to add to our DB
  var allModels = [
    { id: 1, name: 'Miles Gloriosus', point_value: 3},
    { id: 2, name: 'Servus Callidus', point_value: 10},
    { id: 3, name: 'Adulescens Amator', point_value: 2},
  ];

  /*
    For homework please create a new array USING CODE.

    For each id in the detachmentUnits array we want to add the model
    from the allModels array with the same id to the newArray.

    Your final output in the console should look like:
    [
      { id: 1, name: 'Bad Man', point_value: 10},
      { id: 2, name: 'Cool Woman', point_value: 10},
      { id: 2, name: 'Cool Woman', point_value: 10},
      { id: 3, name: 'Silly Child', point_value: 2},
      { id: 3, name: 'Silly Child', point_value: 2},
    ]
  */

  var newArray = []; // DO NOT CHANGE

  detachmentUnits.forEach(function(allModels){
    allModels.push(detachmentUnits)
    console.log(allModels)
  })

  allModels.forEach(function(newArray){
    newArray.push(allModels)
  })

  console.log(newArray); // DO NOT CHANGE
});
