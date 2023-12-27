const model = handPoseDetection.SupportedModels.MediaPipeHands;
const detectorConfig = {
    runtime: 'mediapipe',
    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands'
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

    var video = document.getElementById('video');

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {

                video.srcObject = stream;
                setInterval(async () => {
                    const hands = await detector.estimateHands(video);
                    const parsedHands = HandParser.parse(hands);
                    if (hands.length == 1) {
                        document.getElementById("position").innerText = checkGesturePosition(parsedHands[0]);
                    }
                }, 1000);
            })
            .catch(function (err0r) {
                console.log("Something went wrong!");
            });
    }
})




