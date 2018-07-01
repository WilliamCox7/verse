import React from 'react';
import * as Pack from '../../exports/packages';
import './style.scss';

class TextBox extends Pack.Component {

  render() {

    let className = "TextBox " + this.props.dir;

    return (
      <component className={className}>
        <h1>{this.props.text}</h1>
      </component>
    );
  }
}

export default TextBox;
