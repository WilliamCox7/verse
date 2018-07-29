import React from 'react';
import * as Pack from '../../exports/packages';
import * as Comp from '../../exports/components';
import * as Meth from './methods';
import { buildOptionsFor } from '../../modules';
import './style.scss';

class Home extends Pack.Component {

  constructor() {
    super();
    this.state = {
      workIndex: 0,
      bookIndex: 0,
      chapIndex: 0,
      versIndex: 0,
      pullingList: undefined,
      y: undefined,
      pullingDisabled: false,
      navIndex: 0,
      viewIndex: 0,
      verses: [],
      abrString: "Gen 1:1",
      refId: undefined,
      index: 101
    }
    this.changeIndex = this.changeIndex.bind(this);
    this.changeIndexFromSpan = this.changeIndexFromSpan.bind(this);
    this.setPulling = this.setPulling.bind(this);
    this.stopPulling = this.stopPulling.bind(this);
    this.updatePullingIndex = this.updatePullingIndex.bind(this);
    this.disablePulling = this.disablePulling.bind(this);
    this.enablePulling = this.enablePulling.bind(this);
    this.updateNavIndex = this.updateNavIndex.bind(this);
    this.updateViewIndex = this.updateViewIndex.bind(this);
    this.setVerse = this.setVerse.bind(this);
    this.buildOptionsFor = this.buildOptionsFor.bind(this);
    this.addAddition = this.addAddition.bind(this);
    this.addScriptureToEnd = this.addScriptureToEnd.bind(this);
    this.addScriptureToStart = this.addScriptureToStart.bind(this);
    this.delAddition = this.delAddition.bind(this);
    this.setIndex = this.setIndex.bind(this);
    this.setReference = this.setReference.bind(this);
    this.setVerses = this.setVerses.bind(this);
    this.updAddition = this.updAddition.bind(this);
  }

  componentDidMount() {
    let user = localStorage.getItem("user");
    if (user) user = JSON.parse(user);
    Pack.axios.get(`/verses/Old Testament/Genesis/1/1/${user.userId}`).then((response) => {
      let indices = [];
      for (var i = 0; i < 100; i++) {
        indices.push(false);
      }
      response.data.forEach((verse) => {
        indices.push(verse);
      });
      this.setVerses(indices);
    });
  }

  render() {

    let options = this.buildOptionsFor();
    let style = screen.width < 768 ? ({
      padding: '13px 5px', overflowY: 'hidden'
    }) : ({
      padding: '20px 5px', maxWidth: '744px', width: '100%', overflowY: 'hidden'
    });

    return (
      <page id="Home">
        <Comp.Nav viewIndex={this.state.viewIndex} updateNavIndex={this.updateNavIndex} updateViewIndex={this.updateViewIndex}
          setVerses={this.setVerses} updAddition={this.updAddition} addAddition={this.addAddition} setItem={this.setItem}
          scripture={this.state} />
        <div id="home-wrapper" className="flex jc-c">
          <Pack.SwipeableViews style={style} index={this.state.viewIndex} onChangeIndex={(index) => this.setVerse(options, index)}>
            <div>
              <div className="search-ref flex jc-sb">
                <div className="selects flex">
                  <select value={this.state.workIndex} name="workIndex" onChange={this.changeIndex}>{options.works.options}</select>
                  <select value={this.state.bookIndex} name="bookIndex" onChange={this.changeIndex}>{options.books.options}</select>
                  <select value={this.state.chapIndex} name="chapIndex" onChange={this.changeIndex}>{options.chapters.options}</select>
                  <select value={this.state.versIndex} name="versIndex" onChange={this.changeIndex}>{options.verses.options}</select>
                </div>
              </div>
              <Pack.SwipeableViews index={this.state.navIndex} onChangeIndex={this.updateNavIndex} style={{'overflowY': 'scroll', 'height': 'calc(100vh - 175px)'}}
                onSwitching={this.disablePulling} onTransitionEnd={this.enablePulling}>
                <div className="swipe-list flex fd-c fw-w" id="work" onTouchStart={(e) => this.setPulling(e, 'work')}
                  onTouchMove={this.updatePullingIndex} onTouchEnd={this.stopPulling}>{options.works.spans}</div>
                <div className="swipe-list flex fd-c fw-w" id="book" onTouchStart={(e) => this.setPulling(e, 'book')}
                  onTouchMove={this.updatePullingIndex} onTouchEnd={this.stopPulling}>{options.books.spans}</div>
                <div className="swipe-list flex fd-c fw-w" id="chap" onTouchStart={(e) => this.setPulling(e, 'chap')}
                  onTouchMove={this.updatePullingIndex} onTouchEnd={this.stopPulling}>{options.chapters.spans}</div>
                <div className="swipe-list flex fd-c fw-w" id="vers" onTouchStart={(e) => this.setPulling(e, 'vers')}
                  onTouchMove={this.updatePullingIndex} onTouchEnd={this.stopPulling}>{options.verses.spans}</div>
              </Pack.SwipeableViews>
            </div>
            <Comp.Scripture addScriptureToEnd={this.addScriptureToEnd} addScriptureToStart={this.addScriptureToStart} delAddition={this.delAddition}
              setIndex={this.setIndex} setReference={this.setReference} setVerses={this.setVerses} scripture={this.state} />
          </Pack.SwipeableViews>
        </div>
      </page>
    );
  }
}

Home.prototype.changeIndex = Meth.changeIndex;
Home.prototype.changeIndexFromSpan = Meth.changeIndexFromSpan;
Home.prototype.setPulling = Meth.setPulling;
Home.prototype.stopPulling = Meth.stopPulling;
Home.prototype.updatePullingIndex = Meth.updatePullingIndex;
Home.prototype.disablePulling = Meth.disablePulling;
Home.prototype.enablePulling = Meth.enablePulling;
Home.prototype.updateNavIndex = Meth.updateNavIndex;
Home.prototype.updateViewIndex = Meth.updateViewIndex;
Home.prototype.setVerse = Meth.setVerse;
Home.prototype.buildOptionsFor = buildOptionsFor;
Home.prototype.addAddition = Meth.addAddition;
Home.prototype.addScriptureToEnd = Meth.addScriptureToEnd;
Home.prototype.addScriptureToStart = Meth.addScriptureToStart;
Home.prototype.delAddition = Meth.delAddition;
Home.prototype.setIndex = Meth.setIndex;
Home.prototype.setReference = Meth.setReference;
Home.prototype.setVerses = Meth.setVerses;
Home.prototype.updAddition = Meth.updAddition;

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default Pack.connect(mapStateToProps)(Home);
