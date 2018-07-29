export default function setVerses(verses) {
  let newState = Object.assign({}, this.state);
  newState.verses = verses;
  newState.abrString = `${verses[101].bookAbr} ${verses[101].chapter}:${verses[101].verse}`;
  newState.refId = verses[101]._id;
  this.setState(newState);
}
