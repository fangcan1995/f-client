import cFetch from '../utils/cFetch';
import cookie from 'js-cookie';
import {addCommas,checkMoney} from '../assets/js/cost';
import parseJson2URL from './../utils/parseJson2URL';

const token=`?access_token=9c29f71c-a734-472f-a931-f63a876e1922`;
const url_investCharts=`http://172.16.1.234:9090/members/invest/statistics${token}`; //统计图数据
const url_investList=`http://172.16.1.234:9090/members/investments${token}`;//获取投资列表
const url_planList=`http://172.16.4.62:9090/members/investments/receiving/`  //获取回款记录
const url_postTransferApp=`http://172.16.4.5:8084/test.php`;//转让申请
const url_getTransfer=`http://172.16.4.62:9090/members/investments/transfer/`; //获取债转详情
const url_repaymentsAll=`http://172.16.1.221:9090/members/loans/repayments/all/`;//项目提前还款时获取详情


export const memberInvestAc={
    getPie: () => {
        return {
            type: 'myInvest/investments/FETCH',
            async payload() {
                const res = await cFetch(`${url_investCharts}` , {method: 'GET'}, false);
                const {code, data} = res;
                if (code == 0) {
                    let {totalInvestmentDto,accumulatedIncomeDto}=data.data;
                    let charts={
                        totalInvestment:{
                            data:[
                                {name:'招标中',value:totalInvestmentDto.proMoneyBidding,instruction:`${addCommas(totalInvestmentDto.proMoneyBidding)}元`},
                                {name:'回款中',value:totalInvestmentDto.proMoneyInBack,instruction:`${addCommas(totalInvestmentDto.proMoneyInBack)}元`},
                                {name:'已回款',value:totalInvestmentDto.proMoneyBacked,instruction:`${addCommas(totalInvestmentDto.proMoneyBacked)}元`},
                                {name:'已转出',value:totalInvestmentDto.proMoneyOut,instruction:`${addCommas(totalInvestmentDto.proMoneyOut)}元`}
                            ]
                        },
                        accumulatedIncome:{
                            data:[
                                {name:'回款中',value:accumulatedIncomeDto.earnMoneyInBack,instruction:`${addCommas(accumulatedIncomeDto.earnMoneyInBack)}元`},
                                {name:'已回款',value:accumulatedIncomeDto.earnMoneyBacked,instruction:`${addCommas(accumulatedIncomeDto.earnMoneyBacked)}元` },
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
            type: 'myInvest/investments/FETCH',
            async payload() {
                params = parseJson2URL(params);
                const res = await cFetch(`${url_investList}&`+params,{method: 'GET'}, false);
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
    getPlanList:(param) => {
        return {
            type: 'myInvest/investments/FETCH',
            async payload() {

                const res = await cFetch(`${url_planList}${param}${token}`,{method: 'GET'}, false);
                const {code, data} = res;
                if (code == 0) {
                    return {
                        planList:data,
                    };
                } else {
                    throw res;
                }
            }
        }
    },
    //债转详情
    getTransfer: (pram) => {
        return {
            type: 'myInvest/investments/FETCH',
            async payload() {
                const res = await cFetch(`${url_getTransfer}${pram}${token}` , {method: 'GET'}, false);
                const {code, data} = res;
                if (code == 0) {
                    transferInfo:data
                } else {
                    throw res;
                }
            }
        }
    },
    //债转申请
    postTransfer:(params) =>  {
        params = parseJson2URL(params);
        return {
            type: 'myInvest/investments/FETCH',
            async payload() {
                const res = await cFetch(`${url_postTransferApp}`, {
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
        type: 'myInvest/investments/MODIFY_STATE',
        payload: json
    }),
}


let actionsMyInvestments = {
    getData: (status) => (dispatch, myInvestments) => {
        dispatch(actionsMyInvestments.getPie());
        dispatch(actionsMyInvestments.getList(1,10,{status:status}));
    },
    getPie:()=>(dispatch,myInvestments)=>{
        let myReceiving_new={};
        // 获取统计数据
        let url = `http://172.16.4.62:9090/members/invest/statistics?access_token=97c8feba-9a64-4f9a-93ed-100816046afe`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    myReceiving_new={
                        charts:{
                            data:{},
                            message:'无响应'
                        }
                    };
                    dispatch(actionsMyInvestments.stateModify(myReceiving_new));

                }
            })
            .then((data) => data.json())
            .then(data => {
                setTimeout(() => {
                    let {totalInvestmentDto,accumulatedIncomeDto}=data.data;
                    let charts={
                        totalInvestment:{
                            data:[
                                {name:'招标中',value:totalInvestmentDto.proMoneyBidding,instruction:`${addCommas(totalInvestmentDto.proMoneyBidding)}元`},
                                {name:'回款中',value:totalInvestmentDto.proMoneyInBack,instruction:`${addCommas(totalInvestmentDto.proMoneyInBack)}元`},
                                {name:'已回款',value:totalInvestmentDto.proMoneyBacked,instruction:`${addCommas(totalInvestmentDto.proMoneyBacked)}元`},
                                {name:'已转出',value:totalInvestmentDto.proMoneyOut,instruction:`${addCommas(totalInvestmentDto.proMoneyOut)}元`}
                            ]
                        },
                        accumulatedIncome:{
                            data:[
                                {name:'回款中',value:accumulatedIncomeDto.earnMoneyInBack,instruction:`${addCommas(accumulatedIncomeDto.earnMoneyInBack)}元`},
                                {name:'已回款',value:accumulatedIncomeDto.earnMoneyBacked,instruction:`${addCommas(accumulatedIncomeDto.earnMoneyBacked)}元` },
                            ]
                        },
                    };
                    myReceiving_new={
                        charts:
                            {
                                data:charts,
                                message:''
                            }
                    };
                    dispatch(actionsMyInvestments.stateModify(myReceiving_new));
                }, 1000);
            })
            .catch(err=>{
                myReceiving_new={
                    charts:{
                        data:{},
                        message:'连接错误'
                    }
                };
                dispatch(actionsMyInvestments.stateModify(myReceiving_new));
            });
    },
    getList: (pageNum=1,pageSize=10,filter={}) => (dispatch, myInvestments) => {
        let myReceiving_new={};
        // 获取数据列表
        let conditions='';
        if(JSON.stringify(filter)!={}){
            for(var item in filter){
                conditions += "&"+item+"="+filter[item];
            }
        }
        let url=`http://172.16.4.62:9090/members/investments?access_token=97c8feba-9a64-4f9a-93ed-100816046afe&pageNum=${pageNum}&pageSize=${pageSize}${conditions}`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    dispatch(actionsMyInvestments.stateModify({myReceiving:{data: {},message:'无响应'}}));
                }
            })
            .then((data) => data.json())
            .then(data => {
                myReceiving_new={
                    myList:
                        {
                            data:data.data,
                            message:''
                        }
                };
                dispatch(actionsMyInvestments.stateModify(myReceiving_new));
            }).catch(err=>{
                myReceiving_new={
                    myList: {
                        data:{},
                        message:'连接错误'
                    }
                };
                dispatch(actionsMyInvestments.stateModify(myReceiving_new));
        });


    },
    getPlanList:(pram)=>(dispatch, myInvestments)=>{
        let myReceiving_new={};
        let url=`http://172.16.4.62:9090/members/investments/receiving/${pram}?access_token=97c8feba-9a64-4f9a-93ed-100816046afe`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    myReceiving_new={
                        currentPro:
                            {
                                planData:[],
                                currentId:'',
                                message:'无响应'
                            }
                    };
                    dispatch(actionsMyInvestments.stateModify(myReceiving_new));
                }
            })
            .then((data) => data.json())
            .then(data => {
                myReceiving_new={
                    currentPro:
                        {
                            planData:data.data,
                            currentId:pram,
                            message:''
                        }
                };

                dispatch(actionsMyInvestments.stateModify(myReceiving_new));
            }).catch(err=>{
            myReceiving_new={
                currentPro:
                    {
                        planData:[],
                        currentId:'',
                        message:'连接错误'
                    }
            };
            dispatch(actionsMyInvestments.stateModify(myReceiving_new));
        });
    },
    getTransfer:(pram)=>(dispatch, myInvestments)=>{
        let myReceiving_new={};
        let url=`http://172.16.4.62:9090/members/investments/transfer/${pram}?access_token=97c8feba-9a64-4f9a-93ed-100816046afe`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    myReceiving_new={
                        transferInfo:
                            {
                                transferData:{},
                                currentId:'',
                                message:'无响应'
                            }
                    };
                    dispatch(actionsMyInvestments.stateModify(myReceiving_new));
                }
            })
            .then((data) => data.json())
            .then(data => {
                setTimeout(() => {
                    console.log('---------------data.data--------------');
                    console.log(data.data);
                    myReceiving_new={
                        transferInfo:
                            {
                                transferData:data.data,
                                currentId:'',
                                message:''
                            }
                    };
                    dispatch(actionsMyInvestments.stateModify(myReceiving_new));
                }, 1000);


            }).catch(err=>{
            myReceiving_new={
                transferInfo:
                    {
                        transferData:{},
                        currentId:'',
                        message:'连接错误'
                    }
                };
                dispatch(actionsMyInvestments.stateModify(myReceiving_new));

        });

    },
    //根据状态检索投资列表
    filter: (pram) => (dispatch, myInvestments) => {
        dispatch(actionsMyInvestments.toggleClass(pram));
        //dispatch(actionsMyInvestments.refreshListFail(''));
        dispatch(actionsMyInvestments.getList(1,10,{status:pram}));

    },
    //打开关闭模态框
    toggleModal:(modal,visile,id)=>(dispatch, myInvestments) => {
        let myReceiving_new={};
        if(modal=='modalPlan'){
            if(visile){
                dispatch(actionsMyInvestments.getPlanList(id));//获取某项目回款计划
                myReceiving_new={
                    modalPlan: true,
                    currentId: id,
                };
                dispatch(actionsMyInvestments.stateModify(myReceiving_new));
            }else{
                myReceiving_new={
                    modalPlan: false,
                    currentId: '',
                };
                dispatch(actionsMyInvestments.stateModify(myReceiving_new));
            }
        }else if(modal=='modalTransfer'){

            if(visile){
                myReceiving_new={
                    modalTransfer: true,
                    currentId: id,
                };
                dispatch(actionsMyInvestments.stateModify(myReceiving_new));
            }else{

                myReceiving_new={
                    modalTransfer: false,
                    currentId: '',
                };
                dispatch(actionsMyInvestments.stateModify(myReceiving_new));
            }
        }

    },

    //选项卡样式切换
    toggleClass:(pram)=>(dispatch, myInvestments)=>{
        let myReceiving_new={};
        myReceiving_new= {
            status:pram
        };
    dispatch(actionsMyInvestments.stateModify(myReceiving_new));
    },
    //提交债转申请
    postTransfer:(pram) => (dispatch, myInvestments) => {
        let myReceiving_new={};
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
                    myReceiving_new= {
                        postResult:1
                    };
                    dispatch(actionsMyInvestments.stateModify(myReceiving_new));
                }
            })
            .then((data) => data.json())
            .then(data => {
                setTimeout(() => {
                    //dispatch(actionsMyInvestments.refreshPostResult(2));
                    myReceiving_new= {
                        postResult:2
                    };
                    dispatch(actionsMyInvestments.stateModify(myReceiving_new));
                }, 100);
            })
            .catch(err=>{
                myReceiving_new= {
                    postResult:1
                };
                dispatch(actionsMyInvestments.stateModify(myReceiving_new));
            });
    },
    /*refreshChartsSuccess: json => ({
        type: 'FETCH_CHARTS_SUCCESS',
        payload: json
    }),
    refreshChartsFail: errMsg => ({
        type: 'FETCH_CHARTS_FAIL',
        payload: errMsg,
    }),
    refreshListSuccess: json => ({
        type: 'FETCH_LIST_SUCCESS',
        payload: json
    }),
    refreshListFail: errMsg => ({
        type: 'FETCH_LIST_FAIL',
        payload: errMsg,
        error: true
    }),
    refreshPlanListSuccess: (id,json) => ({
        type: 'FETCH_PLANLIST_SUCCESS',
        payload: json,
        id:id,
    }),
    refreshPlanListFail: (id,errMsg) => ({
        type: 'FETCH_PLANLIST_FAIL',
        payload: errMsg,
        id:id,
    }),
    refreshTransferSuccess: (id,json) => ({
        type: 'FETCH_TRANSFER_SUCCESS',
        payload: json,
        id:id,
    }),
    refreshTransferFail: (id,errMsg) => ({
        type: 'FETCH_TRANSFER_FAIL',
        payload: errMsg,
        id:id,
    }),
    refreshPostResult: (msg) => ({
        type: 'FETCH_POST_RESULT',
        payload: msg,
    }),

    modalPlanShow: (id) => ({
        type: 'MODAL_PLAN_SHOW',
        //payload: id,

    }),
    modalPlanHide: id => ({
        type: 'MODAL_PLAN_HIDE',
        payload: id
    }),
    modalTransferShow: (id) => ({
        type: 'MODAL_TRANSFER_SHOW',
        payload: id
    }),
    modalTransferHide: id => ({
        type: 'MODAL_TRANSFER_HIDE',
        payload: id
    }),
    modifyTransfer: (json) => ({
        type: 'MODIFY_TRANSFER',
        payload:json,

    }),
*/
    //-------------------------------------
    stateModify: json => ({
        type: 'myInvest/investments/MODIFY_STATE',
        payload: json
    })

};
export default actionsMyInvestments;

