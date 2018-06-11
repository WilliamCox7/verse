import React from 'react';
import * as Pack from '../../../exports/packages';

class Link extends Pack.Component {

  constructor() {
    super();
    this.state = {
      title: "",
      reference: ""
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
    this.props.save(this.state);
  }

  render() {
    return (
      <div className="form">
        <input placeholder="title" value={this.state.title} name="title" onChange={this.update} />
        <input placeholder="reference" value={this.state.reference} name="reference" onChange={this.update} />
        <button onClick={this.save}>save</button>
      </div>
    );
  }
}

export default Link;
