import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    sbList:{
        list:{
            data:{},
            message:''
        },
        filter:{
            type:0,
            loanApplyExpiry:0,
            rateGroup:0,
        },
        sort:{
            rate:0,
            loanApplyExpiry:0,
            publishTime:0,
            syje:0,
            tzjd:0,
        }
    },
    transferList:{
        charts:{
            data:{},
            message:''
        },
        myList:{
            data:{},
            message:''
        },
        pid:'',
        DateStart:'',
        DateEnd:'',
        modalRepayment: false,
        proList:[],
        currentId:'',
        postResult:0,
        repaymentInfo:{
            repaymentData:{},
            message:''
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



