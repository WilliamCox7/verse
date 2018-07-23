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
    let dirSwitch = false, className;
    let contextItem, linkItem, personItem, timelineItem;

    let items = this.props.verse.items;
    if (items) {
      contextItem = items.find((item) => item.type === 'context');
      linkItem = items.find((item) => item.type === 'link');
      personItem = items.find((item) => item.type === 'person');
      timelineItem = items.find((item) => item.type === 'timeline');
    }

    let context, link, person, timeline;

    if (contextItem) {
      dirSwitch = !dirSwitch;
      className = `item-wrapper flex ${dirSwitch ? null : 'fd-rr'}`;
      context = (
        <div className={className}>
          <Comp.TextBox dir={dirSwitch ? 'right' : 'left'} text={contextItem.context} />
          <Pack.Holdable config={hold} onHoldComplete={() => this.openModal('context')}>
            <div>
              <Comp.Circle title="context" image="context" />
            </div>
          </Pack.Holdable>
        </div>
      );
    }

    if (linkItem) {
      dirSwitch = !dirSwitch;
      className = `item-wrapper flex ${dirSwitch ? null : 'fd-rr'}`;
      link = (
        <div className={className}>
          <Comp.TextDropDown dir={dirSwitch ? 'right' : 'left'} titleLeft={linkItem.title} content={linkItem.content}
            titleRight={linkItem.reference} />
          <Pack.Holdable config={hold} onHoldComplete={() => this.openModal('link')}>
            <div>
              <Comp.Circle title="link" image="link" />
            </div>
          </Pack.Holdable>
        </div>
      );
    }

    if (personItem) {
      dirSwitch = !dirSwitch;
      className = `item-wrapper flex ${dirSwitch ? null : 'fd-rr'}`;
      person = (
        <div className={className}>
          <Comp.TextDropDown dir={dirSwitch ? 'right' : 'left'} titleLeft={personItem.name} content={personItem.content}
            titleRight={`${personItem.start} ${personItem.startExt}`} />
          <Pack.Holdable config={hold} onHoldComplete={() => this.openModal('person')}>
            <div>
              <Comp.Circle title="person" image="geneology" />
            </div>
          </Pack.Holdable>
        </div>
      );
    }

    if (timelineItem) {
      dirSwitch = !dirSwitch;
      className = `item-wrapper flex ${dirSwitch ? null : 'fd-rr'}`;
      timeline = (
        <div className={className}>
          <Comp.Timeline dir={dirSwitch ? 'right' : 'left'} timeline={timelineItem} end={false} />
          <Pack.Holdable config={hold} onHoldComplete={() => this.openModal('timeline')}>
            <div>
              <Comp.Circle title="timeline" image="timeline" />
            </div>
          </Pack.Holdable>
        </div>
      );
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
            {contextItem ? (context) : null}
            {linkItem ? (link) : null}
            {personItem ? (person) : null}
            {timelineItem ? (timeline) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

Verse.prototype.hideInfo = Meth.hideInfo;
Verse.prototype.openModal = Meth.openModal;

const hold = Pack.defineHold({holdFor: 500});

const mapStateToProps = (state) => {
  return {
    scripture: state.scripture
  }
}

const mapDispatchToProps = {
  openModal: Rdux.openModal
}

export default Pack.connect(mapStateToProps, mapDispatchToProps)(Verse);
