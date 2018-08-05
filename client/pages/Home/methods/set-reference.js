export default function setReference(verse, index) {
  let newState = Object.assign({}, this.state);
  newState.abrString = `${verse.bookAbr} ${verse.chapter}:${verse.verse}`;
  newState.refId = verse._id;
  newState.index = index;
  this.setState(newState);
}
