import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import parseJson2URL from './../utils/parseJson2URL';
import {urls,token} from './../utils/url';
const url_sblist=`${urls}/invest/projects/loan/page`;//获取散标列表
const url_transferlist=`${urls}/invest/transfer/loan/page`;//获取债转标列表

export const sbListAc={
    getList: (params) => {
        return {
            type: 'investList/sbList/FETCH',
            async payload() {
                params = parseJson2URL(params);
                const res = await cFetch(`${url_sblist}?`+params,{method: 'GET'}, false);
                const {code, data} = res;
                console.log('发出的请求');
                console.log(`${url_sblist}?`+params);
                console.log('返回的数据');
                console.log(data);

                if (code == 0) {
                    return {
                        list:data
                    };
                } else {
                    throw res;
                }
            }
        }
    },
    //修改状态
    stateSbModify: json => ({
        type: 'investList/sbList/MODIFY_STATE',
        payload: json
    }),
};
export const tranferListAc={
    getList: (params) => {
        return {
            type: 'investList/transferList/FETCH',
            async payload() {
                params = parseJson2URL(params);
                const res = await cFetch(`${url_transferlist}?`+params,{method: 'GET'}, false);
                const {code, data} = res;
                console.log('发出的请求');
                console.log(`${url_transferlist}?`+params);
                console.log('反回的数据');
                console.log(data);
                if (code == 0) {
                    return {
                        list:data
                    };
                } else {
                    throw res;
                }
            }
        }
    },
    stateRepaymentPlanModify: json => ({
        type: 'investList/transferList/MODIFY_STATE',
        payload: json
    }),
};


