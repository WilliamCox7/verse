import * as Pack from '../../../exports/packages';

export default function goBack() {
  let stack = localStorage.getItem("stack");
  stack = JSON.parse(stack);
  if (!stack || !stack.length) {
    this.updateIndices();
  } else {
    let verse = stack.pop();
    Pack.axios.get(`/verses/${verse.workFul}/${verse.bookFul}/${verse.chapter}/${verse.verse}/${this.props.user.userId}`)
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
    localStorage.setItem("stack", JSON.stringify(stack));
  }
}
