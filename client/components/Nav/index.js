import React from 'react';
import * as Pack from '../../exports/packages';
import * as Comp from '../../exports/components';
import * as Rdux from '../../exports/reducers';
import * as Meth from './methods';
import { getAsset } from '../../modules';
import './style.scss';

class Nav extends Pack.Component {

  constructor() {
    super();
    this.state = {
      showMenu: false
    }
    this.updateIndices = this.updateIndices.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.openModal = this.openModal.bind(this);
    this.goBack = this.goBack.bind(this);
  }
  render() {
    return (
      <div id="Nav">
        <div className="nav-wrapper flex jc-sb">
          <div id="nav-back" className="back flex jc-fe ai-c" onClick={this.goBack}>
            <i className="material-icons">chevron_left</i>
          </div>
          <div id="nav-ref" onClick={this.updateIndices} className="reference flex jc-c ai-c fd-c">
            <h1>{this.props.scripture.abrString}</h1>
          </div>
          <div id="nav-add" className="add flex jc-fe ai-c" onClick={this.showMenu}>
            <i className="material-icons">add</i>
          </div>
          <Comp.Menu show={this.state.showMenu} hideMenu={this.hideMenu} openModal={this.openModal} />
          {this.props.nav.showModal ? (
            <Comp.Modal type={this.props.nav.modalType} closeModal={this.props.closeModal} item={this.props.nav.item} />
          ) : null}
        </div>
      </div>
    );
  }
}

Nav.prototype.updateIndices = Meth.updateIndices;
Nav.prototype.showMenu = Meth.showMenu;
Nav.prototype.hideMenu = Meth.hideMenu;
Nav.prototype.openModal = Meth.openModal;
Nav.prototype.goBack = Meth.goBack;

const mapStateToProps = (state) => {
  return {
    scripture: state.scripture,
    nav: state.nav,
    user: state.user
  }
}

const mapDispatchToProps = {
  setVerses: Rdux.setVerses,
  setNavIndex: Rdux.setNavIndex,
  setSwipeIndex: Rdux.setSwipeIndex,
  openModal: Rdux.openModal,
  closeModal: Rdux.closeModal
}

export default Pack.connect(mapStateToProps, mapDispatchToProps)(Nav);
