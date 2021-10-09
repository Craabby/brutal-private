const Vector = require("./Vector");

class Flail {
  constructor(owner, position) {
    this.owner = owner;
    this.position = position;
    this.velocity = new Vector(0, 0);
    this.isAffectedByRope = true;

    this.chain = []; // Vector[]
  }

  tick(tick) {
    this.velocity = this.velocity.scale(1 / 1.1)
    this.position = this.position.add(this.velocity);
  }
}

module.exports = Flail;
