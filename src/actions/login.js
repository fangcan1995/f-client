require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
import cFetch from '../utils/cFetch';
import readBlobAsDataURL from '../utils/readBlobAsDataURL';
import { LOGIN, LOGOUT } from './../constants/actions-type';
import { API_CONFIG } from './../config/api';

export const getImageCode = () => {
  return {
    type: 'login/GET_IMAGE_CODE',
    async payload() {
      const res = await fetch('http://172.16.1.234:8060/' + API_CONFIG.imageCode, { credentials: 'include' });
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
      const res = await cFetch('http://172.16.1.234:8060/' + API_CONFIG.loginVerifyCode + params, { credentials: 'include' }, false);
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