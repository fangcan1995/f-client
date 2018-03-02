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
        nowEarnCount: ''
    },
    investInfo: {
        investValue: [],
        ageDistribute: [],
        sexDistribute: []
    },
    borrowInfo: {
        loanCount: [],
        loanMemberCount: [],
        loanMoney: []
    }
})


export default  createReducer (initialState, {
    ['GETDATA_FULFILLED']: (state, action) => {
        state.merge({
            constantData: action.payload
        });

    }
}) 