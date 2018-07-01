export default function openModal(type, item) {
  window.navigator.vibrate(10);
  this.props.openModal(type, item)
}
