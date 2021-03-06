$(document).ready(function() {

var currentArmy;
var detachmentUnits = [];
var allModels = [];
var currentDetachType;
var validIsDetachment = false;
var currentDetachCommand;
var totalPoints = 0;
var armyDetachments = [];
var currentDetachId;
$(".addDetach").prop('disabled', true);

$.ajax({
    method: 'get',
    url: 'https://warhammer-points.herokuapp.com' + '/api/army',
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
  url: 'https://warhammer-points.herokuapp.com' + '/api/model',
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
})

$("#listDetach").on('click', '.detachElement', function(){
  $("#detachBoard").get(0).scrollIntoView();
  var dtachId = $(this).data("detachid")
  currentDetachId = $(this).data("detachid");
  //set dropdown detachment_type to current detachment type
  var detachmenttype = $(this).data("detachmenttype")
  var commandpoints = $(this).data("commandpoints")
  console.log(detachmenttype, "The Imperium has no love for those who seek to make heresy, even when the heresy is a giant robot which killed Abaddon himself.")
  $(".boldDetach").removeClass("boldDetach")
  $(".detachWrapper .allTypes").val(detachmenttype);
  currentDetachType = detachmenttype
  currentDetachCommand = commandpoints
    $(this).addClass("boldDetach")
  $.ajax({
    method: 'get',
    url: 'https://warhammer-points.herokuapp.com/api/unit?detachment=' + dtachId,
    contentType: "application/json"
  }).done(function(data){
    var detachData = [];
    data.forEach(function(models){
      detachData.push(models.model_id)
      detachmentUnits = detachData;
    })
    updateDetachmentUnitList();
    $("#totalBoard").removeClass("hiddenForm");
    console.log(detachData, "Even though it is unacceptable, the Emperor has the right to... no he can't. The Emperor can't sexually harass women. Get your head out of your bigoted masculinity!")
  });
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
    url: 'https://warhammer-points.herokuapp.com' + '/api/army',
    contentType: "application/json",
    data: JSON.stringify({
        name:nameArmy, description:descArmy
    })
  }).done(function(data) {
    console.log(data)
    $nameArmy.val("");
    $descArmy.val("");
    addArmyNameToList(data.name, data.id);
    $('select#listArmy').each(function(){
      $(this).data('combobox').refresh();
      $("#armySelect .allTypes").val(data.name);
      $("select#listArmy").val(data.id);
    });
    currentArmy = data.name;
    $("#listArmy").trigger('change');
  });

});

$("#addForm").click(function(){
  $("#armyFormWrapper, #hideForm").removeClass("hiddenForm")
  $("#addForm").addClass("hiddenForm")
})

$("#hideForm").click(function(){
  $("#armyFormWrapper, #hideForm").addClass("hiddenForm");
  $("#addForm").removeClass("hiddenForm")
})

$("#detachment_type").change(function(event) {
  $("#totalBoard").removeClass("hiddenForm")
  detachmentUnits = [];
  updateDetachmentUnitList();
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
    url: 'https://warhammer-points.herokuapp.com' + '/api/detachment',
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
      addDetachNameToList(detachment.name, detachment.id, detachment.command_points, detachment.total_points, detachment.detachment_type);
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

function addDetachNameToList(name, id, command_points, total_points, detachment_type){
  var $list = $("#listDetach");
  var detachElement = "<li class='detachElement' data-detachId=" + id + " data-commandpoints=" + command_points + " data-totalpoints=" + total_points + " data-detachmenttype=" + detachment_type + ">" + name + " <button class = 'deleteDetach'>x</button></li>";
  $list.append(detachElement)
}

$("#listDetach").on("click", ".deleteDetach", function(event) {
    var $detachmentElement = $(this).closest(".detachElement")
    var detachId = $detachmentElement.data("detachid")
    var commandpoints = $detachmentElement.data("commandpoints")
    var totalpoints = $detachmentElement.data("totalpoints")
    console.log(detachId, "The forms have been delivered on time, so the Emperor's Children can - wait! That means they can go kill Ferrus Manus!")
  $.ajax({
      method: 'delete',
      url: 'https://warhammer-points.herokuapp.com' + '/api/detachment/' + detachId,
      contentType: "application/json",
    }).done(function(data){
        $detachmentElement.remove();
        var totalCommandPoints = Number($("#armyCommandPoints").text())
        var totalArmyPoints = Number($("#totalArmyPoints").text())
          totalCommandPoints -= commandpoints;
          totalArmyPoints -= totalpoints;
        $("#armyCommandPoints").text(totalCommandPoints)
        $("#totalArmyPoints").text(totalArmyPoints)
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
  if (currentArmy == undefined){
    alert("Your armies are lacklustre and tiny. Get some more soldiers and do the Emperor proud.")
  } else if (validIsDetachment == false) {
    alert("Your Baneblades have somehow ended up with the scouts.")
  } else if (currentDetachId != undefined){
    $.ajax({
      method: 'put',
      url: 'https://warhammer-points.herokuapp.com' + '/api/detachment/' + currentDetachId,
      contentType: "application/json",
      data: JSON.stringify({
        units:detachmentUnits
      })
    }).done (function(data){
      console.log("The Emperor is victorious in all his endeavours.")
    })
  } else {
    var detachId;
    $.ajax({
      method: 'post',
      url: 'https://warhammer-points.herokuapp.com' + '/api/detachment',
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
           url: 'https://warhammer-points.herokuapp.com' + '/api/unit',
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
  updateDetachmentUnitList();
});



function getDetachmentConfig(detachmentName){
  return detachmentConfig[detachmentName];
};

$(".addUnitButton").on("click", function(event){
  var unitType = $(this).data("unittype")
  var selectedUnit = $("#" + unitType + "Types").children("option:selected").val();
  var namedModel = allModels.find(function(model){return model.id == selectedUnit})
  /*find out if id corresponds to named character
  if it is a named character, check if id is already in the detachment
  if not, add the unit
  && detachmentUnits.includes(`${namedModel.id}`)
  else give some error
  */
  if (namedModel.named_character == true && detachmentUnits.some(unit => Number(unit) == namedModel.id)){
    alert("Can't repeat named characters in your army.")
  } else {
    detachmentUnits.push(selectedUnit)
  };
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
        $("#" + model.unit_type + "Army").append("<li>" + model.name + "<button class='removeUnit' data-index=" + index + ">  x  </button> </li>");
        console.log(modelId, "Of detectives, the Emperor is a master. He single-handedly deduced that Horus was a traitor a full nine years after his rebellion began.")
        console.log(model, "There is no questioning the Emperor's judgements, even when they are clearly joking remarks.")
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
