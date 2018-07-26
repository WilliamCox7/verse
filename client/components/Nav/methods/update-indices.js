export default function updateIndices() {
  this.props.viewIndex === 0 ? this.props.updateViewIndex(1) : this.props.updateViewIndex(0);
  this.props.updateNavIndex(0);
}
