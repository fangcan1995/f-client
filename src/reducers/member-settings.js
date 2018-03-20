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
        status:1,
        myList:[],
        //defaultChecked:'',
        result:{
            requireEval:'',  //是否需要风险评估
            result:'',
            message:''
        },
        postResult:{
            code:0,
            type:'',
            message:'',
            description:''
        },
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


    ['mySettings/riskAssess/MODIFY_STATE']:(state,action) => state.mergeDeep({
        riskAssess:action.payload
    }),
})



