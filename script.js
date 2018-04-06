/*
 * ========================================
 * ========== Aqua Track Manager ========== 
 * ========================================
 * = Creation of track cards. Reinvented. =
 * =         (c) AquaLabs V.O.F.          =
 * ========================================
 */

/*
 * Set variables
 */
const lanes = [0,1,2,3,4,5,6,7];
const intervals = [0, 250, 500, 1000, 1500, 2000];

/*
 * Get necessery variables
 */
const startContainer = document.querySelector('.start-container');
const lanesContainer = document.querySelector('.lanes-container');

/**
 * Initialization script
 */
(function() {
  initializeLanes();
})();

/**
 * Initialize the lanes in the DOM
 */
function initializeLanes() {
  // Loop through the lanes to be initialized
  lanes.forEach(createLane);
  // Create side lanes
  createSideLanes();
}

/**
 * Create the pre-set intervals on a node (e.g. lanes or side lane)
 * @param {DOMNode} node The node to set the intervals on
 */
function createIntervalsOnNode(node) {
  // Loop over intervals
  intervals.forEach((interval, index) => {
    // First interval should be 0, and ommitted
    if (index != 0) {
      // Get last interval
      let lastInterval = intervals[index - 1];
      // Create the interval on this node
      createIntervalOnNode(node, interval, lastInterval);
    }
  });
}

/**
 * Create the a interval on a node (e.g. lanes or side lane)
 * @param {DOMNode} node The node to set the intervals on
 * @param {Number} interval The meters of the current interval
 * @param {Number} lastInterval The meters of the last interval
 */
function createIntervalOnNode(node, interval, lastInterval) {
  // Create a DOM node for the interval
  let intervalNode = document.createElement('div');
  // Set the interval properties
  intervalNode.classList.add('interval');
  intervalNode.setAttribute('interval', interval);
  intervalNode.style.flex = interval- lastInterval;
  // Print interval status in interval if the node is a lane
  if (node.classList.contains('lane') && node.getAttribute('lane-number')) {
    // Create a DOM node for the interval status
    let intervalStatusNode = document.createElement('div');
    // Set the interval status properties
    intervalStatusNode.classList.add('interval-status');
    intervalStatusNode.setAttribute('status', 'CLOSED');
    // Set event listener for clicks on the interval
    intervalNode.addEventListener('click', onStatusClick);
    // Append interval status to interval node
    intervalNode.appendChild(intervalStatusNode);
  }
  // Print lane number in interval if the node is a lane and interval is first
  if (node.classList.contains('lane') && node.getAttribute('lane-number') && lastInterval === intervals[0] || interval === intervals[intervals.length-1]) {
    // Create a DOM node for the lane number
    let laneNumber = document.createElement('div');
    // Set the lane number properties
    laneNumber.classList.add('lane-number');
    laneNumber.textContent = node.getAttribute('lane-number');
    // Prepend or append lane number to interval node
    if (lastInterval === intervals[0]) {
      intervalNode.prepend(laneNumber);
    } else {
      intervalNode.append(laneNumber);
    }
  }
  // Append interval to lane node
  node.appendChild(intervalNode);
}

/**
 * Create a specific lane in the track
 */
function createLane(laneNumber) {
  // Create a DOM node for the lane
  let laneNode = document.createElement('div');
  // Set the lane properties
  laneNode.classList.add('lane');
  laneNode.setAttribute('lane-number', laneNumber);
  // Set interval nodes in the lane
  createIntervalsOnNode(laneNode);
  // Duplicate lane for starting area
  let startingLaneNode = laneNode.cloneNode();
  // Create start gate in start lane
  createStartGate(startingLaneNode);
  // Insert the lane in the DOM
  startContainer.appendChild(startingLaneNode);  
  lanesContainer.appendChild(laneNode);
}

/**
 * Create the side lines in the track
 */
function createSideLanes() {
  // Create a DOM node for the side lane
  let firstSideLaneNode = document.createElement('div');
  // Set the side lane properties
  firstSideLaneNode.classList.add('side-lane');
  // Set interval nodes in the side lane
  createIntervalsOnNode(firstSideLaneNode);
  // Duplicate DOM nodes
  let secondSideLaneNode = firstSideLaneNode.cloneNode(true);
  let startingFirstSideLaneNode = firstSideLaneNode.cloneNode();
  let startingSecondSideLaneNode = secondSideLaneNode.cloneNode();
  // Insert the side lanes in the DOM
  startContainer.prepend(startingFirstSideLaneNode);  
  lanesContainer.prepend(firstSideLaneNode);
  startContainer.append(startingSecondSideLaneNode);  
  lanesContainer.append(secondSideLaneNode);
}

function createStartGate(startingLaneNode) {
  // Create a DOM node for the starting lane
  let startGateNode = document.createElement('div');
  // Set the starting lane properties
  startGateNode.classList.add('start-gate');
  // Insert the side gate to the starting lane
  startingLaneNode.append(startGateNode);
};



function onStatusClick(event) {
  let statusNode = event.currentTarget.querySelector('.interval-status');
  let status = statusNode.getAttribute('status');
  if (status === 'CLOSED') {
    statusNode.setAttribute('status', 'OPEN');
  } else if (status === 'OPEN') {
    statusNode.setAttribute('status', 'RACINGTRACK');
  } else if (status === 'RACINGTRACK') {
    statusNode.setAttribute('status', 'CLOSED');
  }
}