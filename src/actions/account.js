import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import {addCommas,checkMoney} from './../assets/js/cost';
import { message } from 'antd';
import {urls,token} from './../utils/url';
import parseJson2URL from "../utils/parseJson2URL";
import {urls_auth} from "../utils/url";
import {API_CONFIG} from "../config/api";

const url_memberInfo=`${urls}/accounts/my/info`; //获取会员信息
const url_incomeMonth=`${urls}/accounts/income/month`; //获取月收益统计
const url_incomeDay=`${urls}/accounts/income/day`; //获取日收益统计

const url_openAccount=`${urls}/accounts`; //开户
const url_recharge=`${urls}/accounts/operation?escrowCode=100100&type=1`; //充值
const url_withdrawals=`${urls}/accounts/operation?escrowCode=100100&type=3`; //提现
const url_tradePassword=`${urls_auth}/uaa/oauth/password`; //修改交易密码
const url_certification=`${urls_auth}/uaa/oauth/password`; //实名认证
const url_uyouOpenAccountInfo=`http://172.16.1.252:9090/account/fuyou`; //给富有的开户信息
export const sendMemberVerifyCode = params => {
    return {
        type: 'member/SEND_VERIFY_CODE',
        async payload() {
            const res = await cFetch(API_CONFIG.baseUri + API_CONFIG.setTradePasswordVerifyCode + params, { credentials: 'include' }, false);
            const { code, data } = res;
            //console.log(res);
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
export const accountAc= {
    //获取会员帐户信息
    getAccountInfo: (params) => {
        return {
            type: 'member/account/FETCH',
            async payload() {
                const res = await cFetch(`${url_memberInfo}`,{method: 'GET'}, true);
                const {code, data} = res;
                if (code == 0) {
                    console.log('后台返回的会员信息');
                    console.log(res);
                    let mock={
                        isCertification:'1',	//是否实名认证（0：未实名；1：已实名）
                        isOpenAccount:'0',	//是否开户（0：未开户；1：已开户）
                        isRisk:'0',	//是否风险测评（0：否；1：是）
                        isSetTradepassword:'0',	//是否设置交易密码（0：未设置；1：已设置）
                        isNovice:'1',	//是否新手（0：否；1：是）
                        userName:'',	//真实姓名
                        idNumber:'',	//身份证号
                        photo:'',	//头像
                        riskLevel:'',	//风险测评等级
                        surplusAmount:'',//剩余投资限额
                        availableBalance:'',	//账户可用余额
                        bankName:'',	//开户行
                        bankNo:'',	//银行卡号
                        memberRedInfo:'',	//红包信息
                        memberCoupon:'',	//加息券信息
                    };
                    //data=mock;
                    return mock;
                } else {
                    throw res;
                }
            }
        }
    },
    //获取给富有的开户信息
    getFuyouOpenAccountInfo:(params)=> {
        return {
            type: 'member/account/OPENACCONT_FETCH',
            async payload() {
                const res = await cFetch(`${url_uyouOpenAccountInfo}`, {method: 'GET'}, true);
                const {code, data} = res;
                if (code == 0) {
                    console.log('后台获取的给富友的开户信息');
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
            type: 'member/account/TRADEPASSWORD_FETCH',
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
            type: 'member/account/CERTIFICATION_FETCH',
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
            type: 'member/account/CLEAR',
            payload() {
                return prams
            }
        }
    },
    change_goOutState: (prams) => {
        return {
            type: 'member/account/GOOUT_STATE',
            payload() {
                return prams
            }
        }
    },
}

