import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import {addCommas,checkMoney} from './../assets/js/cost';

let investDetailActions = {
    getData: (status) => (dispatch, investDetail) => {
        dispatch(investDetailActions.getInvestInfo(5));
        dispatch(investDetailActions.getMemberInfo(5));
        dispatch(investDetailActions.getLoanInfo(5));
        dispatch(investDetailActions.getInvestRecords(5));
        dispatch(investDetailActions.getRepayRecords(5));


    },

    /*获取标的详情*/
    getInvestInfo: (id) => (dispatch, investDetail) => {
        let newState={};
        //let url=`http://172.16.4.5:8084/projects/${id}/investInfo`;
        let url=`http://172.16.4.5:8084/getloansList.php?pageNum=1&pageSize=10`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState={data:{},message:'无响应'};
                    dispatch(investDetailActions.stateInvestInfoModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {
                let mockDate={
                    data: {
                        pid:'1',
                        projectName:'汇车贷_HCD201701080001',
                        greenHand:1,   //是否新手标
                        greenName:'新手',
                        applyAmt:100000,  //借款金额
                        minMoneyTemp:1000,                  //本标的起投金额
                        maxMoneyTemp:10000,               //单笔投资上限
                        rangeMoneyTemp:100,              //递增金额
                        restMoneyTemp:50000,   			//标的剩余金额
                        process:50,
                        rate:8,    					//年化收益，单位%
                        raiseRate:4,//加息
                        repayType:'按月付息，到期还本',//还款方式
                        loanApplyExpiry:3,   				//投资期限，单位
                        sxDateTemp:'2017-01-10',                         //上线日期
                        jsDateTemp:'2017-01-29',                         //结束日期
                        mjNumTemp:'19',                         //募集天数
                        fkDateTemp:'',                         //放款日期
                        hkDateTemp:'',                         //还款日期
                    },
                    code: "0",
                    message: "SUCCESS",
                };
                newState={data:mockDate.data,message:''};
                //newState={data:data.data,message:''};
                dispatch(investDetailActions.stateInvestInfoModify(newState));
            }).catch(err=>{
                newState={data:{},message:'连接错误'};
                dispatch(investDetailActions.stateInvestInfoModify(newState));
        });


    },

    /*获取会员详情*/
    getMemberInfo: (id) => (dispatch, investDetail) => {
        let newState={};
        //let url=`http://172.16.4.5:8084/projects/${id}/investInfo`;
        let url=`http://172.16.4.5:8084/getloansList.php?pageNum=1&pageSize=10`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState={data:{},message:'无响应'};
                    dispatch(investDetailActions.stateMemberInfoModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {
                let mockDate={
                    data: {
                        user:1,//是否登录
                        isGreen:true, //是否新手
                        isOpenAccount:true,             //是否开户
                        isFxpg:true,
                        accountBalance:2000, //账户余额
                        redAmount:1548, //红包金额
                        rateNum:3, //加息券数量
                    },
                    code: "0",
                    message: "SUCCESS",
                };
                newState={data:mockDate.data,message:''};
                //newState={data:data.data,message:''};
                console.log(newState);
                dispatch(investDetailActions.stateMemberInfoModify(newState));
            }).catch(err=>{
                newState={data:{},message:'连接错误'};
                dispatch(investDetailActions.stateMemberInfoModify(newState));
        });


    },

    /*获取标的详情-信息披露部分*/
    getLoanInfo: (id) => (dispatch, investDetail) => {
        let newState={};
        //let url=`http://172.16.4.5:8084/projects/${id}/investInfo`;
        let url=`http://172.16.4.5:8084/getloansList.php?pageNum=1&pageSize=10`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState={data:{},message:'无响应'};
                    dispatch(investDetailActions.stateLoanModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {
                newState={data:data.data,message:''};
                dispatch(investDetailActions.stateLoanModify(newState));
            }).catch(err=>{
            newState={data:{},message:'连接错误'};
            dispatch(investDetailActions.stateLoanModify(newState));
        });


    },

    /*获取投资列表*/
    getInvestRecords: (id) => (dispatch, investDetail) => {
        let newState={};
        // 获取数据列表
        let url=`http://172.16.4.5:8084/getloansList.php?pageNum=1&pageSize=1000`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState={data:{},message:'无响应'};
                    dispatch(investDetailActions.stateInvestRecordsModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {

                newState={data:data.data,message:''};
                console.log(newState);
                dispatch(investDetailActions.stateInvestRecordsModify(newState));
            }).catch(err=>{
                newState={data:{},message:'连接错误'};
                dispatch(investDetailActions.stateInvestRecordsModify(newState));
        });


    },

    /*获取还款记录*/
    getRepayRecords: (id) => (dispatch, investDetail) => {
        let newState={};
        // 获取数据列表
        let url=`http://172.16.4.5:8084/getloansList.php?pageNum=1&pageSize=1000`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState={data:{},message:'无响应'};
                    dispatch(investDetailActions.stateRepayRecordsModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {
                newState={data:data.data,message:''};
                dispatch(investDetailActions.stateRepayRecordsModify(newState));
            }).catch(err=>{
            newState={data:{},message:'连接错误'};
            dispatch(investDetailActions.stateRepayRecordsModify(newState));
        });


    },


    //修改投资信息状态
    stateInvestInfoModify: json => ({
        type: 'investDetail/investInfo/MODIFY_STATE',
        payload: json
    }),
    //修改会员信息状态
    stateMemberInfoModify: json => ({
        type: 'investDetail/memberInfo/MODIFY_STATE',
        payload: json
    }),


    //修改借款信息状态
    stateLoanModify: json => ({
        type: 'investDetail/loan/MODIFY_STATE',
        payload: json
    }),

    //修改投资记录状态
    stateInvestRecordsModify: json => ({
        type: 'investDetail/investRecords/MODIFY_STATE',
        payload: json
    }),
    //修改借款记录状态
    stateRepayRecordsModify: json => ({
        type: 'investDetail/repayRecords/MODIFY_STATE',
        payload: json
    }),

};
export default investDetailActions;

