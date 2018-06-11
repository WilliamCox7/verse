import React from 'react';
import * as Pack from '../../exports/packages';
import * as Meth from './methods';
import { getAsset } from '../../modules';
import './style.scss';

class Login extends Pack.Component {

  constructor() {
    super();
    this.login = this.login.bind(this);
  }

  render() {
    return (
      <page id="Login" className="flex jc-c">
        <div className="logo flex jc-c ai-c">
          <img src={getAsset('logo-login')} />
        </div>
        <div className="fb-login-button" onClick={this.login}>
          <i className="material-icons">vpn_key</i>
        </div>
      </page>
    );
  }
}

Login.prototype.login = Meth.login;

export default Pack.withRouter(Login);
