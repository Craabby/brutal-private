const WebSocket = require("ws");
const Game = require("./Game.js");

const wss = new WebSocket.Server({ port: 8000 });

const game = new Game();
process.game = game;

wss.on("connection", ws => {
  console.log("incoming connection")
  game.addPlayer(ws);
});
