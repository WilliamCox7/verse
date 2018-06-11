import React from 'react';
import * as Pack from '../../../exports/packages';

class Context extends Pack.Component {

  constructor(props) {
    super(props);
    this.state = {
      context: props.verse.context ? props.verse.context : ""
    }
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
  }

  ComponentDidMount() {
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
    if (this.state.context) {
      this.props.save(this.state);
    } else {
      this.props.error("Missing Context");
    }
  }

  render() {
    return (
      <div className="form">
        <textarea className="autosize" placeholder="context" value={this.state.context} name="context" onChange={this.update}></textarea>
        <button onClick={this.save}>save</button>
      </div>
    );
  }
}

export default Context;
