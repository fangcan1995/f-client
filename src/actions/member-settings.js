import cFetch from './../utils/cFetch';
import parseJson2URL from './../utils/parseJson2URL';
import {urls,urls_auth,token} from './../utils/url';
import {formatPostResult} from "../utils/famatData";
import {postContent,putContent} from "../utils/formSetting";
import {API_CONFIG} from "../config/api";

const url_getMList=API_CONFIG.hostWeb+API_CONFIG.getMessageList;  //获取消息列表
const url_setRead=API_CONFIG.hostWeb+API_CONFIG.setMessageRead; //设为已读
const url_delete=API_CONFIG.hostWeb+API_CONFIG.deleteMessage; //删除消息

const url_getResult=API_CONFIG.hostWeb+API_CONFIG.getRiskResult;  //获取风险测评结果
const url_getRList=API_CONFIG.hostWeb+API_CONFIG.getRiskList;  //获取风险测评题目
export const url_putRList=API_CONFIG.hostWeb+API_CONFIG.putRisk;  //提交测评结果


export const myMessagesAc= {
    getMessagesList: (params) => {
        return {
            type: 'mySettings/messages/FETCH',
            async payload() {
                params = parseJson2URL(params);
                console.log('提交后台的参数');
                console.log(params);
                const res = await cFetch(`${url_getMList}?` + params, {method: 'GET'}, true);
                const {code, data} = res;
                console.log(data);
                if (data.page.total > 0) {
                    for (let index of data.page.list.keys()) {
                        data.page.list[index] = Object.assign({isShow: '0',isChecked: 0}, data.page.list[index]);
                    }
                }
                if (code == 0) {
                    return data;
                } else {
                    throw res;
                }
            }
        }
    },
    setRead: (pram) => {
        return {
            type: 'mySettings/messages/SET_READED',
            async payload() {
                const res = await cFetch(`${url_setRead}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: `[${pram}]`,
                    },
                    true);
                if (res.code == 0) {
                    return res;
                } else {
                    throw res;
                }
            }
        }
    },
    deleteMessage: (pram,dispatch) => {
        return {
            type: 'mySettings/messages/DELETE',
            async payload() {
                const res = await cFetch(`${url_delete}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: `[${pram}]`,
                    },
                    true);
                if (res.code == 0) {
                    return  res;
                } else {
                    throw res;
                }
            }
        }
    },
    modifyState: (prams) => {
        return {
            type: 'mySettings/messages/MODIFY_STATE',
            payload() {
                return prams
            }
        }
    },
    reset: (prams) => {
        return {
            type: 'mySettings/messages/RESET',
            payload() {
                return prams
            }
        }
    },
    modify_list: (prams) => {
        return {
            type: 'mySettings/messages/MODIFY_LIST',
            payload() {
                return prams
            }
        }
    },

}
export const myRiskAssessAc={
    getResult: () => {
        return {
            type: 'mySettings/riskAssess/FETCH_RESULT',
            async payload() {
                const res = await cFetch(`${url_getResult}`, {method: 'GET'}, true);
                const {code, data} = res;
                console.log('测评结果是：');
                console.log(data);
                if (code == 0) {
                    return {
                        result: data,
                        hideResult:data.requireEval
                    };
                    //return data;
                } else {
                    throw data;
                }
            }
        }
    },
    getRiskAssessList: () => {
        return {
            type: 'mySettings/riskAssess/FETCH',
            async payload() {
                const res = await cFetch(`${url_getRList}` , {method: 'GET'}, true);
                const {code, data} = res;
                console.log('返回的题目');
                console.log(data)
                if (code == 0) {
                    for(let index of data.keys()){
                        data[index]=Object.assign({isChecked:''},data[index]);
                    }
                    return data;
                } else {
                    throw res;
                }
            }
        }
    },
    putRiskAssess: (params,dispatch) => {
        return {
            type: 'mySettings/riskAssess/FETCH_POST',
            async payload() {
                const res = await cFetch(`${url_putRList}`, putContent(params), true);
                return formatPostResult(res);

            }
        }
    },
    toggle: (prams) => {
        return {
            type: 'mySettings/riskAssess/TOGGLE',
            payload() {
                return prams
            }
        }
    },
    modifyState: (prams) => {
        return {
            type: 'mySettings/riskAssess/MODIFY_STATE',
            payload() {
                return prams
            }
        }
    },
    reset: (prams) => {
        return {
            type: 'mySettings/riskAssess/RESET',
            payload() {
                return prams
            }
        }
    },
}
