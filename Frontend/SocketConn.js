let ws;
let myName;
let names;
let p2Canvas;
let p2ctx;

document.addEventListener('DOMContentLoaded', () => {
    initializeWebSocket();
    initializeGameElements();

    ws.onopen = () => {
        sendPlayerName();
    }

    ws.onmessage = handleMessage;
});

function initializeWebSocket() {
    ws = new WebSocket('ws://192.168.100.183:8080');
}

function initializeGameElements() {
    p2Canvas = document.getElementById("Player2Img");
    p2ctx = p2Canvas.getContext('2d');

    document.getElementById("startGame").addEventListener('click', () => {
        ws.send("startGame");
        startGame();
    });
}

function sendPlayerName() {
    myName = getLocationParameter('name');
    ws.send("setName:" + myName);
}

function handleMessage(message) {
    if (message.data.length > 40) {
        displayImage(message.data);
    } else {
        processGameData(message.data);
    }
}

function displayImage(imageData) {
    var img = new Image();
    img.onload = function () {
        p2Canvas.height = img.height;
        p2Canvas.width = img.width;
        p2ctx.drawImage(img, 0, 0);
    };
    img.src = imageData;
}

function processGameData(data) {
    if (data.indexOf('setNames') >= 0) {
        updateOpponentName(data);
    } else if (data.indexOf('startGame') >= 0) {
        startGame();
    } else if (data.indexOf('resetPointsToZero') >= 0) {
        reset();
    } else if (['Rock', 'Paper', 'Scissors'].indexOf(data) >= 0) {
        updateOpponentChoice(data);
    }
}

function updateOpponentName(data) {
    names = JSON.parse(data.split("setNames:")[1]);
    document.getElementById('p2Name').innerText = names.filter((n) => n != myName)[0];
}

function updateOpponentChoice(choice) {
    document.getElementById("positionPlayer2").innerText = choice;
    opponentChoice = choice;
}

function getLocationParameter(parameter) {
    return location.href.split(`?${parameter}=`)[1].split("+").join(" ");
}

function sendFrame(frame) {
    ws.send(frame);
    ws.send(document.getElementById("position").innerText);
}
