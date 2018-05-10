import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import {addCommas,checkMoney} from '../utils/cost';
import { message } from 'antd';
import {urls,token} from './../utils/url';
import parseJson2URL from "../utils/parseJson2URL";
import {urls_auth} from "../utils/url";


const url_memberInfo=`${urls}/accounts/my/info`; //获取会员信息
const url_incomeMonth=`${urls}/accounts/income/month`; //获取月收益统计
const url_incomeDay=`${urls}/accounts/income/day`; //获取日收益统计

const url_openAccount=`${urls}/accounts`; //开户
const url_recharge=`${urls}/accounts/operation?escrowCode=100100&type=1`; //充值
const url_withdrawals=`${urls}/accounts/operation?escrowCode=100100&type=3`; //提现
const url_tradePassword=`${urls_auth}/uaa/oauth/password`; //修改交易密码
const url_certification=`${urls_auth}/uaa/oauth/password`; //实名认证
const url_uyouOpenAccountInfo=`http://172.16.1.252:9030/account`; //给富有的开户信息
export const memberAc= {

    getInfo: (params) => {
        //console.log('token');
        //console.log(cookie.getJSON('token').access_token);
        return {
            type: 'member/FETCH',
            async payload() {
                const res = await cFetch(`${url_memberInfo}`,{method: 'GET'}, true);
                const {code, data} = res;

                if (code == 0) {
                    console.log('后台返回的会员信息');
                    console.log(res);
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
                        acBank:data.acBank,
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
    //获取给富有的开户信息
    getFuyouOpenAccountInfo:(params)=> {
        return {
            type: 'member/fuyou/FETCH',
            async payload() {
                const res = await cFetch(`${url_uyouOpenAccountInfo}`, {method: 'POST'}, true);
                const {code, data} = res;
                if (code == 0) {
                    console.log('后台获取的给富有的开户信息');
                    console.log(data);
                    return data;
                }else {
                    throw res;
                }

            }
        }
    },


    //开户
    postOpenAccount: (pram) => {
        console.log('开户');
        return {
            type: 'member/FETCH_POSTING',
            async payload() {
                pram=parseJson2URL(pram);
                const res = await cFetch(`${url_openAccount}?custId=123&escrowCode=100100&accountBalance=0&freezingAmount=0&availableBalance=0&${pram}`,
                    {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: ``,
                    },
                    true);
                /*if (res.code == 0) {
                    return {dummyResult: res};
                } else {
                    throw res;
                }*/
                let type=``;
                (res.code == 0)?type='success':type='error';
                console.log('提交开户返回的结果');
                console.log(res);
                return {
                    dummyResult: {
                        code:res.code,
                        type:type,
                        message:res.message,
                        description:res.data||``,
                    }
                };
            }
        }
    },
    //充值
    recharge: (pram) => {
        return {
            type: 'member/FETCH_POSTING',
            async payload() {
                const res = await cFetch(`${url_recharge}&amount=`+pram, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: ``,
                    },
                    true);
               /* if (res.code == 0) {
                    message.success('充值成功');
                    return {postResult: res};
                } else {
                    throw res;
                }*/
                console.log('充值提交后返回');
                console.log(res);
                let type=``;
                (res.code == 0)?type='success':type='error';
                return {
                    dummyResult: {
                        code:res.code,
                        type:type,
                        message:res.message,
                        description:res.data,
                    }
                };
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
                /*if (res.code == 0) {
                    //message.success('提现成功');
                    return {postResult: res};
                } else {
                    throw res;
                }*/
                return {dummyResult: res};
            }
        }
    },
    //设置交易密码
    setTradePassword: (params) => {
        console.log('提交给后台的参数是：');
        params=parseJson2URL(params);
        console.log(params);
        return {
            type: 'member/tradePassword/FETCH',
            async payload() {
                const res = await cFetch(`${url_tradePassword}?${params}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: ``,
                    },
                    true);

                let type=``;
                (res.code == 0)?type='success':type='error';
                console.log('修改密码返回的结果');
                console.log(res);
                return {
                        code:res.code,
                        type:type,
                        message:res.message||``,
                        description:res.data||``,
                };
            }
        }
    },
    //实名认证
    certification: (params) => {
        console.log('实名认证提交给后台的参数是：');
        params=parseJson2URL(params);
        console.log(params);
        return {
            type: 'member/certification/FETCH',
            async payload() {
                const res = await cFetch(`${url_certification}?${params}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: ``,
                    },
                    true);

                let type=``;
                (res.code == 0)?type='success':type='error';
                console.log('实名认证返回的结果');
                console.log(res);
                return {
                    code:res.code,
                    type:type,
                    message:res.message||``,
                    description:res.data||``,
                };
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
    clear: (prams) => {
        return {
            type: 'member/CLEAR',
            payload() {
                return prams
            }
        }
    },
}

