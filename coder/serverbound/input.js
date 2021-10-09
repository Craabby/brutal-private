module.exports = reader => {
  const angle = reader.f64() - Math.PI / 2;
  const flags = reader.u8();
  const playerIsMoving = !!(flags & 1 && !(flags & 2));

  return {
    type: "input",
    data: {
      angle,
      playerIsMoving,
    },
  };
}