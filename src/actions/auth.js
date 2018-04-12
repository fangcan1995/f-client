import cookie from 'js-cookie';
import cFetch from '../utils/cFetch';
import { LOGIN, LOGOUT } from './../constants/actions-type';
import { API_CONFIG } from './../config/api';
import parseJson2URL from './../utils/parseJson2URL';
import {urls,token} from '../utils/url'

export const loginUser = params => {
  return {
    type: LOGIN,
    // async/await配合promise处理异步
    async payload() {
      const token = await cFetch(API_CONFIG.baseUri + API_CONFIG.auth + params, { method: 'POST', body: params, credentials: 'include' }, false);
      const { token_type, access_token } = token;
      const res = await cFetch(API_CONFIG.baseUri + API_CONFIG.user, { headers: { 'Authorization': `${token_type} ${access_token}` } });
      const { code, data } = res;
      if ( code == 0 ) {
        const { ...user } = data || {};
        cookie.set('token', token);
        cookie.set('user', user);
        return user;
      } else {
        throw res;
      }
    }
  };
};



export const logoutUser = () => {
  
	return {
		type: LOGOUT,
    async payload() {

      const token = cookie.getJSON('token') || {};
      const { access_token } = token;
      const params = `?${parseJson2URL({ access_token })}`;


      const res = await cFetch(API_CONFIG.baseUri + API_CONFIG.logout + params, { method: 'POST', body: params });
      console.log('------------');
      console.log(res);
      const { code, message: msg } = res;
      if ( code == 0 ) {
        cookie.remove('token');
        cookie.remove('user');
        return msg;
      } else {
          console.log('111111111------------');
          console.log(res);
        throw res;
      }
    }
	}
}