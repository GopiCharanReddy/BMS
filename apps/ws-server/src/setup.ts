import { WebSocketServer } from "ws";

const socket = new WebSocketServer({
  port: 8080
});

socket.on("connection", (ws) => {
  ws.send("Websocket connection successful.");
})