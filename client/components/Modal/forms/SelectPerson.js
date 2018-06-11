import React from 'react';
import * as Pack from '../../../exports/packages';

class SelectPerson extends Pack.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state[props.type] = "";
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
        <input placeholder={this.props.type} value={this.state[this.props.type]} name={this.props.type} onChange={this.update} />
        <button onClick={this.save}>save</button>
      </div>
    );
  }
}

export default SelectPerson;
