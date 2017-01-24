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
var glucose = 10;

var co2 = 0;
var water = 0;
var energy = 0;

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
var hungerNotice = document.getElementById("hungry");

var ctx = document.getElementById("graph").getContext('2d');
var graph;

var startSecond;
var lastSecond = 0;
var lastGraphSecond = 0;
var outOfFood = false;


var xTicks = {
  autoSkip: false,
  maxTicksLimit: 10,
  beginAtZero: true,
  suggestedMin: 1,
  suggestedMax: 100
};
var yTicks = {
  autoSkip: false,
  display: false,
  beginAtZero: true,
  suggestedMin: 0,
  suggestedMax: 1000
};



var data = {
  datasets: [
    {
      label: "co2",
      borderColor: CO2_COLOR,
      backgroundColor: CO2_COLOR,
      fill: false,
      pointRadius: 0,
      data: co2Data
    },
    {
      label: "water",
      borderColor: WATER_COLOR,
      backgroundColor: WATER_COLOR,
      fill: false,
      pointRadius: 0,
      data: waterData
    },
    {
      label: "energy",
      fill: false,
      borderColor: ENERGY_COLOR,
      backgroundColor: ENERGY_COLOR,
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
  if (second > lastSecond) {
    co2Data.push    ( {y: accumulatedCo2, x:lastGraphSecond});
    energyData.push ( {y: accumulatedEnergy, x:lastGraphSecond});
    waterData.push  ( {y: accumulatedWater, x:lastGraphSecond})
    lastSecond = second;
    lastGraphSecond +=1

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
  accumulatedEnergy += (0.5 - Math.random()) * 1;
  accumulatedWater += (0.5 - Math.random()) * 1;
  accumulatedCo2 += (0.5 - Math.random()) * 1;

  if (frameInterval == FAST_INTERVAL) {
    co2 = water = energy = 40;
  }
  if (frameInterval == SLOW_INTERVAL) {
    co2 = water = energy = 20;
  }
  if (frameInterval == REST_INTERVAL) {
    co2 = water = energy = 5;
  }
  glucose = glucose - co2/1000;
  accumulatedEnergy += energy/100;
  accumulatedWater += water/100 + 0.001;
  accumulatedCo2 += co2/100 + 0.002;
  if (glucose <= 0){
    running = false;
    outOfFood = true;
    hungerNotice.style.visibility = "visible";
  }

  changeBarHeight("co2-chart",  co2);
  changeBarHeight("water-chart", water);
  changeBarHeight("energy-chart", energy);
  changeBarHeight("glucose-chart", glucose);
}

function updateDancerFrame() {
  frameNumber++;
  frameNumber = frameNumber % (LAST_FRAME_INDEX + 1);
  var dancer = document.getElementById("dancer");
  dancer.className = (".frame frame-" + frameNumber);
}


function animate(timestamp) {
  if (running) {
    if (!lastAnimTime) lastAnimTime = timestamp;
    var elapsed = timestamp - lastAnimTime;
    if (elapsed > frameInterval) {
      updateDancerFrame();
      lastAnimTime = timestamp;
    }
    updateOutputs();
    drawGraph();
    requestAnimationFrame(animate);
  }
}

function start() {
 if (!running){
    if (!startSecond) startSecond = Math.floor((new Date).getTime()/1000);
    startButton.disabled = true;
    stopButton.disabled = false;
    requestAnimationFrame(animate);
  }
  running = true;
}

function stop() {
  running = false;
  startButton.disabled = false;
  stopButton.disabled = true;
}

function reset() {
  stop();
  lastAnimTime = null;
  lastGraphSecond = 0;

  glucose = 80;
  co2 = 10;
  water = 10;
  energy = 10;

  var range = 10
  accumulatedCo2 = Math.random() * range + 0;
  accumulatedWater = Math.random() * range + range;
  accumulatedEnergy = Math.random() * range + range*2;

  while(co2Data.length > 0) {
    co2Data.pop();
    waterData.pop();
    energyData.pop();
  }
  if (graph) {
    graph.update(0);
  }
  updateOutputs();
  startButton.disabled = false;
  stopButton.disabled = true;
}

function setActivityLevel(e) {
  var activity = e.target.value;
  if (activity == "rest") frameInterval=REST_INTERVAL;
  else if (activity == "slow") frameInterval=SLOW_INTERVAL;
  else if (activity == "quick") frameInterval=FAST_INTERVAL;
}

function eat() {
  if (outOfFood) {
    outOfFood = false;
    running = true;
    hungerNotice.style.visibility = "hidden";
    requestAnimationFrame(animate);
  }
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
        ticks: xTicks
      }],
      yAxes: [{
        type: 'linear',
        position: 'left',
        ticks: yTicks
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
stopButton.disabled = true;


initGraph();
reset();


activitySelect.addEventListener("change", setActivityLevel);