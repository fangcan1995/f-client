import cFetch from './../../../../utils/cFetch';
import cookie from 'js-cookie';
import {addCommas,checkMoney} from '../../../../assets/js/cost';

let actionsMyInvestments = {
    getData: (status) => (dispatch, myInvestments) => {
        dispatch(actionsMyInvestments.getPie());
        dispatch(actionsMyInvestments.getList(1,10,{status:status}));
    },
    getPie:()=>(dispatch,myInvestments)=>{
        // 获取统计数据
        let url = `http://172.16.4.62:9090/members/invest/statistics?access_token=7bc2aec5-2003-4cc1-9220-1dadef256a3f`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    dispatch(actionsMyInvestments.refreshChartsFail('后端代码'));
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
                    dispatch(actionsMyInvestments.refreshChartsSuccess(charts));
                }, 1000);
            })
            .catch(err=>{
                dispatch(actionsMyInvestments.refreshChartsFail('连接错误'));
            });
    },
    getList: (pageNum=1,pageSize=10,filter={}) => (dispatch, myInvestments) => {
        // 获取数据列表
        let conditions='';
        if(JSON.stringify(filter)!={}){
            for(var item in filter){
                conditions += "&"+item+"="+filter[item];
            }
        }
        //let url = `http://172.16.4.5:8084/getList.php?access_token=1480826e-71b9-4cb0-8590-abbbe81ef9a0&pageNum=${pageNum}&pageSize=${pageSize}${conditions}`;
        let url=`http://172.16.4.62:9090/members/investments?access_token=7bc2aec5-2003-4cc1-9220-1dadef256a3f&pageNum=${pageNum}&pageSize=${pageSize}${conditions}`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    dispatch(actionsMyInvestments.refreshListFail('后端代码'));
                }
            })
            .then((data) => data.json())
            .then(data => {
                dispatch(actionsMyInvestments.refreshListSuccess(data.data));
            }).catch(err=>{
            dispatch(actionsMyInvestments.refreshListFail('连接错误'));
        });


    },
    getPie:()=>(dispatch,myInvestments)=>{
        // 获取统计数据
        let url = `http://172.16.4.62:9090/members/invest/statistics?access_token=7bc2aec5-2003-4cc1-9220-1dadef256a3f`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    dispatch(actionsMyInvestments.refreshChartsFail('后端代码'));
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
                    dispatch(actionsMyInvestments.refreshChartsSuccess(charts));
                }, 1000);
            })
            .catch(err=>{
                dispatch(actionsMyInvestments.refreshChartsFail('连接错误'));
            });
    },
    getPlanList:(pram)=>(dispatch, myInvestments)=>{
        let url=`http://172.16.4.62:9090/members/investments/receiving/${pram}?access_token=7bc2aec5-2003-4cc1-9220-1dadef256a3f`;
        //let url = `http://172.16.4.5:8084/getPlanList.php?id=${pram}}`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    dispatch(actionsMyInvestments.refreshPlanListFail('后端代码'));
                }
            })
            .then((data) => data.json())
            .then(data => {
                dispatch(actionsMyInvestments.refreshPlanListSuccess(pram,data.data));
            }).catch(err=>{
            dispatch(actionsMyInvestments.refreshPlanListFail(pram,'连接错误'));
        });
    },
    getTransfer:(pram)=>(dispatch, myInvestments)=>{
        let url=`http://172.16.4.62:9090/members/investments/transfer/${pram}?access_token=7bc2aec5-2003-4cc1-9220-1dadef256a3f`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    dispatch(actionsMyInvestments.refreshTransferFail('后端代码'));
                }
            })
            .then((data) => data.json())
            .then(data => {
                console.log('----data----')
                console.log(data);
                dispatch(actionsMyInvestments.refreshTransferSuccess(pram,data.data));
            }).catch(err=>{
            dispatch(actionsMyInvestments.refreshTransferFail(pram,'连接错误'));
        });
    },
    //根据状态检索投资列表
    filter: (pram) => (dispatch, myInvestments) => {
        dispatch(actionsMyInvestments.toggleClass(pram));
        dispatch(actionsMyInvestments.getList(1,10,{status:pram}));

    },
    //打开关闭模态框
    toggleModal:(modal,visile,id)=>(dispatch, myInvestments) => {
        if(modal=='modalPlan'){
            if(visile){
                dispatch(actionsMyInvestments.getPlanList(id));//获取某项目回款计划
                dispatch(actionsMyInvestments.modalPlanShow(id));  //显示回款计划弹框
            }else{
                dispatch(actionsMyInvestments.modalPlanHide(id))
            }
        }else if(modal=='modalTransfer'){
            console.log('------id--------');
            console.log(id);
            if(visile){
                dispatch(actionsMyInvestments.getTransfer(id));//获取债权转让详情
                dispatch(actionsMyInvestments.modalTransferShow(id));  //显示债权转让弹框
            }else{
                dispatch(actionsMyInvestments.modalTransferHide(id))
            }
        }

    },
    //选项卡样式切换
    toggleClass: id => ({
        type: 'TOGGLE_CLASS',
        payload: id
    }),
    //验证债转申请
    checkTransfer:(pram) => (dispatch, myInvestments) => {
        //console.log('验证');

        dispatch(actionsMyInvestments.refreshPostSwitch(false,'aaaa'));
    },
    //提交债转申请
    postTransfer:(pram) => (dispatch, myInvestments) => {
        //dispatch(actionsMyInvestments.checkTransfer());
        console.log('提交申请');
    },
    changeAmount:(pram) => (dispatch, myInvestments) => {
        dispatch(actionsMyInvestments.refreshAmount(pram));
        console.log('----------1111-----------');
    },
    refreshChartsSuccess: json => ({
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

    refreshPostSwitch: (whether,errMsg,amount) => ({
        type: 'FETCH_POSTSWITCH_SUCCESS',
        payload:whether,
        errorMsg:errMsg,
        amount:amount
    }),
    /*refreshPostSwitchFail: (id,errMsg) => ({
        type: 'FETCH_POSTSWITCH_FAIL',
        payload: errMsg,
        id:id,
    }),*/

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

    refreshAmount: (amount) => ({
    type: 'FETCH_AMOUNT_SUCCESS',
    payload:amount,

}),



};
export default actionsMyInvestments;

