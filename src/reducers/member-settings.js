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

});

export default createReducer(initialState, {
    ['mySettings/messages/MODIFY_STATE']:(state,action) => state.mergeDeep({
        messages:action.payload
    }),
})



