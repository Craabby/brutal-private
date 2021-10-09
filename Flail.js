const Vector = require("./Vector");

class Flail {
  constructor(owner, position) {
    this.owner = owner;
    this.position = position;
    this.velocity = new Vector(0, 0);

    this.affectedByRope = true;
    this.k = 0.1;
    this.restLength = 100;
    this.attached = true;

    this.chain = []; // Vector[]

    for (let i = 0; i < 3; i++) {
      const chain = {
        k: 0.1,
        restLength: 50,
        position: new Vector(0, 0),
        velocity: new Vector(0, 0),
        affectedByRope: true
      };
      this.chain.push(chain);
    }
  }

  tick(tick) {
    this.chain[0] = this.owner;
    this.chain[this.chain.length - 1] = this;

    for (let i = 0; i < this.chain.length; i++) {
      if (i === 0) continue;
      const a = this.chain[i];
      const b = this.chain[i - 1];

      const delta = a.position.subtract(b.position);

      const x = Math.max(0, delta.mag - this.restLength);

      let force = delta.unitVector.scale(-this.k * x);
      if (a.affectedByRope) a.velocity = a.velocity.add(force);
      force = force.scale(-1);
      if (b.affectedByRope) b.velocity = b.velocity.add(force)

      if (a.affectedByRope) a.velocity = a.velocity.scale(1 / 1.025);
      if (b.affectedByRope) b.velocity = b.velocity.scale(1 / 1.025);

      if (a.affectedByRope) a.position = a.position.add(a.velocity);
      if (b.affectedByRope) b.position = b.position.add(b.velocity);

      this.chain[i] = a;
      this.chain[i - 1] = b;
    }
  }
}

module.exports = Flail;
