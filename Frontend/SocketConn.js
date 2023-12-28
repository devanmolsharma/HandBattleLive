let ws = new WebSocket('ws://192.168.100.183:8080')

document.addEventListener('DOMContentLoaded', () => {
    let p2Canvas = document.getElementById("Player2Img");
    let p2ctx = p2Canvas.getContext('2d')

    ws.onopen = () => {
    }


    ws.onmessage = (message) => {
        if (message.data.length > 40) {
            var img = new Image();
            img.onload = function () {
                p2Canvas.height = img.height;
                p2Canvas.width = img.width;
                p2ctx.drawImage(img, 0, 0); // Or at whatever offset you like
            };
            img.src = message.data;
            
        }
        else{
            document.getElementById("positionPlayer2").innerText = message.data;
        }
    }


})


function sendFrame(frame) {
    ws.send(frame)
    ws.send(document.getElementById("position").innerText);
}