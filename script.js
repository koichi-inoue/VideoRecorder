// Global Variable
const width = 480;
const height = 360;
let capture = null;
let recorder = null;
let state = 0;  // 0:未録画  1:録画中  2:録画済み

// SetUp
function setup() {

  let cv = createCanvas(width, height);
  cv.parent("screen");

  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide();

  let stream = document.querySelector('canvas').captureStream(30);

  recorder = new MediaRecorder(stream);

  recorder.ondataavailable = function(evt) {

    let videoBlob = new Blob([evt.data], { type: evt.data.type });
    let blobURL = window.URL.createObjectURL(videoBlob);

    let anchor = document.getElementById("saveVideoButton");
    anchor.download = 'myVideo.webm';
    anchor.href = blobURL;

  };

  noLoop();
}

 // DrawLoop
function draw() {

  background(200);
  image(capture, 0,0,width,height);
  // You Can use Function filter() here.
  // THRESHOLD : parameter must be between 0.0 (black) and 1.0 (white)
  // GRAY : Converts any colors in the image to grayscale equivalents.
  // INVERT : Sets each pixel to its inverse value.
  // POSTERIZE : values between 2 and 255.
  // Ex. filter(POSTERIZE, 3);

}

// Functions

function StartVideoRecording(){
  if (state!=1) {
    recorder.start();
    loop();
    document.getElementById('message').textContent="Now Recording!";
    state = 1;
  }

}

function StopVideoRecording(){
  if (state == 1) {
    recorder.stop();
    noLoop();
    document.getElementById('message').textContent="Recorded.";
    state = 2;
  }
}
