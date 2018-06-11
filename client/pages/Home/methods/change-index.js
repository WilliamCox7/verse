export default function changeIndex(e) {
  let newState = Object.assign({}, this.state);
  newState[e.target.name] = Number(e.target.value);
  this.setState(newState);
}
