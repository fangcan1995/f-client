import cFetch from '../utils/cFetch';
import cookie from 'js-cookie';
import parseJson2URL from './../utils/parseJson2URL';
import {urls,token} from './../utils/url';

let url_myRedEnvelopes=`${urls}/members/memberRedEnvelopes`; //获取红包
export const redEnvelopesAc={
    getData: (params) => {
        return {
            type: 'myRedEnvelopes/FETCH',
            async payload() {
                params = parseJson2URL(params);
                const res = await cFetch(`${url_myRedEnvelopes}?`+params,{method: 'GET'}, true);
                const {code, data} = res;
                if (code == 0) {
                    return data;
                } else {
                    throw res;
                }
            }
        }
    },

    toggleClass: id => ({
        type: 'TOGGLE_CLASS',
        payload: id
    }),
}
