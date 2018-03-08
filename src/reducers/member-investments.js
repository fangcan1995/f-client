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
    ['FETCH_LIST_SUCCESS']: (state, action) => state.mergeDeep({
        myReceiving:{
            myList: {
                data:action.payload,
                message:'获取成功'
            }
        }
    }),
    ['FETCH_LIST_FAIL']: (state, action) => state.mergeDeep({
        myReceiving: {
            myList: {}
        }
    }),
    ['FETCH_CHARTS_SUCCESS']: (state, action) =>
        state.mergeDeep(action.payload)
    ,
    /*['FETCH_CHARTS_FAIL']: (state, action) => state.mergeDeep({
        myReceiving: {
            charts: {}
        }
    }),*/
    ['myInvest/investments/MODIFY_STATE']:(state,action) => state.mergeDeep({
        myInvestments:action.payload
    }),
    ['myInvest/receiving/MODIFY_STATE']:(state,action) => state.mergeDeep({
        myReceiving:action.payload
    }),
})



