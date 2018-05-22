import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import {formatPostResult} from '../utils/famatData';
import {postContent} from '../utils/formSetting';
import {urls,token} from './../utils/url';
import parseJson2URL from "../utils/parseJson2URL";
import {API_CONFIG} from "../config/api";

const url_memberInfo=`${urls}/members/riskEvaluation`; //获取会员信息
//const url_openAccount=`${urls}/accounts`; //假开户
//const url_recharge=`${urls}/accounts/operation?escrowCode=100100&type=1`; //充值
//const url_withdrawals=`${urls}/accounts/operation?escrowCode=100100&type=3`; //提现
const url_tradePassword=`http://172.16.1.234:8060/uaa/oauth/trade/password`; //设置交易密码
const url_certification=`http://172.16.1.225:9090/members/auth`; //实名认证

export const sendMemberVerifyCode = params => {
    return {
        type: 'member/SEND_VERIFY_CODE',
        async payload() {
            //http://172.16.1.234:8060/uaa/code/sms/trade/password?username=13011111111&send_terminal=web
            const res = await cFetch('http://172.16.1.234:8060' + API_CONFIG.setTradePasswordVerifyCode + params, { credentials: 'include' }, false);
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
                const res = await cFetch(`${url_memberInfo}`,{method: 'GET'}, true);
                const {code, data} = res;
                if (code == 0) {
                    console.log('后台返回的会员信息11111');
                    //console.log(res);
                    let mock={
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

                    };
                    //data=mock;
                    console.log(mock);

                    return mock;
                } else {
                    throw mock;
                }
            }
        }
    },
    //获取给富有的信息
    getFuyouInfo:(params)=> {
        let url=``;
        const url_uyouOpenAccountInfo=`http://172.16.1.252:9090/payment/fuiou/account`; //给富有的开户信息
        const url_uyouReOpenAccountInfo=`http://172.16.1.252:9090/payment/fuiou/card`; //给富有的换卡信息
        const url_uyouRecharge=`http://172.16.1.252:9090/payment/fuiou/deposit`; //给富有的充值信息
        const url_uyouWithdrawals=`http://172.16.1.252:9090/payment/fuiou/cash`; //给富有的提现信息
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
                console.log('///////////////////');
                console.log(res);
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
                const res = await cFetch(`${url_certification}`, postContent(params), true);
                //测试用
                console.log('实名认证返回的结果');
                console.log(res);
                res.code=0;
                //end
                return formatPostResult(res);
            }
        }
    },
    //假开户,可以删除
    /*postOpenAccount: (pram) => {
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
    },*/
    /*//充值
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
                /!* if (res.code == 0) {
                     message.success('充值成功');
                     return {postResult: res};
                 } else {
                     throw res;
                 }*!/
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
    },*/
    //提现
    /*withdrawals: (pram) => {
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
                /!*if (res.code == 0) {
                    //message.success('提现成功');
                    return {postResult: res};
                } else {
                    throw res;
                }*!/
                return {dummyResult: res};
            }
        }
    },*/
    //设置交易密码
    setTradePassword: (params) => {
        params=parseJson2URL(params);
        return {
            //type: 'member/account/CERTIFICATION_FETCH', //虚拟，测试用
            type: 'member/account/TRADEPASSWORD_FETCH',  //真实
            async payload() {
                const res = await cFetch(`${url_tradePassword}?${params}`, postContent(``), true); //真实
                //测试用
                console.log('设置密码返回的结果');
                console.log(res);
                //res.code=0;
                //res.message='设置交易密码成功';
                //end
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

