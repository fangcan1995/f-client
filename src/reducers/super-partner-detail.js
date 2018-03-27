import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';
const initialState = Immutable.fromJS({
  isFetching: false,
  identityCard:'',
  totalCommission:10000,
  totalInviteNum:100,
  errorMessage:''
});

export default createReducer(initialState, {
  
    ['super/GET_SUPER_PARTNER_DETAIL_PENDING']: (state, action) => state.merge({
        isFetching: true,
    }),
    ['super/GET_SUPER_PARTNER_DETAIL_FULFILLED']: (state, action) => {
      console.log(action)
      const { totalCommission, totalInviteNum } = action.payload;
        return state.mergeDeep({
            totalCommission, 
            totalInviteNum
        })
    },
    ['super/GET_SUPER_PARTNER_DETAIL_REJECTED']: (state, action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    }),
})