const coder = require("./coder.js");

const serverbound = {
  init: require("./serverbound/init.js"),
  ping: require("./serverbound/ping.js"),
  spawn: require("./serverbound/spawn.js"),
  input: require("./serverbound/input.js"),
  resize: require("./serverbound/resize.js"),
  click: require("./serverbound/click.js"),
};

const serverboundOpcodes = {
  [0x00]: "ping",
  [0x01]: "init",
  [0x03]: "spawn",
  // [0x04]: "leave",
  [0x05]: "input",
  [0x07]: "resize",
  [0x08]: "click",
};

const clientbound = {
  ping: require("./clientbound/ping.js"),
  mapSize: require("./clientbound/mapSize.js"),
  mapInfo: require("./clientbound/mapInfo.js"),
  playerId: require("./clientbound/playerId.js"),
};

function encode(type, data) {
  if (!clientbound.hasOwnProperty(type)) {
    throw new Error(`Unsupported packet: ${type}`);
  }

  return clientbound[type](data);
}

function decode(buffer) {
  const reader = new coder.Reader(buffer);
  const packetType = reader.u8();

  if (!serverboundOpcodes.hasOwnProperty(packetType)) {
    console.log(packetType);
    throw new Error("client sent invalid packet"); // the call to the decoder will be in a try catch
  }

  return serverbound[serverboundOpcodes[packetType]](reader);
}

module.exports = { encode, decode };