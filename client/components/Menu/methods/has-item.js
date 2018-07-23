export default function hasItem(type) {
  let scripture = this.props.scripture;
  if (scripture.verses[scripture.index] && scripture.verses[scripture.index].items) {
    let items = scripture.verses[scripture.index].items;
    let item = items.find((item) => item.type === type);
    return item;
  }
  return false;
}
