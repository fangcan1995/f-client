import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';
import cookie from 'js-cookie';

import { LOGIN, LOGOUT } from '../constants/actions-type';

const initialState = Immutable.fromJS({
  isFetching: false,
  isAuthenticated: cookie.get('token') ? true : false,
  user: cookie.getJSON('user') || {},
  imageCodeImg: '',
  verifyCode: {},
});

export default createReducer(initialState, {
  ['auth/LOGIN_PENDING']: (state, action) => state.merge({
    isFetching: true,
    isAuthenticated: false,
  }),
  ['auth/LOGIN_FULFILLED']: (state, action) => state.merge({
    isFetching: false,
    isAuthenticated: true,
    user: action.payload
  }),
  ['auth/LOGIN_REJECTED']: (state, action) => state.merge({
    isFetching: false,
    isAuthenticated: false,
    errorMessage: action.message
  }),

  ['auth/LOGOUT_PENDING']: (state, action) => state.merge({
    isFetching: true,
    // isAuthenticated: true,
  }),
  ['auth/LOGOUT_FULFILLED']: (state, action) => state.merge({
    isFetching: false,
    isAuthenticated: false,
  }),

  ['auth/LOGOUT_REJECTED']: (state, action) => state.merge({
    isFetching: false,
    // isAuthenticated: true,
    errorMessage: action.message
  }),

  ['auth/GET_IMAGE_CODE_PENDING']: (state, action) => state.merge({
    isFetching: true,
  }),
  ['auth/GET_IMAGE_CODE_FULFILLED']: (state, action) => state.merge({
    isFetching: false,
    imageCodeImg: action.payload
  }),
  ['auth/GET_IMAGE_CODE_REJECTED']: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),

  ['auth/SEND_VERIFY_CODE_PENDING']: (state, action) => state.merge({
    isFetching: true,
  }),
  ['auth/SEND_VERIFY_CODE_FULFILLED']: (state, action) => state.merge({
    isFetching: false,
    verifyCode: action.payload
  }),
  ['auth/SEND_VERIFY_CODE_REJECTED']: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),


})
