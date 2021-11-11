let facemesh;
let video;

let predictions = [];
let keypoints = [];

let landmarks = [];
let allLandmarks;

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);

  // ml5 identifica 468 punti nella facemesh che trova, creo quindi 468 checkbox.
  // todo: non averlo più hardcoded
  for (let k = 0; k < 467; k+=1) {
    landmarks = createCheckbox().id(k);
  }
  
  console.log(landmarks);
  
  allLandmarks = selectAll("input");

  facemesh = ml5.facemesh(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new predictions are made
  // Questo array è aggiornato continuamente quando una faccia è identificata da ml5
  facemesh.on("predict", results => {
    predictions = results;
    for (let i = 0; i < predictions.length; i += 1) {
      keypoints = predictions[i].scaledMesh;
    }
  });
  video.hide();
}

function draw() {
  animateLandmarks();
}

function modelReady() {
  console.log("Model ready!");
}

function animateLandmarks() {
  allLandmarks.forEach((landmark, i) => {
    if (keypoints.length > 0) {
      [x, y] = keypoints[i];
      landmark.position(x, y);
    }
  })
}