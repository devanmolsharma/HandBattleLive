//Load HTTP module
const { randomUUID } = require("crypto");
const http = require("http");
const Server = require("ws").Server

const wss = new Server({ "port": 8080 }, () => {

    console.log('Started ws server On port 8080');

});
const hostname = "localhost";
const port = 3000;

let players = [];
let names = [];

wss.on('connection', (ws) => {

    let myName;

    if (players.length >= 2) {
        ws.close();
        console.log("Rejected a connection as already 2 devices connected");
    }

    players.push(ws);

    console.log('A new device connected');

    ws.on('message', (data) => {

        const message = data.toString();
        if (message.length < 30) {
            if (message.indexOf("setName") != -1) {
                myName = message.split(":")[1];
                names.push(myName);
                if (names.length > 1) {
                    console.log('setting Names');
                    players.forEach((E) => E.send("setNames:"+JSON.stringify(names)))
                }
                return;
            }
        }
        p2 = players.find((tws) => tws != ws);
        if (p2) {
            p2.send(message);
        }
    })

    ws.on('close', () => {
        players = players.filter((e) => e != ws)
        names = names.filter((n) => n != myName)
        console.log('A Device Disconnected');

    })
})

const server = http.createServer((req, res) => {
    if (req.url == '/playerNames') {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(JSON.stringify(names));
    } else {

        res.statusCode = 400;
        res.setHeader("Content-Type", "text/plain");
        res.end("Not Found");
    }
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
