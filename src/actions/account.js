import cFetch from './../utils/cFetch';
import {formatPostResult} from '../utils/famatData';
import {postContent} from '../utils/formSetting';
import parseJson2URL from "../utils/parseJson2URL";
import {API_CONFIG} from "../config/api";

const url_uyouOpenAccountInfo='http://172.16.1.252:9090'+API_CONFIG.getFuiouOpenAccountInfo; //给富有的开户信息
const url_uyouReOpenAccountInfo='http://172.16.1.252:9090'+API_CONFIG.getFuiouChangeCard; //给富有的换卡信息
const url_uyouRecharge='http://172.16.1.252:9090'+API_CONFIG.getFuiouRecharge; //给富有的充值信息
const url_uyouWithdrawals='http://172.16.1.252:9090'+API_CONFIG.getFuiouWithdrawals; //给富有的提现信息

export const accountAc= {
    //虚拟流程，静态修改账户信息
    dummyModifyAccount:(params)=>{
        return {
            type: 'member/account/MODIFY_ACCOUNT',
            payload() {
                return params
            }
        }
    },
    //获取会员帐户信息
    getAccountInfo: (params) => {
        return {
            type: 'member/account/FETCH',
            async payload() {
                const res = await cFetch(API_CONFIG.hostWeb+API_CONFIG.getMemberInfo,{method: 'GET'}, true);
                const {code, data} = res;
                if (code == 0) {
                    console.log('后台返回的会员基础信息');
                    console.log(res);
                    /*let mock={
                        isCertification:'1',	//是否实名认证（0：未实名；1：已实名）
                        isOpenAccount:'1',	//是否开户（0：未开户；1：已开户）
                        isRisk:'1',	//是否风险测评（0：否；1：是）
                        isSetTradepassword:'1',	//是否设置交易密码（0：未设置；1：已设置）
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
                        bankName:'中国建设银行',	//开户行
                        bankNo:'4367********8523',	//银行卡号
                        memberRedInfo:{number: 1, amountSum: 500},	//红包信息
                        memberCoupon:{number: 5, amountSum: 3},	//加息券信息

                    };*/
                    //data=mock;
                    data.surplusAmount=1000000;
                    data.availableBalance=20000;	//账户可用余额
                    data.isNovice='1';
                    return data;
                } else {
                    throw data;
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
                url=url_uyouWithdrawals+`?url=`+params.url+'&transAmt='+params.value;
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
                const res = await cFetch(API_CONFIG.baseUri+API_CONFIG.setCertification, postContent(params), true);
                //测试用
                console.log('实名认证返回的结果');
                console.log(res);
                res.code=0;
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
            if ( code == 0 ) {
                return data || {};
            } else {
                throw res;
            }
        }
    }
}
export const setMemberVerifyCodeCd = cd => {
    return {
        type: 'member/SET_VERIFY_CODE_CD',
        payload: cd,
    }
}

