import React from 'react';
import * as Pack from '../../../exports/packages';
import * as Comp from '../../../exports/components';

class SelectPerson extends Pack.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state[props.type] = props.item ? props : "";
    this.state._id =  props.item ? props.item._id : "";
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
  }

  update(selected, name) {
    let newState = Object.assign({}, this.state);
    newState[name] = selected;
    this.setState(newState);
  }

  save() {
    if (this.state[this.props.type].name) {
      this.props.save(this.state, this.props.type);
    } else {
      this.props.error("You must select a person from the list below");
    }
  }

  render() {
    return (
      <div className="form">
        <Comp.InputSelect update={this.update} placeholder={this.props.type} name={this.props.type} item={this.props.item} />
        <button onClick={this.save}>save</button>
      </div>
    );
  }
}

export default SelectPerson;
