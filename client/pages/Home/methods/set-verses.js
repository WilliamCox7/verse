export default function setVerses(verses) {
  let newState = Object.assign({}, this.state);
  newState.verses = verses;
  newState.abrString = `${verses[this.state.index].bookAbr} ${verses[this.state.index].chapter}:${verses[this.state.index].verse}`;
  newState.refId = verses[this.state.index]._id;
  this.setState(newState);
}
