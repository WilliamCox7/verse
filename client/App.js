import React from 'react';
import * as Comp from './exports/components';
import * as Pack from './exports/packages';
import * as Page from './exports/pages';
import './reset.scss';
import './main.scss';

class App extends Pack.Component {

  constructor() {
    super();
    this.state = {
      pathname: window.location.pathname
    }
    this.updatePathname = this.updatePathname.bind(this);
  }

  updatePathname(pathname) {
    this.setState({pathname: pathname});
  }

  render() {
    return (
      <Pack.BrowserRouter>
        <application id="App">
          {this.state.pathname !== '/login' ? (<Comp.Nav />) : null}
          <Comp.HandleFbRedirect updatePathname={this.updatePathname} />
          <Pack.Route path="/login" component={Page.Login} />
          <Pack.Route exact path="/" component={Page.Home} />
        </application>
      </Pack.BrowserRouter>
    );
  }
}

export default App;
