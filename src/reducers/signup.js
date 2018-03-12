import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';
import { LOGIN, LOGOUT } from '../constants/actions-type';
const initialState = Immutable.fromJS({
  isFetching: false,
  imageCodeImg: '',
  verifyCode: {},
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


})
