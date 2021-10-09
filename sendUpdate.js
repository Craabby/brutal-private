const { Writer } = require("./coder/coder.js");

module.exports = player => {
  const game = process.game;
  const writer = new Writer();
  writer.u8(0xb4);

  game.players.forEach(entity => {
    if (!entity.alive) return;

    const isCreation = !player.view.has(entity);
    if (isCreation) player.view.add(entity);
    let type = 0;

    if (isCreation) type = 1;
    else type = 0;

    writer.u16(entity.id);
    writer.u8(type);
    if (isCreation) {
      writer.u8(5); // we want to tell the client that this entity is a player
      writer.u8(0); // entity subtype is not used for players
      writer.string(entity.name);
    }

    writer.u8(0); // energy?

    writer.f32(entity.position.x / 10);
    writer.f32(entity.position.y / 10);
    writer.f32(entity.input.angle - Math.PI / 2);

    writer.u8(entity.rope.segments.length); // chain links

    for (let i = 0; i < entity.rope.segments.length; i++) {
      writer.f32(entity.rope.segments[i].position.x / 10);
      writer.f32(entity.rope.segments[i].position.y / 10);
    }

    // player flail
    writer.f32(entity.flail.position.x / 10); // x
    writer.f32(entity.flail.position.y / 10); // y
    writer.f32(entity.flail.angle); // angle

    writer.u32(entity.flail.size); // size

    writer.u16(0); // flags

    if (isCreation) writer.u16(player.color); // hue
  });

  player.view.forEach(entity => {
    if (!game.players.has(entity)) {
      player.view.delete(entity);
      writer.u16(entity.id);
      writer.u8(2); // deletion opcode
      
      writer.u16(0)
      writer.u8(0);
    }
  });

  writer.u8(0); // entities get null terminated
  writer.u8(0); // there is no king on this server

  player.socket.send(writer.packet);
}