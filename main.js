function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
song = "";

leftWristX = 0;
rightWristX = 0;

leftWristY = 0;
rightWristY = 0;

scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload(){
song = loadSound ("music.mp3")
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill ("red");
    stroke ("red");
    if(scoreLeftWrist > 0.0001){
cirlcle(leftWristX,leftWristY,20);
number_left = Number(leftWristY);
remove_decimals = floor(number_left);
volume = remove_decimals/500;
document.getElementById("volume").innerHTML = "volume= "+volume;
song.setVolume(volume);  
    }
    
}
function play(){
    song.play ();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log("modelLoaded")
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        rightWristX = results [0].pose.rightWrist.x;
        rightWristY = results [0].pose.rightWrist.y;
        leftWristX = results [0].pose.leftWrist.x;
        leftWristY = results [0].pose.leftWrist.y;
        scoreLeftWrist = results [0].pose.keypoints[9].score;
        scoreRighttWrist = results [0].pose.keypoints[10].score;
    }
}