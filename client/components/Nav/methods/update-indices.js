export default function updateIndices() {
  this.props.nav.index === 0 ? this.props.setNavIndex(1) : this.props.setNavIndex(0);
  this.props.setSwipeIndex(0);
}
