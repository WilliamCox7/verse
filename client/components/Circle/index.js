import React from 'react';
import * as Pack from '../../exports/packages';
import { getAsset } from '../../modules';
import './style.scss';

class Circle extends Pack.Component {

  getFirstWord(title) {
    let parts = title.split(" ");
    let firstWord = parts.find((part) => isNaN(part));
    return firstWord;
  }

  getFirstLetter(title) {
    let parts = title.split(" ");
    let firstWord = parts.find((part) => isNaN(part));
    return firstWord[0];
  }

  render() {

    let title = this.props.title ? this.getFirstWord(this.props.title) : "";
    let letter = this.props.image ? "" : this.getFirstLetter(this.props.letter);

    return (
      <component id="Circle" className="flex jc-c ai-c">
        {this.props.image ? (
          <img src={getAsset(this.props.image)} />
        ) : (
          <span>{letter}</span>
        )}
        <div className="title">{title}</div>
      </component>
    );
  }
}

export default Circle;
