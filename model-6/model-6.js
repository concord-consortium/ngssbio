(function() {
  var run = 1,
      rows = document.getElementsByTagName("tr"),
      tableBody = document.getElementById("data")
      simulateButton = document.getElementById("simulate");

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
    tableBody.appendChild(rowElm);
    rowElm.scrollIntoView();
  }

  function addInputImage(className) {
    if(rows.length <= run+1) {
      addRow();
    }
    var row = rows[run],
        cell = row.querySelector(".inputs"),
        sunIcon = document.createElement("div");
    addClass(sunIcon, className);
    cell.appendChild(sunIcon);
  }

  function addOutputImages(className) {
    var row = rows[run],
        cells = row.querySelectorAll(".output"),
        icon = document.createElement("div");

    addClass(icon, className);
    cells[0].appendChild(icon);
    cells[1].appendChild(icon.cloneNode());
  }

  function simulate() {
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

  simulateButton.onclick = simulate;

  setTimeout( photosynthesisApp.setOutputLow.bind(photosynthesisApp), 500);
})();
