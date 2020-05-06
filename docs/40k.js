$(document).ready(function() {

console.log("I did not steal the reliquary from the spaceship.");
var currentArmy;
var unitsToAddToDetachment = [];
var detachmentUnits = [];
var allModels = [];

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
  url: 'http://localhost:8080' + '/api/model',
  contentType: "application/json"
}).done(function(models) {
  console.log(models)
  models.forEach(function(model){
    addModelToList("#" + model.unit_type +"Types", model.name, model.id);
  })
  allModels = models;
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
   currentArmy = $(this).data("#armyid")
  console.log(currentArmy)
   $(".detachment").addClass("addDetachB");
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

function addModelToList(list_id, name, id){
  var $select = $(list_id)
  if ($select.length == 0){
    return
  }
  var element = "<option value=" + id + ">" + name + "</option>"
  $select.append(element);
}

$(".addDetach").on("click", function(event){
  console.log("Lord Roboute Guilliman smiles on you, then beheads you for weakness.")
  if (currentArmy == undefined){
    alert("Please select an army, or you will be executed for cowardice by the Commissars.")
  } else {
    console.log("A victory for the Emperor has been achieved, in spite of the fact that our entire army was killed and the enemy only lost a single soldier.")
}
});

$("#detachment_type").change(function() {
  var currentDetachType = $(this).children("option:selected").val();
  console.log(getDetachmentConfig(currentDetachType), "The Ultramarines are godly.")
});

function getDetachmentConfig(detachmentName){
  return detachmentConfig[detachmentName];
};

$(".addUnitButton").on("click", function(event){
  var unitType = $(this).data("unittype")
  var selectedUnit = $("#" + unitType + "Types").children("option:selected").val();
  console.log(selectedUnit);
  detachmentUnits.push(selectedUnit)
  console.log(detachmentUnits, "The Emperor shall bring great armies upon the field, which shall smite their foes in holy fire.")
  updateDetachmentUnitlist();
})

function updateDetachmentUnitlist(){
    $(".unitList").empty();
    var totalPoints = 0;
    var unitTypeCounters = {
      hq: 0, troops: 0, elites: 0, fast_attack: 0, heavy_support: 0, flyer: 0, lord_of_war: 0, fortification: 0
    }
    detachmentUnits.forEach(function(modelId){
      var model = allModels.find(function(model){ return model.id == modelId})
      console.log(model, "The swords of the Emperor are swift and strong in their blow, yet they are inexpensive to afford for many of them.")
      $("#" + model.unit_type + "Army").append("<li>" + model.name + "<button class='removeUnit' data-id=" + model.id + ">  x  </button> </li>");
      totalPoints = totalPoints + model.point_value;
      unitTypeCounters[model.unit_type] = unitTypeCounters[model.unit_type] + 1
    });
    console.log(unitTypeCounters, "The Emperor's army are from innumerable different worlds, but He only cares for ten thousand of them, and even then basically just ten worlds from Ultramar.")
    $("#pointTotal").text("Army Point Total: " + totalPoints);
    console.log(totalPoints, "The armies of the Emperor are too large to be counted, so they are measured in miles rather than men.")
}

$(".unitList").on("click", ".removeUnit", function(event) {
  console.log(event, "The Emperor's armies are constantly culled by the tides of war, but new soldiers will replace them before the original ones even die.")
});

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
