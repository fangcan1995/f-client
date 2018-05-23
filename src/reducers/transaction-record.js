import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    filter:{
        payType:``,              //交易类型
        transState:``,            //交易结果
        startTime:``,            //开始时间
        endTime:``,            //结束时间
        sortBy:`-createTime`,
    },
    data:``,                     //数据
    isFetching:false,
});

export default createReducer(initialState, {
    ['transaction-record/FETCH_PENDING']: (state, action) => state.merge({
        isFetching: true,
    }),
    ['transaction-record/FETCH_FULFILLED']: (state, action) => state.merge({
        isFetching: false,
        data: action.payload,
    }),
    ['transaction-record/FETCH_REJECTED']: (state, action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    }),
    ['transaction-record/MODIFY_STATE']:(state,action) => state.merge({
        filter:action.payload.filter,
        data:action.payload.data,
    }),

})



