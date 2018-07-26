import React from 'react';
import * as Comp from './exports/components';
import * as Pack from './exports/packages';
import * as Page from './exports/pages';
import './reset.scss';
import './main.scss';

class App extends Pack.Component {
  render() {
    return (
      <Pack.BrowserRouter>
        <application id="App">
          <Comp.HandleFbRedirect />
          <Pack.Route path="/login" component={Page.Login} />
          <Pack.Route exact path="/" component={Page.Home} />
        </application>
      </Pack.BrowserRouter>
    );
  }
}

export default App;
