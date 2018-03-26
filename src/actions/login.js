require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
import cFetch from '../utils/cFetch';
import readBlobAsDataURL from '../utils/readBlobAsDataURL';
import { LOGIN, LOGOUT } from './../constants/actions-type';
import { API_CONFIG } from './../config/api';
import {urls,token} from '../utils/url'

export const getImageCode = () => {
  return {
    type: 'login/GET_IMAGE_CODE',
    async payload() {
      const res = await fetch(`${urls}` + API_CONFIG.imageCode, { credentials: 'include' });
      const blob = await res.blob();
      const dataURL = await readBlobAsDataURL(blob);
      return dataURL;
    }
  }
}

export const sendVerifyCode = params => {
  return {
    type: 'login/SEND_VERIFY_CODE',
    async payload() {
      const res = await cFetch(`${urls}` + API_CONFIG.loginVerifyCode + params, { credentials: 'include' }, false);
      const { code, data } = res;
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
    type: 'login/SET_VERIFY_CODE_CD',
    payload: cd,
  }
}

export const setSignup = (e) => {
  return {
    type: 'login/SET_SIGNUP', 
    payload: e,
  }
}

