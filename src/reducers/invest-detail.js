import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    investInfo:{
        data:{},
        message:''
    },
    loanInfo:{
        data:{},
        message:''
    },
    investRecords:{
        data:{
            list:[]
        },
        message:''
    }
});

export default createReducer(initialState, {
    ['investDetail/investRecords/MODIFY_STATE']:(state,action) => state.mergeDeep({
        investRecords:action.payload
    }),

})



