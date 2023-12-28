let ws = new WebSocket('ws://192.168.100.183:8080')


document.addEventListener('DOMContentLoaded', () => {
    let p2Canvas = document.getElementById("Player2Img");
    let p2ctx = p2Canvas.getContext('2d')

    document.getElementById("startGame").addEventListener('click', () => {
        ws.send("startGame");
        startGame();
    })

    ws.onopen = () => {
        ws.send("setName:" + location.href.split('?name=')[1].split("+").join(" "))
    }


    ws.onmessage = (message) => {
        myName = location.href.split('?name=')[1].split("+").join(" ");;



        if (message.data.length > 40) {
            var img = new Image();
            img.onload = function () {
                p2Canvas.height = img.height;
                p2Canvas.width = img.width;
                p2ctx.drawImage(img, 0, 0); // Or at whatever offset you like
            };
            img.src = message.data;

        }
        else {
            if (message.data.indexOf('setNames') >= 0) {
                console.log(message.data);
                names = JSON.parse(message.data.split("setNames:")[1]);
                document.getElementById('p2Name').innerText = names.filter((n) => n != myName)[0]
            } if (message.data.indexOf('startGame') >= 0) {
                startGame();
            }
            if (message.data.indexOf('reset') >= 0) {
                reset();
            }
            else if (['Rock', 'Paper', 'Scissors'].indexOf(message.data) >= 0) {
                let choice = message.data;
                document.getElementById("positionPlayer2").innerText = choice;
                opponentChoice = choice;
            }
        }
    }


})


function sendFrame(frame) {
    ws.send(frame)
    ws.send(document.getElementById("position").innerText);
}