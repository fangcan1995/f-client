import cFetch from '../utils/cFetch';
import cookie from 'js-cookie';
import parseJson2URL from './../utils/parseJson2URL';
import {urls,token} from './../utils/url';

//let url_transaction_record=`${urls}/message/mail/page`; //获取交易记录,暂时获取的是站内信
let url_transaction_record=`http://172.16.1.225:9090/payment/fuiou/tradeRecords?access_token=b9f2bbff-08ed-4574-98ad-0aaa47213575`;
export const transactionRecordAc={
    getData: (params) => {
        return {
            type: 'transaction-record/FETCH',
            async payload() {
                console.log('查询参数是：');
                console.log(params);
                for(var name in params){
                    if(params[name]===``){
                        delete params[name];
                    }
                }
                params = parseJson2URL(params);
                console.log(params);
                const res = await cFetch(`${url_transaction_record}&`+params,{method: 'GET'}, true);
                const {code, data} = res;
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
