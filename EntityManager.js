class EntityManager {
  constructor() {
    this.players = [];
  }

  tick(tick) {
    const game = process.game;
    game.players.forEach(client => {
      client.tick(tick);
    });
  }
}

module.exports = EntityManager;