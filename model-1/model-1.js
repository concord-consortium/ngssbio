(function() {
  var radioButtons = document.getElementsByTagName("input");
  for (var i = 0, ii = radioButtons.length; i < ii; i++) {
    radioButtons[i].onclick = photosynthesisApp.updateOutputs.bind(photosynthesisApp);
  }

  setTimeout( photosynthesisApp.setOutputHigh.bind(photosynthesisApp), 500);
})();
