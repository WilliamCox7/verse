export default function updatePullingIndex(e) {
  if (!this.state.pullingDisabled) {
    let newState = Object.assign({}, this.state);
    let indexType = this.state.pullingList + 'Index';
    let indexToUpdate = newState[indexType];
    let element = document.getElementById(this.state.pullingList);
    if (e.changedTouches[0].clientY > this.state.y + 15) {
      if (indexToUpdate > 0) {
        indexToUpdate--;
        newState[indexType] = indexToUpdate;
        newState.y = e.changedTouches[0].clientY
        if (indexType === 'workIndex') {
          newState.bookIndex = 0;
          newState.chapIndex = 0;
          newState.versIndex = 0;
        } else if (indexType === 'bookIndex') {
          newState.chapIndex = 0;
          newState.versIndex = 0;
        } else if (indexType === 'chapIndex') {
          newState.versIndex = 0;
        }
        this.setState(newState);
      }
    } else if (e.changedTouches[0].clientY < this.state.y - 15) {
      if (indexToUpdate < element.children.length - 1) {
        indexToUpdate++;
        newState[indexType] = indexToUpdate;
        newState.y = e.changedTouches[0].clientY
        if (indexType === 'workIndex') {
          newState.bookIndex = 0;
          newState.chapIndex = 0;
          newState.versIndex = 0;
        } else if (indexType === 'bookIndex') {
          newState.chapIndex = 0;
          newState.versIndex = 0;
        } else if (indexType === 'chapIndex') {
          newState.versIndex = 0;
        }
        this.setState(newState);
      }
    }
  }
}
