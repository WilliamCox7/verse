export default function hasContext() {
  let scripture = this.props.scripture;
  if (scripture.verses[scripture.index] && scripture.verses[scripture.index].items) {
    let items = scripture.verses[scripture.index].items;
    let item = items.find((item) => item.hasOwnProperty('context'));
    return item.context;
  }
  return false;
}
