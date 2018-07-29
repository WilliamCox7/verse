export default function setIndex(index) {
  let newState = Object.assign({}, this.state);
  newState.index = index;
  this.setState(newState);
}
