import React from 'react';
import * as Pack from '../../exports/packages';
import * as Comp from '../../exports/components';
import { getAsset } from '../../modules';
import './style.scss';

class Menu extends Pack.Component {
  render() {

    let scripture = this.props.scripture;
    let hasContext = scripture.verses[scripture.index] ? scripture.verses[scripture.index].context : null;

    return (
      <component id="Menu" style={this.props.show ? null : {display: "none"}} onClick={this.props.hideMenu}>
        <div className="menu-wrapper">
          <div className="button-container">
            {!hasContext ? (
              <div className="menu-button flex jc-c ai-c" onClick={() => this.props.openModal('context')}>
                <Comp.Circle image="context" />
                <h1>context</h1>
              </div>
            ) : null}
            <div className="menu-button flex jc-c ai-c" onClick={() => this.props.openModal('person')}>
              <Comp.Circle image="geneology" />
              <h1>person</h1>
            </div>
            <div className="menu-button flex jc-c ai-c" onClick={() => this.props.openModal('link')}>
              <Comp.Circle image="link" />
              <h1>link</h1>
            </div>
            <div className="menu-button flex jc-c ai-c" onClick={() => this.props.openModal('military')}>
              <Comp.Circle image="military" />
              <h1>military</h1>
            </div>
            <div className="menu-button flex jc-c ai-c" onClick={() => this.props.openModal('prophet')}>
              <Comp.Circle image="prophet" />
              <h1>prophet</h1>
            </div>
            <div className="menu-button flex jc-c ai-c" onClick={() => this.props.openModal('ruler')}>
              <Comp.Circle image="ruler" />
              <h1>ruler</h1>
            </div>
            {!hasContext ? (
              <div className="menu-button flex jc-c ai-c" onClick={() => this.props.openModal('timeline')}>
                <Comp.Circle image="timeline" />
                <h1>timeline</h1>
              </div>
            ) : null}
            <div className="comment-button flex jc-c ai-c" onClick={() => this.props.openModal('comment')}>
              <img src={this.props.user.url} />
              <h1>comment</h1>
            </div>
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
