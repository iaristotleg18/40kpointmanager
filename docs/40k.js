$(document).ready(function() {

console.log("I did not steal the reliquary from the spaceship.");
var currentArmy;

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

$( "#listArmy" ).on("click", ".armyElement", function(event) {
  console.log($(this));
  $(".armyElement").removeClass("selectedArmy")
  $(this).addClass("selectedArmy")
   currentArmy = $(this).data("armyid")
  console.log(currentArmy)
   $("this").removeClass(".addDetach").addClass(".addDetachB");
});

/*
* Adds army name to list
* name string - army's name
* id string - army's id
* returns void
*/
function addArmyNameToList(name, id){
    var $list = $("#listArmy");
    var element = "<li class='armyElement' data-armyID=" + id + ">" + name + "</li>";
    $list.append(element);
}

$(".addDetach").on("click", function(event){
  console.log("Lord Roboute Guilliman smiles on you, then beheads you for weakness.")
  if (currentArmy == undefined){
    alert("Please select an army, or you will be executed for cowardice by the Commissars.")
  } else {
    console.log("A victory has been achieved, in spite of the fact that our entire army was killed and the enemy only lost a single soldier.")
  console.log(getDetachmentConfig("patrol"));
}
});

function getDetachmentConfig(detachmentName){
  return detachmentConfig[detachmentName];
}

var detachmentConfig = {
  patrol:{
    hq:{
      min:1, max:2
    },
    troops:{
      min:1, max:3
    },
    elites:{
      min:0, max:2
    },
    fastAttack:{
      min:0, max:2
    },
    heavySupport:{
      min:0, max:2
    },
    flyer:{
      min:0, max:2
    }
  },
  battalion:{
    hq:{
      min:2, max:3
    },
    troops:{
      min:3, max:6
    },
    elites:{
      min:0, max:6
    },
    fastAttack:{
      min:0, max:3
    },
    heavySupport:{
      min:0, max:3
    },
    flyer:{
      min:0, max:2
    }
    },
  brigade:{
    hq:{
      min:3, max:5
    },
    troops:{
      min:3, max:6
    },
    elites:{
      min:3, max:8
    },
    fastAttack:{
      min:3, max:5
    },
    heavySupport:{
      min:3, max:5
    },
    flyer:{
      min:0, max:2
    }
    },
  vanguard:{
    hq:{
      min:1, max:2
    },
    troops:{
      min:0, max:3
    },
    elites:{
      min:3, max:6
    },
    fastAttack:{
      min:0, max:2
    },
    heavySupport:{
      min:0, max:2
    },
    flyer:{
      min:0, max:2
    }
    },
  spearhead:{
    hq:{
      min:1, max:2
    },
    troops:{
      min:0, max:3
    },
    elites:{
      min:0, max:2
    },
    fastAttack:{
      min:0, max:2
    },
    heavySupport:{
      min:3, max:6
    },
    flyer:{
      min:0, max:2
    }
    },
  outrider:{
    hq:{
      min:1, max:2
    },
    troops:{
      min:0, max:3
    },
    elites:{
      min:0, max:2
    },
    fastAttack:{
      min:3, max:6
    },
    heavySupport:{
      min:0, max:2
    },
    flyer:{
      min:0, max:2
    }
    },
  supremeCommand:{
    hq:{
      min:3, max:5
    },
    elites:{
      min:0, max:1
    },
    lordOfWar:{
      min:0, max:1
    }
    },
  superHeavy:{
    lordOfWar:{
      min:3, max:5
    }
    },
  airWing:{
    flyer:{
      min:3, max:5
    }
    },
  superHeavyAuxiliary:{
    lordOfWar:{
      min:0, max:1
    }
    },
  fortificationNetwork:{
    fortification:{
      min:1, max:3
    }
    },
}

});
