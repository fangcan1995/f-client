import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import {addCommas,checkMoney} from './../assets/js/cost';
import {urls,token} from './../utils/url';
import {url_putRList} from './member-settings';
import parseJson2URL from "../utils/parseJson2URL";
//let urls='http://172.16.1.228:9090';
const url_invest_projects_loan=`${urls}/invest/projects/loan`; //投资信息
const url_invest_transfer_loan=`${urls}/invest/transfer/loan` //债转投资信息
const url_projects_info=`${urls}/invest/projects/info`  ;//标的详情
const url_projects_record=`${urls}/invest/projects/record`;   //获取散标投资记录
const url_transfer_record=`${urls}/invest/transfer/record`;//获取转让标投资记录
const url_rpmtplan_page=`${urls}/invest/rpmtplan/page`;//获取还款记录
const url_redEnvelopes=`${urls}/members/memberRedEnvelopes/list`; //获取特定标的可用红包列表
const url_RateCoupons=`${urls}/members/memberRateCoupons/list`; //获取特定标的可用加息券列表
const url_postInvest=`${urls}/invest/invest`; //提交投资申请

let investDetailActions = {

    //投资信息
    getInvestInfo: (id) => {
    return {
        type: 'investDetail/investInfo/FETCH',
        async payload() {
            const res = await cFetch(`${url_invest_projects_loan}/${id}` , {method: 'GET'}, false);
            const {code, data} = res;
            if (code == 0) {
                return data;
            } else {
                throw res;
            }
        }
    }
},
    //债转标投资信息
    getTransferInvestInfo: (transferId) => {
        return {
            type: 'investDetail/investInfo/FETCH',
            async payload() {
                const res = await cFetch(`${url_invest_transfer_loan}/${transferId}` , {method: 'GET'}, false);
                const {code, data} = res;
                if (code == 0) {
                    return data;
                } else {
                    throw res;
                }
            }
        }
    },

    //获取标的详情-信息披露部分
    getLoanInfo: (id) => {
        return {
            type: 'investDetail/loanInfo/FETCH',
            async payload() {
                const res = await cFetch(`${url_projects_info}/${id}` , {method: 'GET'}, false);
                const {code, data} = res;
                console.log('返回的项目详情');
                if (code == 0) {
                    return data;
                } else {
                    throw res;
                }
            }
        }
    },
    //获取散标投资记录
    getInvestRecords: (id) => {
        return {
            type: 'investDetail/investRecords/FETCH',
            async payload() {
                const res = await cFetch(`${url_projects_record}?pageNum=1&pageSize=1000&projectId=${id}` , {method: 'GET'}, false);

                const {code, data} = res;
                if (code == 0) {
                    return data;
                } else {
                    throw res;
                }
            }
        }
    },

    //获取债转标投资记录
    getTransferInvestRecords: (id) => {
        return {
            type: 'investDetail/investTransferRecords/FETCH',
            async payload() {
                const res = await cFetch(`${url_transfer_record}?pageNum=1&pageSize=1000&projectId=${id}` , {method: 'GET'}, false);

                const {code, data} = res;
                if (code == 0) {
                    return data;
                } else {
                    throw res;
                }
            }
        }
    },

    //获取还款记录
    getRepayRecords: (id) => {
        return {
            type: 'investDetail/repayRecords/FETCH',
            async payload() {
                const res = await cFetch(`${url_rpmtplan_page}?pageNum=1&pageSize=1000&projectId=${id}` , {method: 'GET'}, false);
                const {code, data} = res;
                if (code == 0) {
                    return data;
                } else {
                    throw res;
                }
            }
        }
    },

    //获取可用红包
    getRedEnvelopes: (id) => {
        return {
            type: 'investDetail/redEnvelopes/FETCH',
            async payload() {
                const res = await cFetch(`${url_redEnvelopes}?projectId=${id}` , {method: 'GET'}, true);
                const {code, data} = res;
                if (code == 0) {
                    console.log('可用红包');
                    console.log(data);
                    return data;
                } else {
                    throw res;
                }
            }
        }
    },

    //获取可用加息券
    getRateCoupons: (id) => {
        return {
            type: 'investDetail/rateCoupons/FETCH',
            async payload() {
                const res = await cFetch(`${url_RateCoupons}?projectId=${id}` , {method: 'GET'}, true);
                const {code, data} = res;
                if (code == 0) {
                    console.log('可用加息券');
                    console.log(data);
                    return data;
                } else {
                    throw res;
                }
            }
        }
    },

    //提交投资申请
    postInvest:(params)  => {

        return {
            type: 'investDetail/invest/POST',
            async payload() {
                //params = parseJson2URL(params);
                const res = await cFetch(`${url_postInvest}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(params),
                    },
                    true);
                //console.log()
                console.log('投资提交后返回');
                console.log(res);
                let type = ``;
                (res.code == 0) ? type = 'success' : type = 'error';
                return {
                        code: res.code,
                        type: type,
                        message: res.message,
                        description: res.message
                };
            }
        }
    },


    //修改投资信息状态
    stateInvestInfoModify: json => ({
        type: 'investDetail/investInfo/MODIFY_STATE',
        payload: json
    }),
    //修改会员信息状态
    stateMemberInfoModify: json => ({
        type: 'investDetail/memberInfo/MODIFY_STATE',
        payload: json
    }),

    //修改提交状态
    statePostResultModify: json => ({
        type: 'investDetail/postResult/MODIFY_STATE',
        payload: json
    }),

    //修改借款信息状态
    stateLoanModify: json => ({
        type: 'investDetail/loan/MODIFY_STATE',
        payload: json
    }),

    //修改投资记录状态
    stateInvestRecordsModify: json => ({
        type: 'investDetail/investRecords/MODIFY_STATE',
        payload: json
    }),
    //修改转让标投资记录状态
    stateInvestTransferRecordsModify: json => ({
        type: 'investDetail/investTransferRecords/MODIFY_STATE',
        payload: json
    }),
    //修改借款记录状态
    stateRepayRecordsModify: json => ({
        type: 'investDetail/repayRecords/MODIFY_STATE',
        payload: json
    }),

};
export default investDetailActions;

