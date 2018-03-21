import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    reStatus:0,
    data:``,
    isFetching:false,
});


export default createReducer(initialState, {
    ['myRedEnvelopes/FETCH_PENDING']: (state, action) => state.merge({
        isFetching: true,
    }),
    ['myRedEnvelopes/FETCH_FULFILLED']: (state, action) => state.merge({
        isFetching: false,
        data: action.payload,
    }),
    ['myRedEnvelopes/FETCH_REJECTED']: (state, action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    }),
    ['TOGGLE_CLASS']: (state, action) => state.merge({
        reStatus: action.payload,
        data:``
    })
})



