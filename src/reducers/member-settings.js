import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    messages:{
        myList:{
            data:'',
            message:''
        },
        isRead: '',
        readState:{
            isRead:'',
            isShow:'',
        },
        defaultChecked:''
    },
    riskAssess:{
        status:'',
        myList:{
            data:'',
            message:''
        },
        defaultChecked:'',
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
    ['mySettings/messages/MODIFY_STATE']:(state,action) => state.mergeDeep({
        messages:action.payload
    }),
    ['mySettings/riskAssess/MODIFY_STATE']:(state,action) => state.mergeDeep({
        riskAssess:action.payload
    }),
})



