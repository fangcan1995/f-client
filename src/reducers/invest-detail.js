import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    investInfo:{
        data:{},
        message:''
    },
    memberInfo:{
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
    },
    repayRecords:{
        data:{
            list:[]
        },
        message:''
    },
    postResult:{
        code:0,
        type:'',
        message:'',
        description:''

    },
});

export default createReducer(initialState, {

    ['investDetail/investInfo/MODIFY_STATE']:(state,action) => state.mergeDeep({
        investInfo:action.payload
    }),
    ['investDetail/memberInfo/MODIFY_STATE']:(state,action) => state.mergeDeep({
        memberInfo:action.payload
    }),
    ['investDetail/loan/MODIFY_STATE']:(state,action) => state.mergeDeep({
        loanInfo:action.payload
    }),
    ['investDetail/investRecords/MODIFY_STATE']:(state,action) => state.mergeDeep({
        investRecords:action.payload
    }),
    ['investDetail/repayRecords/MODIFY_STATE']:(state,action) => state.mergeDeep({
        repayRecords:action.payload
    }),
    ['investDetail/postResult/MODIFY_STATE']:(state,action) => state.mergeDeep({
        postResult:action.payload
    }),


})



