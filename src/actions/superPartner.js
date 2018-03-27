import cFetch from '../utils/cFetch';
import readBlobAsDataURL from '../utils/readBlobAsDataURL';
// import { LOGIN, LOGOUT } from './../constants/actions-type';
import { API_CONFIG } from './../config/api';
import {urls,token} from '../utils/url'




export const getSuperPartnerInfo = () => {
  return {
    type: 'partner/GET_SUPER_PARTNER_INFO',
    async payload() {
        const res = await cFetch(`${urls}/superPartners/{memberId}/homeViews?access_token=${token}` , { method: 'GET' } , false);
        const { code, data } = res;
        if ( code == 0 ) {
            console.log(data)
        return data || {};
        } else {
        throw res;
        }
    }
  }
}

// export const setSignup = (e) => {
//   return {
//     type: 'loan/SET_SIGNUP', 
//     payload: e,
//   }
// }

// export const checkForm = (e) => {
//     console.log(1)
//     return {
//       type: 'loan/CHECK_FORM', 
//       payload: e,
//     }
//   }

//   export const formData = (e) => {
//     console.log(1000)
//     return {
//       type: 'loan/FORM_DATA', 
//       payload: e,
//     }
//   }

//   export const hideModal1 = (e) => {
//     console.log(1);
//     return {
//       type: 'loan/HIDE_MODAL', 
//       payload: e,
//     }
//   }

//   export const postLoanData = params => {
//     console.log(params)
//     params=JSON.stringify(params)
//     return {
//       type: 'loan/POST_LOAN_DATA',
//       // async/await配合promise处理异步
//       async payload() {
//         const res = await cFetch(`${urls}/loans/apply?access_token=${token}` , { 
//           method: 'POST', 
//           headers: {
//                 'Content-Type': 'application/json'
//             },
//           body:params 
//           }, false);
//           const { code, data } = res;
//           if ( code == 0 ) {
//             return data || {};
//           } else {
//             throw res;
//           }
//         }
//       };
//   };