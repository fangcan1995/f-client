import { LOGIN, LOGOUT } from './../constants/actionTypes';
import initialState from './initialState';
import reducersGenerate from './reducersGenerate';
// 登出功能暂时不需要提交接口
/*export default reducersGenerate([LOGIN], initialState.auth, {
  'LOGIN_PENDING': (state) => {
    return Object.assign({}, state, {
      isFetching: true,
      isAuthenticated: false
    });
  },
  'LOGIN_FULFILLED': (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: true,
      user: action.user
    });
  },
  'LOGIN_REJECTED': (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: false,
      errorMessage: action.message
    });
  },
});*/

export default (state = initialState.auth, action) => {
  let actionTypes = {
    'LOGIN_PENDING': (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      });
    },
    'LOGIN_FULFILLED': (state, action) => {
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        user: action.user
      });
    },
    'LOGIN_REJECTED': (state, action) => {
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      });
    },
    'LOGOUT': (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
      });
    },

  }
  return actionTypes[action.type] && actionTypes[action.type](state, action) || state;
}
