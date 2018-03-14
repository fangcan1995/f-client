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
                    if(filter[item]!=''){
                        filterConditions += "&"+item+"="+filter[item];
                    }
                }else{
                    switch(filter[item]){
                        case '':
                            //filterConditions+='';
                            break;
                        case 1:
                            filterConditions += "&annualRateStart=6&annualRateEnd=8";
                            break;
                        case 2:
                            filterConditions += "&annualRateStart=8&annualRateEnd=10";
                            break;
                        case 3:
                            filterConditions += "&annualRateStart=10&annualRateEnd=12";
                            break;
                    }
                }
            }
        }
        let sortConditions='';
        if(JSON.stringify(sort)!={}){
            for(var item in sort){
                switch(sort[item]){
                    case 0:
                        break;
                    case 1:
                        sortConditions += "&sortBy=-"+item;
                        break;
                    case 2:
                        sortConditions += "&sortBy="+item;
                        break;
                }

            }
        }
        let url=`http://172.16.1.234:9090/invest/projects/loan/page.php?access_token=50db1a79-395f-4d88-82f9-12bc1cad9f1c&pageNum=${pageNum}&pageSize=${pageSize}${filterConditions}${sortConditions}`;

        console.log('-------------url------------');
        console.log(url);
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState.list={data:'',message:'无响应'};
                    dispatch(investListActions.stateSbModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {
                console.log('-------------data------------');
                console.log(data.data);
                newState.list={
                    data:data.data,
                    message:''
                }
                dispatch(investListActions.stateSbModify(newState));
            }).catch(err=>{
                newState.list={data:'',message:'连接错误'};
                dispatch(investListActions.stateSbModify(newState));
        });


    },

    getTransferList: (pageNum=1,pageSize=10,filter={},sort={}) => (dispatch, investList) => {
        let newState={};
        // 获取数据列表
        let sortConditions='';
        if(JSON.stringify(sort)!={}){
            for(var item in sort){
                switch(sort[item]){
                    case 0:
                        break;
                    case 1:
                        sortConditions += "&sortBy=-"+item;
                        break;
                    case 2:
                        sortConditions += "&sortBy="+item;
                        break;
                }

            }
        }
        let url=`http://172.16.1.234:9090/invest/transfer/loan/page?access_token=50db1a79-395f-4d88-82f9-12bc1cad9f1c&pageNum=${pageNum}&pageSize=${pageSize}${sortConditions}`
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

