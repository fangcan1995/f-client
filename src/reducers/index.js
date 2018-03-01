import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';

import reducersGenerate from './reducersGenerate';
import riskAssess from './riskAssess'; //风险测评
import myRedEnvelopes from './myRedEnvelopes'; //我的红包

import {
  USER
} from './../constants/actionTypes';
import initialState from './initialState';

const users = reducersGenerate(USER, initialState.users);

const rootReducer = combineReducers({
  routing: routerReducer,
  auth,
  users,
    riskAssess, //风险测评
    myRedEnvelopes,//我的红包
});

export default rootReducer;