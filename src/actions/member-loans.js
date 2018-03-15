import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import {addCommas,checkMoney} from './../assets/js/cost';

let memberLoansActions = {
    //打开关闭模态框
    toggleModal:(modal,visile,id)=>(dispatch, memberLoans) => {
        let newState={};
        if(modal=='modalRepaymentApp'){
            if(visile){
                newState={
                    modalRepaymentApp: true,
                    currentId: id,
                };
                dispatch(memberLoansActions.stateModify(newState));
            }else{
                newState={
                    modalRepaymentApp: false,
                    currentId: '',
                };
                dispatch(memberLoansActions.stateModify(newState));
            }
        }else if(modal=='modalRepayment'){
            if(visile){
                newState.modalRepayment=true;
                newState.currentId= id,
                dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
            }else{
                newState.modalRepayment=false;
                newState.currentId= '',
                dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
            }
        }

    },

    /*我的借款*/
    getData: (status) => (dispatch, memberLoans) => {
        dispatch(memberLoansActions.getPie());
        dispatch(memberLoansActions.getList(1,10,{status:status}));
    },
    getPie:()=>(dispatch,memberLoans)=>{
        let newState={};
        // 获取统计数据
        let url = `http://172.16.1.221:9090/members/loans/statistics?access_token=7f94aba6-35ff-40ee-87d7-2bb7671eee6f`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState={
                        charts:{
                            data:{},
                            message:'无响应'
                        }
                    };
                    dispatch(memberLoansActions.stateModify(newState));

                }
            })
            .then((data) => data.json())
            .then(data => {
                setTimeout(() => {
                    let {totalLoanDto,accumulatedInterestDto}=data.data;
                    let charts={
                        totalLoan:{
                            data:[
                                {name:'申请中',value:totalLoanDto.loaningMoney,instruction:`${addCommas(totalLoanDto.loaningMoney)}元`  },
                                {name:'招标中',value:totalLoanDto.investingMoney,instruction:`${addCommas(totalLoanDto.investingMoney)}元`},
                                {name:'还款中',value:totalLoanDto.repayingMoney,instruction:`${addCommas(totalLoanDto.repayingMoney)}元`},
                                {name:'已结清',value:totalLoanDto.settleMoney,instruction:`${addCommas(totalLoanDto.settleMoney)}元`}
                            ]
                        },
                        accumulatedInterest:{
                            data:[
                                {name:'还款中',value:accumulatedInterestDto.repayingIint,instruction:`${addCommas(accumulatedInterestDto.repayingIint)}元`  },
                                {name:'已结清',value:accumulatedInterestDto.settleIint,instruction:`${addCommas(accumulatedInterestDto.settleIint)}元`  },
                            ]
                        },
                    };
                    newState={
                        charts:
                            {
                                data:charts,
                                message:''
                            }
                    };
                    dispatch(memberLoansActions.stateModify(newState));
                }, 1000);
            })
            .catch(err=>{
                newState={
                    charts:{
                        data:{},
                        message:'连接错误'
                    }
                };
                dispatch(memberLoansActions.stateModify(newState));
            });
    },
    getList: (pageNum=1,pageSize=10,filter={}) => (dispatch, memberLoans) => {
        let newState={};
        // 获取数据列表
        let conditions='';
        if(JSON.stringify(filter)!={}){
            for(var item in filter){
                conditions += "&"+item+"="+filter[item];
            }
        }
        //let url=`http://172.16.4.5:8084/getloansList.php?pageNum=${pageNum}&pageSize=${pageSize}${conditions}`;
        let url=`http://172.16.1.221:9090/members/loans?access_token=7f94aba6-35ff-40ee-87d7-2bb7671eee6f&pageNum=${pageNum}&pageSize=${pageSize}${conditions}`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState={
                        myList:{
                            data:{},
                            message:'无响应'
                        }
                    };
                    dispatch(memberLoansActions.stateModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {
                newState={
                    myList:
                        {
                            data:data.data,
                            message:''
                        }
                };
                dispatch(memberLoansActions.stateModify(newState));
            }).catch(err=>{
            newState={
                myList: {
                    data:{},
                    message:'连接错误'
                }
            };
            dispatch(memberLoansActions.stateModify(newState));
        });


    },
    getRepaymentApp:(pram)=>(dispatch, memberLoans)=>{
        let newState={};
        let url=`http://172.16.1.221:9090/members/loans/repayments/all/${pram}?access_token=7f94aba6-35ff-40ee-87d7-2bb7671eee6f`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState={
                        repaymentInfo:
                            {
                                repaymentData:{},
                                message:'无响应'
                            }
                    };
                    dispatch(memberLoansActions.stateModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {
                setTimeout(() => {
                    console.log('---------------data.data--------------');
                    console.log(data.data);
                    newState={
                        repaymentInfo:
                            {
                                repaymentData:data.data,
                                message:''
                            }
                    };
                    dispatch(memberLoansActions.stateModify(newState));
                }, 1000);


            }).catch(err=>{
            newState={
                repaymentInfo:
                    {
                        repaymentData:{},
                        message:'连接错误'
                    }
            };
            dispatch(memberLoansActions.stateModify(newState));

        });

    },
    //根据状态检索投资列表
    filter: (pram) => (dispatch, memberLoans) => {
        dispatch(memberLoansActions.toggleClass(pram));
        //dispatch(memberLoansActions.refreshListFail(''));
        dispatch(memberLoansActions.getList(1,10,{status:pram}));

    },
    //选项卡样式切换
    toggleClass:(pram)=>(dispatch, memberLoans)=>{
        let newState={};
        newState= {
            status:pram
        };
        dispatch(memberLoansActions.stateModify(newState));
    },
    //提交提前还款申请
    postRepaymentApp:(pram) => (dispatch, memberLoans) => {
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
                    dispatch(memberLoansActions.stateModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {
                setTimeout(() => {
                    //dispatch(memberLoansActions.refreshPostResult(2));
                    newState= {
                        postResult:2
                    };
                    dispatch(memberLoansActions.stateModify(newState));
                }, 100);
            })
            .catch(err=>{
                newState= {
                    postResult:1
                };
                dispatch(memberLoansActions.stateModify(newState));
            });
    },

    /*还款计划*/
    getRepaymentPlanData: (status) => (dispatch, memberLoans) => {
        dispatch(memberLoansActions.getRepaymentPlanPie());
        dispatch(memberLoansActions.getRepaymentPlanList(1,10));
        dispatch(memberLoansActions.getProList(1,100,{status:3}));
    },
    getRepaymentPlanPie:()=>(dispatch,memberLoans)=>{
        let newState={};
        // 获取统计数据
        let url = `http://172.16.1.221:9090/members/loans/repayments/statistics?access_token=7f94aba6-35ff-40ee-87d7-2bb7671eee6f`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState.charts={ data:{},message:'连接错误'};
                    dispatch(memberLoansActions.stateRepaymentPlanModify(newState));

                }
            })
            .then((data) => data.json())
            .then(data => {
                setTimeout(() => {
                    let {allRepaymentDto,todoRepaymentsDto,doneRepaymentsDto}=data.data;
                    let charts={
                        repayments:{
                            data:[
                                {name:'逾期未还',value:allRepaymentDto.overdueNoRepay[1],instruction:`${allRepaymentDto.overdueNoRepay[0]}笔 ${addCommas(allRepaymentDto.overdueNoRepay[1])}元`  },
                                {name:'待还款',value:allRepaymentDto.repayments[1],instruction:`${allRepaymentDto.repayments[0]}笔 ${addCommas(allRepaymentDto.repayments[1])}元`},
                                {name:'逾期已还',value:allRepaymentDto.overdueRepay[1],instruction:`${allRepaymentDto.overdueRepay[0]}笔 ${addCommas(allRepaymentDto.overdueRepay[1])}元`},
                                {name:'已提前还款',value:allRepaymentDto.advanceRepay[1],instruction:`${allRepaymentDto.advanceRepay[0]}笔 ${addCommas(allRepaymentDto.advanceRepay[1])}元`},
                                {name:'已正常还款',value:allRepaymentDto.normalRepay[1],instruction:`${allRepaymentDto.normalRepay[0]}笔 ${addCommas(allRepaymentDto.normalRepay[1])}元`}
                            ]
                        },
                        todoDto:{
                            data:[
                                {name:'未还本金',value:todoRepaymentsDto.todoCapital,instruction:`${addCommas(todoRepaymentsDto.todoCapital)}元`  },
                                {name:'未还利息',value:todoRepaymentsDto.todoIint,instruction:`${addCommas(todoRepaymentsDto.todoIint)}元`  },
                                {name:'未还罚息',value:todoRepaymentsDto.todoLateIint,instruction:`${addCommas(todoRepaymentsDto.todoLateIint)}元`  },
                                {name:'未还罚金',value:todoRepaymentsDto.todoLateFine,instruction:`${addCommas(todoRepaymentsDto.todoLateFine)}元`  },
                            ]
                        },
                        doneDto:{
                            data:[
                                {name:'已还本金',value:doneRepaymentsDto.doneCapital,instruction:`${addCommas(doneRepaymentsDto.doneCapital)}元`  },
                                {name:'已还利息',value:doneRepaymentsDto.doneIint,instruction:`${addCommas(doneRepaymentsDto.doneIint)}元`  },
                                {name:'已还罚息',value:doneRepaymentsDto.doneLateIint,instruction:`${addCommas(doneRepaymentsDto.doneLateIint)}元`  },
                                {name:'已还罚金',value:doneRepaymentsDto.doneLateFine,instruction:`${addCommas(doneRepaymentsDto.doneLateFine)}元`  },
                            ]
                        },
                    };
                    newState.charts={ data:charts,message:''};
                    dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
                }, 1000);
            })
            .catch(err=>{
                newState.charts={ data:{},message:'连接错误'};
                dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
            });
    },
    getRepaymentPlanList: (pageNum=1,pageSize=10,filter={}) => (dispatch, memberLoans) => {
        let newState={};
        newState.myList={ data:'',message:''};
        dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
        // 获取数据列表
        let conditions='';
        if(JSON.stringify(filter)!={}){
            for(var item in filter){
                if(filter[item]!=''){
                    conditions += "&"+item+"="+filter[item];
                }
            }
        }
        let url=`http://172.16.1.221:9090/members/loans/repayments?access_token=7f94aba6-35ff-40ee-87d7-2bb7671eee6f&pageNum=${pageNum}&pageSize=${pageSize}${conditions}`;
        console.log(url);
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState.myList={ data:{},message:'无响应'};
                    dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {
                newState.myList={ data:data.data,message:''};
                console.log('返回的数据');
                console.log(newState.myList);
                dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
            }).catch(err=>{
                newState.myList={ data:{},message:'连接错误'};
                dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
        });


    },
    //获取还款中的项目列表
    getProList: (pageNum=1,pageSize=10,filter={}) => (dispatch, memberLoans) => {
        let newState={};
        // 获取数据列表
        let conditions='';
        if(JSON.stringify(filter)!={}){
            for(var item in filter){
                conditions += "&"+item+"="+filter[item];
            }
        }
        //http://172.16.1.221:9090/members/loans?access_token=7f94aba6-35ff-40ee-87d7-2bb7671eee6f&pageNum=1&pageSize=10&status=2
        let url=`http://172.16.1.221:9090/members/loans?access_token=7f94aba6-35ff-40ee-87d7-2bb7671eee6f&pageNum=1&pageSize=100&status=0`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState.proList=[];
                    dispatch(memberLoansActions.stateRepaymentPlanModify(newState));

                }
            })
            .then((data) => data.json())
            .then(data => {
                newState.proList=data.data.list;
                dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
            }).catch(err=>{
                newState.proList=[];
                dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
        });


    },
    //还款
    getRepayment:(pram)=>(dispatch, memberLoans)=>{
        let newState={};
        let url=`http://172.16.4.5:8084/getRepayment.php`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState.repaymentInfo={repaymentData:{},message:'无响应'};
                    dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {
                setTimeout(() => {
                    newState.repaymentInfo={repaymentData:data.data,message:''};
                    dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
                }, 1000);


            }).catch(err=>{
                newState.repaymentInfo={repaymentData:{},message:'连接错误'};
                dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
            });

    },
    postRepayment:(pram) => (dispatch, memberLoans) => {
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
                    newState.postResult=1;
                    dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {
                setTimeout(() => {
                    newState.postResult=2;
                    dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
                }, 100);
            })
            .catch(err=>{
                newState.postResult=1;
                dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
            });
    },

    //修改状态
    stateModify: json => ({
        type: 'myLoans/myLoans/MODIFY_STATE',
        payload: json
    }),
    stateRepaymentPlanModify: json => ({
        type: 'myLoans/repaymentPlans/MODIFY_STATE',
        payload: json
    }),
};
export default memberLoansActions;

