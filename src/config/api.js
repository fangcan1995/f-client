import {urls,urls_auth,token} from './../utils/url';
/*
2018-05-23 lily 修改
*/
const host = urls_auth;
const baseUri = host + '/';

export const API_CONFIG = {
    host: host,
    baseUri: baseUri,
    hostWeb:urls+ '/',

    auth: 'uaa/login',
    logout: 'uaa/oauth/logout',
    user: 'uaa/oauth/member/info',

    imageCode: 'uaa/code/image',
    loginVerifyCode: 'uaa/code/sms/login',

    checkUserExist: 'uaa/register/check/mobile',
    signup: 'uaa/register',
    forgetSignup:'uaa/oauth/forget/password',
    signupVerifyCode: 'uaa/code/sms/register',
    forgetVerifyCode: 'uaa/code/sms/forget/password',
    setTradePasswordVerifyCode:  '/uaa/code/sms/trade/password', //设置交易密码的短信接口

    getMemberInfo:`accounts/my/simpleInfo`, //获取会员帐户基础信息
    setCertification:`members/auth`,//实名认证
    setTradePassword:`uaa/oauth/trade/password`, //设置交易密码
    getFuiou:`http://172.16.1.252:9090/payment/fuiou/account`, //给富有的开户信息
    //提现
    //充值
    //重新绑卡

    uploadPhoto:`members/photo`, //上传头像


};
const url_tradePassword=`http://172.16.1.234:8060/uaa/oauth/trade/password`; //设置交易密码
const url_certification=`http://172.16.1.225:9090/members/auth`; //实名认证
