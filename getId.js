function* getId() {
  let id = 1;
  while (true) {
    yield id;
    id++;
  }
}

const idGenerator = getId();

module.exports = () => {
  return idGenerator.next().value;
};
