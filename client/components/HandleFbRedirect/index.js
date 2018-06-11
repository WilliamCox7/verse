import React from 'react';
import * as Pack from '../../exports/packages';
import * as Rdux from '../../exports/reducers';
import * as Meth from './methods';

class HandleFbRedirect extends Pack.Component {

  constructor() {
    super();
    this.checkLoginState = this.checkLoginState.bind(this);
    this.statusChangeCallback = this.statusChangeCallback.bind(this);
  }

  componentDidMount() {
    let self = this;
    window.fbAsyncInit = () => {
      FB.init({
        appId: '2027960510797048',
        cookie: true,
        xfbml: true,
        version: 'v2.8'
      });
      self.checkLoginState();
    };
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      self.props.setUser(user.url, user.userId);
    }
  }

  render() {
    return (
      <component></component>
    );
  }
}

HandleFbRedirect.prototype.checkLoginState = Meth.checkLoginState;
HandleFbRedirect.prototype.statusChangeCallback = Meth.statusChangeCallback;

const mapDispatchToProps = {
  setUser: Rdux.setUser
}

export default Pack.withRouter(Pack.connect(null, mapDispatchToProps)(HandleFbRedirect));
