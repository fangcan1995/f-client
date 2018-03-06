import { createReducer } from 'redux-immutablejs';
import Immutable, { merge } from 'immutable';

import fetch from 'isomorphic-fetch';


const initialState = Immutable.fromJS({
    totalData: {
        detailAmountSum: '0',
        detailCount: '0',
        earnAmountSum: '0',
        memberCount: '0',
        surplusRpmtAmountSum: '0',
        surplusRpmtCount: '0',
        lateRpmtAmountSum: '0',
        lateRpmtCount: '0',
        rpmtCount: '0',
        nowRpmtCount: '0',
        earnCount: '0',
        nowEarnCount: '0',
    },
    investInfo: {
        investValue: [],
        ageDistribute: [],
        sexDistribute: [],
    },
    borrowInfo: {
        loanCount: [],
        loanMemberCount: [],
        loanMoney: [],
    }
})




export default  createReducer (initialState, {
    ['GET_TOTALDATA_FULFILLED']: (state, action) => {
        return state.merge({
            totalData: action.payload[0].data ? action.payload[0].data : action.payload[0].error,
            borrowInfo: action.payload[1].data ? action.payload[1].data : action.payload[1].error,
            investInfo: action.payload[2].data ? action.payload[2].data : action.payload[2].error
        })
    },
    ['UPDATE_LOANMONEY_FULFILLED']: (state, action) => {
        console.log(state.toJS());
        return state.mergeDeep({
            borrowInfo: action.payload.data
        });
    },
    ['UPDATE_LOANCOUNT_FULFILLED']: (state, action) => {
        console.log(state.toJS());
        return state.mergeDeep({
            borrowInfo: action.payload.data
        });
    },
    ['UPDATE_LOANMEMBERCOUNT_FULFILLED']: (state, action) => {
        console.log(state.toJS());
        return state.mergeDeep({
            borrowInfo: action.payload.data
        });
    },
    ['UPDATE_INVESTINFO_FULFILLED']: (state, action) => {
        console.log(state.toJS());
        return state.merge({
            investInfo: action.payload.data
        });
    }
}) 