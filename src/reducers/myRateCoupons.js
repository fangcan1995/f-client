import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    rcStatus:0,
    data:{
        list:[],
        pageNum:1,
        total:0,
        pageSize:10,
    },
    loaded:false,
});


export default createReducer(initialState, {
    ['FETCH_START']: (state, action) => state.merge({
        data:{
            total:0,
        },
    }),
    ['FETCH_SUCCESS']: (state, action) => state.merge({
        data: action.payload,
        loaded: true,
    }),
    ['FETCH_FAIL']: (state, action) => state.merge({
        loaded: true,
    }),
    ['TOGGLE_CLASS']: (state, action) => state.merge({
        rcStatus: action.payload,
    })
})

