const model = handPoseDetection.SupportedModels.MediaPipeHands;
const detectorConfig = {
    runtime: 'mediapipe',
    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
};

const constraints = {
    video: true,
    audio: false,
};

let detector;
let canvas;
let ctx;

function setNames() {
    myName = location.href.split('?name=')[1]
    if (myName)
        document.getElementById('p1Name').innerText = myName.split("+").join(" ");
    else location.href = 'Login.html'
}

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

function initializeVideo() {
    const video = document.getElementById('video');

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (stream) {
                video.srcObject = stream;
                setInterval(() => {
                    drawOnCanvas(ctx, video);
                    sendFrame(canvas.toDataURL("image/jpeg"));
                }, 100);

                setInterval(processHandEstimation, 300);
            })
            .catch(function (error) {
                console.log("Error accessing webcam:", error);
            });
    }
}

async function processHandEstimation() {
    canvas.width = video.videoWidth * 0.3;
    canvas.height = video.videoHeight * 0.3;
    const hands = await detector.estimateHands(video);
    const parsedHands = HandParser.parse(hands);

    if (hands.length === 1) {
        document.getElementById("position").innerText = checkGesturePosition(parsedHands[0]);
    }
}

function drawOnCanvas(ctx, video) {
    ctx.drawImage(video, 0, 0, video.videoWidth * 0.3, video.videoHeight * 0.3);
}

document.addEventListener('DOMContentLoaded', async () => {
    setNames();
    detector = await handPoseDetection.createDetector(model, detectorConfig);
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    initializeVideo();
});
