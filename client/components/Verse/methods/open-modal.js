export default function openModal(type, prop) {
  let item;
  if (this.props.verse.items) {
    item = this.props.verse.items.find((item) => item.hasOwnProperty(prop || type))
  }
  window.navigator.vibrate(10);
  this.props.openModal(type, item)
}
