import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    isFetching:false,
    info:'',
    errorMessage:``
});
export default createReducer(initialState, {
    ['special/FETCH_PENDING']: (state, action) => state.mergeDeep({
        isFetching: true,
    }),
    ['special/FETCH_FULFILLED']: (state, action) => state.mergeDeep({
        isFetching: false,
        info: action.payload,
    }),
    ['special/FETCH_REJECTED']: (state, action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),


})