import cFetch from '../utils/cFetch';
import cookie from 'js-cookie';
import parseJson2URL from './../utils/parseJson2URL';
import urls from './../utils/url';

const token=`b1b3685c-0b71-491e-a9fb-10d26a6c74d4`;

let url_myRedEnvelopes=`${urls}/members/memberRedEnvelopes?access_token=${token}`; //获取红包
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
