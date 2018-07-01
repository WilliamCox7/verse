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
  }
  render() {
    return (
      <div id="Nav">
        <div className="nav-wrapper flex jc-sb">
          <div onClick={this.updateIndices} className="reference flex ai-c">
            {this.props.scripture.abrString}
          </div>
          <div className="logo flex jc-c ai-c">
            <img src={getAsset('logo-small', 'png')} />
          </div>
          <div className="add flex jc-fe ai-c" onClick={this.showMenu}>
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

const mapStateToProps = (state) => {
  return {
    scripture: state.scripture,
    nav: state.nav
  }
}

const mapDispatchToProps = {
  setNavIndex: Rdux.setNavIndex,
  setSwipeIndex: Rdux.setSwipeIndex,
  openModal: Rdux.openModal,
  closeModal: Rdux.closeModal
}

export default Pack.connect(mapStateToProps, mapDispatchToProps)(Nav);
