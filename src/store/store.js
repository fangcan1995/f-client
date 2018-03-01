import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutablejs';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import * as reducers from '../reducers';
import { createLogger } from 'redux-logger';
const logger = createLogger();
const reducer = combineReducers(reducers);
const state = Immutable.fromJS({});
const store = reducer(state);
const finalCreateStore = applyMiddleware(thunk, promiseMiddleware(), logger)(createStore);
export default finalCreateStore(reducer, store);