const Vector = require("./Vector.js");

class ChainSegment {
  constructor() {
    this.position = new Vector(0, 0);
    this.velocity = new Vector(0, 0);
    this.isAffectedByRope = true;
  }
  
  tick(tick) {
    this.velocity = this.velocity.scale(1 / 1.1);

    this.position = this.position.add(this.velocity);
  }
}

module.exports = ChainSegment;
