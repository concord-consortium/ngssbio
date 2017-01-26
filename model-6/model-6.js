(function() {
  var run = 1,
      rows = document.getElementsByTagName("tr"),
      tableBody = document.getElementById("data")
      simulateButton = document.getElementById("simulate2");
      clearButton = document.getElementById("clear");

  function addClass(el, className) {
    if (el.classList)
      el.classList.add(className);
    else
      el.className += ' ' + className;
  }

  function addRow() {
    var newRowMarkup = ''+
      '<td><div class="inputs"></div></td>' +
      '<td><div class="output"></div></td>' +
      '<td><div class="output"></div></td>';
    var rowElm = document.createElement("tr");
    rowElm.innerHTML = newRowMarkup;
    tableBody.insertBefore(rowElm,tableBody.childNodes[0]);
  }

  function addInputImage(className) {
    var row = rows[1],
        cell = row.querySelector(".inputs"),
        sunIcon = document.createElement("div");
    addClass(sunIcon, className);
    cell.appendChild(sunIcon);
  }

  function addOutputImages(className) {
    var row = rows[1],
        cells = row.querySelectorAll(".output"),
        icon = document.createElement("div");

    addClass(icon, className);
    cells[0].appendChild(icon);
    cells[1].appendChild(icon.cloneNode());
  }

  function simulate() {
    console.log(rows.length+" "+run);
    if(rows.length <= run) {
      console.log("added row");
      addRow();
    }
    photosynthesisApp.updateOutputs();
    if (photosynthesisApp.co2High) {
      addInputImage("co2-img");
    }
    if (photosynthesisApp.sunHigh) {
      addInputImage("sun-img");
    }
    if (photosynthesisApp.waterHigh) {
      addInputImage("water-img");
    }
    if (photosynthesisApp.outputsHigh) {
      addOutputImages("check-img");
    } else {
      addOutputImages("cross-img");
    }
    run++;
  }

  function clear() {
    var blankRow = ''+
      '<tr>' +
      '<td><div class="inputs"></div></td>' +
      '<td><div class="output"></div></td>' +
      '<td><div class="output"></div></td>' +
      '</tr>';
    tableBody.innerHTML = blankRow;
    run = 1;
  }

  simulateButton.onclick = simulate;
  clearButton.onclick = clear;

  setTimeout( photosynthesisApp.setOutputLow.bind(photosynthesisApp), 500);
})();
