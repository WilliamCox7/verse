export default function setReference(verse) {
  let newState = Object.assign({}, this.state);
  newState.abrString = `${verse.bookAbr} ${verse.chapter}:${verse.verse}`;
  newState.refId = verse._id;
  this.setState(newState);
}
