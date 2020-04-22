var public_spreadsheet_url =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQuX4oLC6drBZQ93urqwQgm2De3CZBmu50_JT8aZ-NA4Wd91hCthCq5Z7DNpuRNW_Gq0B03Fni76E6Q/pub?output=csv";

function init() {
  if ("chsResourceHub" in localStorage) {
    //alert('Local Storage found');
  } else {
    //alert('No');
    Papa.parse(public_spreadsheet_url, {
      download: true,
      header: true,
      complete: storeData
    });
  }
}

function storeData(results) {
  var data = results.data;
  localStorage.setItem("savedData", JSON.stringify(data));
  var rows = data.length;
  document.write(rows + " resources found");
}

function grabData() {
  var storedData = JSON.parse(localStorage.getItem("savedData"));
  var savedRows = storedData.length;
  document.write(savedRows + " resources found");

  for (var i = 0; i < savedRows; i++) {
    var audiences = [
      storedData[i].audience_1,
      storedData[i].audience_2,
      storedData[i].audience_3
    ];
    if (audiences.includes("Children")) {
      document.write("<p>" + storedData[i].resource + "</p>");
    }
  }
}

function displayAudience(arguments) {
  var storedData = JSON.parse(localStorage.getItem("savedData"));
  var savedRows = storedData.length;
  var count = 0;
  document.write('"<div class="row resource-holder">');
  for (var i = 0; i < savedRows; i++) {
    var audiences = [
      storedData[i].audience_1,
      storedData[i].audience_2,
      storedData[i].audience_3
    ];

    if (audiences.includes(arguments)) {
      document.write(
        '<div class="col-md-4 fadeInUp"><div class="resource-wrapper-chs"><p><a class="resource-name-chs" href="' +
          storedData[i].url +
          '" target="_blank">' +
          storedData[i].resource +
          '</a><br><span class="resource-org-chs">' +
          storedData[i].organization +
          "</span></p></div></div>"
      );

      count = count + 1;
    }
  }
  
  document.write('"</div>');
  //document.write(count);
  document.getElementById("resources-found").innerHTML =
    count + " resources found.";
}

window.addEventListener("DOMContentLoaded", init);
