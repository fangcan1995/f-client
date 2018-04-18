import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import {addCommas,checkMoney} from './../assets/js/cost';
import { message } from 'antd';
import {urls,token} from './../utils/url';
import parseJson2URL from "../utils/parseJson2URL";


const url_memberInfo=`${urls}/accounts/my/info`; //获取会员信息
const url_incomeMonth=`${urls}/accounts/income/month`; //获取月收益统计
const url_incomeDay=`${urls}/accounts/income/day`; //获取日收益统计

const url_openAccount=`http://172.16.1.234:9090/accounts`; //开户
const url_recharge=`${urls}/accounts/operation?escrowCode=100100&type=1`; //充值
const url_withdrawals=`${urls}/accounts/operation?escrowCode=100100&type=3`; //提现


export const memberAc= {

    getInfo: (params) => {
        return {
            type: 'member/FETCH',
            async payload() {
                const res = await cFetch(`${url_memberInfo}`,{method: 'GET'}, true);
                const {code, data} = res;
                if (code == 0) {
                    return {
                        basicInfo:{
                            trueName:data.baseInfo.trueName,
                            memberId:data.baseInfo.memberId
                        },
                        amount:data.accountInfo,
                        redInfo:data.memberRedInfo,
                        couponInfo:data.memberCoupon,
                        openAccountStatus:data.openAccountStatus,
                        noviceStatus:data.noviceStatus,
                        acBack:data.acBank,
                        riskStatus:data.riskStatus,
                        riskLevel:data.riskLevel,
                        userName:data.member.userName,
                        photo:data.member.photo,

                    };
                } else {
                    throw res;
                }
            }
        }
    },
    getMonth: (params) => {
        return {
            type: 'member/FETCH_CHARTS',
            async payload() {
                const res = await cFetch(`${url_incomeMonth}` , {method: 'GET'}, true);
                const {code, data} = res;
                let xAxis_data=[];
                let series_data=[];
                for (var key in data.monthTimeSituationDto) {
                    xAxis_data.push(data.monthTimeSituationDto[key]);
                }
                for (var key in data.monthIncomeSituationDto) {
                    series_data.push(data.monthIncomeSituationDto[key]);
                }

                if (code == 0) {
                    return {
                        chartsMonth:{
                            xAxis_data:xAxis_data,
                            series_data:[{data:series_data}]
                        }
                    };
                } else {
                    throw res;
                }
            }
        }
    },
    getDay: (params) => {
        return {
            type: 'member/FETCH_CHARTS',
            async payload() {
                const res = await cFetch(`${url_incomeDay}` , {method: 'GET'}, true);
                const {code, data} = res;
                let xAxis_data=[];
                let series_data=[];
                for (var key in data.dayTimeSituationDto) {
                    xAxis_data.push(data.dayTimeSituationDto[key]);
                }
                for (var key in data.dayIncomeSituationDto) {
                    series_data.push(data.dayIncomeSituationDto[key]);
                }

                if (code == 0) {
                    return {
                        chartsDay:{
                            xAxis_data:xAxis_data,
                            series_data:[{data:series_data}]
                        }
                    };
                } else {
                    throw res;
                }
            }
        }
    },
    //开户
    postOpenAccount: (pram) => {
        return {
            type: 'member/FETCH_OPENACCOUNT',
            async payload() {
                pram=parseJson2URL(pram);
                const res = await cFetch(`${url_openAccount}?custId=123&escrowCode=100100&accountBalance=0&freezingAmount=0&availableBalance=0&${pram}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: ``,
                    },
                    true);
                return {postResult: res};
            }
        }
    },
    //充值
    recharge: (pram) => {
        return {
            type: 'member/FETCH',
            async payload() {
                const res = await cFetch(`${url_recharge}&amount=`+pram, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: ``,
                    },
                    true);
                if (res.code == 0) {
                    message.success('充值成功');
                    return {result: res};
                } else {
                    throw res;
                }
            }
        }
    },
    //提现
    withdrawals: (pram) => {

        return {
            type: 'member/FETCH',
            async payload() {
                const res = await cFetch(`${url_withdrawals}&amount=`+pram, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: ``,
                    },
                    true);
                if (res.code == 0) {
                    message.success('提现成功');
                    return {result: res};
                } else {
                    throw res;
                }
            }
        }
    },

    modifyState: (prams) => {
        return {
            type: 'member/MODIFY_STATE',
            payload() {
                return prams
            }
        }
    },
    modifyState: (prams) => {
        return {
            type: 'member/MODIFY_STATE',
            payload() {
                return prams
            }
        }
    },
}

