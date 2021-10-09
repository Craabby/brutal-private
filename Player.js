const getId = require("./getId.js");
const sendUpdate = require("./sendUpdate.js")
const physics = require("./physics.js");
const coder = require("./coder");
const Vector = require("./Vector.js");
const Flail = require("./Flail.js");

class Player {
  constructor(ws) {
    this.position = new Vector(0, 0);
    this.input = {
      angle: 0,
      playerIsMoving: false,
    };

    this.force = new Vector(0, 0),
    this.velocity = new Vector(0, 0),

    this.flail = new Flail(this, this.position);

    this.name = "";
    this.color = 0;
    this.alive = false;
    this.affectedByRope = false;

    this.view = new Set();

    this.pinged = false;

    this.socket = ws;
    this.id = getId();

    this.socket.on("close", () => this.closeConnection());
    this.socket.on("error", err => console.log("oops", err));
    this.socket.on("message", packet => {
      let msg;
      try {
        msg = coder.decode(packet);
      } catch {
        return;
      }

      if (msg.type === "ping") {
        this.pinged = true;
      }

      if (msg.type === "init") {
        this.send("ping");
        this.send("mapSize", {
          width: process.game.config.mapSize,
          height: process.game.config.mapSize,
          version: 2
        });

        return;
      }

      if (msg.type === "spawn") {
        this.send("playerId", { id: this.id });
        this.name = msg.name;
        
        this.alive = true;

        return;
      }

      if (msg.type === "input") {
        this.input.angle = msg.data.angle;
        this.input.playerIsMoving = msg.data.playerIsMoving;

        return;
      }
    });
  }

  tick(tick) {
    if (this.pinged) sendUpdate(this);
    physics(this);
    this.flail.tick(tick);
  }

  send(type, data) {
    const packet = coder.encode(type, data);
    this.socket.send(packet);
  }

  closeConnection() {
    process.game.players.delete(this);
  }
}

module.exports = Player;