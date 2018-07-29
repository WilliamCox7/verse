export default function toggleOptions(type) {
  if (!this.props.user.isIpad) {
    window.navigator.vibrate(10);
  }
  let newState = Object.assign({}, this.state);
  newState.options[type] = !newState.options[type];
  this.setState(newState);
}
