import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    messages:{
        isFetching:false,
        myList:'',
        readTag: '',
        readResult:{},
        deleteResult:{}
    },
    riskAssess:{
        status:'',
        myList:'',
        result:{},
        postResult:'',
    }

});

export default createReducer(initialState, {
    ['mySettings/messages/FETCH_PENDING']:(state,action) => state.mergeDeep({
        isFetching: true,
    }),
    ['mySettings/messages/FETCH_FULFILLED']:(state,action) => state.mergeDeep({
        isFetching: false,
        messages:action.payload
    }),
    ['mySettings/messages/FETCH_REJECTED']:(state,action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),
    ['mySettings/messages/MODIFY_STATE']:(state,action) => state.mergeDeep({
        messages:action.payload
    }),


    ['mySettings/riskAssess/FETCH_PENDING']:(state,action) => state.mergeDeep({
        isFetching: true,
    }),
    ['mySettings/riskAssess/FETCH_FULFILLED']:(state,action) => state.mergeDeep({
        isFetching: false,
        riskAssess:action.payload
    }),
    ['mySettings/riskAssess/FETCH_REJECTED']:(state,action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),
    ['mySettings/riskAssess/MODIFY_STATE']:(state,action) => state.mergeDeep({
        riskAssess:action.payload
    }),
})



