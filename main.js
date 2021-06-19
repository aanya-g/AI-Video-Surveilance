video = "";
objects = [];
status = "";

function setup(){
    canvas = createCanvas(580, 360);
    canvas.center();
}

function preload(){
    video = createVideo("video.mp4");
    video.hide();
    video.size(580 , 360)
}

function draw(){
   image(video, 0, 0, 580, 360);
   if(status != ""){
     objectDetector.detect(video, gotResult);
   }
   for(var i = 0; i<objects.length; i++){
       percent = Math.floor(objects[i].confidence*100);
       number = objects.length;
       document.getElementById("number_object_detected").innerHTML = "Number of Objects =" + " " + number;
       text(objects[i].label + " " + percent + "%" , objects[i].x, objects[i].y);
       fill("aquamarine");
       stroke("aqua");
       noFill();
       rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       document.getElementById("status"),innerHTML = "Status : Detected all Objects";
   }
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model succesfully launched!!");
    video.loop();
    video.speed(1);
    video.volume(0);
    status = 'true';
}

function gotResult(error, result){
      if(error){
          console.log(error);
      }
      else{
          console.log(result);
          objects = result;
      }
}