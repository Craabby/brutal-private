module.exports = reader => {
  const click = !!reader.u8();

  return {
    type: "click",
    click,
  };
}