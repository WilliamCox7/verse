export default function addScriptureToStart(verse, index) {
  let newState = Object.assign({}, this.state);
  newState.verses[index] = verse;
  this.setState(newState);
}
