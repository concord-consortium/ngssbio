(function() {
  var PhotosynthesisApp = function() {
    this.radioButtons = null;
  }

  PhotosynthesisApp.prototype.changeBarHeight = function(id, percent) {
    var bar = document.getElementById(id).querySelector(".progress-fill");

    bar.style.height = percent + "%";
    bar.style.top = (100-percent) + "%"
  }

  PhotosynthesisApp.prototype.setOutputHigh = function() {
    this.changeBarHeight("O2-chart", 95);
    this.changeBarHeight("sugar-chart", 40);
  }

  PhotosynthesisApp.prototype.setOutputLow = function() {
    this.changeBarHeight("O2-chart", 5);
    this.changeBarHeight("sugar-chart", 5);
  }

  PhotosynthesisApp.prototype.updateOutputs = function() {
    var co2High   = this.radioButtons[1].checked;
    var sunHigh   = this.radioButtons[3].checked;
    var waterHigh = this.radioButtons[5].checked;
    if (sunHigh && co2High && waterHigh) {
      this.setOutputHigh();
    } else {
      this.setOutputLow();
    }
  }

  window.photosynthesisApp = new PhotosynthesisApp();

  window.onload = function() {
    photosynthesisApp.radioButtons = document.getElementsByTagName("input");
  }
})();
