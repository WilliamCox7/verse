export default function setPulling(e, list) {
  this.setState({pullingList: list, y: e.touches[0].clientY});
}
