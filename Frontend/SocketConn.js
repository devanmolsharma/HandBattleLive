let ws = new WebSocket('ws://192.168.100.183:8080')

document.addEventListener('DOMContentLoaded', () => {
    let p2Canvas = document.getElementById("Player2Img");
    let p2ctx = p2Canvas.getContext('2d')

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
                console.log( message.data);
                names = JSON.parse(message.data.split("setNames:")[1]);
                document.getElementById('p2Name').innerText = names.filter((n) => n != myName)[0]
            } else
                document.getElementById("positionPlayer2").innerText = message.data;
        }
    }


})


function sendFrame(frame) {
    ws.send(frame)
    ws.send(document.getElementById("position").innerText);
}