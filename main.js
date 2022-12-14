song1 = "";
song2 = "";
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
scoreleftwrist = 0;
scorerightwrist = 0;

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#ff0000");
    stroke("#ff0000");

    if(scoreleftwrist > 0.2)
    {
        circle(leftwristX, leftwristY, 20);

        play1 = song2.isPlaying();
        if(play1 == true)
        {
            song2.stop();
            song1.stop();
            song1.play();
        }
    }

    if(scorerightwrist > 0.2)
    {
        circle(rightwristX, rightwristY, 20);

        play2 = song1.isPlaying();
        if(play2 == true)
        {
            song2.stop();
            song1.stop();
            song2.play();
        }
    }
}

function modelLoaded()
{
    console.log("poseNet is initialized");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        console.log("leftwristX = " + leftwristX + "leftwristY = " + leftwristY);

        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log("rightwristX = " + rightwristX + "rightwristY = " + rightwristY);

        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;
    }
}