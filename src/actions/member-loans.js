import cFetch from './../utils/cFetch';
import parseJson2URL from './../utils/parseJson2URL';
import {urls,token} from '../utils/url'
import { API_CONFIG } from './../config/api';
import readBlobAsDataURL from '../utils/readBlobAsDataURL';
import {toMoney, toNumber, addCommas, formatPostResult} from '../utils/famatData';
import {postContent} from "../utils/formSetting";

const url_loansCharts=API_CONFIG.hostWeb+API_CONFIG.getMyLoansCharts; //统计图数据
const url_loansList=API_CONFIG.hostWeb+API_CONFIG.getMyLoansList;//获取借款列表
const url_repaymentsAll=API_CONFIG.hostWeb+API_CONFIG.getMyRepaymentsAll;//项目提前还款时获取详情
//const url_repaymentsAll=`http://172.16.1.234:9090/repayment/ahead/apply/detail` //项目提前还款时获取详情
//const url_postRepaymentsAll=API_CONFIG.hostWeb+API_CONFIG.postRepaymentsAll;//项目提前还款申请
const url_postRepaymentsAll=`http://172.16.1.234:9090/repayment/ahead/apply`;  //项目提前还款申请
const url_repaymentsCharts=API_CONFIG.hostWeb+API_CONFIG.getMyRepaymentsCharts; //统计图数据
const url_repaymentsList=API_CONFIG.hostWeb+API_CONFIG.getMyRepaymentsList;//获取借款列表
const url_proList=API_CONFIG.hostWeb+API_CONFIG.getProList;//获取还款中和已完结的项目列表
const url_repayment=API_CONFIG.hostWeb+API_CONFIG.getRepaymentInfo;//还款时获取详情
//const url_repayment=`http://172.16.1.234:9090/repayment/normal/detail` ;//还款时获取详情
const url_postRepayment=API_CONFIG.hostWeb+API_CONFIG.postRepaymentApp;//还款
//const url_postRepayment=`http://172.16.1.234:9090/repayment/normal` ;//还款

export const getImageCode = () => {
    return {
        type: 'myLoans/GET_IMAGE_CODE',
        async payload() {
            const res = await fetch(API_CONFIG.baseUri + API_CONFIG.imageCode, { credentials: 'include' })
            const blob = await res.blob();
            const dataURL = await readBlobAsDataURL(blob);
            return dataURL;
        }
    }
}
export const memberLoansAc={
    getPie: () => {
        return {
            type: 'myLoans/myLoans/FETCH',
            async payload() {
                const res = await cFetch(`${url_loansCharts}` , {method: 'GET'}, true);
                const {code, data} = res;
                console.log('返回的我的借款统计数据');
                console.log(data);
                if (code == 0) {
                    let {totalLoanDto,accumulatedInterestDto}=data;
                    let charts={
                        totalLoan:{
                            data:[
                                {name:'申请中',value:totalLoanDto.loaningMoney,instruction:`${addCommas(totalLoanDto.loaningMoney)}`  },
                                {name:'招标中',value:totalLoanDto.investingMoney,instruction:`${addCommas(totalLoanDto.investingMoney)}`},
                                {name:'还款中',value:totalLoanDto.repayingMoney,instruction:`${addCommas(totalLoanDto.repayingMoney)}`},
                                {name:'已结清',value:totalLoanDto.settleMoney,instruction:`${addCommas(totalLoanDto.settleMoney)}`}
                            ]
                        },
                        accumulatedInterest:{
                            data:[
                                {name:'还款中',value:accumulatedInterestDto.repayingIint,instruction:`${addCommas(accumulatedInterestDto.repayingIint)}`  },
                                {name:'已结清',value:accumulatedInterestDto.settleIint,instruction:`${addCommas(accumulatedInterestDto.settleIint)}`  },
                            ]
                        },
                    };
                    return {
                        charts:charts
                    };
                } else {
                    throw res;
                }
            }
        }
    },
    getList: (params) => {
        return {
            type: 'myLoans/myLoans/FETCH',
            async payload() {

                //console.log('查询参数是');
                //console.log(params);
                switch (params.status){
                    case 1:
                        params.sortBy='-applyTime';
                        break;
                    case 2:
                        params.sortBy='-putTime';
                        break;
                    case 3:
                        params.sortBy='-transferTime';
                        break;
                    case 4:
                        params.sortBy='-settleTime';
                        break;
                }
                params= parseJson2URL(params);
                console.log(params);
                const res = await cFetch(`${url_loansList}?`+params,{method: 'GET'}, true);
                const {code, data} = res;

                if (code == 0) {
                    return {
                        myList:data,
                    };
                } else {
                    throw res;
                }
            }
        }
    },
    getProject: (params) => {
        return {
            type: 'myLoans/myLoans/FETCH',
            async payload() {
                const res = await cFetch(`${url_repaymentsAll}?projectId=${params}` , {method: 'GET'}, true);
                const {code, data} = res;
                if (code == 0) {
                    console.log(data);
                    return {
                        projectInfo: data
                    };
                } else {
                    throw res;
                }
            }
        }
    },
    //提交提前还款申请
    postRepaymentApp: (params,dispatch) => {
        return {
            type: 'myLoans/myLoans/FETCH',
            async payload() {
                const res = await cFetch(`${url_postRepaymentsAll}`, postContent(params), true);
                console.log(res);
                return {postResult: formatPostResult(res)};

            }
        }
    },
    //修改状态
    stateModify: json => ({
        type: 'myLoans/myLoans/MODIFY_STATE',
        payload: json
    }),
}
export const repaymentsAc={
    getPie: () => {
        return {
            type: 'myLoans/repaymentPlans/FETCH',
            async payload() {
                const res = await cFetch(`${url_repaymentsCharts}` , {method: 'GET'}, true);
                const {code, data} = res;
                if (code == 0) {
                    let {allRepaymentDto,todoRepaymentsDto,doneRepaymentsDto}=data;
                    let charts={
                        repayments:{
                            data:[
                                {name:'逾期未还',value:allRepaymentDto.overdueNoRepay[1],instruction:` ${allRepaymentDto.overdueNoRepay[0]}期 ${addCommas(allRepaymentDto.overdueNoRepay[1])}元`  },
                                {name:'待还款',value:allRepaymentDto.repayments[1],instruction:` ${allRepaymentDto.repayments[0]}期 ${addCommas(allRepaymentDto.repayments[1])}元`},
                                {name:'逾期已还',value:allRepaymentDto.overdueRepay[1],instruction:` ${allRepaymentDto.overdueRepay[0]}期 ${addCommas(allRepaymentDto.overdueRepay[1])}元`},
                                {name:'已提前还款',value:allRepaymentDto.advanceRepay[1],instruction:` ${allRepaymentDto.advanceRepay[0]}笔 ${addCommas(allRepaymentDto.advanceRepay[1])}元`},
                                {name:'已正常还款',value:allRepaymentDto.normalRepay[1],instruction:` ${allRepaymentDto.normalRepay[0]}期 ${addCommas(allRepaymentDto.normalRepay[1])}元`}
                            ]
                        },
                        todoDto:{
                            data:[
                                {name:'未还本金',value:todoRepaymentsDto.todoCapital,instruction:` ${addCommas(todoRepaymentsDto.todoCapital)}元`  },
                                {name:'未还利息',value:todoRepaymentsDto.todoIint,instruction:` ${addCommas(todoRepaymentsDto.todoIint)}元`  },
                                {name:'未还罚息',value:todoRepaymentsDto.todoLateIint,instruction:` ${addCommas(todoRepaymentsDto.todoLateIint)}元`  },
                                {name:'未还罚金',value:todoRepaymentsDto.todoLateFine,instruction:` ${addCommas(todoRepaymentsDto.todoLateFine)}元`  },
                            ]
                        },
                        doneDto:{
                            data:[
                                {name:'已还本金',value:doneRepaymentsDto.doneCapital,instruction:` ${addCommas(doneRepaymentsDto.doneCapital)}元`  },
                                {name:'已还利息',value:doneRepaymentsDto.doneIint,instruction:` ${addCommas(doneRepaymentsDto.doneIint)}元`  },
                                {name:'已还罚息',value:doneRepaymentsDto.doneLateIint,instruction:` ${addCommas(doneRepaymentsDto.doneLateIint)}元`  },
                                {name:'已还罚金',value:doneRepaymentsDto.doneLateFine,instruction:` ${addCommas(doneRepaymentsDto.doneLateFine)}元`  },
                            ]
                        },
                    };
                    return {
                        charts:charts
                    };
                } else {
                    throw res;
                }
            }
        }
    },
    getList: (params) => {
        return {
            type: 'myLoans/repaymentPlans/FETCH',
            async payload() {
                for(var name in params){
                    if(params[name]===``){
                        delete params[name];
                    }else{
                        if(name==`dateStart`) {
                            params[name] += ' 00:00:00'
                        }
                        if(name==`dateEnd`) {
                            params[name] += ' 23:59:59'
                        }
                    }
                }
                params = parseJson2URL(params);
                const res = await cFetch(`${url_repaymentsList}?sortBy=-shdRpmtDate&`+params,{method: 'GET'}, true);
                const {code, data} = res;
                if (code == 0) {
                    return {
                        myList:data,
                    };
                } else {
                    throw res;
                }
            }
        }
    },
    getProList: () => {
        return {
            type: 'myLoans/repaymentPlans/FETCH',
            async payload() {
                const res = await cFetch(`${url_proList}`,{method: 'GET'}, true);
                const {code, data} = res;
                if (code == 0) {
                    return {
                        proList:data,
                    };
                } else {
                    throw res;
                }
            }
        }
    },
    getRepayment: (params) => {
        return {
            type: 'myLoans/repaymentPlans/FETCH',
            async payload() {
                const res = await cFetch(`${url_repayment}?rpmtId=${params}` , {method: 'GET'}, true);
                const {code, data} = res;
                if (code == 0) {
                    return {
                        projectInfo: data
                    };
                } else {
                    throw res;
                }
            }
        }
    },
    //提交还款
    postRepayment: (params,dispatch) => {

        return {
            type: 'myLoans/repaymentPlans/FETCH',
            async payload() {
                const res = await cFetch(`${url_postRepayment}`, postContent(params), true,600000);

                //console.log('返回的结果');
                //console.log(res);
                return {postResult: formatPostResult(res)};
            }
        }
    },

    stateRepaymentPlanModify: json => ({
        type: 'myLoans/repaymentPlans/MODIFY_STATE',
        payload: json
    }),
}

