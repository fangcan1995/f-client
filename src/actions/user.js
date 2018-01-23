import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import { LOGIN, LOGOUT } from './../constants/actionTypes';
import { API_CONFIG } from './../config/api';

export const getUser = (params, cbk) => {
  return {
    type: GETUSER,
    fallback: cbk,
    payload: cFetch(API_CONFIG.user + params, { method: 'POST', body: params }).then(response => {
      cookie.set('user', response);
    })
  };
};

