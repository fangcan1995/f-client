import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    isFetching:false,
    isPosting:false,
    messagesList:'',
    readTag: '',
    readResult:``,
    deleteResult:``
});

export default createReducer(initialState, {
    //同步请求，修改查询条件
    ['mySettings/messages/RESET']:(state,action) => state.merge({
        readTag:action.payload,
        messagesList:``,
        deleteResult:``,
        readResult:``,
    }),
    //同步请求，修改消息列表数据
    ['mySettings/messages/MODIFY_LIST']:(state,action) => state.mergeDeep({
        messagesList:action.payload,
    }),
    //获取消息列表
    ['mySettings/messages/FETCH_PENDING']:(state,action) => state.merge({
        isFetching: true,
        deleteResult:``,
        readResult:``,
    }),
    ['mySettings/messages/FETCH_FULFILLED']:(state,action) => state.merge({
        isFetching: false,
        messagesList:action.payload
    }),
    ['mySettings/messages/FETCH_REJECTED']:(state,action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    }),
    //删除消息
    ['mySettings/messages/DELETE_PENDING']:(state,action) => state.mergeDeep({
        isFetching: true,
    }),
    ['mySettings/messages/DELETE_FULFILLED']:(state,action) => state.mergeDeep({
        isFetching: false,
        deleteResult:action.payload
    }),
    ['mySettings/messages/DELETE__REJECTED']:(state,action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),
    //设为已读
    ['mySettings/messages/SET_READED_PENDING']:(state,action) => state.merge({
        isFetching: true,
        readResult:``,
    }),
    ['mySettings/messages/SET_READED_FULFILLED']:(state,action) => state.merge({
        isFetching: false,
        readResult:action.payload
    }),
    ['mySettings/messages/SET_READED__REJECTED']:(state,action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    })

})



