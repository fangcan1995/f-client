import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    isFetching:false,
    isPosting:false,
    myLoans:{
        charts:``,
        myList:``,
        status: 1,
        modalRepaymentApp: false,
        currentId:'',
        postResult:``,
        projectInfo:'',
    },
    repaymentPlans:{
        charts:``,
        myList:``,
        filter:{
            projectId:'',
            dateStart:'',
            dateEnd:'',
        },
        modalRepayment: false,
        proList:``,
        currentId:'',
        postResult:``,
        projectInfo:``
    },
    imageCodeImg:``
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

    ['myLoans/myLoans/POST_PENDING']: (state, action) => state.mergeDeep({
        isPosting: true,
    }),
    ['myLoans/myLoans/POST_FULFILLED']: (state, action) => state.mergeDeep({
        isPosting: false,
        myLoans: action.payload,
    }),
    ['myLoans/myLoans/POST_REJECTED']: (state, action) => state.mergeDeep({
        isPosting: false,
        errorMessage: action.message
    }),

    ['myLoans/GET_IMAGE_CODE_PENDING']: (state, action) => state.mergeDeep({
        isFetching: true,
    }),
    ['myLoans/GET_IMAGE_CODE_FULFILLED']: (state, action) => state.mergeDeep({
        isFetching: false,
        imageCodeImg: action.payload
    }),
    ['myLoans/GET_IMAGE_CODE_REJECTED']: (state, action) => state.mergeDeep({
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
    ['myLoans/repaymentPlans/POST_PENDING']: (state, action) => state.mergeDeep({
        isPosting: true,
    }),
    ['myLoans/repaymentPlans/POST_FULFILLED']: (state, action) => state.mergeDeep({
        isPosting: false,
        repaymentPlans: action.payload,
    }),
    ['myLoans/repaymentPlans/POST_REJECTED']: (state, action) => state.mergeDeep({
        isPosting: false,
        errorMessage: action.message
    }),
    ['myLoans/repaymentPlans/MODIFY_STATE']:(state,action) => state.mergeDeep({
        repaymentPlans:action.payload
    }),
    //异步获取借款合同
    ['myLoans/myLoans/PACT_FETCH_PENDING']:(state,action) => state.mergeDeep({
        isFetching: true,
    }),
    ['myLoans/myLoans/PACT_FETCH_FULFILLED']:(state,action) => state.mergeDeep({
        isFetching: false,
        myLoans:action.payload
    }),
    ['myLoans/myLoans/PACT_FETCH_REJECTED']:(state,action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),
    //异步获取告知书
    ['myLoans/myLoans/PACT_INFORM_FETCH_PENDING']:(state,action) => state.mergeDeep({
        isFetching: true,
    }),
    ['myLoans/myLoans/PACT_INFORM_FETCH_FULFILLED']:(state,action) => state.mergeDeep({
        isFetching: false,
        myLoans:action.payload
    }),
    ['myLoans/myLoans/PACT_INFORM_FETCH_REJECTED']:(state,action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),
})



