(function() {
  var simulate = document.getElementById("simulate");
  simulate.onclick = photosynthesisApp.updateOutputs.bind(photosynthesisApp);

  setTimeout( photosynthesisApp.setOutputHigh.bind(photosynthesisApp), 500);
})();
