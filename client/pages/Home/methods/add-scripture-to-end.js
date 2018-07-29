export default function addScriptureToEnd(verse) {
  let newState = Object.assign({}, this.state);
  newState.verses.push(verse);
  this.setState(newState);
}
