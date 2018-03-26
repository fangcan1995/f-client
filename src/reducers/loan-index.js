import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';
import { message } from 'antd';
const initialState = Immutable.fromJS({
  isFetching: false,
  identityCard:'',
  maxAmount:'',
  memberId:'',
  mobilePhone:'',
  trueName:'',
  usableAmount:'',
  usedAmount:'',
  form:null,
  loanType:0,
  formData:{},
  applyMessage:'',
  errorMessage:'',
  postinged:false
});

export default createReducer(initialState, {
  
    ['loan/GET_APPLY_DATA_PENDING']: (state, action) => state.merge({
        isFetching: true,
    }),
    ['loan/GET_APPLY_DATA_FULFILLED']: (state, action) => {
      console.log(action)
      const { identityCard, maxAmount, memberId ,mobilePhone, trueName, usableAmount, usedAmount ,loanType } = action.payload;
        return state.mergeDeep({
          identityCard, maxAmount, memberId ,mobilePhone, trueName, usableAmount, usedAmount,loanType 
        })
    },
    ['loan/GET_APPLY_DATA_REJECTED']: (state, action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    }),
    
    ['loan/CHECK_FORM']: (state, action) => state.merge({
        form: action.payload
      }),

    ['loan/FORM_DATA']: (state, action) => state.merge({
      formData: action.payload
    }),

    ['loan/HIDE_MODAL']: (state, action) => {
      console.log('hide')
      return state.merge({
      postinged: false
    })},

    ['loan/POST_LOAN_DATA_PENDING']: (state, action) => {
        return state.merge({
        isFetching: true,
      })
    },
    ['loan/POST_LOAN_DATA_FULFILLED']: (state, action) => {
      return state.merge({
          isFetching: false,
          applyMessage: action.payload,
          postinged:true
        })
    },
    ['loan/POST_LOAN_DATA_REJECTED']: (state, action) => {
      console.log(action)
      return state.merge({
      isFetching: false,
      errorMessage: action.payload.msg,
      postinged:true
    })},
})
