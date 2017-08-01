var downGrade = {
  stepSize : 20,
  context : null,
  remoteVid :null
};


function setup() {

  pixelDensity(1);
  createCanvas(320, 240);
  downGrade.remoteVid = document.getElementById("remote-video");
  canvas = document.getElementById("defaultCanvas0");
  //canvas.style.display = "none";
  canvas.style.top = "0px";
  canvas.style.left = "0px";
  canvas.style.position = "fixed";

  downGrade.context = canvas.getContext("2d");
}


function draw() {


  downGrade.context.drawImage(downGrade.remoteVid,0,0,320,240);

  loadPixels();
  var data = [];
  var index = 0;

  for (var y=0; y<height; y+=downGrade.stepSize) {
    for (var x=0; x<width; x+=downGrade.stepSize) {
      
      var i = y * width + x;
      var darkness = (255 - pixels[i*4]);
      stroke(darkness);
      fill(darkness);
      rect(x, y, downGrade.stepSize, downGrade.stepSize);
      
      index++;
      
       data[index] = darkness;
      
    }
  }
  
  data.splice(0,1);
  downGrade.data = data;
}