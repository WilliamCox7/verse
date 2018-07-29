export default function delAddition(id) {
  let newState = Object.assign({}, this.state);
  var items;
  items = newState.verses[newState.index].items;
  newState.verses[newState.index].items = items.filter((item) => {
    if (item.mapId === id) return false;
    return true;
  });
  this.setState(newState);
}
