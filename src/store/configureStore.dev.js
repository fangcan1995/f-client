import { createStore, applyMiddleware, compose } from 'redux';

import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import { combineReducers } from 'redux-immutablejs';
import Immutable from 'immutable';

import rootReducer from '../reducers';
const logger = createLogger();

const enhancer = compose(
  applyMiddleware(
    thunk,
    promiseMiddleware(),
    logger,
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer,
    initialState, enhancer
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}