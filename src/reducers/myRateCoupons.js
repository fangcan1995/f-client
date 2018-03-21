import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    isFetching:false,
    rcStatus:0,
    data:'',
});


export default createReducer(initialState, {
    ['myRateCoupons/FETCH_PENDING']: (state, action) => state.merge({
        isFetching: true,
    }),
    ['myRateCoupons/FETCH_FULFILLED']: (state, action) => state.merge({
        isFetching: false,
        data: action.payload,
    }),
    ['myRateCoupons/FETCH_REJECTED']: (state, action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    }),
    ['TOGGLE_CLASS']: (state, action) => state.merge({
        rcStatus: action.payload,
        data:``
    })

})

