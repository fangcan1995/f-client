import cFetch from './../utils/cFetch';
import { API_CONFIG } from './../config/api';

export const getData = () => {
  return {
    type: 'homePage/GET_DATA',
    async payload () {
      const res = await cFetch(API_CONFIG.user);
      const { code, data } = res;
      if ( code == 0 ) {
        const { menus, roles, ...user } = data || {};
        return menus;
      } else {
        throw res;
      }
    }
  };
};