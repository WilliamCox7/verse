export default function changeIndex(index) {
  let verses = this.props.scripture.verses;
  if (!verses[index-1]) {
    Pack.axios.get(`/verse/${verses[index].prevId}/${this.props.user.userId}`).then((response) => {
      this.props.addScriptureToStart(response.data, index-1);
    });
  } else if (index === verses.length-1) {
    Pack.axios.get(`/verse/${verses[verses.length-1].nextId}/${this.props.user.userId}`).then((response) => {
      this.props.addScriptureToEnd(response.data);
    });
  }
  this.props.setReference(verses[index]);
  this.props.setIndex(index);
}
