import React from 'react';
import * as Pack from '../../exports/packages';
import * as Meth from './methods';
import './style.scss';

class Timeline extends Pack.Component {

  constructor() {
    super();
    this.adjustPadding = this.adjustPadding.bind(this);
  }

  componentDidMount() {
    this.adjustPadding();
  }

  componentDidUpdate() {
    this.adjustPadding();
  }

  render() {

    let totalYears = 6000;
    let adjustedYear;
    if (this.props.timeline.startExt === 'B.C.') {
      adjustedYear = 4000 - Number(this.props.timeline.start);
    } else {
      adjustedYear = 4000 + Number(this.props.timeline.start);
    }
    let percent = adjustedYear / totalYears;
    let width = (percent * 100) + '%';
    let marginLeft = `calc(${width} - 50px)`;

    let className = "Timeline " + this.props.dir;

    return (
      <component id={`timeline-${this.props.timeline._id}`} className={className}>
        {this.props.showOptions ? (
          <div className="update-options flex jc-sb" style={this.props.dir === 'left' ? {right: '-80px'} : {left: '-80px'}}>
            <i className="material-icons" onClick={() => this.props.editItem(this.props.item)}>edit</i>
            <i className="material-icons" onClick={() => this.props.deleteItem(this.props.item.mapId)}>delete</i>
          </div>
        ) : null}
        <div className="date flex fd-c jc-c" style={{marginLeft: marginLeft}}>
          <span className="flex jc-c">
            <h1 id={`h1-${this.props.timeline._id}`}>
              {this.props.timeline.start} {this.props.timeline.startExt}
            </h1>
          </span>
          <span className="flex jc-c ai-c arrow">
            <i className="material-icons">arrow_drop_down</i>
          </span>
        </div>
        <div className="bar">
          <div id={`progress-${this.props.timeline._id}`} className="progress"
            style={{width: width}}>
          </div>
        </div>
      </component>
    );
  }
}

Timeline.prototype.adjustPadding = Meth.adjustPadding;

export default Timeline;
