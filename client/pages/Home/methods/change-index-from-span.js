export default function changeIndexFromSpan(e, indexToUpdate) {
  let newState = Object.assign({}, this.state);
  let nextIndex = this.props.nav.swipeIndex + 1;
  newState[indexToUpdate] = Number(e.target.getAttribute('data-key'));
  this.setState(newState, () => {
    if (nextIndex < 4) {
      this.props.setSwipeIndex(nextIndex);
    } else if (nextIndex === 4) {
      let options = this.buildOptionsFor(this);
      this.setVerse(options, 1);
    }
  });
}
