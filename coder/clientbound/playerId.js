const coder = require("../coder");

module.exports = (data) => {
  const writer = new coder.Writer()
  writer.u8(161);
  writer.u16(data.id);
  writer.u16(0);
  return writer.packet;
};