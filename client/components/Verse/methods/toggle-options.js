export default function toggleOptions(type) {
  let newState = Object.assign({}, this.state);
  newState.options[type] = !newState.options[type];
  this.setState(newState);
}
