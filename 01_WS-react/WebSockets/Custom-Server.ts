import http from "http"

import WebSocket, { WebSocketServer } from "ws";

const server = http.createServer((request: any, response: any) => {

    console.log((new Date())+ "Received request for "+ request.url);

    console.log(response.end("Hello Response!"));
});

const wss = new WebSocketServer({server})

let userCount = 0;

wss.on("connection",function connection(ws){

    ws.on("error", (err) => console.error(err));

    ws.on("message",function message(data, isBinary){

        wss.clients.forEach(function each(client){

            if (client.readyState === WebSocket.OPEN) {

                client.send(data, { binary: isBinary });
            }
        })
    })

    console.log("User connected" + ++userCount);
    ws.send("Hello message from the server!");
})

server.listen(8080,()=>{
    console.log(new Date() + " Server started to listen on port 8080");
})