module.exports = reader => {
  const width = reader.u16() * 10;
  const height = reader.u16() * 10;

  return {
    type: "init",
    data: { width, height }
  }
}