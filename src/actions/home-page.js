import cFetch from './../utils/cFetch';
import { API_CONFIG } from './../config/api';

export const getData = () => {
  return {
    type: 'homePage/GET_DATA',
    async payload () {
      return {};
    }
  };
};