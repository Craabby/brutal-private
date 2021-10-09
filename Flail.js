const Vector = require("./Vector");

class Flail {
  constructor(owner, position) {
    this.owner = owner;
    this.position = position;
    this.velocity = new Vector(0, 0);
    this.isAffectedByRope = true;
    this.angle = 0; // radians
    this.size = 1000;
  }

  tick(tick) {
    const ownerDelta = this.position.subtract(this.owner.position);
    this.angle = ownerDelta.dir;

    this.velocity = this.velocity.scale(1 / 1.1)
    this.position = this.position.add(this.velocity);
  }
}

module.exports = Flail;
