import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import { API_CONFIG } from './../config/api';
import parseJson2URL from './../utils/parseJson2URL';
import {urls,token} from './../utils/url';
import {message} from "antd/lib/index";

const url_getMList=`${urls}/message/mail/page`;  //获取消息列表
const url_setRead=`${urls}/message/mail/read`; //设为已读
const url_delete=`${urls}/message/mail`; //删除消息

const url_getResult=`${urls}/members/riskEvaluation/result`;  //获取风险测评结果
const url_getRList=`${urls}/members/riskEvaluation`;  //获取风险测评题目
export const url_putRList=`${urls}/members/riskEvaluation`;  //提交测评结果

const url_getAuthInfo=`${urls}/members/certification`; //获取个人信息
const url_password=`${urls}/???`; //修改登录密码
const url_postPhone=`${urls}/members/photo`;  //修改头像
export const myMessagesAc= {
    getMessagesList: (params) => {
        return {
            type: 'mySettings/messages/FETCH',
            async payload() {
                params = parseJson2URL(params);
                const res = await cFetch(`${url_getMList}?` + params, {method: 'GET'}, true);
                const {code, data} = res;
                if (data.page.total > 0) {
                    for (let index of data.page.list.keys()) {
                        data.page.list[index] = Object.assign({isShow: '0',isChecked: 0}, data.page.list[index]);
                    }
                }
                if (code == 0) {
                    return {myList: data};
                } else {
                    throw res;
                }
            }
        }
    },
    setRead: (pram) => {
        return {
            type: 'mySettings/messages/FETCH',
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
                    return {readResult: res};
                } else {
                    throw res;
                }
            }
        }
    },
    deleteMessage: (pram,dispatch) => {
        return {
            type: 'mySettings/messages/FETCH',
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
                    return {deleteResult: res};
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
}
export const myRiskAssessAc={
    getResult: () => {
        return {
            type: 'mySettings/riskAssess/FETCH',
            async payload() {
                const res = await cFetch(`${url_getResult}`, {method: 'GET'}, true);
                const {code, data} = res;
                /*console.log('***************');
                console.log(url_getResult);
                console.log(data);*/

                if (code == 0) {
                    return {
                        result: data,
                        status:data.requireEval
                    };
                } else {
                    throw res;
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
                if (code == 0) {
                    for(let index of data.keys()){
                        data[index]=Object.assign({isChecked:''},data[index]);
                    }
                    return {myList: data};
                } else {
                    throw res;
                }
            }
        }
    },
    putRiskAssess: (pram,dispatch) => {
        pram=JSON.stringify(pram);
        return {
            type: 'mySettings/riskAssess/FETCH',
            async payload() {
                const res = await cFetch(`${url_putRList}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: pram,
                    },
                    true);
                if (res.code == 0) {
                    message.success('测评成功');
                    return {postResult: res};
                } else {
                    throw res;
                }
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
}
export const myAuthInfoAc={
    getResult: () => {
        return {
            type: 'mySettings/authInfo/FETCH',
            async payload() {
                const res = await cFetch(`${url_getAuthInfo}`, {method: 'GET'}, true);
                const {code, data} = res;
                /*console.log('***************');
                console.log(url_getResult);
                console.log(data);*/

                if (code == 0) {
                    return {info:data};
                } else {
                    throw res;
                }
            }
        }
    },
    postPassword: (pram,dispatch) => {
        pram=JSON.stringify(pram)
        return {
            type: 'mySettings/authInfo/FETCH',
            async payload() {
                const res = await cFetch(`${url_password}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: pram,
                    },
                    true);
                if (res.code == 0) {
                    return {postResult: res};
                } else {
                    throw res;
                }
            }
        }
    },
    postPhone: (pram,dispatch) => {
        pram=JSON.stringify(pram)
        return {
            type: 'mySettings/authInfo/FETCH',
            async payload() {
                const res = await cFetch(`${url_password}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: pram,
                    },
                    true);
                if (res.code == 0) {
                    return {postResult: res};
                } else {
                    throw res;
                }
            }
        }
    },
    modifyState: (prams) => {
        return {
            type: 'mySettings/authInfo/MODIFY_STATE',
            payload() {
                return prams
            }
        }
    },

}


