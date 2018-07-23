import React from 'react';
import * as Pack from '../../../exports/packages';

class Timeline extends Pack.Component {

  constructor(props) {
    super(props);
    this.state = {
      start: props.item && props.item.start ? props.item.start : "",
      startExt: props.item && props.item.startExt ? props.item.startExt : "",
      _id: props.item && props.item._id ? props.item._id : "",
      type: props.item && props.item.type ? props.item.type : 'timeline'
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
    if (this.state.start && this.state.startExt) {
      this.props.save(this.state, 'timeline');
    } else {
      this.props.error("Must have start information");
    }
  }

  render() {
    return (
      <div className="form">
        <div className="flex">
          <input className="left-outside" placeholder="start" value={this.state.start} name="start" onChange={this.update} />
          <input className="inside" placeholder="startExt" value={this.state.startExt} name="startExt" onChange={this.update} />
        </div>
        <button onClick={this.save}>save</button>
      </div>
    );
  }
}

export default Timeline;
