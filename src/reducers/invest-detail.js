import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    investInfo:``,
    memberInfo:``,
    loanInfo:``,
    investRecords:``,
    investTransferRecords:``,
    repayRecords:``,
    postResult:``,
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
    /*['investDetail/investInfo/MODIFY_STATE']:(state,action) => state.mergeDeep({
        investInfo:action.payload
    }),*/



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


})



