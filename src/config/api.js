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
    getFuiouOpenAccountInfo:`payment/fuiou/account`, //给富有的开户信息
    getFuiouRecharge:`payment/fuiou/deposit`, //给富有的充值信息
    getFuiouWithdrawals:`payment/fuiou/cash`, //给富有的提现信息
    getFuiouChangeCard:`payment/fuiou/card`, //给富有的换卡信息


    uploadPhoto:`members/photo`, //上传头像

    getProjectsLoan:`invest/projects/loan`, //投资信息
    getTransferLoan:`invest/transfer/loan`, //债转投资信息
    getProjectsInfo:`invest/projects/info`  ,//标的详情
    getProjectsRecord:`invest/projects/record` ,//获取散标投资记录
    getTransferRecord: `invest/transfer/record`,//获取转让标投资记录
    getRpmtplanPage:`invest/rpmtplan/page` ,//获取还款记录
    getAvailableRewards: `members/memberRedEnvelopes/list`, //获取特定标的可用奖励列表
    postInvestApp:`invest/invest` ,//提交投资申请


};



