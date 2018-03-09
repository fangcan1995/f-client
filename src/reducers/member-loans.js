import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    myLoans:{
        charts:{
            data:{},
            message:''
        },
        myList:{
            data:{},
            message:''
        },
        status: 1,
        modalRepaymentApp: false,
        currentId:'',
        postResult:0,
        repaymentInfo:{
            repaymentData:{},
            message:''
        }
    },
    repaymentPlans:{
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
    ['myLoans/myLoans/MODIFY_STATE']:(state,action) => state.mergeDeep({
        myLoans:action.payload
    }),
    ['myLoans/repaymentPlans/MODIFY_STATE']:(state,action) => state.mergeDeep({
        myReceiving:action.payload
    }),
})



