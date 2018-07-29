import * as Pack from './exports/packages';
import root from './root';

export const store = Pack.createStore(
  root, Pack.compose(
    Pack.applyMiddleware(Pack.logger, Pack.thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
