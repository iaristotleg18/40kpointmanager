$(document).ready(function() {

  var favoritePizzaToppings = [
    'Mushroom',    // Most favorite
    'Sausage',
    'Onions',
    'Spinach',
    'Pepperoni',
    'Pineapple'    // Least favorite
  ];

  // Assignment:
  // Write the correct topping to the correct number in the `My Favorite Toppings` list.
  // My most favorite topping should go in spot #1. My least favorite topping should go in spot #6.
  //
  // Hints:
  // 1. Use jquery to update the TEXT of the span with the correct ID.
  // 2. To access the correct topping for each spot on the list you will need to use the index of the item in the array.


$(".toppingList").on("click", function(event){
  $("#1").text(favoritePizzaToppings[0])
  $("#2").text(favoritePizzaToppings[1])
  $("#3").text(favoritePizzaToppings[2])
  $("#4").text(favoritePizzaToppings[3])
  $("#5").text(favoritePizzaToppings[4])
  $("#6").text(favoritePizzaToppings[5])


})


});
