import cFetch from '../utils/cFetch';
import readBlobAsDataURL from '../utils/readBlobAsDataURL';
import { API_CONFIG } from './../config/api';
import {urls,token} from '../utils/url'




export const getSuperPartnerDetail = () => {
  return {
    type: 'partner/GET_SUPER_PARTNER_DETAIL',
    async payload() {
        const res = await cFetch(`${urls}/superPartners/rewardDetails?access_token=${token}` , { method: 'GET' } , false);
        const { code, data } = res;
        if ( code == 0 ) {
            console.log(data)
        return data || {};
        } else {
        throw res;
        }
    }
  }
}