require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
import cFetch from '../utils/cFetch';
import readBlobAsDataURL from '../utils/readBlobAsDataURL';
import { LOGIN, LOGOUT } from './../constants/actions-type';
import { API_CONFIG } from './../config/api';
import {urls,token} from '../utils/url'

export const getImageCode = () => {
  return {
    type: 'signup/GET_IMAGE_CODE',
    async payload() {
      const res = await fetch(API_CONFIG.baseUri + API_CONFIG.imageCode, { credentials: 'include' })
      const blob = await res.blob();
      const dataURL = await readBlobAsDataURL(blob);
      return dataURL;
    }
  }
}

export const checkUserExist = params => {
  return {
    type: 'signup/CHECK_USER_EXIST',
    async payload() {
      const res = await cFetch(API_CONFIG.baseUri + API_CONFIG.checkUserExist + params, { method: 'GET' }, false)
      return res;
    }
  }
}

export const sendVerifyCode = params => {
  return {
    type: 'signup/SEND_VERIFY_CODE',
    async payload() {
      const res = await cFetch(API_CONFIG.baseUri + API_CONFIG.signupVerifyCode + params, { credentials: 'include' }, false);
      const { code, data } = res;
      console.log(res)
      if ( code == 0 ) {
        return data || {};
      } else {
        throw res;
      }
    }
  }
}

export const sendForgetVerifyCode = params => { 
  return {
    type: 'signup/SEND_VERIFY_CODE',
    async payload() {
      const res = await cFetch(API_CONFIG.baseUri + API_CONFIG.forgetVerifyCode + params, { credentials: 'include' }, false);
      const { code, data } = res;
      console.log(res)
      if ( code == 0 ) {
        return data || {};
      } else {
        throw res;
      }
    }
  }
}

export const setVerifyCodeCd = cd => {
  return {
    type: 'signup/SET_VERIFY_CODE_CD',
    payload: cd,
  }
}


export const signupUser = params => {
  return {
    type: 'signup/SIGNUP',
    // async/await配合promise处理异步
    async payload() {
      const res = await cFetch(API_CONFIG.baseUri + API_CONFIG.signup + params, { method: 'POST', body: params, credentials: 'include' }, false);
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

export const forgetSignupUser = params => {
  return {
    type: 'signup/SIGNUP',
    // async/await配合promise处理异步
    async payload() {
      const res = await cFetch(API_CONFIG.baseUri + API_CONFIG.forgetSignup + params, { method: 'POST', body: params, credentials: 'include' }, false);
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