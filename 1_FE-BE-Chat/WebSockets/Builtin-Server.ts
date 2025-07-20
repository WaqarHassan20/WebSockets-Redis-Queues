import express from "express"

import WebSocket, { WebSocketServer } from "ws";

const app = express();

const httpServer = app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});

const wss = new WebSocketServer({ server: httpServer });

let userCount = 0;

wss.on("connection", function connection(ws) {
  ws.on("error", (err) => console.error(err));

  ws.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  console.log("User connected" + ++userCount);
  ws.send("Hello message from the server!");
});