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
  
    ['super/GET_SUPER_PARTNER_INFO_PENDING']: (state, action) => state.merge({
        isFetching: true,
    }),
    ['super/GET_SUPER_PARTNER_INFO_FULFILLED']: (state, action) => {
      console.log(action)
      const { totalCommission, totalInviteNum } = action.payload;
        return state.mergeDeep({
            totalCommission, 
            totalInviteNum
        })
    },
    ['super/GET_SUPER_PARTNER_INFO_REJECTED']: (state, action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    }),
    
    // ['loan/CHECK_FORM']: (state, action) => state.merge({
    //     form: action.payload
    //   }),

    // ['loan/FORM_DATA']: (state, action) => state.merge({
    //   formData: action.payload
    // }),

    // ['loan/HIDE_MODAL']: (state, action) => {
    //   console.log('hide')
    //   return state.merge({
    //   postinged: false
    // })},

    // ['loan/POST_LOAN_DATA_PENDING']: (state, action) => {
    //     return state.merge({
    //     isFetching: true,
    //   })
    // },
    // ['loan/POST_LOAN_DATA_FULFILLED']: (state, action) => {
    //   return state.merge({
    //       isFetching: false,
    //       applyMessage: action.payload,
    //       postinged:true
    //     })
    // },
    // ['loan/POST_LOAN_DATA_REJECTED']: (state, action) => {
    //   console.log(action)
    //   return state.merge({
    //   isFetching: false,
    //   errorMessage: action.payload.msg,
    //   postinged:true
    // })},
})
