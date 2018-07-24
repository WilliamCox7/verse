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
      showInfo: true,
      options: {
        context: false,
        link: false,
        prophet: false,
        ruler: false,
        military: false,
        person: false,
        comment: false
      }
    }
    this.hideInfo = this.hideInfo.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.toggleOptions = this.toggleOptions.bind(this);
  }

  componentDidMount() {
    let windowHeight = window.screen.height;
    let scrollWindow = document.getElementById('scroll-window');
    let scrollWindowY = scrollWindow.getBoundingClientRect().y;
    let scrollWindowHeight = windowHeight - scrollWindowY;
    scrollWindow.style.height = scrollWindowHeight + 'px';
  }

  render() {
    let dirSwitch = false, className;
    let contextItem, linkItems, prophetItems, rulerItems, militaryItems, personItems, timelineItem, commentItems;

    let items = this.props.verse.items;
    if (items) {
      contextItem = items.find((item) => item.type === 'context');
      linkItems = items.filter((item) => item.type === 'link');
      prophetItems = items.filter((item) => item.type === 'prophet');
      rulerItems = items.filter((item) => item.type === 'ruler');
      militaryItems = items.filter((item) => item.type === 'military');
      personItems = items.filter((item) => item.type === 'person');
      timelineItem = items.find((item) => item.type === 'timeline');
      commentItems = items.filter((item) => item.type === 'comment');
    }

    let context, link, prophet, ruler, military, person, timeline, comment;

    if (contextItem) {
      dirSwitch = !dirSwitch;
      className = `item-wrapper single flex ${dirSwitch ? null : 'fd-rr'}`;
      context = (
        <div className={className}>
          <Comp.TextBox dir={dirSwitch ? 'right' : 'left'} text={contextItem.context} editItem={this.editItem}
            deleteItem={this.deleteItem} item={contextItem} showOptions={this.state.options.context} />
          <Pack.Holdable config={hold} onHoldComplete={() => this.toggleOptions('context')}>
            <div>
              <Comp.Circle title="context" image="context" />
            </div>
          </Pack.Holdable>
        </div>
      );
    }

    if (linkItems && linkItems.length) {
      dirSwitch = !dirSwitch;
      className = `item-wrapper flex ${dirSwitch ? null : 'fd-rr'}`;
      items = linkItems.map((linkItem, i) => {
        return (
          <Comp.TextDropDown dir={dirSwitch ? 'right' : 'left'} titleLeft={linkItem.title} content={linkItem.content}
            titleRight={linkItem.reference} show={i === 0} key={i} editItem={this.editItem} deleteItem={this.deleteItem} item={linkItem}
            showOptions={this.state.options.link} />
        );
      })
      link = (
        <div className={className}>
          <div className={`items-wrapper ${dirSwitch ? 'right' : 'left'}`}>
            {items}
          </div>
          <Pack.Holdable config={hold} onHoldComplete={() => this.toggleOptions('link')}>
            <div>
              <Comp.Circle title="link" image="link" />
            </div>
          </Pack.Holdable>
        </div>
      );
    }

    if (prophetItems && prophetItems.length) {
      dirSwitch = !dirSwitch;
      className = `item-wrapper flex ${dirSwitch ? null : 'fd-rr'}`;
      items = prophetItems.map((prophetItem, i) => {
        return (
          <Comp.TextDropDown dir={dirSwitch ? 'right' : 'left'} titleLeft={prophetItem.name} content={prophetItem.content}
            titleRight={`${prophetItem.start} ${prophetItem.startExt}`} show={i === 0} key={i} editItem={this.editItem} deleteItem={this.deleteItem} item={prophetItem}
            showOptions={this.state.options.prophet} />
        );
      })
      prophet = (
        <div className={className}>
          <div className={`items-wrapper ${dirSwitch ? 'right' : 'left'}`}>
            {items}
          </div>
          <Pack.Holdable config={hold} onHoldComplete={() => this.toggleOptions('prophet')}>
            <div>
              <Comp.Circle title="prophet" image="prophet" />
            </div>
          </Pack.Holdable>
        </div>
      );
    }

    if (rulerItems && rulerItems.length) {
      dirSwitch = !dirSwitch;
      className = `item-wrapper flex ${dirSwitch ? null : 'fd-rr'}`;
      items = rulerItems.map((rulerItem, i) => {
        return (
          <Comp.TextDropDown dir={dirSwitch ? 'right' : 'left'} titleLeft={rulerItem.name} content={rulerItem.content}
            titleRight={`${rulerItem.start} ${rulerItem.startExt}`} show={i === 0} key={i} editItem={this.editItem} deleteItem={this.deleteItem} item={rulerItem}
            showOptions={this.state.options.ruler} />
        );
      })
      ruler = (
        <div className={className}>
          <div className={`items-wrapper ${dirSwitch ? 'right' : 'left'}`}>
            {items}
          </div>
          <Pack.Holdable config={hold} onHoldComplete={() => this.toggleOptions('ruler')}>
            <div>
              <Comp.Circle title="ruler" image="ruler" />
            </div>
          </Pack.Holdable>
        </div>
      );
    }

    if (militaryItems && militaryItems.length) {
      dirSwitch = !dirSwitch;
      className = `item-wrapper flex ${dirSwitch ? null : 'fd-rr'}`;
      items = militaryItems.map((militaryItem, i) => {
        return (
          <Comp.TextDropDown dir={dirSwitch ? 'right' : 'left'} titleLeft={militaryItem.name} content={militaryItem.content}
            titleRight={`${militaryItem.start} ${militaryItem.startExt}`} show={i === 0} key={i} editItem={this.editItem} deleteItem={this.deleteItem} item={militaryItem}
            showOptions={this.state.options.military} />
        );
      })
      military = (
        <div className={className}>
          <div className={`items-wrapper ${dirSwitch ? 'right' : 'left'}`}>
            {items}
          </div>
          <Pack.Holdable config={hold} onHoldComplete={() => this.toggleOptions('military')}>
            <div>
              <Comp.Circle title="military" image="military" />
            </div>
          </Pack.Holdable>
        </div>
      );
    }

    if (personItems && personItems.length) {
      dirSwitch = !dirSwitch;
      className = `item-wrapper flex ${dirSwitch ? null : 'fd-rr'}`;
      items = personItems.map((personItem, i) => {
        return (
          <Comp.TextDropDown dir={dirSwitch ? 'right' : 'left'} titleLeft={personItem.name} content={personItem.content}
            titleRight={`${personItem.start} ${personItem.startExt}`} show={i === 0} key={i} editItem={this.editItem} deleteItem={this.deleteItem} item={personItem}
            showOptions={this.state.options.person} />
        );
      })
      person = (
        <div className={className}>
          <div className={`items-wrapper ${dirSwitch ? 'right' : 'left'}`}>
            {items}
          </div>
          <Pack.Holdable config={hold} onHoldComplete={() => this.toggleOptions('person')}>
            <div>
              <Comp.Circle title="person" image="geneology" />
            </div>
          </Pack.Holdable>
        </div>
      );
    }

    if (timelineItem) {
      dirSwitch = !dirSwitch;
      className = `item-wrapper single flex ${dirSwitch ? null : 'fd-rr'}`;
      timeline = (
        <div className={className}>
          <Comp.Timeline dir={dirSwitch ? 'right' : 'left'} timeline={timelineItem} end={false} />
          <Pack.Holdable config={hold} onHoldComplete={() => this.toggleOptions('timeline')}>
            <div>
              <Comp.Circle title="timeline" image="timeline" />
            </div>
          </Pack.Holdable>
        </div>
      );
    }

    if (commentItems && commentItems.length) {
      dirSwitch = !dirSwitch;
      className = `item-wrapper flex ${dirSwitch ? null : 'fd-rr'}`;
      items = commentItems.map((commentItem, i) => {
        return (
          <Comp.TextBox dir={dirSwitch ? 'right' : 'left'} text={commentItem.comment} key={i} editItem={this.editItem}
            deleteItem={this.deleteItem} item={commentItem} showOptions={this.state.options.comment} />
        );
      })
      comment = (
        <div className={className}>
          <div className={`items-wrapper flex ${dirSwitch ? 'right' : 'left'}`}>
            {items}
          </div>
          <Pack.Holdable config={hold} onHoldComplete={() => this.toggleOptions('comment')}>
            <div>
              <div className="comment-circle">
                <img src={this.props.user.url} />
              </div>
              <h1 className="title">comment</h1>
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
            <div id="scroll-window">
              {contextItem && this.state.showInfo ? (context) : null}
              {linkItems && linkItems.length && this.state.showInfo ? (link) : null}
              {prophetItems && prophetItems.length && this.state.showInfo ? (prophet) : null}
              {rulerItems && rulerItems.length && this.state.showInfo ? (ruler) : null}
              {militaryItems && militaryItems.length && this.state.showInfo ? (military) : null}
              {personItems && personItems.length && this.state.showInfo ? (person) : null}
              {timelineItem && this.state.showInfo ? (timeline) : null}
              {commentItems && commentItems.length ? (comment) : null}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

Verse.prototype.hideInfo = Meth.hideInfo;
Verse.prototype.editItem = Meth.editItem;
Verse.prototype.deleteItem = Meth.deleteItem;
Verse.prototype.toggleOptions = Meth.toggleOptions;

const hold = Pack.defineHold({holdFor: 500});

const mapStateToProps = (state) => {
  return {
    scripture: state.scripture,
    user: state.user
  }
}

const mapDispatchToProps = {
  openModal: Rdux.openModal,
  delAddition: Rdux.delAddition
}

export default Pack.connect(mapStateToProps, mapDispatchToProps)(Verse);
