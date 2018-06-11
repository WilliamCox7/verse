import React from 'react';
import * as Pack from '../../exports/packages';
import { getAsset } from '../../modules';
import './style.scss';

class Menu extends Pack.Component {
  render() {

    let scripture = this.props.scripture;
    let hasContext = scripture.verses[scripture.index] ? scripture.verses[scripture.index].context : null;

    return (
      <component id="Menu" style={this.props.show ? null : {display: "none"}}>
        <div className="button-container">
          {!hasContext ? (
            <div className="menu-button flex jc-c ai-c" onClick={() => this.props.openModal('context')}>
              <img src={getAsset('context')} />
              <h1>context</h1>
            </div>
          ) : null}
          <div className="menu-button flex jc-c ai-c" onClick={() => this.props.openModal('person')}>
            <img src={getAsset('geneology')} />
            <h1>person</h1>
          </div>
          <div className="menu-button flex jc-c ai-c" onClick={() => this.props.openModal('link')}>
            <img src={getAsset('link')} />
            <h1>link</h1>
          </div>
          <div className="menu-button flex jc-c ai-c" onClick={() => this.props.openModal('military')}>
            <img src={getAsset('military')} />
            <h1>military</h1>
          </div>
          <div className="menu-button flex jc-c ai-c" onClick={() => this.props.openModal('prophet')}>
            <img src={getAsset('prophet')} />
            <h1>prophet</h1>
          </div>
          <div className="menu-button flex jc-c ai-c" onClick={() => this.props.openModal('ruler')}>
            <img src={getAsset('ruler')} />
            <h1>ruler</h1>
          </div>
          {!hasContext ? (
            <div className="menu-button flex jc-c ai-c" onClick={() => this.props.openModal('timeline')}>
              <img src={getAsset('timeline')} />
              <h1>timeline</h1>
            </div>
          ) : null}
          <div className="comment-button flex jc-c ai-c" onClick={() => this.props.openModal('comment')}>
            <img src={this.props.user.url} />
            <h1>comment</h1>
          </div>
          <div onTouchEnd={this.props.hideMenu} className="add-section-menu flex jc-c ai-c">
            <h1>+</h1>
          </div>
        </div>
      </component>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    scripture: state.scripture
  }
}

export default Pack.connect(mapStateToProps)(Menu);
