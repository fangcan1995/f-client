import cFetch from '../utils/cFetch';
import cookie from 'js-cookie';
import parseJson2URL from './../utils/parseJson2URL';
import {urls,token} from './../utils/url';

let url_myRateCoupons=`${urls}/members/memberRateCoupons`; //获取加息券
export const myRateCouponsAc={
    getData: (params) => {
        return {
            type: 'myRateCoupons/FETCH',
            async payload() {
                params = parseJson2URL(params);
                const res = await cFetch(`${url_myRateCoupons}?`+params,{method: 'GET'}, true);
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

