const coder = require("../coder.js");

module.exports = data => {
  const game = process.game;

  const writer = new coder.Writer();
  writer.u8(oxa6);
  writer.u16(data.players.length);
  data.players.forEach(player => {
    writer.u8(player.x / game.config.mapSize * 255)
    writer.u8(player.y / game.config.mapSize * 255)
    writer.u8(Math.min(player.flail.size, 255))
  });

  return writer.packet;
}