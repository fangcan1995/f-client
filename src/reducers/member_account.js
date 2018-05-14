import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    isFetching:false,
    isPosting:false,
    isOpenOthers:false,
    postResult:``,
    verifyCodeCd:``,
    accountsInfo:{
        isCertification:'0',	//是否实名认证（0：未实名；1：已实名）
        isOpenAccount:'0',	//是否开户（0：未开户；1：已开户）
        isRisk:'0',	//是否风险测评（0：否；1：是）
        isSetTradepassword:'1',	//是否设置交易密码（0：未设置；1：已设置）
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
    },
    toOthersInfo:``  //调第三方接口携带的信息

});

export default createReducer(initialState, {
    //同步修改数据
    //修改帐户信息，假
    ['member/account/MODIFY']:(state,action) => state.mergeDeep({
        accountsInfo:action.payload
    }),
    //清除提交结果
    ['member/account/CLEAR']:(state,action) => state.mergeDeep({
        postResult:``,
        isPosting:false,
        isOpenOthers:false,
        toOthersInfo:``
    }),
    //修改是否去了第三方的状态
    ['member/account/GOOUT_STATE']:(state,action) => state.mergeDeep({
        isOpenOthers:action.payload
    }),

    //异步获取会员帐户信息
    ['member/account/FETCH_PENDING']:(state,action) => state.mergeDeep({
        isFetching: true,
    }),
    ['member/account/FETCH_FULFILLED']:(state,action) => state.mergeDeep({
        isFetching: false,
        accountsInfo:action.payload
    }),
    ['member/account/FETCH_REJECTED']:(state,action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),
    //异步获取开户需要携带的信息
    ['member/account/OPENACCONT_FETCH_PENDING']:(state,action) => state.mergeDeep({
        isFetching: true,
    }),
    ['member/account/OPENACCONT_FETCH_FULFILLED']:(state,action) => state.mergeDeep({
        isFetching: false,
        toOthersInfo:action.payload
    }),
    ['member/account/OPENACCONT_FETCH_REJECTED']:(state,action) => state.mergeDeep({
        isFetching: false,
        errorMessage: action.message
    }),
    //实名认证
    ['member/account/CERTIFICATION_FETCH_PENDING']:(state,action) => state.mergeDeep({
        isPosting: true,
    }),
    ['member/account/CERTIFICATION_FETCH_FULFILLED']:(state,action) => state.mergeDeep({
        isPosting: false,
        postResult:action.payload
    }),
    ['member/account/CERTIFICATION_FETCH_REJECTED']:(state,action) => state.mergeDeep({
        isPosting: false,
        errorMessage: action.message
    }),

    //异步设置/重置交易密码
    ['member/account/TRADEPASSWORD_FETCH_PENDING']:(state,action) => state.mergeDeep({
        isFetching: true,
        isPosting: true,
    }),
    ['member/account/TRADEPASSWORD_FETCH_FULFILLED']:(state,action) => state.mergeDeep({
        isFetching: false,
        isPosting: false,
        postResult:action.payload
    }),
    ['member/account/TRADEPASSWORD_FETCH_REJECTED']:(state,action) => state.mergeDeep({
        isFetching: false,
        isPosting: false,
        errorMessage: action.message
    }),

    //异步开户，充值，提现临时用
    ['member/FETCH_POSTING_PENDING']:(state,action) => state.mergeDeep({
        isFetching: true,
        isPosting: true,
    }),
    ['member/FETCH_POSTING_FULFILLED']:(state,action) => state.mergeDeep({
        isFetching: false,
        isPosting: false,
        accountsInfo:action.payload
    }),
    ['member/FETCH_POSTING_REJECTED']:(state,action) => state.mergeDeep({
        isFetching: false,
        isPosting: false,
        errorMessage: action.message
    }),

    //发送短信验证码
    ['member/SEND_VERIFY_CODE_PENDING']: (state, action) => state.merge({
        isFetching: true,
    }),
    ['member/SEND_VERIFY_CODE_FULFILLED']: (state, action) => state.merge({
        isFetching: false,
        verifyCode: action.payload
    }),
    ['member/SEND_VERIFY_CODE_REJECTED']: (state, action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    }),

    //读秒
    ['member/SET_VERIFY_CODE_CD']: (state, action) => state.merge({
        verifyCodeCd: action.payload
    }),


})



