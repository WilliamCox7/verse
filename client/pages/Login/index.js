import React from 'react';
import * as Pack from '../../exports/packages';
import * as Meth from './methods';
import { getAsset } from '../../modules';
import './style.scss';

class Login extends Pack.Component {

  constructor() {
    super();
    this.state = {
      screenW: screen.width,
      screenH: screen.height
    }
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({screenW: screen.width, screenH: screen.height});
    });
  }

  randGen() {
    return Math.floor(Math.random() * (15 - 0 + 1)) + 0;
  }

  render() {

    let bubbleWidth = this.state.screenW < 650 ? 130 : 192;
    let columns = Math.round(this.state.screenW / bubbleWidth) + 1;
    let rows = Math.round(this.state.screenH / bubbleWidth) + 1;
    let numOfBubbles = columns * rows;
    let bubblesWidth = columns * bubbleWidth;
    let bubbles = [];
    for (var i = 0; i < numOfBubbles; i++) {
      bubbles.push(
        <div key={i} className="bubble" style={{"background": colors[this.randGen()]}}></div>
      );
    }

    return (
      <page id="Login" className="flex jc-c">
        <div className="bubbles flex fw-w" style={{width: bubblesWidth}}>{bubbles}</div>
        <div className="logo flex jc-c ai-c">
          <img src={getAsset('logo-login')} />
        </div>
        <div className="fb-login-button flex ai-c" onClick={this.login}>
          <i className="material-icons">vpn_key</i> Login with Facebook
        </div>
      </page>
    );
  }
}

Login.prototype.login = Meth.login;

export default Pack.withRouter(Login);

const colors = [
  "#F7F7F7", "#EDEDED", "#FAFAFA", "#DDE1FF",
  "#E8E8E8", "#F0F2FF", "#D6D6D6", "#F2F2F2",
  "#ECECEC", "#EBEBEB", "#F0F0F0", "#E3E7FF",
  "#F7F7F7", "#F7F7F7", "#F7F7F7", "#F7F7F7"
]
