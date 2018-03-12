require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
import cFetch from '../utils/cFetch';
import readBlobAsDataURL from '../utils/readBlobAsDataURL';
import { LOGIN, LOGOUT } from './../constants/actions-type';
import { API_CONFIG } from './../config/api';



export const getImageCode = () => {
  return {
    type: 'signup/GET_IMAGE_CODE',
    async payload() {
      const res = await fetch('http://172.16.1.234:8060/' + API_CONFIG.imageCode, { credentials: 'include' })
      const blob = await res.blob();
      const dataURL = await readBlobAsDataURL(blob);
      return dataURL;
    }
  }
}

export const checkUserExist = () => {
  return {
    type: 'signup/CHECK_USER_EXIST',
    async payload() {
      const res = await fetch('http://172.16.1.234:8060/' + API_CONFIG.checkUserExist + params, { method: 'POST', body: params })
      console.log(res);
      return res;
    }
  }
}

export const sendVerifyCode = params => {
  return {
    type: 'signup/SEND_VERIFY_CODE',
    async payload() {
      const res = await cFetch('http://172.16.1.234:8060/' + API_CONFIG.signupVerifyCode + params, { credentials: 'include' }, false);
      const { code, data } = res;
      if ( code == 0 ) {
        return data || {};
      } else {
        throw res;
      }
    }
  }
}



export const signupUser = params => {
  return {
    type: 'signup/SIGNUP',
    // async/await配合promise处理异步
    async payload() {
      const res = await cFetch('http://172.16.1.234:8060/' + API_CONFIG.signup + params, { method: 'POST', body: params, credentials: 'include' }, false);
      console.log(res)
      const { code, data } = res;
      if ( code == 0 ) {
        const { ...user } = data || {};

        return user;
      } else {
        throw res;
      }
    }
  };
}