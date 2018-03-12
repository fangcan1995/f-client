import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import {addCommas,checkMoney} from './../assets/js/cost';

let investListActions = {
    /*getData: (status) => (dispatch, investList) => {
        dispatch(investListActions.getList(1,10,{status:status}));
    },*/

    /*获取投资列表*/
    getList: (pageNum=1,pageSize=10,filter={},sort={}) => (dispatch, investList) => {
        let newState={};
        // 获取数据列表
        let filterConditions='';
        if(JSON.stringify(filter)!={}){
            for(var item in filter){
                if(item!='rateGroup'){
                    filterConditions += "&"+item+"="+filter[item];
                }else{
                    switch(filter[item]){
                        case 0:
                            filterConditions+='';
                            break;
                        case 1:
                            filterConditions += "&rateBegin=6&rateEnd=8";
                            break;
                        case 2:
                            filterConditions += "&rateBegin=8&rateEnd=10";
                            break;
                        case 3:
                            filterConditions += "&rateBegin=10&rateEnd=12";
                            break;
                    }
                }
            }
        }
        let sortConditions='';
        if(JSON.stringify(sort)!={}){
            for(var item in sort){
                sortConditions += "&"+item+"="+sort[item];
            }
        }
        let url=`http://172.16.4.5:8084/getloansList.php?pageNum=${pageNum}&pageSize=${pageSize}${filterConditions}${sortConditions}`;
        console.log('-------------url------------');
        console.log(url);
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState.list={data:{},message:'无响应'};
                    dispatch(investListActions.stateSbModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {
                newState.list={data:data.data,message:''};
                dispatch(investListActions.stateSbModify(newState));
            }).catch(err=>{
                newState.list={data:{},message:'连接错误'};
                dispatch(investListActions.stateSbModify(newState));
        });


    },

    getTransferList: (pageNum=1,pageSize=10,filter={},sort={}) => (dispatch, investList) => {
        let newState={};
        // 获取数据列表
        let filterConditions='';
        if(JSON.stringify(filter)!={}){
            for(var item in filter){
                if(item!='rateGroup'){
                    filterConditions += "&"+item+"="+filter[item];
                }else{
                    switch(filter[item]){
                        case 0:
                            filterConditions+='';
                            break;
                        case 1:
                            filterConditions += "&rateBegin=6&rateEnd=8";
                            break;
                        case 2:
                            filterConditions += "&rateBegin=8&rateEnd=10";
                            break;
                        case 3:
                            filterConditions += "&rateBegin=10&rateEnd=12";
                            break;
                    }
                }
            }
        }
        let sortConditions='';
        if(JSON.stringify(sort)!={}){
            for(var item in sort){
                sortConditions += "&"+item+"="+sort[item];
            }
        }
        let url=`http://172.16.4.5:8084/getloansList.php?pageNum=${pageNum}&pageSize=${pageSize}${filterConditions}${sortConditions}`;
        console.log('-------------url------------');
        console.log(url);
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState.list={data:{},message:'无响应'};
                    dispatch(investListActions.stateRepaymentPlanModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {
                newState.list={data:data.data,message:''};
                dispatch(investListActions.stateRepaymentPlanModify(newState));
            }).catch(err=>{
            newState.list={data:{},message:'连接错误'};
            dispatch(investListActions.stateRepaymentPlanModify(newState));
        });


    },

    

    //修改状态
    stateSbModify: json => ({
        type: 'investList/sbList/MODIFY_STATE',
        payload: json
    }),
    stateRepaymentPlanModify: json => ({
        type: 'investList/transferList/MODIFY_STATE',
        payload: json
    }),
};
export default investListActions;

