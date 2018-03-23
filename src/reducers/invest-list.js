import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    isFetching:false,
    sbList:{
        list:``,
        filter:{
            noviceLoan:'',
            loanExpiry:'',
            rateGroup:'',
        },
        sort:{
            annualRate:0,
            loanExpiry:0,
            putTime:0,
            surplusAmount:0,
            investmentProgress:0,
        }
    },
    transferList:{
        list:``,
        sort:{
            annualRate:0,
            transferPeriod:0,
            putDate:0,
            surplusAmount:0,
            investmentProgress:0,
        }
    },
});

export default createReducer(initialState, {
    ['investList/sbList/FETCH_PENDING']: (state, action) => state.mergeDeep({
        isFetching: true,
    }),
    ['investList/sbList/FETCH_FULFILLED']: (state, action) => state.mergeDeep({
        isFetching: false,
        sbList: action.payload,
    }),
    ['investList/sbList/FETCH_REJECTED']: (state, action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),
    ['investList/sbList/MODIFY_STATE']:(state,action) => state.mergeDeep({
        sbList:action.payload
    }),

    ['investList/transferList/FETCH_PENDING']: (state, action) => state.mergeDeep({
        isFetching: true,
    }),
    ['investList/transferList/FETCH_FULFILLED']: (state, action) => state.mergeDeep({
        isFetching: false,
        transferList: action.payload,
    }),
    ['investList/transferList/FETCH_REJECTED']: (state, action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),
    ['investList/transferList/MODIFY_STATE']:(state,action) => state.mergeDeep({
        transferList:action.payload
    }),
})



