var RESTING_FRAME    = 0;
var LAST_FRAME_INDEX = 12;
var SLOW_INTERVAL    = 100;
var FAST_INTERVAL    = 30;

var GLUCOSE_COLOR = "green"
var CO2_COLOR = "purple"
var WATER_COLOR = "blue"
var ENERGY_COLOR = "red"

var REST_INTERVAL = Infinity;
var running = false;
var frameInterval = REST_INTERVAL;
var lastAnimTime = null;
var frameNumber = RESTING_FRAME;
var glucose = 80;

var co2Data = [];
var waterData = [];
var energyData = [];

var accumulatedCo2 = 0;
var accumulatedWater = 0;
var accumulatedEnergy = 0;

var xTicks = {
  autoSkip: false,
  maxTicksLimit: 10,
  fixedStepSize: 1
};

var startSecond;
var lastGraphSecond = 0;

var data = {
  datasets: [
    {
      label: "co2",
      borderColor: CO2_COLOR,
      fill: false,
      data: co2Data
    },
    {
      label: "water",
      borderColor: WATER_COLOR,
      fill: false,
      data: waterData
    },
    {
      label: "energy",
      fill: false,
      borderColor: ENERGY_COLOR,
      data: energyData
    }
  ]
};

var ctx = document.getElementById("graph").getContext('2d');
var graph;


function currentSecond() {
  if(!startSecond) {
    startSecond = Math.floor((new Date).getTime()/1000);
  }
  return Math.floor((new Date).getTime()/1000) - startSecond;
}

function drawGraph() {
  var second = currentSecond();

  var trim = function(ary) {
    var maxSize = 10;
    ary.splice(0,Math.max(0,ary.length -maxSize));
  }
  if (second > lastGraphSecond) {
    co2Data.push    ( {y: accumulatedCo2, x:second});
    energyData.push ( {y: accumulatedEnergy, x:second});
    waterData.push  ( {y: accumulatedWater, x:second})
    lastGraphSecond = second;

    trim(co2Data);
    trim(energyData);
    trim(waterData);
    graph.update(0);
  }
}

function changeBarHeight (id, percent) {
  var bar = document.getElementById(id).querySelector(".progress-fill");
  bar.style.height = percent + "%";
  bar.style.top = (100-percent) + "%"
}

function updateOutputs() {
  var co2 = 10;
  var water = 10;
  var energy = 10;
  glucose = glucose - .01;

  accumulatedEnergy += Math.random() * 0.01;
  accumulatedWater += Math.random() * 0.01;
  accumulatedCo2 += Math.random() * 0.01;

  if (frameInterval == FAST_INTERVAL) {
    co2 = water = energy = 80;
    glucose = glucose - .08;
    accumulatedEnergy += .08;
    accumulatedWater += .081;
    accumulatedCo2 += .082;
  }
  if (frameInterval == SLOW_INTERVAL) {
    co2 = water = energy = 40;
    glucose = glucose - .04;
    accumulatedEnergy += .04;
    accumulatedWater += .041;
    accumulatedCo2 += .042;
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
    drawGraph();
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

function initGraph() {
  var graphOptions = {
    responsive: false,
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom',
        ticks: xTicks
      }]
    }
  };
  graph = new Chart(ctx, {
    type: 'line',
    data: data,
    options: graphOptions
  });
}
var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");
var resetButton = document.getElementById("reset");
var activitySelect = document.getElementById("activity-select");
var eatButton = document.getElementById("eat");

initGraph();
startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
resetButton.addEventListener("click", reset);
eatButton.addEventListener("click", eat);

activitySelect.addEventListener("change", setActivityLevel);




// window.onload = function() {
//   photosynthesisApp.radioButtons = document.getElementsByTagName("input");
// }

