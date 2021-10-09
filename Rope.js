const ChainSegment = require("./ChainSegment.js");

class Rope {
  constructor(segmentCount, restLength) {
    const segments = [];

    for (let i = 0; i < segmentCount; i++) {
      segments.push(new ChainSegment());
    }

    this.segments = segments;
    this.restLength = restLength;
    this.k = 0.1
  }

  tick(tick) {
    for (let i = 0; i < this.segments.length; i++) {
      if (i === 0) continue;
      const a = this.segments[i];
      const b = this.segments[i - 1];

      const delta = a.position.subtract(b.position);
      const x = Math.max(0, delta.mag - this.restLength);

      let force = delta.unitVector.scale(-this.k * x);
      if (a.isAffectedByRope) a.velocity = a.velocity.add(force);
      force = force.scale(-1);
      if (b.isAffectedByRope) b.velocity = b.velocity.add(force);
    }

    this.segments.forEach(segment => {
      if (segment instanceof ChainSegment) {
        segment.tick()
      }
    });
  }
}

module.exports = Rope;
