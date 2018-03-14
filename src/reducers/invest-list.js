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
            data:'',
            message:''
        },
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
    ['investList/sbList/MODIFY_STATE']:(state,action) => state.mergeDeep({
        sbList:action.payload
    }),
    ['investList/transferList/MODIFY_STATE']:(state,action) => state.mergeDeep({
        transferList:action.payload
    }),
})



