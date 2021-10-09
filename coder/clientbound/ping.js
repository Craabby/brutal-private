const coder = require("../coder");

module.exports = (data) => {
  const writer = new coder.Writer()
  writer.u8(0);
  return writer.packet;
};