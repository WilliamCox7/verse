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
