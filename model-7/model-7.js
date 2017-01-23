var RESTING_FRAME    = 0;
var LAST_FRAME_INDEX = 12;
var SLOW_INTERVAL    = 100;
var FAST_INTERVAL    = 30;

var CO2_COLOR = "#9900CC"
var WATER_COLOR = "#00CCFF"
var ENERGY_COLOR = "#FF3333"

var REST_INTERVAL = Infinity;
var running = false;
var frameInterval = REST_INTERVAL;
var lastAnimTime = null;
var frameNumber = RESTING_FRAME;
var glucose = 80;

var co2 = 10;
var water = 10;
var energy = 10;

var co2Data = [];
var waterData = [];
var energyData = [];

var accumulatedCo2 = 0;
var accumulatedWater = 0;
var accumulatedEnergy = 0;

var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");
var resetButton = document.getElementById("reset");
var activitySelect = document.getElementById("activity-select");
var eatButton = document.getElementById("eat");

var ctx = document.getElementById("graph").getContext('2d');
var graph;

var startSecond;
var lastGraphSecond = 0;


var xTicks = {
  autoSkip: false,
  maxTicksLimit: 10,
  beginAtZero: true
};
var yTicks = {
  autoSkip: false,
  display: false,
  beginAtZero: true
};



var data = {
  datasets: [
    {
      label: "co2",
      borderColor: CO2_COLOR,
      fill: false,
      pointRadius: 0,
      data: co2Data
    },
    {
      label: "water",
      borderColor: WATER_COLOR,
      fill: false,
      pointRadius: 0,
      data: waterData
    },
    {
      label: "energy",
      fill: false,
      borderColor: ENERGY_COLOR,
      pointRadius: 0,
      data: energyData
    }
  ]
};



function currentSecond() {
  if(!startSecond) {
    startSecond = Math.floor((new Date).getTime()/1000);
  }
  return Math.floor((new Date).getTime()/1000) - startSecond;
}

function drawGraph() {
  var second = currentSecond();
  var trim = function(ary) {
    var maxSize = 240;
    ary.splice(0,Math.max(0,ary.length -maxSize));
  }
  if (second > lastGraphSecond) {
    co2Data.push    ( {y: accumulatedCo2, x:second -1});
    energyData.push ( {y: accumulatedEnergy, x:second -1});
    waterData.push  ( {y: accumulatedWater, x:second -1})
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
  startSecond = Math.floor((new Date).getTime()/1000);
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
  lastAnimTime = null;
  lastGraphSecond = 0;

  glucose = 80;
  co2 = 10;
  water = 10;
  energy = 10;

  accumulatedCo2 = co2;
  accumulatedWater = water;
  accumulatedEnergy = energy;

  while(co2Data.length > 0) {
    co2Data.pop();
    waterData.pop();
    energyData.pop();
  }
  if (graph) {
    graph.update(0);
  }
  updateOutputs();
}

function setActivityLevel(e) {
  var activity = e.target.value;
  if (activity == "rest") frameInterval=REST_INTERVAL;
  else if (activity == "slow") frameInterval=SLOW_INTERVAL;
  else if (activity == "quick") frameInterval=FAST_INTERVAL;
}

function eat() {
  glucose = glucose + 20;
  if (glucose > 100) {
    glucose = 100;
  }
  changeBarHeight("glucose-chart", glucose);
}

function initGraph() {
  var graphOptions = {
    responsive: false,
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom',
        ticks: xTicks,
        min: 1
      }],
      yAxes: [{
        type: 'linear',
        position: 'left',
        ticks: yTicks,
        min: 1
      }]
    }
  };
  graph = new Chart(ctx, {
    type: 'line',
    data: data,
    options: graphOptions
  });
}


changeBarHeight("co2-chart",  co2);
changeBarHeight("water-chart", water);
changeBarHeight("energy-chart", energy);
changeBarHeight("glucose-chart", glucose);

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
resetButton.addEventListener("click", reset);
eatButton.addEventListener("click", eat);


reset();

initGraph();

activitySelect.addEventListener("change", setActivityLevel);




// window.onload = function() {
//   photosynthesisApp.radioButtons = document.getElementsByTagName("input");
// }

