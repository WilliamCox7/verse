export default function openModal(type) {
  let item;
  if (this.props.verse.items) {
    item = this.props.verse.items.find((item) => item.type === type)
  }
  window.navigator.vibrate(10);
  this.props.openModal(type, item)
}
