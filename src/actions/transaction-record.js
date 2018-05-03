import cFetch from '../utils/cFetch';
import cookie from 'js-cookie';
import parseJson2URL from './../utils/parseJson2URL';
import {urls,token} from './../utils/url';

let url_transaction_record=`${urls}/message/mail/page`; //获取交易记录,暂时获取的是站内信
export const transactionRecordAc={
    getData: (params) => {
        return {
            type: 'transaction-record/FETCH',
            async payload() {
                params = parseJson2URL(params);
                //console.log('获取数据的地址：'+`${url_transaction_record}?`+params);
                const res = await cFetch(`${url_transaction_record}?`+params,{method: 'GET'}, true,3000);
                //const res = await cFetch(`${url_transaction_record}?1=1`,{method: 'GET'}, true);
                const {code, data} = res;
                //console.log('获取的数据：');
                //console.log(data);
                if (code == 0) {
                    return data;
                } else {
                    throw res;
                }
            }
        }
    },
    modifyState: (prams) => {
        return {
            type: 'transaction-record/MODIFY_STATE',
            payload() {
                return prams
            }
        }
    },
    /*toggleClass: id => ({
        type: 'TOGGLE_CLASS',
        payload: id
    }),*/
}
