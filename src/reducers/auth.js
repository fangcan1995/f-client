import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';
import cookie from 'js-cookie';

import { LOGIN, LOGOUT } from '../constants/actions-type';

const initialState = Immutable.fromJS({
  isFetching: false,
  isAuthenticated: cookie.get('token') ? true : false,
  user: cookie.getJSON('user') || {},
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
  ['auth/LOGOUT']: (state, action) => state.merge({
    isFetching: false,
    isAuthenticated: false,
  })
})
