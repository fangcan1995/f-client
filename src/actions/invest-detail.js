import cFetch from './../utils/cFetch';
import {getTips} from '../utils/famatData';
import {postContent} from '../utils/formSetting';
import {API_CONFIG} from "../config/api";

const url_invest_projects_loan=API_CONFIG.hostWeb+API_CONFIG.getProjectsLoan; //投资信息
const url_invest_transfer_loan=API_CONFIG.hostWeb+API_CONFIG.getTransferLoan; //债转投资信息
const url_projects_info=API_CONFIG.hostWeb+API_CONFIG.getProjectsInfo  ;//标的详情
const url_projects_record=API_CONFIG.hostWeb+API_CONFIG.getProjectsRecord;   //获取散标投资记录
const url_transfer_record=API_CONFIG.hostWeb+API_CONFIG.getTransferRecord;//获取转让标投资记录
const url_rpmtplan_page=API_CONFIG.hostWeb+API_CONFIG.getRpmtplanPage;//获取还款记录
const url_availableRewards=API_CONFIG.hostWeb+API_CONFIG.getAvailableRewards; //获取特定标的可用红包列表
const url_postInvest=API_CONFIG.hostWeb+API_CONFIG.postInvestApp; //提交投资申请


let investDetailActions = {
    //投资信息
    getInvestInfo: (id) => {
    return {
        type: 'investDetail/investInfo/FETCH',
        async payload() {
            const res = await cFetch(`${url_invest_projects_loan}/${id}` , {method: 'GET'}, false);
            const {code, data} = res;
            console.log('返回的散标数据');
            console.log(data);

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
                /*console.log('返回的债转数据');
                console.log(data);
                data.transferPeriod=5;*/
                if (code == 0) {
                    data.isTransfer=`1`;
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
                //console.log('返回的项目详情');
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
                const res = await cFetch(`${url_transfer_record}?pageNum=1&pageSize=1000&transId=${id}` , {method: 'GET'}, false);

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

    //获取可用奖励
    getAvailableRewards:(id,amount,isTransfer)=>{
        return {
            type: 'investDetail/availableRewards/FETCH',
            async payload() {
                let url;
                if(isTransfer==`0`){
                    url=`${url_availableRewards}?projectId=${id}&investAmount=${amount}&isTransfer=0`
                }else if(isTransfer==`1`){
                    url=`${url_availableRewards}?projectId=${id}&investAmount=${amount}&isTransfer=1`
                }

                const res = await cFetch( url, {method: 'GET'}, true);
                let {code, data} = res;
                if (code == 0) {
                    console.log('可用奖励');
                    console.log(data);
                    //data=[];
                    return data;
                } else {
                    throw res;
                }
            }
        }
    },

    //提交投资申请
    postInvest:(params,times)  => {
        return {
            type: 'investDetail/invest/POST',
            async payload() {
                const res = await cFetch(`${url_postInvest}`, postContent(params), true);
                console.log('返回第'+(times+1)+'次请求的结果'); //测试用
                let type=``;
                (res.code == 0)?type='success':type='error';
                let messageCode=res.message;
                if(messageCode==`invest_101` && (times+1)===5 ){
                    messageCode='invest_102';
                }
                return {
                    code:res.code,
                    type:type,
                    message:getTips(messageCode).message||``,
                    description:res.description||``,
                    userCode:getTips(messageCode).code,
                    allowGoOn:getTips(messageCode).allowGoOn,
                    times:times+1
                }


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
    //修改可用奖励
    changeReward: json => ({
        type: 'investDetail/availableRewards/CHANGE_DEFAULT',
        payload: json
    }),

    //清空数据
    clearData: json => ({
        type: 'investDetail/CLEAR',
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

