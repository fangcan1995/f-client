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

    getSubjects:`information/subjects`,//专题

    getSbList:`invest/projects/loan/page`, //获取散标列表
    getTransferlist:`invest/transfer/loan/page`, //获取债转标列表

    getProjectsLoan:`invest/projects/loan`, //出借信息
    getTransferLoan:`invest/transfer/loan`, //债转出借信息
    getProjectsInfo:`invest/projects/info`  ,//标的详情
    getProjectsRecord:`invest/projects/record` ,//获取散标出借记录
    getTransferRecord: `invest/transfer/record`,//获取转让标出借记录
    getRpmtplanPage:`invest/rpmtplan/page` ,//获取还款记录
    getAvailableRewards: `members/memberRewards/list`, //获取特定标的可用奖励列表
    postInvestApp:`invest/invest` ,//提交出借申请

    getApplyData:`loans/apply/qualification`, //借款申请详情
    postLoanData:`loans/apply`,//借款申请

    getMemberInfo:`accounts/my/simpleInfo`, //获取会员帐户基础信息
    setCertification:`members/auth`,//实名认证
    setTradePassword:`uaa/oauth/trade/password`, //设置交易密码
    getFuiouOpenAccountInfo:`payment/fuiou/account`, //给富有的开户信息
    getFuiouRecharge:`payment/fuiou/deposit`, //给富有的充值信息
    getFuiouWithdrawals:`payment/fuiou/cash`, //给富有的提现信息
    getFuiouChangeCard:`payment/fuiou/card`, //给富有的换卡信息
    uploadPhoto:`members/photo`, //上传头像
    getIncomeMonth:`accounts/income/month`,//获取月收益统计
    getIncomeDay:`accounts/income/day`,//获取日收益统计
    setLoginPassword:`uaa/oauth/password`,//修改登录密码

    getTradeRecord:`payment/fuiou/tradeRecords`,//获取交易记录
    getMessageList:`message/mail/page`,  //获取消息列表
    setMessageRead:`message/mail/read`, //设为已读
    deleteMessage:`message/mail`, //删除消息

    getRiskResult:`members/riskEvaluation/result`,  //获取风险测评结果
    getRiskList:`members/riskEvaluation`,  //获取风险测评题目
    putRisk:`members/riskEvaluation`,  //提交测评结果

    getMyRedEnvelopes:`members/memberRedEnvelopes`, //获取红包
    getMyRateCoupons:`members/memberRateCoupons`, //获取加息券

    getMyInvestCharts:`members/invest/statistics`, //我的出借统计图数据
    getMyInvestList:`members/investments`, //我的出借统计图数据
    getMyPlanList:`members/investments/receiving/`, //获取回款记录
    postTransferApp:`transfer/apply`, //转让申请
    getMyTransferInfo:`transfer/apply/info`, //获取债转详情

    getMyReceivingCharts:`members/investments/receiving/statistics`, //回款统计
    getMyReceivingList:`members/investments/receiving`, //回款列表


    getMyLoansCharts:`members/loans/statistics`, //我的借款统计图数据
    getMyLoansList:`members/loans`,//获取借款列表
    getMyRepaymentsAll:`repayment/ahead/apply/detail`,//项目提前还款时获取详情

    postRepaymentsAll:`repayment/ahead/apply`,//项目提前还款申请
    getMyRepaymentsCharts:`members/loans/repayments/statistics`, //统计图数据
    getMyRepaymentsList:`members/loans/repayments`,//获取借款列表
    getProList:`members/loans/proName`,//获取还款中和已完结的项目列表

    getRepaymentInfo:`repayment/normal/detail`,//还款时获取详情

    postRepaymentApp:`repayment/normal`,//还款申请

};



