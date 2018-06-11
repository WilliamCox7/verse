export default function stopPulling(e) {
  this.setState({pullingList: undefined, y: undefined});
}
