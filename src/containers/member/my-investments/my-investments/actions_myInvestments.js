import cFetch from './../../../../utils/cFetch';
import cookie from 'js-cookie';
import {addCommas} from '../../../../assets/js/cost';
let actionsMyInvestments = {
    getData: () => (dispatch, myInvestments) => {
        dispatch(actionsMyInvestments.createPie());
        dispatch(actionsMyInvestments.getList());
    },
    createPie:()=>(dispatch,myInvestments)=>{
        // 获取统计数据
        let url = `http://172.16.4.5:8084/statistics.php`;
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
                    let {totalInvestment,accumulatedIncome}=data.data;
                    let charts={
                        totalInvestment:{
                            data:[
                                {name:'招标中',value:totalInvestment.proMoneyBidding,instruction:`${addCommas(totalInvestment.proMoneyBidding)}元`},
                                {name:'回款中',value:totalInvestment.proMoneyInBack,instruction:`${addCommas(totalInvestment.proMoneyInBack)}元`},
                                {name:'已回款',value:totalInvestment.proMoneyBacked,instruction:`${addCommas(totalInvestment.proMoneyBacked)}元`},
                                {name:'已转出',value:totalInvestment.proMoneyOut,instruction:`${addCommas(totalInvestment.proMoneyOut)}元`}
                            ]
                        },
                        accumulatedIncome:{
                            data:[
                                {name:'回款中',value:accumulatedIncome.earnMoneyInBack,instruction:`${addCommas(accumulatedIncome.earnMoneyInBack)}元`},
                                {name:'已回款',value:accumulatedIncome.earnMoneyBacked,instruction:`${addCommas(accumulatedIncome.earnMoneyBacked)}元` },
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
        let url = `http://172.16.4.5:8084/getList.php?access_token=1480826e-71b9-4cb0-8590-abbbe81ef9a0&pageNum=${pageNum}&pageSize=${pageSize}${conditions}`;
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
                setTimeout(() => {
                    dispatch(actionsMyInvestments.refreshListSuccess(data.data));
                }, 1000);
            }).catch(err=>{
            dispatch(actionsMyInvestments.refreshListFail('连接错误'));
        });


    },
    filter: (pram) => (dispatch, myInvestments) => {
        dispatch(actionsMyInvestments.toggleClass(pram));
        dispatch(actionsMyInvestments.getList(1,10,{status:pram}));

    },
    toggleModal:(modal,visile,id)=>(dispatch, myInvestments) => {
        if(modal=='modalPlan'){
            if(visile){
                dispatch(actionsMyInvestments.getPlanList(id));//获取某项目回款计划

                dispatch(actionsMyInvestments.modalPlanShow(id));  //显示回款计划弹框
            }else{
                dispatch(actionsMyInvestments.modalPlanHide(id))
            }
        }else if(modal=='modalTransfer'){
            (visile==true)?dispatch(actionsMyInvestments.modalTransferShow(id)):dispatch(actionsMyInvestments.modalTransferHide(id));
        }

    },

    getPlanList:(pram)=>(dispatch, myInvestments)=>{
        let url = `http://172.16.4.5:8084/getPlanList.php?id=${pram}}`;
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
                setTimeout(() => {
                    dispatch(actionsMyInvestments.refreshPlanListSuccess(pram,data.data));
                }, 1000);
            }).catch(err=>{
            dispatch(actionsMyInvestments.refreshPlanListFail(pram,'连接错误'));
        });
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
    toggleClass: id => ({
        type: 'TOGGLE_CLASS',
        payload: id
    }),


};
export default actionsMyInvestments;

