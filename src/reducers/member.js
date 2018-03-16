import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    accountsInfo:{
        basicInfo:{
            realName:''
        },
        amount:{},
        redInfo:{},
        couponInfo:{},
        openAccountStatus:'',   //是否开户
        acBank:{
            bankName:'',
            bankNo:'',
        },

    },
    chartsMonth:'',
    chartsDay:'',







});

export default createReducer(initialState, {
    ['member/MODIFY_STATE']:(state,action) => state.mergeDeep({
        accountsInfo:action.payload
    }),
})



