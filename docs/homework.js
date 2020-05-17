$(document).ready(function() {

  // Do not manaully change the list
  var theList = [
    'Dog',
    'Cat',
    'Mouse',
    'Chicken',
    'Robot',
    'Rooster',
    'Cow',
    'Dog'
  ];

  // Dont change this function
  function recomputeTheList() {
    $('#allItems').empty();
    $('#theList').empty();
    theList.forEach(function(item, index) {
      $('#theList').append('<li>' + item + '</li>');
      $('#allItems').append('<option value=' + index + '>' + item + '</option>');
    });
  }
  // Dont change this
  recomputeTheList();

  // There are 5 operations you can perform on an array to change its content:
  // 1) Push - add an item to the end of the list
  // 2) Pop - remove the last item in the list
  // 3) Splice - remove the item at a specific index in the list
  // 4) Shift - remove the first item in the list
  // 5) Unshift - add an item to the front of the list
  //
  // Below there are 5 sections below. In each of them you need to add a
  // SINGLE LINE OF CODE
  // that performs the operation for that section.


  /*
  ============
      PUSH
  ============
  */
  $('#pushItemButton').click(function(event) {
    // Dont change this
    var itemToAdd = $('#pushItem').val()

    // "PUSH" itemToAdd onto theList
    theList.push(itemToAdd)

    // Dont change this
    recomputeTheList();
  });

  /*
  ============
      POP
  ============
  */
  $('#popItemButton').click(function(event) {
    // "POP" an item off theList
    theList.pop();

    // Dont change this
    recomputeTheList();
  });

  /*
  ============
     SPLICE
  ============
  */
  $('#spliceItemButton').click(function(event) {
    // Dont change this
    var indexOfSelectedItem = $("#allItems").children("option:selected").val();

    // "Splice" the selected item off theList using indexOfSelectedItem
    theList.splice(indexOfSelectedItem, howmany = 1)

    // Dont change this
    recomputeTheList();
  });

  /*
  ============
     SHIFT
  ============
  */
  $('#shiftItemButton').click(function(event) {
    // 'Shift' the first item off the list
    theList.shift();
    // Dont change this
    recomputeTheList();
  });

  /*
  ============
     UNSHIFT
  ============
  */
  $('#unshiftItemButton').click(function(event) {
    // Dont change this
    var itemToAdd = $('#unshiftItem').val()

    // 'Unshift' the itemToAdd to the front of the list
    theList.unshift(itemToAdd)

    // Dont change this
    recomputeTheList();
  });
});
