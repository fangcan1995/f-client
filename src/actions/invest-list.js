import cFetch from './../utils/cFetch';
import parseJson2URL from './../utils/parseJson2URL';
import {API_CONFIG} from "../config/api";

const url_sblist=API_CONFIG.hostWeb+API_CONFIG.getSbList;//获取散标列表
const url_transferlist=API_CONFIG.hostWeb+API_CONFIG.getTransferlist;//获取债转标列表

export const sbListAc={
    getList: (params) => {
        return {
            type: 'investList/sbList/FETCH',
            async payload() {
                params = parseJson2URL(params);
                const res = await cFetch(`${url_sblist}?`+params,{method: 'GET'}, false);
                const {code, data} = res;
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


