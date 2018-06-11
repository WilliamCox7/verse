import React from 'react';
import * as Pack from './exports/packages';
import { store } from './store';
import App from './App';

Pack.ReactDOM.render(
  <Pack.Provider store={store}>
    <App />
  </Pack.Provider>
  , document.getElementById('root')
);
