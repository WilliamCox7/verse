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
    return (
      <div className="Verse">
        {this.props.verse ? (
          <div>
            <div className="border-wrapper">
              <div className="content-wrapper flex">
                <Comp.Circle title={this.props.verse.bookFul} letter={this.props.verse.bookFul} />
                <div className="content">
                  <h1>{this.props.verse.content}</h1>
                </div>
              </div>
              <i className="material-icons" style={!this.state.showInfo ? {transform: 'rotate(270deg)'} : null}
                onClick={this.hideInfo}>arrow_drop_down</i>
            </div>
            {this.props.verse.context ? (
              <div className="context-wrapper flex">
                <div className="verse-context">
                  <h1>{this.props.verse.context}</h1>
                </div>
                <Pack.Holdable config={hold} onHoldComplete={() => this.openModal('context')}>
                  <div>
                    <Comp.Circle title="context" image="context" />
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
