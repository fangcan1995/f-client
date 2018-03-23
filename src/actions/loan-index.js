require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
import cFetch from '../utils/cFetch';
import readBlobAsDataURL from '../utils/readBlobAsDataURL';
// import { LOGIN, LOGOUT } from './../constants/actions-type';
import { API_CONFIG } from './../config/api';
import urls from '../utils/url'

export const getImageCode = () => {
  return {
    type: 'loan/GET_IMAGE_CODE',
    async payload() {
      const res = await fetch('http://172.16.1.234:8060/' + API_CONFIG.imageCode, { credentials: 'include' });
      const blob = await res.blob();
      const dataURL = await readBlobAsDataURL(blob);
      return dataURL;
    }
  }
}

// export const sendVerifyCode = params => {
//   return {
//     type: 'loan/SEND_VERIFY_CODE',
//     async payload() {
//       const res = await cFetch('http://172.16.1.234:8060/' + API_CONFIG.loginVerifyCode + params, { credentials: 'include' }, false);
//       const { code, data } = res;
//       if ( code == 0 ) {
//         return data || {};
//       } else {
//         throw res;
//       }
//     }
//   }
// }

export const getApplyData = (loanType ) => {
    console.log(loanType)
  return {
    type: 'loan/GET_APPLY_DATA',
    data:{loanType},
    async payload() {
        const res = await cFetch(`${urls}/loans/apply/qualification?access_token=b1b3685c-0b71-491e-a9fb-10d26a6c74d4` , { method: 'GET' } , false);
        const { code, data } = res;
        if ( code == 0 ) {
            console.log(data)
        return {loanType,...data} || {};
        } else {
        throw res;
        }
    }
  }
}

export const setSignup = (e) => {
  return {
    type: 'loan/SET_SIGNUP', 
    payload: e,
  }
}

export const checkForm = (e) => {
    console.log(1)
    return {
      type: 'loan/CHECK_FORM', 
      payload: e,
    }
  }

  export const formData = (e) => {
    console.log(1000)
    return {
      type: 'loan/FORM_DATA', 
      payload: e,
    }
  }

  export const postLoanData = params => {
    console.log(params)
    params=JSON.stringify(params)
    return {
      type: 'loan/POST_LOAN_DATA',
      // async/await配合promise处理异步
      async payload() {
        const res = await cFetch(`${urls}/loans/apply?access_token=b1b3685c-0b71-491e-a9fb-10d26a6c74d4` , { 
          method: 'POST', 
          headers: {
                'Content-Type': 'application/json'
            },
          body:params 
          }, false);
          const { code, data } = res;
          if ( code == 0 ) {
            return data || {};
          } else {
            throw res;
          }
        }
      };
  };