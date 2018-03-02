import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    reStatus:0,
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
            list:[],
            pageNum:1,
            total:0,
            pageSize:10,
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
        reStatus: action.payload,
    })
})


/*
export default function myRedEnvelopes(state=initialState, action) {
    console.log('---------');
    console.log(action);
    switch (action.type) {
        case 'FETCH_START':
            return state;
        case 'FETCH_SUCCESS':
            return Immutable.fromJS(state).set('data',action.payload).set('loaded',true).toJS();
        case 'FETCH_FAIL':
            return Immutable.fromJS(state).set('loaded', true).toJS();
        case 'TOGGLE_CLASS':
            return Immutable.fromJS(state).set('reStatus',action.payload).toJS();
        default:
            return state;
    }

};*/
