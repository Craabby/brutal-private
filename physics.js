const Vector = require("./Vector.js");

module.exports = player => {
  player.force = new Vector(0, 0)
    .movePointByAngle(100, player.input.angle)
    .unitVector;

  if (player.input.playerIsMoving) {
    player.velocity = player.velocity.add(player.force);
  }
  
  player.velocity = player.velocity.scale(1 / 1.1);
  player.position = player.position.add(player.velocity);
}
