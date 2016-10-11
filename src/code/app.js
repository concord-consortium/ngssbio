var css = require('../style/app.styl');

var sunRadioButtons;

window.changeBarHeight = (id, percent) => {
  var bar = document.getElementById(id).querySelector(".progress-fill");

  bar.style.height = percent + "%";
  bar.style.top = (100-percent) + "%"
}

window.setOutputHigh = () => {
  changeBarHeight("O2-chart", 95);
  changeBarHeight("sugar-chart", 40);
}

window.setOutputLow = () => {
  changeBarHeight("O2-chart", 5);
  changeBarHeight("sugar-chart", 5);
}

window.updateOutputs = () => {
  var sunHigh = sunRadioButtons[1].checked;
  if (sunHigh) {
    setOutputHigh();
  } else {
    setOutputLow();
  }
}

window.onload = () => {
  setTimeout( setOutputHigh, 500);
  sunRadioButtons = document.getElementsByName("sun");
  for (let radio of sunRadioButtons) {
    radio.onclick = updateOutputs;
  }
}





  // $('span').each(function(){
  //   var percent = 30;
  //   var pTop = 100 - percent + "%";
  //   $(this).parent().css({
  //     'height' : percent + "%",
  //     'top' : pTop
  //   });
  // });
