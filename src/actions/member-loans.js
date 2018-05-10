import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import parseJson2URL from './../utils/parseJson2URL';
import {urls,token} from '../utils/url'
import { API_CONFIG } from './../config/api';
import readBlobAsDataURL from '../utils/readBlobAsDataURL';
import {toMoney,toNumber,addCommas} from '../utils/famatData';

const url_loansCharts=`${urls}/members/loans/statistics`; //统计图数据
const url_loansList=`${urls}/members/loans`;//获取借款列表
const url_repaymentsAll=`${urls}/members/loans/repayments/all/`;//项目提前还款时获取详情
const url_postRepaymentsAll=`http://172.16.4.5:8084/test.php`;//项目提前还款申请
const url_repaymentsCharts=`${urls}/members/loans/repayments/statistics`; //统计图数据
const url_repaymentsList=`${urls}/members/loans/repayments`;//获取借款列表
const url_proList=`${urls}/members/loans/proName`;//获取还款中和已完结的项目列表
const url_repayment=`${urls}/members/loans/repayments/`;//还款时获取详情
const url_postRepayment=`${urls}/test.php`;//还款申请
export const getImageCode = () => {
    return {
        type: 'myLoans/GET_IMAGE_CODE',
        async payload() {
            const res = await fetch(API_CONFIG.baseUri + API_CONFIG.imageCode, { credentials: 'include' })
            const blob = await res.blob();
            const dataURL = await readBlobAsDataURL(blob);
            console.log('aaaaaaaaaaaaaaaaaaaaa');
            console.log(dataURL);
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
                                {name:'申请中',value:totalLoanDto.loaningMoney,instruction:`${addCommas(totalLoanDto.loaningMoney)}元`  },
                                {name:'招标中',value:totalLoanDto.investingMoney,instruction:`${addCommas(totalLoanDto.investingMoney)}元`},
                                {name:'还款中',value:totalLoanDto.repayingMoney,instruction:`${addCommas(totalLoanDto.repayingMoney)}元`},
                                {name:'已结清',value:totalLoanDto.settleMoney,instruction:`${addCommas(totalLoanDto.settleMoney)}元`}
                            ]
                        },
                        accumulatedInterest:{
                            data:[
                                {name:'还款中',value:accumulatedInterestDto.repayingIint,instruction:`${addCommas(accumulatedInterestDto.repayingIint)}元`  },
                                {name:'已结清',value:accumulatedInterestDto.settleIint,instruction:`${addCommas(accumulatedInterestDto.settleIint)}元`  },
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
                params = parseJson2URL(params);
                const res = await cFetch(`${url_loansList}?`+params,{method: 'GET'}, true);
                const {code, data} = res;
                console.log('发回的数据');
                console.log(data);
                console.log(code);
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
    getProject: (pram) => {
        return {
            type: 'myLoans/myLoans/FETCH',
            async payload() {
                const res = await cFetch(`${url_repaymentsAll}${pram}` , {method: 'GET'}, true);
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
        params = parseJson2URL(params);
        return {
            type: 'myLoans/myLoans/FETCH',
            async payload() {
                const res = await cFetch(`${url_postRepaymentsAll}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: params,
                    },
                    false);
                return {postResult: res};
                /*if (res.code == 0) {
                    return {postResult: res};
                } else {
                    throw res;
                }*/
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
                                {name:'逾期未还',value:allRepaymentDto.overdueNoRepay[1],instruction:`${allRepaymentDto.overdueNoRepay[0]}笔 ${addCommas(allRepaymentDto.overdueNoRepay[1])}元`  },
                                {name:'待还款',value:allRepaymentDto.repayments[1],instruction:`${allRepaymentDto.repayments[0]}笔 ${addCommas(allRepaymentDto.repayments[1])}元`},
                                {name:'逾期已还',value:allRepaymentDto.overdueRepay[1],instruction:`${allRepaymentDto.overdueRepay[0]}笔 ${addCommas(allRepaymentDto.overdueRepay[1])}元`},
                                {name:'已提前还款',value:allRepaymentDto.advanceRepay[1],instruction:`${allRepaymentDto.advanceRepay[0]}笔 ${addCommas(allRepaymentDto.advanceRepay[1])}元`},
                                {name:'已正常还款',value:allRepaymentDto.normalRepay[1],instruction:`${allRepaymentDto.normalRepay[0]}笔 ${addCommas(allRepaymentDto.normalRepay[1])}元`}
                            ]
                        },
                        todoDto:{
                            data:[
                                {name:'未还本金',value:todoRepaymentsDto.todoCapital,instruction:`${addCommas(todoRepaymentsDto.todoCapital)}元`  },
                                {name:'未还利息',value:todoRepaymentsDto.todoIint,instruction:`${addCommas(todoRepaymentsDto.todoIint)}元`  },
                                {name:'未还罚息',value:todoRepaymentsDto.todoLateIint,instruction:`${addCommas(todoRepaymentsDto.todoLateIint)}元`  },
                                {name:'未还罚金',value:todoRepaymentsDto.todoLateFine,instruction:`${addCommas(todoRepaymentsDto.todoLateFine)}元`  },
                            ]
                        },
                        doneDto:{
                            data:[
                                {name:'已还本金',value:doneRepaymentsDto.doneCapital,instruction:`${addCommas(doneRepaymentsDto.doneCapital)}元`  },
                                {name:'已还利息',value:doneRepaymentsDto.doneIint,instruction:`${addCommas(doneRepaymentsDto.doneIint)}元`  },
                                {name:'已还罚息',value:doneRepaymentsDto.doneLateIint,instruction:`${addCommas(doneRepaymentsDto.doneLateIint)}元`  },
                                {name:'已还罚金',value:doneRepaymentsDto.doneLateFine,instruction:`${addCommas(doneRepaymentsDto.doneLateFine)}元`  },
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
                params = parseJson2URL(params);
                const res = await cFetch(`${url_repaymentsList}?`+params,{method: 'GET'}, true);
                const {code, data} = res;
                console.log('发回的数据');
                console.log(`${url_repaymentsList}&`+params);
                console.log(data);
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
    getRepayment: (pram) => {
        return {
            type: 'myLoans/repaymentPlans/FETCH',
            async payload() {
                const res = await cFetch(`${url_repayment}${pram}` , {method: 'GET'}, true);
                console.log(`${url_repayment}${pram}`);
                const {code, data} = res;
                if (code == 0) {
                    console.log('返回的还款信息');
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
    postRepayment: (params,dispatch) => {
        params = parseJson2URL(params);
        //JSON.stringify(params)
        return {
            type: 'myLoans/repaymentPlans/FETCH',
            async payload() {
                const res = await cFetch(`${url_postRepaymentsAll}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: params,
                    },
                    false);
                return {postResult: res};
                /*if (res.code == 0) {
                    return {postResult: res};
                } else {
                    throw res;
                }*/
            }
        }
    },

    stateRepaymentPlanModify: json => ({
        type: 'myLoans/repaymentPlans/MODIFY_STATE',
        payload: json
    }),
}

