import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';
import { LOGIN, LOGOUT } from '../constants/actions-type';
const initialState = Immutable.fromJS({
  isFetching: false,
  imageCodeImg: '',
  verifyCode: {},
  verifyCodeCd: 0,
});

export default createReducer(initialState, {
  ['signup/GET_IMAGE_CODE_PENDING']: (state, action) => state.merge({
    isFetching: true,
  }),
  ['signup/GET_IMAGE_CODE_FULFILLED']: (state, action) => state.merge({
    isFetching: false,
    imageCodeImg: action.payload
  }),
  ['signup/GET_IMAGE_CODE_REJECTED']: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),

  ['signup/SEND_VERIFY_CODE_PENDING']: (state, action) => state.merge({
    isFetching: true,
  }),
  ['signup/SEND_VERIFY_CODE_FULFILLED']: (state, action) => state.merge({
    isFetching: false,
    verifyCode: action.payload
  }),
  ['signup/SEND_VERIFY_CODE_REJECTED']: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),

  ['signup/SET_VERIFY_CODE_CD']: (state, action) => state.merge({
    verifyCodeCd: action.payload
  }),

  ['signup/CHECK_USER_EXIST_PENDING']: (state, action) => state.merge({
    isFetching: true,
  }),
  ['signup/CHECK_USER_EXIST_FULFILLED']: (state, action) => state.merge({
    isFetching: false,
    verifyCode: action.payload
  }),
  ['signup/CHECK_USER_EXIST_REJECTED']: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),

})
