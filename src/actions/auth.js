import cookie from 'js-cookie';
import cFetch from './../utils/cFetch';
import { LOGIN, LOGOUT } from './../constants/actions-type';
import { API_CONFIG } from './../config/api';

export const loginUser = params => {
  return {
    type: LOGIN,
    // async/await配合promise处理异步
    async payload() {
      const token = await cFetch('http://172.16.1.234:8060/' + API_CONFIG.auth + params, { method: 'POST', body: params }, true);
      cookie.set('token', token)
      const res = await cFetch(API_CONFIG.baseUri + API_CONFIG.user);
      const { code, data } = res;
      if ( code == 0 ) {
        const { menus, roles, ...user } = data || {};
        cookie.set('user', user);
        return user;
      } else {
        throw res;
      }
    }
  };
};

export const logoutUser = () => {
	cookie.remove('token');
  cookie.remove('user');
	return {
		type: LOGOUT,
	}
}