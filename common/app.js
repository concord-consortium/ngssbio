(function() {
  var PhotosynthesisApp = function() {
    this.radioButtons = null;
    this.co2High = true;
    this.sunHigh = true;
    this.waterHigh = true;
    this.outputsHigh = false;
  }

  PhotosynthesisApp.prototype.changeBarHeight = function(id, percent) {
    var bar = document.getElementById(id).querySelector(".progress-fill");

    bar.style.height = percent + "%";
    bar.style.top = (100-percent) + "%"
  }

  PhotosynthesisApp.prototype.setOutputHigh = function() {
    this.outputsHigh = true;
    this.changeBarHeight("O2-chart", 95);
    this.changeBarHeight("sugar-chart", 40);
  }

  PhotosynthesisApp.prototype.setOutputLow = function() {
    this.outputsHigh = false;
    this.changeBarHeight("O2-chart", 5);
    this.changeBarHeight("sugar-chart", 5);
  }

  PhotosynthesisApp.prototype.updateOutputs = function() {
    this.co2High   = this.radioButtons[1].checked;
    this.sunHigh   = this.radioButtons[3].checked;
    this.waterHigh = this.radioButtons[5].checked;
    if (this.sunHigh && this.co2High && this.waterHigh) {
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
