import cFetch from './../../../../utils/cFetch';
import cookie from 'js-cookie';
import {addCommas} from '../../../../assets/js/cost';
let actionsMyInvestments = {
    getData: () => (dispatch, myInvestments) => {
        // 获取统计数据
        dispatch(actionsMyInvestments.createPie());
        dispatch(actionsMyInvestments.getList());

    },
    createPie:()=>(dispatch,myInvestments)=>{
        // 获取统计数据
        console.log('获取统计数据');
        let url = `http://172.16.4.5:8084/statistics.php`
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    dispatch(actionsMyInvestments.refreshFail('后端代码'));
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
            }).catch(err=>{
            dispatch(actionsMyInvestments.refreshFail('连接错误'));
        });
    },
    getList: (pageNum=1,pageSize=10,filter={}) => (dispatch, myInvestments) => {
        // 获取统计数据
        console.log('获取数据列表');
        let conditions='';
        if(JSON.stringify(filter)!={}){
            for(var item in filter){
                conditions += "&"+item+"="+filter[item];
            }
        }
        let url = `http://172.16.4.5:8084/getList.php`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    dispatch(actionsMyInvestments.refreshFail('后端代码'));
                }
            })
            .then(data => {
                setTimeout(() => {
                    dispatch(actionsMyInvestments.refreshListSuccess(data.data));
                }, 1000);
            }).catch(err=>{
            dispatch(actionsMyInvestments.refreshFail('连接错误'));
        });


    },
    filter: (pram) => (dispatch, myRedEnvelopes) => {
        dispatch(actionsMyInvestments.toggleClass(pram));
        dispatch(actionsMyInvestments.refreshStart());
        dispatch(actionsMyInvestments.getData(1,10,{reStatus:pram}));
    },
    refreshStart: () => ({
        type: 'FETCH_START',
    }),

    refreshChartsSuccess: json => ({
        type: 'FETCH_CHARTS_SUCCESS',
        payload: json
    }),
    refreshListSuccess: json => ({
        type: 'FETCH_LIST_SUCCESS',
        payload: json
    }),
    refreshSuccess: json => ({
        type: 'FETCH_SUCCESS',
        payload: json
    }),

    refreshFail: errMsg => ({
        type: 'FETCH_FAIL',
        payload: errMsg,
        error: true
    }),

    toggleClass: id => ({
        type: 'TOGGLE_CLASS',
        payload: id
    }),



};
export default actionsMyInvestments;

