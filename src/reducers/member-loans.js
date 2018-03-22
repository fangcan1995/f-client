import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    isFetching:false,
    myLoans:{
        charts:``,
        myList:'',
        status: 1,
        modalRepaymentApp: false,
        currentId:'',
        postResult:``,
        projectInfo:''
    },
    repaymentPlans:{
        charts:``,
        myList:``,
        projectId:'',
        dateStart:'',
        dateEnd:'',
        modalRepayment: false,
        proList:``,
        currentId:'',
        postResult:``,
        projectInfo:``
    },
});

export default createReducer(initialState, {
    ['myLoans/myLoans/FETCH_PENDING']: (state, action) => state.mergeDeep({
        isFetching: true,
    }),
    ['myLoans/myLoans/FETCH_FULFILLED']: (state, action) => state.mergeDeep({
        isFetching: false,
        myLoans: action.payload,
    }),
    ['myLoans/myLoans/FETCH_REJECTED']: (state, action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),
    ['myLoans/myLoans/MODIFY_STATE']:(state,action) => state.mergeDeep({
        myLoans:action.payload
    }),


    ['myLoans/repaymentPlans/FETCH_PENDING']: (state, action) => state.mergeDeep({
        isFetching: true,
    }),
    ['myLoans/repaymentPlans/FETCH_FULFILLED']: (state, action) => state.mergeDeep({
        isFetching: false,
        repaymentPlans: action.payload,
    }),
    ['myLoans/repaymentPlans/FETCH_REJECTED']: (state, action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),
    ['myLoans/repaymentPlans/MODIFY_STATE']:(state,action) => state.mergeDeep({
        repaymentPlans:action.payload
    }),
})



