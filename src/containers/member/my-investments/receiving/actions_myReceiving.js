import cFetch from './../../../../utils/cFetch';
import cookie from 'js-cookie';
import {addCommas,checkMoney} from '../../../../assets/js/cost';

let actionsMyReceiving = {
    getData: (status) => (dispatch, myReceiving) => {
        dispatch(actionsMyReceiving.getPie());
        dispatch(actionsMyReceiving.getList(1,10));
    },
    getPie:()=>(dispatch,myReceiving)=>{
        // 获取统计数据
        let url = `http://172.16.4.62:9090/members/investments/receiving/statistics?access_token=907e3e02-bf28-4cac-87cc-fda8d2c58223`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    dispatch(actionsMyReceiving.refreshChartsFail('后端代码'));
                }
            })
            .then((data) => data.json())
            .then(data => {
                setTimeout(() => {
                    let {doneDto,todoDto}=data.data;
                    let charts={
                        doneDto:{
                            data:[
                                {name:'已回利息',value:doneDto.earnTotalIint,instruction:`${addCommas(doneDto.earnTotalIint)}元`},
                                {name:'已回本金',value:doneDto.earnTotalCapital,instruction:`${addCommas(doneDto.earnTotalCapital)}元`},
                                {name:'已回罚息',value:doneDto.earnTotalLateIint,instruction:`${addCommas(doneDto.earnTotalLateIint)}元`},

                            ]
                        },
                        todoDto:{
                            data:[
                                {name:'未回利息',value:todoDto.earnTotalIinting,instruction:`${addCommas(todoDto.earnTotalIinting)}元`},
                                {name:'未回本金',value:todoDto.earnTotalCapital,instruction:`${addCommas(todoDto.earnTotalCapital)}元` },
                                {name:'未回罚息',value:todoDto.earnTotalLateIint,instruction:`${addCommas(todoDto.earnTotalLateIint)}元` },
                            ]
                        },
                    };
                    dispatch(actionsMyReceiving.refreshChartsSuccess(charts));
                }, 1000);
            })
            .catch(err=>{
                dispatch(actionsMyReceiving.refreshChartsFail('连接错误'));
            });
    },
    getList: (pageNum=1,pageSize=10,filter={}) => (dispatch, myReceiving) => {
        // 获取数据列表
        let conditions='';
        if(JSON.stringify(filter)!={}){
            for(var item in filter){
                conditions += "&"+item+"="+filter[item];
            }
        }
        let url=`http://172.16.4.62:9090/members/investments/receiving?access_token=907e3e02-bf28-4cac-87cc-fda8d2c58223&pageNum=${pageNum}&pageSize=${pageSize}${conditions}`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    dispatch(actionsMyReceiving.refreshListFail('后端代码'));
                }
            })
            .then((data) => data.json())
            .then(data => {
                dispatch(actionsMyReceiving.refreshListSuccess(data.data));
            }).catch(err=>{
                dispatch(actionsMyReceiving.refreshListFail('连接错误'));
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




};
export default actionsMyReceiving;

