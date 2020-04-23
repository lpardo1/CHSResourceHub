
function CHSResourceHub() {
  if (localStorage.getItem("chsResourceHub") === null) {
    var public_spreadsheet_url =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQuX4oLC6drBZQ93urqwQgm2De3CZBmu50_JT8aZ-NA4Wd91hCthCq5Z7DNpuRNW_Gq0B03Fni76E6Q/pub?output=csv";

    Papa.parse(public_spreadsheet_url, {
      download: true,
      header: true,
      complete: storeData
    }); //end Papaparse
  } else {
    // end if localStorage not found
    grabData();
  }
} //end init

window.addEventListener("DOMContentLoaded", CHSResourceHub);

function storeData(results) {
  var data = results.data;
  var rows = data.length;
  localStorage.setItem("chsResourceHub", JSON.stringify(data));
  console.log("Local storage CREATED. " + rows + " resources found");
  grabData();
} //end storeData

function grabData() {
  var storedData = JSON.parse(localStorage.getItem("chsResourceHub"));
  var savedRows = storedData.length;

  console.log(
    "grabData - Local storage FOUND. " + savedRows + " resources found."
  );

  if (document.getElementById("caregivers") !== null) {
    showResources("Caregivers");
  }
  if (document.getElementById("children") !== null) {
    showResources("Children");
  }
  if (document.getElementById("health-professionals") !== null) {
    showResources("Health Professionals");
  }
  if (document.getElementById("parents") !== null) {
    showResources("Parents");
  }
  if (document.getElementById("students") !== null) {
    showResources("Students");
  }
  if (document.getElementById("teachers") !== null) {
    showResources("Teachers");
  }
  if (document.getElementById("veterans") !== null) {
    showResources("Veterans");
  }
  if (document.getElementById("workforce") !== null) {
    showResources("Workforce");
  }
  if (document.getElementById("preventing-illness") !== null) {
    showResources("Preventing illness");
  }
  if (document.getElementById("physical-activity") !== null) {
    showResources("Physical Activity");
  }
  if (document.getElementById("food-and-nutrition") !== null) {
    showResources("Food and Nutrition");
  }
  if (document.getElementById("mental-health") !== null) {
    showResources("Mental Health");
  }
  if (document.getElementById("leading-remotely") !== null) {
    showResources("Leading Remotely");
  }
  if (document.getElementById("staying-productive") !== null) {
    showResources("Staying Productive");
  }
  if (document.getElementById("pre-school") !== null) {
    showResources("Pre-school");
  }
  if (document.getElementById("k-12") !== null) {
    showResources("K-12");
  }
  if (document.getElementById("college") !== null) {
    showResources("College");
  }
  if (document.getElementById("professional-development") !== null) {
    showResources("Professional Development");
  }
  if (document.getElementById("volunteering") !== null) {
    showResources("Volunteering");
  }
  if (document.getElementById("financial-assistance") !== null) {
    showResources("Financial assistance");
  }
  if (document.getElementById("renters-and-homeowners") !== null) {
    showResources("Renters and homeowners");
  }
  if (document.getElementById("concerts-and-entertainment") !== null) {
    showResources("Concerts and Entertainment");
  }
  if (document.getElementById("parks-and-museums") !== null) {
    showResources("Parks and Museums");
  }
  if (document.getElementById("zoos-aquariums-and-nature") !== null) {
    showResources("Zoos, Aquariums, and Nature");
  }
  if (document.getElementById("dashboards") !== null) {
    showResources("Dashboards");
  }
  if (document.getElementById("research") !== null) {
    showResources("Research");
  }
  if (document.getElementById("webinars") !== null) {
    showResources("Webinars");
  }
  if (document.getElementById("asu-news") !== null) {
    showResources("ASU News");
  }
} //end grabData

function showResources(arguments) {
  var lowercaseAudience = arguments.toLowerCase();
  var replaceCommas = lowercaseAudience.replace(/,/g, "-");
  var divID = replaceCommas.replace(/\s/g, "-");
  return grabResources(arguments, divID);
}

function grabResources(audience, divID) {
  var storedData = JSON.parse(localStorage.getItem("chsResourceHub"));
  var savedRows = storedData.length;

  var result = "";

  var count = 0;
  for (var i = 0; i < savedRows; i++) {
    var audiences = [
      storedData[i].audience_1,
      storedData[i].audience_2,
      storedData[i].audience_3,
      storedData[i].staying_healthy,
      storedData[i].working_remotely,
      storedData[i].learning_at_home,
      storedData[i].community_support,
      storedData[i].activities,
      storedData[i].about_covid19
    ];

    if (audiences.includes(audience)) {
      result +=
        '<div class="col-md-4 fadeInUp"><div class="resource-wrapper-chs '
        + divID
        + '"><p><a class="resource-name-chs" href="'
        + storedData[i].url
        + '" target="_blank">'
        + storedData[i].resource
        + '</a><br><span class="resource-org-chs">'
        + storedData[i].organization
        + "</span></p></div></div>";
      count = count + 1;
    } // end if audiences found
  } //end outer loop

  var h = document.getElementById(divID);
  h.insertAdjacentHTML("beforebegin", "<h2>" + audience + "</h2>");
  document.getElementById(divID).innerHTML = result;

  //document.getElementById("resources-found").innerHTML = count + " resources found.";
} //end displayAudience
            
            
