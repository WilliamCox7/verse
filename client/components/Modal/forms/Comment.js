import React from 'react';
import * as Pack from '../../../exports/packages';

class Comment extends Pack.Component {

  constructor() {
    super();
    this.state = {
      comment: ""
    }
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
  }

  update(e) {
    let newState = Object.assign({}, this.state);
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  save() {
    this.props.save(this.state, 'comment');
  }

  render() {
    return (
      <div className="form">
        <input placeholder="comment" value={this.state.comment} name="comment" onChange={this.update} />
        <button onClick={this.save}>save</button>
      </div>
    );
  }
}

export default Comment;
