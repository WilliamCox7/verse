import React from 'react';
import * as Pack from '../../../exports/packages';

class Context extends Pack.Component {

  constructor(props) {
    super(props);
    this.state = {
      context: props.item && props.item.context ? props.item.context : "",
      _id: props.item && props.item._id ? props.item._id : "",
      type: props.item && props.item.type ? props.item.type : 'context'
    }
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.loadPrevious = this.loadPrevious.bind(this);
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

  loadPrevious() {
    let prev = this.props.prev.items.find((item) => item.type === 'context');
    this.setState({context: prev.context});
  }

  save() {
    if (this.state.context) {
      this.props.save(this.state, 'context');
    } else {
      this.props.error("Missing Context");
    }
  }

  render() {
    return (
      <div className="form">
        <textarea className="autosize" placeholder="context" value={this.state.context} name="context" onChange={this.update}></textarea>
        <button onClick={this.loadPrevious}>load previous</button>
        <button onClick={this.save}>save</button>
      </div>
    );
  }
}

export default Context;
