import React from 'react';
import * as Pack from '../../../exports/packages';

class Timeline extends Pack.Component {

  constructor(props) {
    super(props);
    this.state = {
      start: props.item && props.item.start ? props.item.start : "",
      startExt: props.item && props.item.startExt ? props.item.startExt : "B.C.",
      _id: props.item && props.item._id ? props.item._id : "",
      type: props.item && props.item.type ? props.item.type : 'timeline'
    }
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.loadPrevious = this.loadPrevious.bind(this);
  }

  update(e) {
    let newState = Object.assign({}, this.state);
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  loadPrevious() {
    let prev = this.props.prev.items.find((item) => item.type === 'timeline');
    this.setState({start: prev.start, startExt: prev.startExt});
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
          <select className="inside" value={this.state.startExt} name="startExt" onChange={this.update}>
            <option>B.C.</option>
            <option>A.D.</option>
          </select>
        </div>
        <button onClick={this.loadPrevious}>load previous</button>
        <button onClick={this.save}>save</button>
      </div>
    );
  }
}

export default Timeline;
