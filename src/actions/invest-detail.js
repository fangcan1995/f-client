import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import {addCommas,checkMoney} from './../assets/js/cost';

let investDetailActions = {
    getData: (id) => (dispatch, investDetail) => {
        let url=`http://172.16.1.234:9090/invest/projects/loan/${id}?access_token=50db1a79-395f-4d88-82f9-12bc1cad9f1c`;
        dispatch(investDetailActions.getInvestInfo(url,id));
        dispatch(investDetailActions.getMemberInfo(id));
        dispatch(investDetailActions.getLoanInfo(id));
        dispatch(investDetailActions.getInvestRecords(id));
        dispatch(investDetailActions.getRepayRecords(id));
    },

    getTransferData: (pid,transferId) => (dispatch, investDetail) => {
        let url=`http://172.16.1.234:9090/invest/transfer/loan/${transferId}?access_token=50db1a79-395f-4d88-82f9-12bc1cad9f1c`;
        dispatch(investDetailActions.getInvestInfo(url,transferId));
        dispatch(investDetailActions.getMemberInfo(pid));
        dispatch(investDetailActions.getLoanInfo(pid));
        dispatch(investDetailActions.getInvestRecords(pid));
        dispatch(investDetailActions.getTransferInvestRecords(transferId));

        dispatch(investDetailActions.getRepayRecords(pid));
    },

    /*获取散标详情*/
    getInvestInfo: (url,id) => (dispatch, investDetail) => {
        let newState={};

        //let url=`http://172.16.1.234:9090/invest/projects/loan/${id}?access_token=50db1a79-395f-4d88-82f9-12bc1cad9f1c`;
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
                newState={data:data.data,message:''};
                dispatch(investDetailActions.stateInvestInfoModify(newState));
            }).catch(err=>{
                newState={data:{},message:'连接错误'};
                dispatch(investDetailActions.stateInvestInfoModify(newState));
        });


    },

    /*获取会员详情*/
    getMemberInfo: (id) => (dispatch, investDetail) => {
        let newState={};
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
                        user:0,//是否登录
                        isGreen:true, //是否新手
                        isOpenAccount:true,             //是否开户
                        isFxpg:true,  //是否风险评估
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
        let url=`http://172.16.1.234:9090/invest/projects/info/${id}?access_token=50db1a79-395f-4d88-82f9-12bc1cad9f1c`;
        //let url=`http://172.16.4.5:8084/getloansList.php?pageNum=1&pageSize=10`;
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

    /*获取散标投资记录*/
    getInvestRecords: (id) => (dispatch, investDetail) => {
        let newState={};
        // 获取数据列表
        let url=`http://172.16.1.234:9090/invest/projects/record?access_token=50db1a79-395f-4d88-82f9-12bc1cad9f1c&pageNum=1&pageSize=1000&projectId=${id}`;
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

    /*获取转让标投资记录*/
    getTransferInvestRecords: (id) => (dispatch, investDetail) => {
        let newState={};
        // 获取数据列表
        let url=`http://172.16.1.234:9090/invest/transfer/record?access_token=50db1a79-395f-4d88-82f9-12bc1cad9f1c&pageNum=1&pageSize=1000&projectId=${id}`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState={data:{},message:'无响应'};
                    dispatch(investDetailActions.stateInvestTransferRecordsModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {

                newState={data:data.data,message:''};
                console.log(newState);
                dispatch(investDetailActions.stateInvestTransferRecordsModify(newState));
            }).catch(err=>{
            newState={data:{},message:'连接错误'};
            dispatch(investDetailActions.stateInvestTransferRecordsModify(newState));
        });


    },

    /*获取还款记录*/
    getRepayRecords: (id) => (dispatch, investDetail) => {
        let newState={};
        // 获取数据列表
        let url=`http://172.16.1.234:9090/invest/rpmtplan/page?access_token=50db1a79-395f-4d88-82f9-12bc1cad9f1c&pageNum=1&pageSize=1000&projectId=${id}`;
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



    //提交充值申请
    postRecharge:(pram) => (dispatch, memberLoans) => {
        let newState={};
        let url = `http://172.16.4.5:8084/test.php`;
        fetch(url,{
            method: "POST",
            mode:'cors',
            cache: 'default',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pram)
        })
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState= {
                        code:1,
                        type:'fail',
                        message:'提交失败'
                    };
                    dispatch(investDetailActions.statePostResultModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {
                setTimeout(() => {
                    //dispatch(investDetailActions.refreshPostResult(2));
                    newState= {
                        code:2,
                        type:'success',
                        message:'提交成功'
                    };
                    dispatch(investDetailActions.statePostResultModify(newState));
                }, 100);
            })
            .catch(err=>{
                newState= {
                    code:1,
                    type:'fail',
                    message:'提交失败'
                };
                dispatch(investDetailActions.statePostResultModify(newState));
            });
    },

    //提交投资申请
    postInvest:(pram) => (dispatch, memberLoans) => {
        let newState={};
        let url = `http://172.16.4.5:8084/test.php`;
        fetch(url,{
            method: "POST",
            mode:'cors',
            cache: 'default',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pram)
        })
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState= {
                        postResult:1
                    };
                    dispatch(investDetailActions.statePostResultModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {
                setTimeout(() => {
                    //dispatch(investDetailActions.refreshPostResult(2));
                    newState= {
                        postResult:2
                    };
                    dispatch(investDetailActions.statePostResultModify(newState));
                }, 100);
            })
            .catch(err=>{
                newState= {
                    postResult:1
                };
                dispatch(investDetailActions.statePostResultModify(newState));
            });
    },

    //提交风险测评
    postRiskAssess:(pram) => (dispatch, memberLoans) => {
        let newState={};
        let url = `http://172.16.4.5:8084/test.php`;
        fetch(url,{
            method: "POST",
            mode:'cors',
            cache: 'default',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pram)
        })
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState= {
                        postResult:1
                    };
                    dispatch(investDetailActions.statePostResultModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {
                setTimeout(() => {
                    //dispatch(investDetailActions.refreshPostResult(2));
                    newState= {
                        postResult:2
                    };
                    dispatch(investDetailActions.statePostResultModify(newState));
                }, 100);
            })
            .catch(err=>{
                newState= {
                    postResult:1
                };
                dispatch(investDetailActions.statePostResultModify(newState));
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

    //修改提交状态
    statePostResultModify: json => ({
        type: 'investDetail/postResult/MODIFY_STATE',
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
    //修改转让标投资记录状态
    stateInvestTransferRecordsModify: json => ({
        type: 'investDetail/investTransferRecords/MODIFY_STATE',
        payload: json
    }),
    //修改借款记录状态
    stateRepayRecordsModify: json => ({
        type: 'investDetail/repayRecords/MODIFY_STATE',
        payload: json
    }),

};
export default investDetailActions;

