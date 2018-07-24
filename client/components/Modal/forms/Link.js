import React from 'react';
import * as Pack from '../../../exports/packages';
import { buildOptionsFor } from '../../../modules';

class Link extends Pack.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: props.item && props.item.title ? props.item.title : "",
      workIndex: props.item && props.item.workIndex ? props.item.workIndex : 0,
      bookIndex: props.item && props.item.bookIndex ? props.item.bookIndex : 0,
      chapIndex: props.item && props.item.chapIndex ? props.item.chapIndex : 0,
      versIndex: props.item && props.item.versIndex ? props.item.versIndex : 0,
      work: props.item && props.item.work ? props.item.work : "Old Testament",
      book: props.item && props.item.book ? props.item.book : "Genesis",
      chap: props.item && props.item.chap ? props.item.chap : 1,
      vers: props.item && props.item.vers ? props.item.vers : 1,
      _id: props.item && props.item._id ? props.item._id : "",
      type: props.item && props.item.type ? props.item.type : 'link'
    }
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.updateSelect = this.updateSelect.bind(this);
    this.buildOptionsFor = this.buildOptionsFor.bind(this);
    this.getLinkContent = this.getLinkContent.bind(this);
  }

  update(e) {
    let newState = Object.assign({}, this.state);
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  updateSelect(e, options) {
    let newState = Object.assign({}, this.state);
    let name = e.target.name;
    newState[`${name}Index`] = e.target.value;
    if (name === 'work') {
      newState[name] = options.works.arr[e.target.value];
      newState.chap = 1;
      newState.vers = 1;
      newState.bookIndex = 0;
      newState.chapIndex = 0;
      newState.versIndex = 0;
    } else if (name === 'book') {
      newState[name] = options.books.arr[e.target.value];
      newState.chap = 1;
      newState.vers = 1;
      newState.chapIndex = 0;
      newState.versIndex = 0;
    } else if (name === 'chap') {
      newState[name] = options.chapters.arr[e.target.value];
      newState.vers = 1;
      newState.versIndex = 0;
    } else {
      newState[name] = options.verses.arr[e.target.value];
    }
    this.setState(newState, () => {
      if (name === 'work') {
        options = this.buildOptionsFor();
        this.setState({book: options.books.arr[0]});
      }
    });
  }

  save() {
    if (this.state.title) {
      this.getLinkContent()
      .then((form) => this.props.save(form, 'link'));
    } else {
      this.props.error("Missing Title");
    }
  }

  getLinkContent() {
    let form = Object.assign({}, this.state);
    return Pack.axios.get(`/verse/${form.work}/${form.book}/${form.chap}/${form.vers}/${this.props.user.userId}`)
    .then((response) => {
      let d = response.data;
      form.content = d.content;
      form.reference = `${d.bookAbr} ${d.chapter}:${d.verse}`;
      return form;
    });
  }

  render() {

    let options = this.buildOptionsFor();

    return (
      <div className="form">
        <input placeholder="title" value={this.state.title} name="title" onChange={this.update} />
        <div className="search-ref flex jc-sb">
          <div className="selects flex">
            <select value={this.state.workIndex} name="work" onChange={(e) => this.updateSelect(e, options)}>{options.works.options}</select>
            <select value={this.state.bookIndex} name="book" onChange={(e) => this.updateSelect(e, options)}>{options.books.options}</select>
            <select value={this.state.chapIndex} name="chap" onChange={(e) => this.updateSelect(e, options)}>{options.chapters.options}</select>
            <select value={this.state.versIndex} name="vers" onChange={(e) => this.updateSelect(e, options)}>{options.verses.options}</select>
          </div>
        </div>
        <button onClick={this.save}>save</button>
      </div>
    );
  }
}

Link.prototype.buildOptionsFor = buildOptionsFor;

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default Pack.connect(mapStateToProps)(Link);
