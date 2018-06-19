import cFetch from '../utils/cFetch';
import cookie from 'js-cookie';
import {toMoney, toNumber, addCommas, formatPostResult} from '../utils/famatData';
import parseJson2URL from './../utils/parseJson2URL';
import {urls,token} from './../utils/url';
import {API_CONFIG} from "../config/api";
import {postContent} from "../utils/formSetting";

const url_investCharts=API_CONFIG.hostWeb+API_CONFIG.getMyInvestCharts; //统计图数据
const url_investList=API_CONFIG.hostWeb+API_CONFIG.getMyInvestList;//获取投资列表
const url_planList=API_CONFIG.hostWeb+API_CONFIG.getMyPlanList;  //获取回款记录
// const url_postTransferApp=API_CONFIG.hostWeb+API_CONFIG.postTransferApp;//转让申请
const url_postTransferApp=`http://172.16.1.234:9090/transfer/apply/`;
// const url_getTransfer=API_CONFIG.hostWeb+API_CONFIG.getMyTransferInfo; //获取债转详情
const url_getTransfer=`http://172.16.1.234:9090/transfer/apply/info/`; //获取债转详情
const url_receivingCharts=API_CONFIG.hostWeb+API_CONFIG.getMyReceivingCharts;//回款统计
const url_receivingList=API_CONFIG.hostWeb+API_CONFIG.getMyReceivingList;//回款列表

export const memberInvestAc={
    getPie: () => {
        return {
            type: 'myInvest/investments/FETCH',
            async payload() {
                const res = await cFetch(`${url_investCharts}` , {method: 'GET'}, true);
                const {code, data} = res;
                if (code == 0) {
                    let {totalInvestmentDto,accumulatedIncomeDto}=data;
                    let charts={
                        totalInvestment:{
                            data:[
                                {name:'招标中',value:totalInvestmentDto.proMoneyBidding,instruction:`${addCommas(totalInvestmentDto.proMoneyBidding)}元`},
                                {name:'回款中',value:totalInvestmentDto.proMoneyInBack,instruction:`${addCommas(totalInvestmentDto.proMoneyInBack)}元`},
                                {name:'已回款',value:totalInvestmentDto.proMoneyBacked,instruction:`${addCommas(totalInvestmentDto.proMoneyBacked)}元`},
                                {name:'已转出',value:totalInvestmentDto.proMoneyOut,instruction:`${addCommas(totalInvestmentDto.proMoneyOut)}元`}
                            ]
                        },
                        accumulatedIncome:{
                            data:[
                                {name:'回款中',value:accumulatedIncomeDto.earnMoneyInBack,instruction:`${addCommas(accumulatedIncomeDto.earnMoneyInBack)}元`},
                                {name:'已回款',value:accumulatedIncomeDto.earnMoneyBacked,instruction:`${addCommas(accumulatedIncomeDto.earnMoneyBacked)}元` },
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
            type: 'myInvest/investments/FETCH',
            async payload() {
                params = parseJson2URL(params);
                const res = await cFetch(`${url_investList}?`+params,{method: 'GET'}, true);
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
    getPlanList:(param) => {
        return {
            type: 'myInvest/investments/FETCH',
            async payload() {

                const res = await cFetch(`${url_planList}${param}`,{method: 'GET'}, true);
                const {code, data} = res;
                if (code == 0) {
                    return {
                        planList:data,
                    };
                } else {
                    throw res;
                }
            }
        }
    },
    //债转详情
    getTransfer: (param) => {
        return {
            type: 'myInvest/investments/FETCH',
            async payload() {
                const res = await cFetch(`${url_getTransfer}?investId=${param}` , {method: 'GET'}, true);
                const {code, data} = res;
                if (code == 0) {
                    return {
                        transferInfo:data,
                    };
                } else {
                    throw res;
                }
            }
        }
    },
    //债转申请
    postTransfer:(params) =>  {
        return {
            type: 'myInvest/investments/TRANSFER_APP',
            async payload() {
                const res = await cFetch(url_postTransferApp, postContent(params), true);
                return {
                    postResult: formatPostResult(res)
                };


            }
        }
    },


    //修改状态
    stateModify: json => ({
        type: 'myInvest/investments/MODIFY_STATE',
        payload: json
    }),
}
export const memberReceivingAc={
    getPie: () => {
        return {
            type: 'myInvest/receiving/FETCH',
            async payload() {
                const res = await cFetch(`${url_receivingCharts}` , {method: 'GET'}, true);
                const {code, data} = res;
                if (code == 0) {
                    let {doneDto,todoDto}=data;
                    let charts={
                        doneDto:{
                            data:[
                                {name:'已回利息',value:doneDto.earnTotalIint,instruction:`${addCommas(doneDto.earnTotalIint)}元`},
                                {name:'已回本金',value:doneDto.earnTotalCapital,instruction:`${addCommas(doneDto.earnTotalCapital)}元`},
                                {name:'已回罚息',value:doneDto.earnTotalLateIint,instruction:`${addCommas(doneDto.earnTotalLateIint)}元`},

                            ]
                        },
                        todoDto:{
                            data:[
                                {name:'未回利息',value:todoDto.earnTotalIinting,instruction:`${addCommas(todoDto.earnTotalIinting)}元`},
                                {name:'未回本金',value:todoDto.earnTotalCapital,instruction:`${addCommas(todoDto.earnTotalCapital)}元` },
                                {name:'未回罚息',value:todoDto.earnTotalLateIint,instruction:`${addCommas(todoDto.earnTotalLateIint)}元` },
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
            type: 'myInvest/receiving/FETCH',
            async payload() {
                params = parseJson2URL(params);
                const res = await cFetch(`${url_receivingList}?`+params,{method: 'GET'}, true);
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
    //修改状态
    stateModify: json => ({
        type: 'myInvest/receiving/MODIFY_STATE',
        payload: json
    }),
}

