import React from 'react';
import * as Pack from '../../exports/packages';
import * as Rdux from '../../exports/reducers';
import * as Comp from '../../exports/components';
import * as Meth from './methods';
import './style.scss';

class Verse extends Pack.Component {

  constructor() {
    super();
    this.state = {
      showInfo: true
    }
    this.hideInfo = this.hideInfo.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  render() {

    let contextItem, personItem, timelineItem;
    if (this.props.items) {
      contextItem = this.props.items.find((item) => item.type === 'context')
      personItem = this.props.items.find((item) => item.type === 'person');
      timelineItem = this.props.items.find((item) => item.type === 'timeline');
    }

    return (
      <div className="Verse">
        {this.props.verse ? (
          <div>
            <div className="border-wrapper">
              <div className="content-wrapper flex">
                <Comp.Circle title={this.props.verse.bookFul} letter={this.props.verse.bookFul} />
                <Comp.TextBox text={this.props.verse.content} dir="left" />
              </div>
              <i className="material-icons" style={!this.state.showInfo ? {transform: 'rotate(270deg)'} : null}
                onClick={this.hideInfo}>arrow_drop_down</i>
            </div>
            {contextItem ? (
              <div className="item-wrapper flex">
                <Comp.TextBox dir="right" text={contextItem.context} />
                <Pack.Holdable config={hold} onHoldComplete={() => this.openModal('context')}>
                  <div>
                    <Comp.Circle title="context" image="context" />
                  </div>
                </Pack.Holdable>
              </div>
            ) : null}
            {personItem ? (
              <div className="item-wrapper flex fd-rr">
                <Comp.TextDropDown dir="left" titleLeft={personItem.name} content={personItem.content}
                  titleRight={`${personItem.start} ${personItem.startExt}`} />
                <Pack.Holdable config={hold} onHoldComplete={() => this.openModal('person')}>
                  <div>
                    <Comp.Circle title="person" image="geneology" />
                  </div>
                </Pack.Holdable>
              </div>
            ) : null}
            {timelineItem ? (
              <div className="item-wrapper flex">
                <Comp.Timeline dir="right" timeline={timelineItem} end={false} />
                <Pack.Holdable config={hold} onHoldComplete={() => this.openModal('timeline')}>
                  <div>
                    <Comp.Circle title="timeline" image="timeline" />
                  </div>
                </Pack.Holdable>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

Verse.prototype.hideInfo = Meth.hideInfo;
Verse.prototype.openModal = Meth.openModal;

const hold = Pack.defineHold({holdFor: 500});

const mapDispatchToProps = {
  openModal: Rdux.openModal
}

export default Pack.connect(null, mapDispatchToProps)(Verse);
