import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';
import { LOGIN, LOGOUT } from '../constants/actions-type';
const initialState = Immutable.fromJS({
  isFetching: false,
  imageCodeImg: '',
  verifyCode: {},
  verifyCodeCd: 0,
  signup:true
});

export default createReducer(initialState, {
  ['login/GET_IMAGE_CODE_PENDING']: (state, action) => state.merge({
    isFetching: true,
  }),
  ['login/GET_IMAGE_CODE_FULFILLED']: (state, action) => state.merge({
    isFetching: false,
    imageCodeImg: action.payload
  }),
  ['login/GET_IMAGE_CODE_REJECTED']: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),

  ['login/SEND_VERIFY_CODE_PENDING']: (state, action) => state.merge({
    isFetching: true,
  }),
  ['login/SEND_VERIFY_CODE_FULFILLED']: (state, action) => state.merge({
    isFetching: false,
    verifyCode: action.payload
  }),
  ['login/SEND_VERIFY_CODE_REJECTED']: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),


  ['login/SET_VERIFY_CODE_CD']: (state, action) => state.merge({
    verifyCodeCd: action.payload
  }),

  ['login/SET_SIGNUP']: (state, action) => state.merge({
    signup: !action.payload
  }),

  // ['login/SET_SIGNUP_FULFILLED']: (state, action) => state.merge({
  //   isFetching: false,
  //   signup: !action.payload
  // }),
})
