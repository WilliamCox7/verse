import React from 'react';
import * as Pack from '../../../exports/packages';

class Timeline extends Pack.Component {

  constructor() {
    super();
    this.state = {
      start: undefined,
      startExt: "",
      end: undefined,
      endExt: "",
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
        <div className="flex">
          <input className="left-outside" placeholder="start" value={this.state.start} name="start" onChange={this.update} />
          <input className="inside" placeholder="startExt" value={this.state.startExt} name="startExt" onChange={this.update} />
          <input className="inside" placeholder="end" value={this.state.end} name="end" onChange={this.update} />
          <input className="right-outside" placeholder="endExt" value={this.state.endExt} name="endExt" onChange={this.update} />
        </div>
        <button onClick={this.save}>save</button>
      </div>
    );
  }
}

export default Timeline;
