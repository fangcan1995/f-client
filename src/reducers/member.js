import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    isFetching:false,
    accountsInfo:{
        basicInfo:``,
        amount:'',
        redInfo:``,
        couponInfo:``,
        openAccountStatus:'',   //是否开户
        riskStatus:'',//是否测评0 未测评 1
        riskLevel:``, //风险级别
        noviceStatus:``, //是否新手（0：不是；1：是） ,
        acBank:{
            bankName:'',
            bankNo:'',
        },
        result:``

    },

    charts:{
        chartsMonth:'',
        chartsDay:'',
    },








});

export default createReducer(initialState, {
    ['member/FETCH_PENDING']:(state,action) => state.mergeDeep({
        isFetching: true,
    }),
    ['member/FETCH_FULFILLED']:(state,action) => state.mergeDeep({
        isFetching: false,
        accountsInfo:action.payload
    }),
    ['member/FETCH_REJECTED']:(state,action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),
    ['member/FETCH_CHARTS_PENDING']:(state,action) => state.mergeDeep({
        isFetching: true,
    }),
    ['member/FETCH_CHARTS_FULFILLED']:(state,action) => state.mergeDeep({
        isFetching: false,
        charts:action.payload
    }),
    ['member/FETCH_CHARTS_REJECTED']:(state,action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),
    ['member/MODIFY_STATE']:(state,action) => state.mergeDeep({
        accountsInfo:action.payload
    }),
})



