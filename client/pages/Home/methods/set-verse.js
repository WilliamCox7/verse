import * as Pack from '../../../exports/packages';

export default function setVerse(o, index) {
  if (index !== 0) {
    let wi = this.state.workIndex;
    let bi = this.state.bookIndex;
    let ci = this.state.chapIndex;
    let vi = this.state.versIndex;
    Pack.axios.get(`/verse/${o.works.arr[wi]}/${o.books.arr[bi]}/${o.chapters.arr[ci]}/${o.verses.arr[vi]}/${this.props.user.userId}`).then((response) => {
      let indices = [];
      for (var i = 0; i < 100; i++) {
        indices.push(false);
      }
      response.data.forEach((verse) => {
        indices.push(verse);
      });
      this.props.setVerses(indices);
    }).catch((err) => {
      console.log(err);
    });
    this.props.setNavIndex(index);
  }
}
