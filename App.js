const express = require("express");

const app = express();
const port = 3000;

app.use(express.static('./Frontend'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const Server = require("ws").Server

const wss = new Server({ "port": 8080 }, () => {

    console.log('Started ws server On port 8080');

});

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
