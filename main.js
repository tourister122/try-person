img = "";
objectDetector = "";
status = "";
objects = [];
inputval="";
speech=window.speechSynthesis;
speak="";

function preload() {
    
}

function setup() {
    Canvas = createCanvas(750,525);
    Canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.center();
}
function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
    inputval=document.getElementById("input").value;
    document.getElementById("n").innerHTML=inputval+" is not being detected";
}
function modelLoaded() {
    console.log("model Loaded");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}
function draw() {
    image(video, 0, 0, 750, 525);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("n").innerHTML="aformentioned object is not detected";
            document.getElementById("status").innerHTML = "Status : Objects detected";
            if(objects[i].label=inputval){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("n").innerHTML=inputval+" is detected";
                speak=inputval+" has been detected";
                utterThis = new SpeechSynthesisUtterance(speak);
                speech.speak(utterThis);
            }
            else{
                document.getElementById("n").innerHTML=inputval+" is not being detected";
            }
        }
    }

}