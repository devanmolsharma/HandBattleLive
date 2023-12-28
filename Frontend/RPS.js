const model = handPoseDetection.SupportedModels.MediaPipeHands;
const detectorConfig = {
    runtime: 'mediapipe',
    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands'
};

// Basic settings for the video to get from Webcam
const constraints = {
    video: true,
    audio: false,
};



function checkGesturePosition(hand) {
    const numFingersUP = hand.numFingersUp;
    if (numFingersUP === 0) {
        return "Rock";
    } else if (numFingersUP === 2) {
        return "Scissors";
    } else if (numFingersUP > 3) {
        return "Paper";
    } else {
        return "Invalid hand position";
    }
}
document.addEventListener('DOMContentLoaded', async () => {
    detector = await handPoseDetection.createDetector(model, detectorConfig);
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    var video = document.getElementById('video');
    
    
    
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            
            video.srcObject = stream;
            setInterval(() => {
                drawOnCanvas(ctx, video)
                sendFrame(canvas.toDataURL("image/jpeg"));
            }, 100);
            setInterval(async () => {
                canvas.width = video.videoWidth*0.3;
                canvas.height = video.videoHeight*0.3;
                    const hands = await detector.estimateHands(video);
                    const parsedHands = HandParser.parse(hands);
                    if (hands.length == 1) {
                        document.getElementById("position").innerText = checkGesturePosition(parsedHands[0]);
                    }
                }, 300);
            })
            .catch(function (err0r) {
                console.log("Something went wrong!");
            });
    }

})


function drawOnCanvas(ctx, video) {
    ctx.drawImage(video, 0, 0,video.videoWidth*0.3, video.videoHeight*0.3);
}



