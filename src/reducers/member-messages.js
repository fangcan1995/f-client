import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    isFetching:false,
    isPosting:false,
    messagesList:'',
    readTag: '',
    readResult:{},
    deleteResult:{}
});

export default createReducer(initialState, {
    ['mySettings/messages/FETCH_PENDING']:(state,action) => state.merge({
        isFetching: true,
    }),
    ['mySettings/messages/FETCH_FULFILLED']:(state,action) => state.merge({
        isFetching: false,
        messagesList:action.payload
    }),
    ['mySettings/messages/FETCH_REJECTED']:(state,action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    }),
    ['mySettings/messages/DELETE_PENDING']:(state,action) => state.mergeDeep({
        isFetching: true,
    }),
    ['mySettings/messages/DELETE_FULFILLED']:(state,action) => state.mergeDeep({
        isFetching: false,
        messages:action.payload
    }),
    ['mySettings/messages/DELETE__REJECTED']:(state,action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),
    ['mySettings/messages/SET_READED_PENDING']:(state,action) => state.mergeDeep({
        isFetching: true,
    }),
    ['mySettings/messages/SET_READED_FULFILLED']:(state,action) => state.mergeDeep({
        isFetching: false,
        messages:action.payload
    }),
    ['mySettings/messages/SET_READED__REJECTED']:(state,action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),
    ['mySettings/messages/MODIFY_STATE']:(state,action) => state.mergeDeep({
        readTag:action.payload.readTag,
        messagesList:action.payload.messagesList,
    })

})



