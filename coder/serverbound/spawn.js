module.exports = reader => {
  const name = reader.string();

  return { type: "spawn", name };
}