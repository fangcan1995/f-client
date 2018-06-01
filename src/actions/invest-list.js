import cFetch from './../utils/cFetch';
import parseJson2URL from './../utils/parseJson2URL';
import {API_CONFIG} from "../config/api";


//const url_sblist=API_CONFIG.hostWeb+API_CONFIG.getSbList;//获取散标列表
const url_sblist=`http://172.16.1.221:9090/invest/projects/loan/page`;

const url_transferlist=API_CONFIG.hostWeb+API_CONFIG.getTransferlist;//获取债转标列表

export const sbListAc={
    getList: (params) => {
        return {
            type: 'investList/sbList/FETCH',
            async payload() {
                params = parseJson2URL(params);
                const res = await cFetch(`${url_sblist}?`+params,{method: 'GET'}, false);
                const {code, data} = res;
                console.log('返回的列表是');
                console.log(data);
                /*for (let index of data.list.keys()) {
                    data.list[index] = Object.assign({raiseRate: 0}, data.list[index]);
                }
                data.list[0].raiseRate=2;
                data.list[4].raiseRate=1;*/
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


