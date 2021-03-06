import React from 'react';
import * as Pack from '../../../exports/packages';
import * as Comp from '../../../exports/components';

class Person extends Pack.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: props.item && props.item.name ? props.item.name : "",
      start: props.item && props.item.start ? props.item.start : "",
      startExt: props.item && props.item.startExt ? props.item.startExt : "",
      end: props.item && props.item.end ? props.item.end : "",
      endExt: props.item && props.item.endExt ? props.item.endExt : "",
      content: props.item && props.item.content ? props.item.content : "",
      mother: props.item && props.item.mother ? props.item.mother : "",
      father: props.item && props.item.father ? props.item.father : "",
      children: props.item && props.item.children ? props.item.children : [""],
      wives: props.item && props.item.wives ? props.item.wives : [""],
      dontSaveToScripture: props.item ? props.item.dontSaveToScripture : false,
      showCheckbox: props.item ? false : true,
      _id: props.item && props.item._id ? props.item._id : "",
      type: props.item && props.item.type ? props.item.type : 'newperson'
    }
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.updateSelectPerson = this.updateSelectPerson.bind(this);
    this.addToArray = this.addToArray.bind(this);
    this.removeFromArray = this.removeFromArray.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);
  }

  updateSelectPerson(item, name, array, index) {
    let newState = Object.assign({}, this.state);
    if (array) {
      newState[array][index] = item;
    } else {
      newState[name] = item;
    }
    this.setState(newState);
  }

  update(e) {
    let newState = Object.assign({}, this.state);
    newState[e.target.name] = e.target.value;
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
    let saveState = Object.assign({}, this.state);
    delete saveState.showCheckbox;
    saveState.children = saveState.children.map((child) => child._id);
    saveState.wives = saveState.wives.map((wife) => wife._id);
    this.props.save(saveState, 'newperson');
  }

  render() {

    let children = this.state.children.map((child, i) => {
      return (
        <div className="flex" key={i}>
          <Comp.InputSelect update={this.updateSelectPerson} placeholder="child" name="children" item={this.state.children[i]} index={i} array="children" />
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
          <Comp.InputSelect update={this.updateSelectPerson} placeholder="wife" name="wives" item={this.state.wives[i]} index={i} array="wives" />
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
          <select className="inside" value={this.state.startExt} name="startExt" onChange={this.update}>
            <option>B.C.</option>
            <option>A.D.</option>
          </select>
          <input className="inside" placeholder="end" value={this.state.end} name="end" onChange={this.update} />
          <select className="right-outside" value={this.state.endExt} name="endExt" onChange={this.update}>
            <option>B.C.</option>
            <option>A.D.</option>
          </select>
        </div>
        <input placeholder="content" value={this.state.content} name="content" onChange={this.update} />
        <div className="space"></div>
        <Comp.InputSelect update={this.updateSelectPerson} placeholder="mother" name="mother" item={this.state.mother} />
        <Comp.InputSelect update={this.updateSelectPerson} placeholder="father" name="father" item={this.state.father} />
        <div className="children">{children}</div>
        <div className="space"></div>
        <div className="wives">{wives}</div>
        <div className={this.state.showCheckbox ? "flex jc-sb" : "flex jc-fe"}>
          {this.state.showCheckbox ? (
            <label className="flex ai-c">
              <input type="checkbox" checked={this.state.dontSaveToScripture} name="dontSaveToScripture" onChange={this.updateCheckbox} />
              <h1>Don't Save To Scripture</h1>
            </label>
          ) : null}
          <button onClick={this.save}>save</button>
        </div>
      </div>
    );
  }
}

export default Person;
