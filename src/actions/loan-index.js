import {formatPostResult} from "../utils/famatData";
require('es6-promise').polyfill();
import cFetch from '../utils/cFetch';
import readBlobAsDataURL from '../utils/readBlobAsDataURL';
import { API_CONFIG } from './../config/api';
import {postContent} from '../utils/formSetting';

const getImgUrl=API_CONFIG.hostWeb + API_CONFIG.imageCode;
const get_ApplyData=API_CONFIG.hostWeb+API_CONFIG.getApplyData;
const post_LoanData=API_CONFIG.hostWeb+API_CONFIG.postLoanData;
export const getImageCode = () => {
  return {
    type: 'loan/GET_IMAGE_CODE',
    async payload() {
      const res = await fetch(getImgUrl, { credentials: 'include' });
      const blob = await res.blob();
      const dataURL = await readBlobAsDataURL(blob);
      return dataURL;
    }
  }
}
export const getApplyData = (loanType ) => {
  return {
    type: 'loan/GET_APPLY_DATA',
    data:{loanType},
    async payload() {
        const res = await cFetch(get_ApplyData , { method: 'GET' } , true);
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
export const postLoanData = params => {
    return {
        type: 'loan/POST_LOAN_DATA',
        async payload() {
            let res = await cFetch(post_LoanData, postContent(params), true);
            return formatPostResult(res);
        }
    }
}
export const formData = (e) => {
    console.log(1000)
    return {
        type: 'loan/FORM_DATA',
        payload: e,
    }
}
export const hideModal1 = (e) => {
    console.log(1);
    return {
        type: 'loan/HIDE_MODAL',
        payload: e,
    }
}
export const clear = params => {
    return {
        type: 'loan/CLEAR',
        payload() {
            return params
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
    return {
        type: 'loan/CHECK_FORM',
        payload: e,
    }
}
