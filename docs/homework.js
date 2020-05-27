$(document).ready(function() {

var selectedWord;

  var options = {
    adjectives: ['old', 'funky', 'yellow', 'crossed', 'crazy', 'stuffed', 'abnormal', 'disrespectful', 'bearded', 'greedy', 'magical'],
    adverbs: ['awkwardly', 'exactly', 'speedily', 'foolishly', 'unexpectedly', 'bravely', 'madly', 'obnoxiously'],
    facialFeature: ['left-eye', 'right-eye', 'eyes', 'nose', 'eyebrows', 'chin', 'ears', 'forehead'],
    catchphrases: ['Dyn-o-mite', 'ADD YOUR OWN', 'ADD YOUR OWN'],
    gerunds: ['running', 'smashing', 'juggling', 'swimming', 'crying', 'smelling'],
    lengthsOfTime: ['annual', 'bi-weekly', 'monthly', 'hourly', 'once-per-millenium'],
    name: ['bob', 'june', 'pete', 'josh', 'chuck', 'mary', 'cindy'],
    noun: ['person', 'dog', 'tree', 'large bird', 'skunk'],
    verbs: ['run', 'party', 'fly', 'slide', 'dance'],
  }

  // In each jquery statement you need to use [] to access the words in the options object.

  //First adjective
  $("#firstAdjective").text(options['adjectives'])
  $("#firstAdjective").on('click', (function(event){
    $("firstAdjective").text(selectedWord)
  })
  //Second adjective
  // $("#secondAdjective").text(CODE_HERE);
  // //Third adjective
  // $("#thirdAdjective").text(CODE_HERE);
  // //Fourth adjective
  // $("#fourthAdjective").text(CODE_HERE);
  // //Name
  // $("#name").text(CODE_HERE);
  // //Noun
  // $("#noun").text(CODE_HERE);
  // //Number
  // $("#number").text(CODE_HERE);
  // //Length of Time
  // $("#lengthOfTime").text(CODE_HERE);
  // //Gerund
  // $("#gerund").text(CODE_HERE);
  // //Verb
  // $("#verb").text(CODE_HERE);
  // //Facial Feature
  // $("#facialFeature").text(CODE_HERE);
  // //Catchphrase
  // $("#catchPhrase").text(CODE_HERE);

});
