import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    modalPlan: false,
    modalTransfer: false,
    currentId:'',
    data:{
        list:[],
        pageNum:1,
        total:0,
        pageSize:10,
    },
    charts:{
        totalInvestment:{},
        accumulatedIncome:{},
    },
    status: 1,



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
    ['FETCH_LIST_SUCCESS']: (state, action) => state.merge({
        data: action.payload,
        loaded: true,
    }),
    ['FETCH_CHARTS_SUCCESS']: (state, action) => state.merge({
        charts: action.payload,
        loaded: true,
    }),
    ['TOGGLE_CLASS']: (state, action) => state.merge({
        rcStatus: action.payload,
    })
})



