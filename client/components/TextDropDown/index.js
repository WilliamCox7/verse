import React from 'react';
import * as Pack from '../../exports/packages';
import * as Meth from './methods';
import './style.scss';

class TextDropDown extends Pack.Component {

  constructor(props) {
    super(props);
    this.state = {
      showInfo: props.show
    }
    this.toggleInfo = this.toggleInfo.bind(this);
  }

  render() {

    let className = "TextDropDown " + this.props.dir;
    let style = {marginBottom: '5px'};

    return (
      <component className={className}>
        <div className="text flex jc-sb" onClick={this.toggleInfo} style={this.state.showInfo ? null : style}>
          <h1>{this.props.titleLeft}</h1>
          <h1>{this.props.titleRight}</h1>
          {this.props.showOptions ? (
            <div className="update-options flex jc-sb" style={this.props.dir === 'left' ? {right: '-80px'} : {left: '-80px'}}>
              <i className="material-icons" onClick={() => this.props.editItem(this.props.item)}>edit</i>
              <i className="material-icons" onClick={() => this.props.deleteItem(this.props.item.mapId)}>delete</i>
            </div>
          ) : null}
        </div>
        {this.state.showInfo ? (
          <div className="text drop-down">
            <h1>{this.props.content}</h1>
          </div>
        ) : null}
      </component>
    );
  }
}

TextDropDown.prototype.toggleInfo = Meth.toggleInfo;

export default TextDropDown;
