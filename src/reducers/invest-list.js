import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    sbList:{
        list:{
            data:'',
            message:''
        },
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
        list:{
            data:{},
            message:''
        },
        sort:{
            rate:0,
            loanApplyExpiry:0,
            publishTime:0,
            syje:0,
            tzjd:0,
        }
    },
});

export default createReducer(initialState, {
    ['investList/sbList/MODIFY_STATE']:(state,action) => state.mergeDeep({
        sbList:action.payload
    }),
    ['investList/transferList/MODIFY_STATE']:(state,action) => state.mergeDeep({
        transferList:action.payload
    }),
})



