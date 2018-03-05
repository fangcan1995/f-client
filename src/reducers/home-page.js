import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  isFetching: false,
  data: [],
});

export default createReducer(initialState, {
  ['homePage/GET_DATA_PENDING']: (state, action) => state.merge({
    isFetching: true,
  }),
  ['homePage/GET_DATA_FULFILLED']: (state, action) => state.merge({
    isFetching: false,
    data: action.payload
  }),
  ['homePage/GET_DATA_REJECTED']: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),
})
