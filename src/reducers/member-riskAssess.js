import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    isFetching:false,
    hideResult:``,
    myList:'',
    result:'',
    postResult:'',
});

export default createReducer(initialState, {
    //同步修改数据
    ['mySettings/riskAssess/MODIFY_STATE']:(state,action) => state.mergeDeep({
        myList:action.payload
    }),
    //同步切换结果和题目
    ['mySettings/riskAssess/TOGGLE']:(state,action) => state.mergeDeep({
        hideResult:action.payload
    }),
    //提交后,重置
    ['mySettings/riskAssess/RESET']:(state,action) => state.mergeDeep({
        hideResult:`0`,
        myList:'',
        postResult:'',
    }),
    //异步获取测评题目
    ['mySettings/riskAssess/FETCH_PENDING']:(state,action) => state.mergeDeep({
        isFetching: true,
    }),
    ['mySettings/riskAssess/FETCH_FULFILLED']:(state,action) => state.mergeDeep({
        isFetching: false,
        myList:action.payload
    }),
    ['mySettings/riskAssess/FETCH_REJECTED']:(state,action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),
    //异步获取测评结果
    ['mySettings/riskAssess/FETCH_RESULT_PENDING']:(state,action) => state.mergeDeep({
        isFetching: true,
    }),
    ['mySettings/riskAssess/FETCH_RESULT_FULFILLED']:(state,action) => state.mergeDeep({
        isFetching: false,
        result:action.payload.result,
        hideResult:action.payload.hideResult
    }),
    ['mySettings/riskAssess/FETCH_RESULT_REJECTED']:(state,action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),
    //提交答案
    ['mySettings/riskAssess/FETCH_POST_PENDING']:(state,action) => state.mergeDeep({
        isFetching: true,
        isPosting: true,
    }),
    ['mySettings/riskAssess/FETCH_POST_FULFILLED']:(state,action) => state.mergeDeep({
        isFetching: false,
        isPosting: false,
        postResult:action.payload
    }),
    ['mySettings/riskAssess/FETCH_POST_REJECTED']:(state,action) => state.mergeDeep({
        isFetching: false,
        isPosting: false,
        errorMessage: action.message
    }),




})



