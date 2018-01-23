import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import { LOGIN, LOGOUT } from './../constants/actionTypes';
import { API_CONFIG } from './../config/api';

export const loginUser = (params, cbk) => {
  return {
    type: LOGIN,
    fallback: cbk,
    payload: cFetch(API_CONFIG.auth + params, { method: 'POST', body: params }).then(response => {
      cookie.set('access_token', response.access_token);
    })
  };
};

export const logoutUser = () => {
	cookie.remove('access_token');
	return {
		type: LOGOUT,
	}
}