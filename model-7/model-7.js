
var RESTING_FRAME    = 0;
var LAST_FRAME_INDEX = 12;
var SLOW_INTERVAL    = 100;
var FAST_INTERVAL    = 30;
var REST_INTERVAL = Infinity;
var running = false;
var frameInterval = REST_INTERVAL;
var lastAnimTime = null;
var frameNumber = RESTING_FRAME;
var glucose = 80;

changeBarHeight = function(id, percent) {
  var bar = document.getElementById(id).querySelector(".progress-fill");
  bar.style.height = percent + "%";
  bar.style.top = (100-percent) + "%"
}

setOutputHigh = function() {
  this.outputsHigh = true;
  this.changeBarHeight("O2-chart", 95);
  this.changeBarHeight("sugar-chart", 40);
}

setOutputLow = function() {
  this.outputsHigh = false;
  this.changeBarHeight("O2-chart", 5);
  this.changeBarHeight("sugar-chart", 5);
}

updateOutputs = function() {
  var co2 = 10;
  var water = 10;
  var energy = 10;
  glucose = glucose - .01;
  if (frameInterval == FAST_INTERVAL) {
    co2 = water = energy = 80;
    glucose = glucose - .08;
  }
  if (frameInterval == SLOW_INTERVAL) {
    co2 = water = energy = 40;
    glucose = glucose - .04;
  }
  changeBarHeight("co2-chart",  co2);
  changeBarHeight("water-chart", water);
  changeBarHeight("energy-chart", energy);
  changeBarHeight("glucose-chart", glucose);
}

function enableButton(enabled) {

}

function updateDancerFrame() {
  frameNumber++;
  frameNumber = frameNumber % (LAST_FRAME_INDEX + 1);
  var dancer = document.getElementById("dancer");
  dancer.className = (".frame frame-" + frameNumber);
}


function animate(timestamp) {
  if (!lastAnimTime) lastAnimTime = timestamp;
  var elapsed = timestamp - lastAnimTime;
  if (elapsed > frameInterval) {
    updateDancerFrame();
    lastAnimTime = timestamp;
  }
  if (running) {
    updateOutputs();
    requestAnimationFrame(animate);
  }

}

function start() {
  running = true;
  enableButton('start', false);
  enableButton('stop', true);
  requestAnimationFrame(animate);
}

function stop() {
  running = false;
  enableButton('stop', false);
  enableButton('start', true);
}

function reset() {
  stop();
}

function setActivityLevel(e) {
  var activity = e.target.value;
  if (activity == "rest") frameInterval=REST_INTERVAL;
  else if (activity == "slow") frameInterval=SLOW_INTERVAL;
  else if (activity == "quick") frameInterval=FAST_INTERVAL;
}

function eat() {

}

var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");
var resetButton = document.getElementById("reset");
var activitySelect = document.getElementById("activity-select");
var eatButton = document.getElementById("eat");

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
resetButton.addEventListener("click", reset);
eatButton.addEventListener("click", eat);

activitySelect.addEventListener("change", setActivityLevel);




// window.onload = function() {
//   photosynthesisApp.radioButtons = document.getElementsByTagName("input");
// }

