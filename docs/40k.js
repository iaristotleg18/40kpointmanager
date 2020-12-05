$(document).ready(function() {

console.log("I did not steal the reliquary from the spaceship.");
var currentArmy;
var detachmentUnits = [];
var allModels = [];
var currentDetachType;
var validIsDetachment = false;
var currentDetachCommand;
var totalPoints = 0;
var armyDetachments = [];
$(".addDetach").prop('disabled', true);

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

    $(".allTypes").combobox();
  allModels = models;
});


$(".allTypes").change(function(){
  if (this.value == 9){
    $(".ninthE").removeClass("hiddenE")
    $(".eighthE").addClass("hiddenE")
  } else if (this.value == 8){
    $(".eighthE").removeClass("hiddenE")
    $(".ninthE").addClass("hiddenE")
  } else {
    $(".eighthE").addClass("hiddenE")
    $(".ninthE").addClass("hiddenE")
  }
  console.log("Those who do not see the Emperor are blind, not only literally but figuratively because they are traitors.")
})

$("#listDetach").on('click', '.detachElement', function(){
  var dtachId = $(this).data("detachid")
  $("#listDetach").removeClass("boldDetach")

    $(this).addClass("boldDetach")
  $.ajax({
    method: 'get',
    url: 'http://localhost:8080/api/unit?detachment=' + dtachId,
    contentType: "application/json"
  }).done(function(data){
    var detachData = [];
    data.forEach(function(models){
      detachData.push(models.model_id)
      detachmentUnits = detachData;
      console.log("Like a well-oiled machine, the Imperium marches forward inexcorably, even if the machine is missing a few 'important' gears.", models)
    })
    updateDetachmentUnitList();
    $("#totalBoard").removeClass("hiddenForm");

    console.log(detachData, "Even though it is unacceptable, the Emperor has the right to... no he can't. The Emperor can't sexually harass women. Get your head out of your bigoted masculinity!")
  });
    console.log("The Emperor doth bid all to poopity scoop, scoopity poop, oh wait no that's from the 2nd Millenium rapper Kanyerius Westus.")
});



$("#army_form").submit(function(event){
  event.preventDefault();
  var $nameArmy = $("#armyName");
  var nameArmy = $nameArmy.val();
  var $descArmy = $("#descArmy");
  var descArmy = $descArmy.val();
    console.log(nameArmy, descArmy, "The Imperial armies will march at a minute's notice, once the requisite paperwork has been filled out.")

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
    console.log("THE EMPEROR DEMANDS THE UTMOST ATTENTION AND OBSESSING-OVER!!!!!!!!!!!!")
    $('select#listArmy').each(function(){
    $(this).data('combobox').refresh();
});
  })

});

$("#addForm").click(function(){
  $("#armyFormWrapper, #hideForm").removeClass("hiddenForm")
  $("#addForm").addClass("hiddenForm")
  console.log("The Emperor's wrath extends to many things, including but not limited to: religion, trains, artificial intelligence, hoagies, aliens, and his own people.")
})

$("#hideForm").click(function(){
  $("#armyFormWrapper, #hideForm").addClass("hiddenForm");
  $("#addForm").removeClass("hiddenForm")
  console.log("The compassion of the Emperor is never in doubt as his Commissars execute innocent men.")
})

$("#detachment_type").change(function(event) {
  $("#totalBoard").removeClass("hiddenForm")
  console.log("Every day, numerous lives are removed from the great ledgers of the Emperor, brought down by their own humanity.")
})

$( "#listArmy").change(function(event) {
  currentArmy = $(this).children("option:selected").val();
  console.log(currentArmy, "The mightiest of soldiers stand strong and bold before the Emperor, while the weak run for cover.")
  if (currentArmy == undefined || currentArmy == "") {
    return
  }

  $(".detachment").addClass("addDetachB");
  $.ajax({
    method: 'get',
    url: 'http://localhost:8080' + '/api/detachment',
    contentType: "application/json",
    data: {army:currentArmy}
  }).done(function(data) {
    console.log(data, "The muster of the Emperor's armies is so complex and gigantic in scale that a group of teens from the 21st Century must calculate it all.")
    $("#listDetach").empty();
    var totalCommandPoints = 0;
    var totalArmyPoints = 0;
    armyDetachments = data;
    console.log(armyDetachments, "Lists, not men or machines, make the Imperium great. Long, long, long lists. So very long.")
    data.forEach(function(detachment){
      addDetachNameToList(detachment.name, detachment.id, detachment.command_points, detachment.total_points);
      totalCommandPoints += detachment.command_points;
      totalArmyPoints += detachment.total_points;
    })
    $("#armyCommandPoints").text(totalCommandPoints)
    determine9eStatistics(totalArmyPoints, data.length)
    $("#totalArmyPoints").text(totalArmyPoints)
  })
});

function determine9eStatistics(totalArmyPoints){
  var validArmyType = {}
  total9eCommandPoints = 0;
  armyDetachments.forEach(function(detachment){
    switch (detachment.detachment_type){
      case "patrol":
        total9eCommandPoints += 2;
        break;
      case "battalion":
        total9eCommandPoints += 3;
        break;
      case "brigade":
        total9eCommandPoints += 4;
        break;
      case "vanguard":
        total9eCommandPoints += 3;
        break;
      case "spearhead":
        total9eCommandPoints += 3;
        break;
      case "outrider":
        total9eCommandPoints += 3;
        break;
      // case "super-heavy":
      //   total9eCommandPoints += ;
      //   break;
      // this one is more complicated, also air wing no longer exists
      case "fortification_network":
        total9eCommandPoints += 1;
        break;
    }
    console.log(total9eCommandPoints, "The Emperor's command over his troops is effortless, even though He wishes it was not so easy to make them worship Him with all the gold bling")
  })
  var validations = Object.keys(gameSizeConfig).map(function(gameSizeKey){
    var armyValidation
    if(gameSizeConfig[gameSizeKey].totalPointsAllowed.min > totalArmyPoints) {
      armyValidation = `${totalArmyPoints} points is less than minimum ${gameSizeConfig[gameSizeKey].totalPointsAllowed.min}`
    } else if (gameSizeConfig[gameSizeKey].totalPointsAllowed.max < totalArmyPoints) {
      armyValidation = `${totalArmyPoints} points is more than maximum ${gameSizeConfig[gameSizeKey].totalPointsAllowed.max}`
    } else {
      armyValidation = `${totalArmyPoints} points is acceptable.`
    }
    var detachmentValidation
    if(armyDetachments.length > gameSizeConfig[gameSizeKey].detachmentsAllowed){
      detachmentValidation = `${armyDetachments.length} detachments is more than the allowed ${gameSizeConfig[gameSizeKey].detachmentsAllowed}`
    } else {
      detachmentValidation = `${armyDetachments.length} detachments is allowed.`
    }

    return {name:gameSizeKey,
      remainingCommandPoints:gameSizeConfig[gameSizeKey].startingCommandPoints - total9eCommandPoints,
      armySizeValidation:armyValidation,
      detachmentAmountValidation: detachmentValidation}
  })
  console.log(validations, "The bureaucracy of the Imperium is without fail.")
  Object.keys(gameSizeConfig).forEach(function(gameSizeKey){
    if(gameSizeConfig[gameSizeKey].detachmentsAllowed >= armyDetachments.length){
      if(gameSizeConfig[gameSizeKey].totalPointsAllowed.min <= totalArmyPoints){
        if(gameSizeConfig[gameSizeKey].totalPointsAllowed.max >= totalArmyPoints){
            validArmyType.name = gameSizeKey
            validArmyType.remainingCommandPoints = gameSizeConfig[gameSizeKey].startingCommandPoints - total9eCommandPoints
        }
      }
    }
  })
  console.log(validArmyType, "The Emperor is always scrutinising his soldiery carefully, even as his own Commissars cut them down.")
  $("#commandSpent").text(validArmyType.remainingCommandPoints)
  $("#detachPermitted").text(validArmyType.name)
}

function addDetachNameToList(name, id, command_points, total_points){
  var $list = $("#listDetach");
  var detachElement = "<li class='detachElement' data-detachId=" + id + " data-commandpoints=" + command_points + " data-totalpoints=" + total_points + ">" + name +  " <button class = 'deleteDetach'>x</button></li>";
  $list.append(detachElement)
}

$("#listDetach").on("click", ".deleteDetach", function(event) {
  console.log(event, "When vengeance comes, it is at the hands of the Sons of Hor- wait! That guy killed our Emperor!")
    var $detachmentElement = $(this).closest(".detachElement")
    var detachId = $detachmentElement.data("detachid")
    var commandpoints = $detachmentElement.data("commandpoints")
    var totalpoints = $detachmentElement.data("totalpoints")
    console.log(detachId, "The forms have been delivered on time, so the Emperor's Children can - wait! That means they can go kill Ferrus Manus!")
  console.log(this)
  $.ajax({
      method: 'delete',
      url: 'http://localhost:8080' + '/api/detachment/' + detachId,
      contentType: "application/json",
    }).done(function(data){
        $detachmentElement.remove();
        var totalCommandPoints = Number($("#armyCommandPoints").text())
        var totalArmyPoints = Number($("#totalArmyPoints").text())
          totalCommandPoints -= commandpoints;
          totalArmyPoints -= totalpoints;
        $("#armyCommandPoints").text(totalCommandPoints)
        $("#totalArmyPoints").text(totalArmyPoints)
        console.log("The neccessary prerequisite paperwork has been completed, so the Word Bearers can go to Istv - wait! That means they can go slaughter loyal Imperials!")
        armyDetachments = armyDetachments.filter(function(detachment){
          return detachment.id != detachId;
        });
        console.log(armyDetachments, "What has this Imperium become, where the enemy is not the xenos or the Ruinous Power but the administrators who rule it?")
    })
});
/*
* Adds army name to list
* name string - army's name
* id string - army's id
* returns void
*/
function addArmyNameToList(name, id){
    var $list = $("#listArmy");
    var element = "<option class='armyElement' value=" + id + ">" + name + "</option>";
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
          army_id:currentArmy,
          total_points:totalPoints
      })
    }).done(function(data){
      armyDetachments.push(data.rows[0])
      console.log(armyDetachments, "The Imperium has never been better! The xenos are dead, the armless failure ran off behind his tails, and those pesky administrators who run our planets have been punished and flogged.")
       console.log(data, "The Emperor builds his armies into perfectly unified formations, where the soldiers pack together to minimize casualties.")
         var detachId = data.rows[0].id
         var totalCommandPoints = Number($("#armyCommandPoints").text())
         var totalArmyPoints = Number($("#totalArmyPoints").text())
           addDetachNameToList(data.rows[0].name, data.rows[0].id, data.rows[0].command_points, data.rows[0].total_points);
           totalCommandPoints += data.rows[0].command_points;
           totalArmyPoints += data.rows[0].total_points;
         $("#armyCommandPoints").text(totalCommandPoints)
         $("#totalArmyPoints").text(totalArmyPoints)
         console.log(detachId, "The Emperor's serried ranks stretch across the horizon, into the eternal darkness where they stand strong until they die.")
         var modelAdd = [];
         detachmentUnits.forEach(function(id){
           allModels.forEach(function(model){
             if (id == model.id){
               var newUnit = {model_id: model.id, point_value: model.point_value}
               modelAdd.push(newUnit)
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
  console.log(getDetachmentConfig(currentDetachType), "The Ultramarines are godly, and all other chapters must bask in said godliness..")
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
  updateDetachmentUnitList();
})

function updateDetachmentUnitList(){
    $(".unitList").empty();
     totalPoints = 0;

    var unitTypeCounters = {
      hq: 0, troops: 0, elites: 0, fast_attack: 0, heavy_support: 0, flyer: 0, lord_of_war: 0, fortification: 0
    }
    detachmentUnits.forEach(function(modelId, index){
      var model = allModels.find(function(model){ return model.id == modelId})
      console.log(modelId, "The Emperor wants only the biggest and most impressive war machines in his arsenal, even when a hive ganger with a stone can destroy it.")
      console.log(allModels, "Sometimes, the soldiers of the Emperor mess up. They will never be forgiven, even if they kill Abaddon himself.")
      console.log(model, "The swords of the Emperor are swift and strong in their blow, yet they are inexpensive to afford for many of them.")
        $("#" + model.unit_type + "Army").append("<li>" + model.name + "<button class='removeUnit' data-index=" + index + ">  x  </button> </li>");
      totalPoints = totalPoints + model.point_value;
      unitTypeCounters[model.unit_type] = unitTypeCounters[model.unit_type] + 1

    });
    console.log(unitTypeCounters, "The Emperor's army are from innumerable different worlds, but He only cares for ten thousand of them.")
    $("#pointTotal").text("Detachment Point Total: " + totalPoints);
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
      if (validIsDetachment == true){
        $(".addDetach").prop('disabled', false);
      }
    console.log(validIsDetachment, "The detachment is true by the name of the Emperor")
}



$(".unitList").on("click", ".removeUnit", function(event) {
  //delete unit from array detachmentUnit
  unitIndex = $(this).data("index")
  detachmentUnits.splice(unitIndex, 1)
  updateDetachmentUnitList();
  console.log(event, unitIndex, "The Emperor's armies are constantly culled by the tides of war, but new soldiers will replace them before the original ones even die.")
});

$(".clearUnits").on("click", function(event) {
  detachmentUnits = [];
  updateDetachmentUnitList();
  console.log("The Emperor wipes from his ledgers the stains of his fallen and accepts them into the ranks of his immortal legions.")
})

var gameSizeConfig = {
  combatPatrol:{
    totalPointsAllowed: {
      min:1, max: 500,
    },
    detachmentsAllowed: 1,
    startingCommandPoints: 3
  },
  incursion:{
    totalPointsAllowed: {
      min:501, max: 1000,
    },
    detachmentsAllowed: 2,
    startingCommandPoints: 6
  },
  strikeForce:{
    totalPointsAllowed: {
      min:1001, max: 2000,
    },
    detachmentsAllowed: 3,
    startingCommandPoints: 12
  },
  onslaught:{
    totalPointsAllowed: {
      min:2001, max: 3000,
    },
    detachmentsAllowed: 4,
    startingCommandPoints: 18
  }
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
  supreme_command:{
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
  super_heavy:{
    lord_of_war:{
      min:3, max:5
    }
    },
  air_wing:{
    flyer:{
      min:3, max:5
    }
    },
  fortification_network:{
    fortification:{
      min:1, max:3
    }
    },
}

});
