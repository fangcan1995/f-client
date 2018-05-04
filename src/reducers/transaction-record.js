import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    filter:{
        trade_type:``,              //交易类型
        trade_result:``,            //交易结果
        dateStart:``,            //开始时间
        dateEnd:``,            //结束时间
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



