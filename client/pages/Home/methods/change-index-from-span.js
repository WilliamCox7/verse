export default function changeIndexFromSpan(e, indexToUpdate) {
  let newState = Object.assign({}, this.state);
  let nextIndex = this.state.navIndex + 1;
  newState[indexToUpdate] = Number(e.target.getAttribute('data-key'));
  this.setState(newState, () => {
    if (nextIndex < 4) {
      this.setState({navIndex: nextIndex});
    } else if (nextIndex === 4) {
      let options = this.buildOptionsFor(this);
      this.setVerse(options, 1);
    }
  });
}
