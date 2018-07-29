import * as Pack from '../../../exports/packages';

export default function goToVerse(item) {
  if (!this.props.user.isIpad) {
    window.navigator.vibrate(10);
  }
  let saveVerse = this.props.scripture.verses[this.props.scripture.index];
  addToBackStack(saveVerse);
  Pack.axios.get(`/verses/${item.work}/${item.book}/${item.chap}/${item.vers}/${this.props.user.userId}`)
  .then((response) => {
    let indices = [];
    for (var i = 0; i < 100; i++) {
      indices.push(false);
    }
    response.data.forEach((verse) => {
      indices.push(verse);
    });
    this.props.setVerses(indices);
  });
}

function addToBackStack(verse) {
  let stack = localStorage.getItem("stack");
  if (!stack) {
    stack = [];
  } else {
    stack = JSON.parse(stack);
  }
  stack.push(verse);
  localStorage.setItem("stack", JSON.stringify(stack));
}
