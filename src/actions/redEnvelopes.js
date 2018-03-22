import cFetch from '../utils/cFetch';
import cookie from 'js-cookie';
import parseJson2URL from './../utils/parseJson2URL';

let url_myRedEnvelopes=`http://172.16.1.221:9090/members/memberRedEnvelopes?access_token=d36b2fff-1757-4aed-b576-df30f9f9d173`; //获取红包
export const redEnvelopesAc={
    getData: (params) => {
        return {
            type: 'myRedEnvelopes/FETCH',
            async payload() {
                params = parseJson2URL(params);
                const res = await cFetch(`${url_myRedEnvelopes}&`+params,{method: 'GET'}, false);
                const {code, data} = res;
                console.log('发回的数据');
                console.log(data);
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