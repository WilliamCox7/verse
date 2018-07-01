import React from 'react';
import * as Pack from '../../../exports/packages';

class Person extends Pack.Component {

  constructor() {
    super();
    this.state = {
      name: "",
      start: undefined,
      startExt: "",
      end: undefined,
      endExt: "",
      content: "",
      mother: "",
      father: "",
      children: [""],
      wives: [""],
      saveToScripture: true
    }
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.updateArray = this.updateArray.bind(this);
    this.addToArray = this.addToArray.bind(this);
    this.removeFromArray = this.removeFromArray.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);
  }

  update(e) {
    let newState = Object.assign({}, this.state);
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  updateArray(e, index, array) {
    let newState = Object.assign({}, this.state);
    newState[array][index] = e.target.value;
    this.setState(newState);
  }

  addToArray(array) {
    let newState = Object.assign({}, this.state);
    newState[array].push("");
    this.setState(newState);
  }

  removeFromArray(array, index) {
    let newState = Object.assign({}, this.state);
    newState[array].splice(index, 1);
    this.setState(newState);
  }

  updateCheckbox(e) {
    let newState = Object.assign({}, this.state);
    newState[e.target.name] = !newState[e.target.name];
    this.setState(newState);
  }

  save() {
    this.props.save(this.state);
  }

  render() {

    let children = this.state.children.map((child, i) => {
      return (
        <div className="flex" key={i}>
          <input placeholder="child" value={child} onChange={(e) => this.updateArray(e, i, "children")} />
          {i === 0 ? (
            <button className="add-button" onClick={() => this.addToArray("children")}><h1>+</h1></button>
          ) : (
            <button className="minus-button" onClick={() => this.removeFromArray("children", i)}><h1>-</h1></button>
          )}
        </div>
      );
    });

    let wives = this.state.wives.map((wife, i) => {
      return (
        <div className="flex" key={i}>
          <input placeholder="wife" value={wife} onChange={(e) => this.updateArray(e, i, "wives")} />
          {i === 0 ? (
            <button className="add-button" onClick={() => this.addToArray("wives")}><h1>+</h1></button>
          ) : (
            <button className="minus-button" onClick={() => this.removeFromArray("wives", i)}><h1>-</h1></button>
          )}
        </div>
      );
    });

    return (
      <div className="form">
        <input placeholder="name" value={this.state.name} name="name" onChange={this.update} />
        <div className="flex">
          <input className="left-outside" placeholder="start" value={this.state.start} name="start" onChange={this.update} />
          <input className="inside" placeholder="startExt" value={this.state.startExt} name="startExt" onChange={this.update} />
          <input className="inside" placeholder="end" value={this.state.end} name="end" onChange={this.update} />
          <input className="right-outside" placeholder="endExt" value={this.state.endExt} name="endExt" onChange={this.update} />
        </div>
        <input placeholder="content" value={this.state.content} name="content" onChange={this.update} />
        <div className="space"></div>
        <input placeholder="mother" value={this.state.mother} name="mother" onChange={this.update} />
        <input placeholder="father" value={this.state.father} name="father" onChange={this.update} />
        <div className="children">{children}</div>
        <div className="space"></div>
        <div className="wives">{wives}</div>
        <div className="flex jc-sb">
          <label className="flex ai-c">
            <input type="checkbox" checked={this.state.saveToScripture} name="saveToScripture" onChange={this.updateCheckbox} />
            <h1>Save To Scripture</h1>
          </label>
          <button onClick={this.save}>save</button>
        </div>
      </div>
    );
  }
}

export default Person;
