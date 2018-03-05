import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    modalPlan: false,
    modalTransfer: false,
    currentId:'',
    myList:{
        data:{},
        message:''
    },
    charts:{
        totalInvestment:{},
        accumulatedIncome:{},
        message:''
    },
    status: 1,
    modalPlan: false,
    modalTransfer: false,

    currentPro:{
        currentId:'',
        planData:{},
    }
});


export default createReducer(initialState, {
    ['FETCH_LIST_SUCCESS']: (state, action) => state.merge({
        myList: {
            data:action.payload,
            message:'获取成功'
        }
    }),
    ['FETCH_LIST_FAIL']: (state, action) => state.merge({
        myList: {
            data:{},
            message:action.payload
        }
    }),
    ['FETCH_CHARTS_SUCCESS']: (state, action) => state.merge({
        charts: action.payload,
    }),
    ['FETCH_CHARTS_FAIL']: (state, action) => state.merge({
        charts: {
            totalInvestment:{},
            accumulatedIncome:{},
            message:action.payload
        },
        loaded: true,
    }),

    ['TOGGLE_CLASS']: (state, action) => state.merge({
        status: action.payload,
    }),
    ['MODAL_PLAN_SHOW']:(state, action) => state.merge({
        modalPlan: true,
        /*currentPro: {
            id:action.id,
            planData:action.payload,
        }*/
    }),

    ['MODAL_PLAN_HIDE']:(state, action) => state.merge({
        modalPlan: false,
        currentPro: {
            currentId:'',
            planData:{},
        },
    }),
    ['MODAL_TRANSFER_SHOW']:(state, action) => state.merge({
        modalTransfer: true,
        currentId: action.payload,
    }),
    ['MODAL_TRANSFER_HIDE']:(state, action) => state.merge({
        modalTransfer: false,
        currentId: action.payload,
    }),
    ['FETCH_PLANLIST_SUCCESS']: (state, action) => state.merge({
        currentPro: {
            currentId:action.id,
            planData:action.payload,
        }
    }),
    ['FETCH_PLANLIST_FAIL']: (state, action) => state.merge({
        currentPro: {
            currentId:action.id,
            planData:{},
        }
    }),
})



