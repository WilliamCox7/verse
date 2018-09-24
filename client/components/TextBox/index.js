import React from 'react';
import * as Pack from '../../exports/packages';
import './style.scss';

class TextBox extends Pack.Component {

  render() {

    let className = "TextBox flex " + this.props.dir;

    return (
      <component className={className}>
        <pre>{this.props.text}</pre>
        {this.props.showOptions ? (
          <div className="update-options flex jc-sb" style={this.props.dir === 'left' ? {right: '-80px'} : {left: '-80px'}}>
            <i className="material-icons" onClick={() => this.props.editItem(this.props.item)}>edit</i>
            <i className="material-icons" onClick={() => this.props.deleteItem(this.props.item.mapId)}>delete</i>
          </div>
        ) : null}
      </component>
    );
  }
}

export default TextBox;
