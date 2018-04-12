import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import {addCommas,checkMoney} from './../assets/js/cost';
import parseJson2URL from './../utils/parseJson2URL';
//import {urls,token} from '../utils/url'
import {token} from '../utils/url'
import { API_CONFIG } from './../config/api';
import readBlobAsDataURL from '../utils/readBlobAsDataURL';

let urls=`http://172.16.1.221:9090`;
const url_loansCharts=`${urls}/members/loans/statistics`; //统计图数据
const url_loansList=`${urls}/members/loans`;//获取借款列表
const url_repaymentsAll=`${urls}/members/loans/repayments/all/`;//项目提前还款时获取详情
const url_postRepaymentsAll=`http://172.16.4.5:8084/test.php`;//项目提前还款申请

const url_repaymentsCharts=`${urls}/members/loans/repayments/statistics`; //统计图数据
const url_repaymentsList=`${urls}/members/loans/repayments`;//获取借款列表
const url_proList=`${urls}/members/loans/proName`;//获取还款中和已完结的项目列表
const url_repayment=`${urls}/members/loans/repayments/`;//还款时获取详情
const url_postRepayment=`${urls}/test.php`;//还款申请
export const getImageCode = () => {
    return {
        type: 'myLoans/GET_IMAGE_CODE',
        async payload() {
            const res = await fetch(API_CONFIG.baseUri + API_CONFIG.imageCode, { credentials: 'include' })
            const blob = await res.blob();
            const dataURL = await readBlobAsDataURL(blob);
            console.log('aaaaaaaaaaaaaaaaaaaaa');
            console.log(dataURL);
            return dataURL;
        }
    }
}
export const memberLoansAc={
    getPie: () => {
        return {
            type: 'myLoans/myLoans/FETCH',
            async payload() {
                const res = await cFetch(`${url_loansCharts}` , {method: 'GET'}, true);
                const {code, data} = res;
                if (code == 0) {
                    let {totalLoanDto,accumulatedInterestDto}=data;
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
                    return {
                        charts:charts
                    };
                } else {
                    throw res;
                }
            }
        }
    },
    getList: (params) => {
        return {
            type: 'myLoans/myLoans/FETCH',
            async payload() {
                params = parseJson2URL(params);
                const res = await cFetch(`${url_loansList}?`+params,{method: 'GET'}, true);
                const {code, data} = res;
                console.log('发回的数据');
                console.log(data);
                console.log(code);
                if (code == 0) {
                    return {
                        myList:data,
                    };
                } else {
                    throw res;
                }
            }
        }
    },
    getProject: (pram) => {
        return {
            type: 'myLoans/myLoans/FETCH',
            async payload() {
                const res = await cFetch(`${url_repaymentsAll}${pram}` , {method: 'GET'}, true);
                const {code, data} = res;
                if (code == 0) {
                    console.log(data);
                    return {
                        projectInfo: data
                    };
                } else {
                    throw res;
                }
            }
        }
    },
    //提交提前还款申请
    postRepaymentApp: (params,dispatch) => {
        params = parseJson2URL(params);
        return {
            type: 'myLoans/myLoans/FETCH',
            async payload() {
                const res = await cFetch(`${url_postRepaymentsAll}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: params,
                    },
                    false);
                return {postResult: res};
                /*if (res.code == 0) {
                    return {postResult: res};
                } else {
                    throw res;
                }*/
            }
        }
    },
    //修改状态
    stateModify: json => ({
        type: 'myLoans/myLoans/MODIFY_STATE',
        payload: json
    }),
}
export const repaymentsAc={
    getPie: () => {
        return {
            type: 'myLoans/repaymentPlans/FETCH',
            async payload() {
                const res = await cFetch(`${url_repaymentsCharts}` , {method: 'GET'}, true);
                const {code, data} = res;
                if (code == 0) {
                    let {allRepaymentDto,todoRepaymentsDto,doneRepaymentsDto}=data;
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
                    return {
                        charts:charts
                    };
                } else {
                    throw res;
                }
            }
        }
    },
    getList: (params) => {
        return {
            type: 'myLoans/repaymentPlans/FETCH',
            async payload() {
                params = parseJson2URL(params);
                const res = await cFetch(`${url_repaymentsList}?`+params,{method: 'GET'}, true);
                const {code, data} = res;
                console.log('发回的数据');
                console.log(`${url_repaymentsList}&`+params);
                console.log(data);
                if (code == 0) {
                    return {
                        myList:data,
                    };
                } else {
                    throw res;
                }
            }
        }
    },
    getProList: () => {
        return {
            type: 'myLoans/repaymentPlans/FETCH',
            async payload() {
                const res = await cFetch(`${url_proList}`,{method: 'GET'}, true);
                const {code, data} = res;
                if (code == 0) {
                    return {
                        proList:data,
                    };
                } else {
                    throw res;
                }
            }
        }
    },
    getRepayment: (pram) => {
        return {
            type: 'myLoans/repaymentPlans/FETCH',
            async payload() {
                const res = await cFetch(`${url_repayment}${pram}` , {method: 'GET'}, true);
                console.log(`${url_repayment}${pram}`);
                const {code, data} = res;
                if (code == 0) {
                    console.log('返回的还款信息');
                    console.log(data);
                    return {
                        projectInfo: data
                    };
                } else {
                    throw res;
                }
            }
        }
    },
    //提交提前还款申请
    postRepayment: (params,dispatch) => {
        params = parseJson2URL(params);
        //JSON.stringify(params)
        return {
            type: 'myLoans/repaymentPlans/FETCH',
            async payload() {
                const res = await cFetch(`${url_postRepaymentsAll}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: params,
                    },
                    false);
                return {postResult: res};
                /*if (res.code == 0) {
                    return {postResult: res};
                } else {
                    throw res;
                }*/
            }
        }
    },

    stateRepaymentPlanModify: json => ({
        type: 'myLoans/repaymentPlans/MODIFY_STATE',
        payload: json
    }),
}
/*let memberLoansActions = {
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

    /!*我的借款*!/
    getData: (status) => (dispatch, memberLoans) => {
        dispatch(memberLoansActions.getPie());
        dispatch(memberLoansActions.getList(1,10,{status:status}));
    },

    getPie:()=>(dispatch,memberLoans)=>{
        let newState={};
        // 获取统计数据
        let url = `http://172.16.1.221:9090/members/loans/statistics?access_token=9c29f71c-a734-472f-a931-f63a876e1922`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    let {totalLoanDto,accumulatedInterestDto}=data;
                    newState={
                        charts:{
                            data:{},
                            message:'无响应'
                        }
                    };


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
        let url=`http://172.16.1.221:9090/members/loans?access_token=9c29f71c-a734-472f-a931-f63a876e1922&pageNum=${pageNum}&pageSize=${pageSize}${conditions}`;
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
        let url=`http://172.16.1.221:9090/members/loans/repayments/all/${pram}?access_token=9c29f71c-a734-472f-a931-f63a876e1922`;
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

    /!*还款计划*!/
    getRepaymentPlanData: (status) => (dispatch, memberLoans) => {
        dispatch(memberLoansActions.getRepaymentPlanPie());
        dispatch(memberLoansActions.getRepaymentPlanList(1,10));
        dispatch(memberLoansActions.getProList());
    },

    getRepaymentPlanPie:()=>(dispatch,memberLoans)=>{
        let newState={};
        // 获取统计数据
        let url = `http://172.16.1.221:9090/members/loans/repayments/statistics?access_token=9c29f71c-a734-472f-a931-f63a876e1922`;
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
        let url=`http://172.16.1.221:9090/members/loans/repayments?access_token=9c29f71c-a734-472f-a931-f63a876e1922&pageNum=${pageNum}&pageSize=${pageSize}${conditions}`;
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
                console.log('返回的数据');
                console.log(data.data);
                newState.myList={ data:data.data,message:''};
                dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
            }).catch(err=>{
                newState.myList={ data:{},message:'连接错误'};
                dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
        });


    },
    //获取还款中和已完结的项目列表
    getProList: () => (dispatch, memberLoans) => {
        let newState={};
        // 获取数据列表
        let url=`http://172.16.1.221:9090/members/loans/proName?access_token=9c29f71c-a734-472f-a931-f63a876e1922`;
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
                newState.proList=data.data;
                dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
            }).catch(err=>{
                newState.proList=[];
                dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
        });


    },
    //还款
    getRepayment:(pram)=>(dispatch, memberLoans)=>{
        let newState={};
        let url=`http://172.16.1.221:9090/members/loans/repayments/${pram}?access_token=9c29f71c-a734-472f-a931-f63a876e1922`;
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
                newState.repaymentInfo={repaymentData:data.data,message:''};
                dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
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
export default memberLoansActions;*/

