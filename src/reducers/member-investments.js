import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    myInvestments:{
        charts:{
            data:{},
            message:''
        },
        myList:{
            data:{},
            message:''
        },
        status: 1,
        modalPlan: false,
        modalTransfer: false,
        currentId:'',
        postResult:0,
        currentPro:{
            currentId:'',
            planData:[],
            message:''
        },
        transferInfo:{
            currentId:'',
            transferData:{},
            message:''
        }
    },
    myReceiving:{
        charts:{
            data:{},
            message:''
        },
        myList:{
            data:{},
            message:''
        },
    },
    /*myList:{
        data:{},
        message:''
    },
    charts:{
        doneDto:{},
        todoDto:{},
        message:''
    },
    status: 1,*/
});

export default createReducer(initialState, {
    ['myInvest/investments/MODIFY_STATE']:(state,action) => state.mergeDeep({
        myInvestments:action.payload
    }),
    ['myInvest/receiving/MODIFY_STATE']:(state,action) => state.mergeDeep({
        myReceiving:action.payload
    }),
})



