export default function addAddition(form) {
  let newState = Object.assign({}, this.state);
  newState.verses[this.state.index].items.push(form);
  this.setState(newState);
}
