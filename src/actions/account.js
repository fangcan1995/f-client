import cFetch from './../utils/cFetch';
import {formatPostResult} from '../utils/famatData';
import {postContent} from '../utils/formSetting';

import parseJson2URL from "../utils/parseJson2URL";
import {API_CONFIG} from "../config/api";

const url_uyouOpenAccountInfo=API_CONFIG.hostWeb+API_CONFIG.getFuiouOpenAccountInfo; //给富有的开户信息
const url_uyouReOpenAccountInfo=API_CONFIG.hostWeb+API_CONFIG.getFuiouChangeCard; //给富有的换卡信息
const url_uyouRecharge=API_CONFIG.hostWeb+API_CONFIG.getFuiouRecharge; //给富有的充值信息
const url_uyouWithdrawals=API_CONFIG.hostWeb+API_CONFIG.getFuiouWithdrawals; //给富有的提现信息
const url_setCertification=API_CONFIG.hostWeb+API_CONFIG.setCertification

export const accountAc= {
    //获取会员帐户信息
    getAccountInfo: (params) => {
        return {
            type: 'member/account/FETCH',
            async payload() {
                const res = await cFetch(API_CONFIG.hostWeb+API_CONFIG.getMemberInfo,{method: 'GET'}, true);
                const {code, data} = res;
                if (code == 0) {
                    //console.log('后台返回的会员基础信息');
                    //console.log(res);
                    let mock={
                        isCertification:'1',	//是否实名认证（0：未实名；1：已实名）
                        isOpenAccount:'0',	//是否开户（0：未开户；1：已开户）
                        isSetTradepassword:'1',	//是否设置交易密码（0：未设置；1：已设置）
                        isRisk:'1',	//是否风险测评（0：否；1：是）
                        isNovice:'1',	//是否新手（0：否；1：是）
                        trueName:'张三',	//真实姓名
                        idNumber:'',	//身份证号
                        photo:'',	//头像
                        riskLevel:'',	//风险测评等级
                        surplusAmount:1000000,//剩余投资限额
                        accountBalance:100000,//账户余额
                        availableBalance:2000,	//账户可用余额
                        freezingAmount:0,  //冻结金额
                        investAmount:0,  //散标资产
                        yestEarns:0, //昨日收益
                        totalEarns:0, //累计收益
                        bankCode:'CCB',
                        bankName:'中国建设银行',	//开户行
                        bankNo:'4367********8523',	//银行卡号
                        memberRedInfo:{number: 1, amountSum: 500},	//红包信息
                        memberCoupon:{number: 5, amountSum: 3},	//加息券信息
                        bohaiConfig:{
                            rechargeMin:10,
                            rechargeMax:50000,
                            withdrawalsMin:1,
                            withdrawalsMax:100000000,
                            rechargeHandFee:0,
                            rechargeHandFeeMin:0,
                            withdrawalsHandFee:0.2,
                            withdrawalsHandFeeMin:0.2,
                        } //虚拟
                    };
                    let data=mock;

                    return data;
                } else {
                    throw data;
                }
            }
        }
    },
    //获取给渤海的信息
    getBohaiInfo:(params)=> {
        let url=``;
        switch (params.type){
            case 'OpenAccount':
                url=`http://59.110.15.234:9030/payAccount/bohai`+`?url=`+params.url; //开户
                break;
            case 'ReOpenAccount':
                url=`http://59.110.15.234:9030/payAccount/bohai/changeCard`+`?url=`+params.url;  //换卡
                break;
            case 'reCharge':
                url=`http://59.110.15.234:9030/payTrans/bohai/deposit`+`?url=`+params.url+'&transAmt='+params.value;;  //充值
                break;
            case 'Withdrawals':
                url=`http://59.110.15.234:9030/payTrans/bohai/cash`+`?url=`+params.url+'&transAmt='+params.value;  //提现
                break;
            case 'changePhone':
                url=`http://59.110.15.234:9030/payAccount/bohai/changeMobile`+`?url=`+params.url;  //换手机号
                break;
            case 'changeTradePwd':
                url=`http://59.110.15.234:9030/payAccount/bohai/changePwd`+`?url=`+params.url;  //设置交易密码
                break;
            default:
                break;
        }
        return {
            type: 'member/account/BOHAI_FETCH',
            async payload() {
                let  res = await cFetch(`${url}`, {method: 'GET'}, false);
                let {code, data} = res;
                if (code == 0) {
                    return data;
                }else {
                    return res;
                }

            }
        }
    },
    //获取给富有的信息
    getFuyouInfo:(params)=> {
        let url=``;

        switch (params.type){
            case 'OpenAccount':
                url=url_uyouOpenAccountInfo+`?url=`+params.url; //开户
                break;
            case 'ReOpenAccount':
                url=url_uyouReOpenAccountInfo+`?url=my-account_bank-card`;  //换卡
                break;
            case 'reCharge':
                url=url_uyouRecharge+`?url=`+params.url+'&transAmt='+params.value;

                break;
            case 'Withdrawals':
                url=url_uyouWithdrawals+`?url=`+params.url+'&transAmt='+params.value+'&tradePwd='+params.tradePwd;

                break;
            default:
                break;
        }
        return {
            type: 'member/account/UYOU_FETCH',
            async payload() {
                let  res = await cFetch(`${url}`, {method: 'GET'}, true);
                let {code, data} = res;
                if (code == 0) {
                    return data;
                }else {
                    return res;
                }

            }
        }
    },
    //实名认证
    certification: (params) => {
        return {
            type: 'member/account/CERTIFICATION_FETCH',
            async payload() {
                const res = await cFetch(url_setCertification, postContent(params), true);
                //测试用
                //console.log('实名认证返回的结果');
                //console.log(res);
                //res.code=0;
                //end
                return formatPostResult(res);
            }
        }
    },
    //设置交易密码
    setTradePassword: (params) => {
        params=parseJson2URL(params);
        return {
            type: 'member/account/TRADEPASSWORD_FETCH',  //真实
            async payload() {
                const res = await cFetch(API_CONFIG.baseUri+API_CONFIG.setTradePassword+`?${params}`, postContent(``), true); //真实
                return formatPostResult(res);
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
    //清空postResult
    clear: (prams) => {
        return {
            type: 'member/account/CLEAR',
            payload() {
                return prams
            }
        }
    },
    // 切换打开第三方的状态
    change_goOutState: (prams) => {
        return {
            type: 'member/account/GOOUT_STATE',
            payload() {
                return prams
            }
        }
    },
}
export const sendMemberVerifyCode = params => {
    return {
        type: 'member/SEND_VERIFY_CODE',
        async payload() {
            const res = await cFetch(API_CONFIG.baseUri + API_CONFIG.setTradePasswordVerifyCode + params, { credentials: 'include' }, false);
            const { code, data } = res;
            //console.log('发短信返回的结果');
            //console.log(res);
            if ( code == 0 ) {
                return data || {};
            } else{
                throw res;
            }
        }
    }
}


