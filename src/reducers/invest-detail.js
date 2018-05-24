import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    isFetching:false,
    isPosting:false,
    investInfo:``,
    memberInfo:``,
    loanInfo:``,
    investRecords:``,
    investTransferRecords:``,
    repayRecords:``,
    postResult:``,
    availableRewards:``,
});

export default createReducer(initialState, {
    ['investDetail/investInfo/FETCH_PENDING']: (state, action) => state.mergeDeep({
        isFetching: true,
    }),
    ['investDetail/investInfo/FETCH_FULFILLED']: (state, action) => state.mergeDeep({
        isFetching: false,
        investInfo: action.payload,
    }),
    ['investDetail/investInfo/FETCH_REJECTED']: (state, action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),
    //
    ['investDetail/loanInfo/FETCH_PENDING']: (state, action) => state.mergeDeep({
        isFetching: true,
    }),
    ['investDetail/loanInfo/FETCH_FULFILLED']: (state, action) => state.mergeDeep({
        isFetching: false,
        loanInfo: action.payload,
    }),
    ['investDetail/loanInfo/FETCH_REJECTED']: (state, action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),
    //
    ['investDetail/investRecords/FETCH_PENDING']: (state, action) => state.mergeDeep({
        isFetching: true,
    }),
    ['investDetail/investRecords/FETCH_FULFILLED']: (state, action) => state.mergeDeep({
        isFetching: false,
        investRecords: action.payload,
    }),
    ['investDetail/investRecords/FETCH_REJECTED']: (state, action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),
    //investTransferRecords
    ['investDetail/investTransferRecords/FETCH_PENDING']: (state, action) => state.mergeDeep({
        isFetching: true,
    }),
    ['investDetail/investTransferRecords/FETCH_FULFILLED']: (state, action) => state.mergeDeep({
        isFetching: false,
        investTransferRecords: action.payload,
    }),
    ['investDetail/investTransferRecords/FETCH_REJECTED']: (state, action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),
    //
    ['investDetail/repayRecords/FETCH_PENDING']: (state, action) => state.mergeDeep({
        isFetching: true,
    }),
    ['investDetail/repayRecords/FETCH_FULFILLED']: (state, action) => state.mergeDeep({
        isFetching: false,
        repayRecords: action.payload,
    }),
    ['investDetail/repayRecords/FETCH_REJECTED']: (state, action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),
    //可用奖励
    ['investDetail/availableRewards/FETCH_PENDING']: (state, action) => state.mergeDeep({
        isFetching: true,
    }),
    ['investDetail/availableRewards/FETCH_FULFILLED']: (state, action) => state.mergeDeep({
        isFetching: false,
        availableRewards: action.payload,
    }),
    ['investDetail/availableRewards/FETCH_REJECTED']: (state, action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),


    //投资
    ['investDetail/invest/POST_PENDING']: (state, action) => state.mergeDeep({
        //isFetching: true,
        isPosting:true
    }),
    ['investDetail/invest/POST_FULFILLED']: (state, action) => state.mergeDeep({
        //isFetching: false,
        isPosting:false,
        postResult: action.payload,
    }),
    ['investDetail/invest/POST_REJECTED']: (state, action) => state.mergeDeep({
        //isFetching: false,
        isPosting:false,
        errorMessage: action.message
    }),


    ['investDetail/memberInfo/MODIFY_STATE']:(state,action) => state.mergeDeep({
        memberInfo:action.payload
    }),
    ['investDetail/loan/MODIFY_STATE']:(state,action) => state.mergeDeep({
        loanInfo:action.payload
    }),
    ['investDetail/investRecords/MODIFY_STATE']:(state,action) => state.mergeDeep({
        investRecords:action.payload
    }),
    ['investDetail/investTransferRecords/MODIFY_STATE']:(state,action) => state.mergeDeep({
        investTransferRecords:action.payload
    }),
    ['investDetail/repayRecords/MODIFY_STATE']:(state,action) => state.mergeDeep({
        repayRecords:action.payload
    }),
    ['investDetail/postResult/MODIFY_STATE']:(state,action) => state.mergeDeep({
        postResult:action.payload
    }),

    //修改可用红包
    ['investDetail/availableRewards/CHANGE_DEFAULT']: (state, action) => state.mergeDeep({
        isFetching: false,
        availableRewards: action.payload,
    }),
})



