const coder = require("../coder.js");

module.exports = data => {
  const writer = new coder.Writer();
  writer.u8(0xa0);

  writer.f32(data.width / 10);
  writer.f32(data.height / 10);
  writer.u8(data.version)

  return writer.packet;
}