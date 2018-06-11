export default function openModal(type) {
  this.hideMenu();
  this.props.openModal(type);
}
