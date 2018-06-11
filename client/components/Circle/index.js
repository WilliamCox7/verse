import React from 'react';
import * as Pack from '../../exports/packages';
import { getAsset } from '../../modules';
import './style.scss';

class Circle extends Pack.Component {
  render() {
    return (
      <component id="Circle" className="flex jc-c ai-c" style={this.props.image ? {padding: "15px"} : null}>
        {this.props.image ? (
          <img src={getAsset(this.props.image)} />
        ) : (
          <span>{this.props.title[0]}</span>
        )}
        <div className="title">{this.props.title}</div>
      </component>
    );
  }
}

export default Circle;
