import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

import fetch from 'isomorphic-fetch';


const initialState = Immutable.fromJS({
    totalData: {
        detailAmountSum: '',
        detailCount: '',
        earnAmountSum: '',
        memberCount: '',
        surplusRpmtAmountSum: '',
        surplusRpmtCount: '',
        lateRpmtAmountSum: '',
        lateRpmtCount: '',
        rpmtCount: '',
        nowRpmtCount: '',
        earnCount: '',
        nowEarnCount: '',
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

/* const initialState = Immutable.fromJS({
    totalData: {
        detailAmountSum: '',
        detailCount: '',
        earnAmountSum: '',
        memberCount: '',
        surplusRpmtAmountSum: '',
        surplusRpmtCount: '',
        lateRpmtAmountSum: '',
        lateRpmtCount: '',
        rpmtCount: '',
        nowRpmtCount: '',
        earnCount: '',
        nowEarnCount: ''
    },
}); */

/* const initialState = Immutable.fromJS({
    testD: '312312'
}) */



export default  createReducer (initialState, {
    ['GET_TOTALDATA_FULFILLED']: (state, action) => {
        return state.merge({
            totalData: action.payload[0].data ? action.payload[0].data : action.payload[0].error,
            borrowInfo: action.payload[1].data ? action.payload[1].data : action.payload[1].error,
            investInfo: action.payload[2].data ? action.payload[2].data : action.payload[2].error
        })
    }
}) 