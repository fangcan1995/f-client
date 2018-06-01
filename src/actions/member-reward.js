import cFetch from '../utils/cFetch';
import parseJson2URL from './../utils/parseJson2URL';
import {API_CONFIG} from "../config/api";

let url_myRedEnvelopes=API_CONFIG.hostWeb+API_CONFIG.getMyRedEnvelopes; //获取红包
let url_myRateCoupons=API_CONFIG.hostWeb+API_CONFIG.getMyRateCoupons; //获取加息券

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
