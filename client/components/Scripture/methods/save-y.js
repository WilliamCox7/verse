export default function saveY(e) {
  this.setState({y: e.touches[0].clientY})
}
