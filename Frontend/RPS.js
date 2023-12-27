const model = handPoseDetection.SupportedModels.MediaPipeHands;
const detectorConfig = {
    runtime: 'mediapipe',
    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands'
    // or 'base/node_modules/@mediapipe/hands' in npm.
};

function computeDistance(wrist, fingertip) {
    const dx = wrist.x - fingertip.x;
    const dy = wrist.y - fingertip.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function checkIfFingerUp(dists) {
    return dists.map((d) => {
        return { name: d.name.split('_')[0], up: (d.name.indexOf('thumb') != -1) ? d.dis < 45 : d.dis > 35 }
    })
}


function checkGesturePosition(fingersUp) {
    const upFingers = fingersUp.filter(finger => finger.up);

    if (upFingers.length === 0) {
        return "Rock";
    } else if (upFingers.length === 2) {
        return "Scissors";
    } else if (upFingers.length > 3) {
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

                // console.log('====================================');
                // console.log(stream.getVideoTracks()[0]);
                // console.log('====================================');

                video.srcObject = stream;
                setInterval(async () => {
                    const hands = await detector.estimateHands(video);
                    if (hands.length == 1) {

                        const dists = hands[0].keypoints.filter((v) => (v.name).indexOf('tip') != -1).map((i) => {
                            return {
                                name: i.name,
                                dis: computeDistance(i, hands[0].keypoints.find((v) => (v.name).indexOf(i.name.split('_tip')[0] + "_mcp") != -1))
                            }
                        });
                        document.getElementById("position").innerText = checkGesturePosition(checkIfFingerUp(dists));
                    }
                }, 500);
            })
            .catch(function (err0r) {
                console.log("Something went wrong!");
            });
    }
})




