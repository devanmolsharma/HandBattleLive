const model = handPoseDetection.SupportedModels.MediaPipeHands;
const detectorConfig = {
    runtime: 'mediapipe',
    modelType: 'lite',
    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
};



let opponentChoice = '';
let myChoice = '';
let opponentPoints = localStorage.getItem('opponentPoints') || 0;
let myPoints = localStorage.getItem('myPoints') || 0;
let gameOn = false;
const constraints = {
    video: true,
    audio: false,
};

let detector;
let canvas;
let ctx;

document.addEventListener('DOMContentLoaded', async () => {
    initializeElements();
    setNames();

    $('#reset').bind('click', function (e) {
        reset();
    });

    detector = await handPoseDetection.createDetector(model, detectorConfig);
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    initializeVideo();
});

function initializeElements() {
    $(".blurdiv").css({ opacity: 0 });
    $("#plus1").css({ opacity: 0 });
    $("#plus2").css({ opacity: 0 });
    $(".plusPoint").css({ opacity: 0 });
    $(".result").css({ opacity: 0 });
}

function setOpponentVisibility(visible) {
    document.getElementById("blurdiv").style.opacity = visible ? 0 : 1;
}

function showCountDown(){
    var countdownImage = $('<img>', {
        src: './assets/countdown.gif',
        alt: '',
        id: 'countdown'
    });

    // Append the img element to the #p2 div
    $('#p2').append(countdownImage);

    // Remove the img element after 5 seconds
    setTimeout(function () {
        $('#countdown').remove();
    }, 5000);
}

function processResults() {

    if (myChoice === opponentChoice) {
        tie();
    } else if (
        (myChoice === 'Rock' && opponentChoice === 'Scissors') ||
        (myChoice === 'Paper' && opponentChoice === 'Rock') ||
        (myChoice === 'Scissors' && opponentChoice === 'Paper')
    ) {
        iWon();
    } else {
        opponentWon();
    }

    updatePointsOnScreen();
    localStorage.setItem('opponentPoints', opponentPoints);
    localStorage.setItem('myPoints', myPoints);
}

function startGame() {
    gameOn = true;
    $(".result").css({ opacity: 1 });
    setOpponentVisibility(false);
    showCountDown();
    setTimeout(() => {
        setOpponentVisibility(true);
        processResults();
        gameOn = false;
        setTimeout(() => {
            $(".result").css({ opacity: 0 });

        }, 3000);
    }, 5000);

}

function updatePointsOnScreen() {
    $("#points1").html('Points: ' + myPoints);
    $("#points2").html('Points: ' + opponentPoints);
}

function iWon() {
    showPointAddedOverlay('me');
    myPoints++;
}

function opponentWon() {
    showPointAddedOverlay('opponent');
    opponentPoints++;
}

function tie() {
    showPointAddedOverlay('both');
    myPoints++;
    opponentPoints++;
}

function showPointAddedOverlay(to) {
    if (to == 'me') {
        $("#plus1").css({ opacity: 1 });
    } else if (to == 'opponent') {
        $("#plus2").css({ opacity: 1 });
    } else if (to == 'both') {
        $(".plusPoint").css({ opacity: 1 });
    }

    setTimeout(() => {
        $(".plusPoint").css({ opacity: 0 });
    }, 2000);
}

function setNames() {
    const myName = location.href.split('?name=')[1];
    if (myName) {
        document.getElementById('p1Name').innerText = myName.split("+").join(" ");
    } else {
        location.href = 'index.html';
    }
}

function checkGesturePosition(hand) {
    const numFingersUP = hand.numFingersUp;
    if (numFingersUP === 0) {
        myChoice = "Rock";
        return "Rock";
    } else if (numFingersUP === 2) {
        myChoice = "Scissors";
        return "Scissors";
    } else if (numFingersUP > 3) {
        myChoice = "Scissors";
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
                setTimeout(() => {
                    processHandEstimation();
                    window.scrollTo(0,window.screen.height)
                }, 2000);
                setInterval(() => {
                    drawOnCanvas(ctx, video);
                    sendFrame(canvas.toDataURL("image/jpeg"));
                }, 100);

                setInterval(() => { if (gameOn) processHandEstimation() }, 200);
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
        const myPos = checkGesturePosition(parsedHands[0]);
        document.getElementById("position").innerText = myPos;
        if (['Rock', 'Paper', 'Scissors'].indexOf(myPos) >= 0) {
            myChoice = myPos;
        }
    }
}

function drawOnCanvas(ctx, video) {
    ctx.drawImage(video, 0, 0, video.videoWidth * 0.3, video.videoHeight * 0.3);
}

function reset(sendReset = true) {
    localStorage.removeItem("myPoints");
    localStorage.removeItem("opponentPoints");
    myPoints = 0;
    opponentPoints = 0;
    updatePointsOnScreen();
    if (sendReset)
        ws.send("resetPointsToZero");
}
