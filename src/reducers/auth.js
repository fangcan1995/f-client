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
  ['LOGIN_PENDING']: (state, action) => state.merge({
    isFetching: true,
    isAuthenticated: false,
  }),
  ['LOGIN_FULFILLED']: (state, action) => {
      console.log('1234567')
      console.log(action);
      state.merge({
        isFetching: false,
        isAuthenticated: true,
        user: action.payload
      })
  },
  ['LOGIN_REJECTED']: (state, action) => state.merge({
    isFetching: false,
    isAuthenticated: false,
    errorMessage: action.message
  }),
  ['LOGOUT']: (state, action) => state.merge({
    isFetching: false,
    isAuthenticated: false,
  })
})
