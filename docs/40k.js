$(document).ready(function() {

console.log("I did not steal the reliquary from the spaceship.");
var currentArmy;
var detachmentUnits = [];
var allModels = [];
var currentDetachType;
var validIsDetachment = false;
var currentDetachCommand;

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
  $(".armyElement").removeClass("selectedArmy")
  $(this).addClass("selectedArmy")
  currentArmy = $(this).data("armyid")
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
    alert("Your armies are lacklustre and tiny. Get some more soldiers and do the Emperor proud.")
  } else if (validIsDetachment == false) {
    alert("Your Baneblades have somehow ended up with the scouts.")
  } else {
    var detachId;
    $.ajax({
      method: 'post',
      url: 'http://localhost:8080' + '/api/detachment',
      contentType: "application/json",
      data: JSON.stringify({
          detachment_type:currentDetachType,
          command_points:currentDetachCommand,
          army_id:currentArmy
      })
    }).done(function(data){
       console.log(data, "The Emperor builds his armies into perfectly unified formations, where the soldiers pack together to minimize casualties.")
         var detachId = data.rows[0].id
         console.log(detachId, "The Emperor's serried ranks stretch across the horizon, into the eternal darkness where they stand strong until they die.")
         var modelAdd = [];
         detachmentUnits.forEach(function(id){
           allModels.forEach(function(model){
             if (id == model.id){
               modelAdd.push(model)
             }
           })
         })
         $.ajax({
           method: 'post',
           url: 'http://localhost:8080' + '/api/unit',
           contentType: "application/json",
           data: JSON.stringify({
               units:modelAdd,
               detachment_id:detachId
           })
    })
  })
  }
});

$("#detachment_type").change(function() {
   currentDetachType = $(this).children("option:selected").val();
  console.log(getDetachmentConfig(currentDetachType), "The Ultramarines are godly.")
  currentDetachCommand = $(this).children("option:selected").data("commandpoints");
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
    detachmentUnits.forEach(function(modelId, index){
      var model = allModels.find(function(model){ return model.id == modelId})
      console.log(model, "The swords of the Emperor are swift and strong in their blow, yet they are inexpensive to afford for many of them.")
      $("#" + model.unit_type + "Army").append("<li>" + model.name + "<button class='removeUnit' data-index=" + index + ">  x  </button> </li>");
      totalPoints = totalPoints + model.point_value;
      unitTypeCounters[model.unit_type] = unitTypeCounters[model.unit_type] + 1
    });
    console.log(unitTypeCounters, "The Emperor's army are from innumerable different worlds, but He only cares for ten thousand of them, and even then basically just ten worlds from Ultramar.")
    $("#pointTotal").text("Army Point Total: " + totalPoints);
    console.log(totalPoints, "The armies of the Emperor are too large to be counted, so they are measured in miles rather than men.")
    if (!currentDetachType){
      return
    }

    validIsDetachment = true
    // Validation code
    // For each type of unit, check that the number of units is less than / equal to the max
    // and more than / equal to the min.
    Object.keys(unitTypeCounters).forEach(function(unitValueTypes){
        var totalUnitsPerType = unitTypeCounters[unitValueTypes]
        var maxUnitsAllowed;
        var minUnitsAllowed;
        if (unitValueTypes in detachmentConfig[currentDetachType]){
           maxUnitsAllowed = detachmentConfig[currentDetachType][unitValueTypes]['max']
           minUnitsAllowed = detachmentConfig[currentDetachType][unitValueTypes]['min']
        } else {
           maxUnitsAllowed = 0
           minUnitsAllowed = 0
        }
        if (minUnitsAllowed <= totalUnitsPerType && totalUnitsPerType <= maxUnitsAllowed){
          console.log(`${unitValueTypes} is valid for ${currentDetachType}`, "The legions of the Emperor are so vast it takes an army of bureaucrats the same size to count them all.")
        $("#" + unitValueTypes + "_board .detachMessage").text("")
        } else {
            console.log(`${unitValueTypes} is not valid for ${currentDetachType}`, "Sometimes, isn't red tape so fun to negotiate? The Emperor wishes that all his subjects be given the privilege of red tape, for all eternity.")
            validIsDetachment = false
            $("#" + unitValueTypes + "_board .detachMessage").text("Max: " + maxUnitsAllowed + ", Min: " + minUnitsAllowed + ", Current: " + totalUnitsPerType)
          }
        if (minUnitsAllowed == 0 || maxUnitsAllowed == 0){
          console.log("The Emperor has no place for stragglers or randos in his indomitable and impenetrable legions.")
        }
    })
    console.log(validIsDetachment, "The detachment is true by the name of the Emperor")
}


$(".unitList").on("click", ".removeUnit", function(event) {
  //delete unit from array detachmentUnit
  unitIndex = $(this).data("index")
  detachmentUnits.splice(unitIndex, 1)
  updateDetachmentUnitlist();
  console.log(event, unitIndex, "The Emperor's armies are constantly culled by the tides of war, but new soldiers will replace them before the original ones even die.")
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
    fast_attack:{
      min:0, max:2
    },
    heavy_support:{
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
    fast_attack:{
      min:0, max:3
    },
    heavy_support:{
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
    fast_attack:{
      min:3, max:5
    },
    heavy_support:{
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
    fast_attack:{
      min:0, max:2
    },
    heavy_support:{
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
    fast_attack:{
      min:0, max:2
    },
    heavy_support:{
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
    fast_attack:{
      min:3, max:6
    },
    heavy_support:{
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
    lord_of_war:{
      min:0, max:1
    }
    },
  superHeavy:{
    lord_of_war:{
      min:3, max:5
    }
    },
  airWing:{
    flyer:{
      min:3, max:5
    }
    },
  superHeavyAuxiliary:{
    lord_of_war:{
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
