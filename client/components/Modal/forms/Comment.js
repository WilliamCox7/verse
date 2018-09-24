import React from 'react';
import * as Pack from '../../../exports/packages';

class Comment extends Pack.Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: props.item && props.item.comment ? props.item.comment : "",
      _id: props.item && props.item._id ? props.item._id : "",
      type: props.item && props.item.type ? props.item.type : 'comment'
    }
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    let textareas = document.querySelectorAll("textarea.autosize");
    textareas.forEach((textarea) => {
      Pack.autosize(textarea);
    });
  }

  update(e) {
    let newState = Object.assign({}, this.state);
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  save() {
    if (this.state.comment) {
      this.props.save(this.state, 'comment');
    } else {
      this.props.error("Missing Comment");
    }
  }

  render() {
    return (
      <div className="form">
        <textarea className="autosize" placeholder="comment" value={this.state.comment} name="comment" onChange={this.update}></textarea>
        <button onClick={this.save}>save</button>
      </div>
    );
  }
}

export default Comment;
