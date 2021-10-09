const Player = require("./Player.js");
const EntityManager = require("./EntityManager.js");

class Game {
  constructor() {
    this.players = new Set();
    this.entities = new EntityManager();
    this.tickCount = 0;

    this.config = {
      mapSize: 8500,
    };

    setInterval(() => this.tickLoop(), 1000 / 40);
  }

  tickLoop() {
    this.tickCount++;
    this.entities.tick(this.tickCount);
  }

  addPlayer(ws) {
    const player = new Player(ws);
    this.players.add(player);
  }
}

module.exports = Game;