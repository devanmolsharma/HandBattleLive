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

wss.on('connection', (ws) => {
    if (players.length >= 2) {
        ws.close();
        console.log("Rejected a connection as already 2 devices connected");
    }
    players.push(ws);

    console.log('A new device connected');

    ws.on('message', (data) => {
        p2 = players.find((tws) => tws != ws);
        if (p2) {
            p2.send(data.toString());
        }
    })

    ws.on('close', () => {
        players = players.filter((e) => e != ws)

        console.log('A Device Disconnected');

    })
})

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World\n");
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
