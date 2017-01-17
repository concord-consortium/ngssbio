(function() {
  var run = 1;
      rows = document.getElementsByTagName("tr"),
      simulateButton = document.getElementById("simulate");

  function addClass(el, className) {
    if (el.classList)
      el.classList.add(className);
    else
      el.className += ' ' + className;
  }

  function addInputImage(className) {
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
    if (run > 4) return;

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
