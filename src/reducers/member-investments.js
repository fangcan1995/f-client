import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    isFetching:false,
    isPosting:false,
    myInvestments:{
        charts:``,
        myList:``,
        status: 1,
        modalPlan: false,
        modalTransfer: false,
        currentId:'',
        postResult:``,
        planList:``,
        /*transferInfo:{
            transFinanced:1000,
            proTransferFee:0.01,
            proMinInvestAmount:100,
        }//假数据*/
        transferInfo:``
    },
    myReceiving:{
        charts:``,
        myList:``,
    },

});

export default createReducer(initialState, {
    //异步获取我的投资
    ['myInvest/investments/FETCH_PENDING']:(state,action) => state.mergeDeep({
        isFetching: true,
    }),
    ['myInvest/investments/FETCH_FULFILLED']:(state,action) => state.mergeDeep({
        isFetching: false,
        myInvestments:action.payload
    }),
    ['myInvest/investments/FETCH_REJECTED']:(state,action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),
    //异步获取债转详情
    ['myInvest/investments/INFO_FETCH_PENDING']:(state,action) => state.mergeDeep({
        isFetching: true,
    }),
    ['myInvest/investments/INFO_FETCH_FULFILLED']:(state,action) => state.mergeDeep({
        isFetching: false,
        myInvestments:action.payload
    }),
    ['myInvest/investments/INFO_FETCH_REJECTED']:(state,action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),

    ['myInvest/investments/TRANSFER_APP_PENDING']:(state,action) => state.mergeDeep({
        isFetching: true,
        isPosting: true,
    }),
    ['myInvest/investments/TRANSFER_APP_FULFILLED']:(state,action) => state.mergeDeep({
        isFetching: false,
        isPosting: false,
        myInvestments:action.payload
    }),
    ['myInvest/investments/TRANSFER_APP_REJECTED']:(state,action) => state.mergeDeep({
        isFetching: false,
        isPosting: false,
        errorMessage: action.message
    }),

    ['myInvest/investments/MODIFY_STATE']:(state,action) => state.mergeDeep({
        myInvestments:action.payload
    }),


    ['myInvest/receiving/FETCH_PENDING']:(state,action) => state.mergeDeep({
        isFetching: true,
    }),
    ['myInvest/receiving/FETCH_FULFILLED']:(state,action) => state.mergeDeep({
        isFetching: false,
        myReceiving:action.payload
    }),
    ['myInvest/receiving/FETCH_REJECTED']:(state,action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),
    ['myInvest/receiving/MODIFY_STATE']:(state,action) => state.mergeDeep({
        myReceiving:action.payload
    }),
})



