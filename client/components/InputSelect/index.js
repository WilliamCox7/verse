import React from 'react';
import * as Pack from '../../exports/packages';
import * as Meth from './methods';
import './style.scss';

class InputSelect extends Pack.Component {

  constructor() {
    super();
    this.state = {
      options: [],
      selected: ""
    }
    this.updateOptions = this.updateOptions.bind(this);
    this.select = this.select.bind(this);
  }

  render() {

    let options = this.state.options.map((option, i) => {
      return (
        <div key={i} onClick={() => this.select(option, this.props.name)}>
          {option.name}
          <span>{option.content.substring(0, 35)}...</span>
        </div>
      );
    });

    return (
      <component className="InputSelect">
        <input type="text" value={this.state.selected} placeholder={this.props.placeholder} onChange={this.updateOptions} />
        <div className="options">
          {options}
        </div>
      </component>
    );
  }
}

InputSelect.prototype.updateOptions = Meth.updateOptions;
InputSelect.prototype.select = Meth.select;

export default InputSelect;
