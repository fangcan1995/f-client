import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import {addCommas,checkMoney} from './../assets/js/cost';

let investDetailActions = {
    getData: (status) => (dispatch, investDetail) => {
        /*dispatch(investDetailActions.getInvestInfo(5));
        dispatch(investDetailActions.getInvestLoanInfo(5));*/
        dispatch(investDetailActions.getInvestRecords(5));


    },

    /*获取标的详情*/
    getInvestInfo: (id) => (dispatch, investDetail) => {
        let newState={};
        let url=`http://172.16.4.5:8084/projects/${id}/investInfo`;
        console.log('-------------url------------');
        console.log(url);
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState.investInfo={data:{},message:'无响应'};
                    dispatch(investDetailActions.stateSbModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {
                newState.investInfo={data:data.data,message:''};
                dispatch(investDetailActions.stateModify(newState));
            }).catch(err=>{
                newState.investInfo={data:{},message:'连接错误'};
                dispatch(investDetailActions.stateModify(newState));
        });


    },

    /*获取标的详情-信息披露部分*/
    getInvestLoanInfo: (id) => (dispatch, investDetail) => {
        let newState={};
        let url=`http://172.16.4.5:8084/projects/${id}/investInfo`;
        console.log('-------------url------------');
        console.log(url);
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState.loanInfo={data:{},message:'无响应'};
                    dispatch(investDetailActions.stateSbModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {
                newState.loanInfo={data:data.data,message:''};
                dispatch(investDetailActions.stateModify(newState));
            }).catch(err=>{
            newState.loanInfo={data:{},message:'连接错误'};
            dispatch(investDetailActions.stateModify(newState));
        });


    },

    /*获取投资列表*/
    getInvestRecords: (id) => (dispatch, investDetail) => {
        let newState={};
        // 获取数据列表
        let url=`http://172.16.4.5:8084/getloansList.php?pageNum=1&pageSize=10`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState={data:{},message:'无响应'};
                    dispatch(investDetailActions.stateModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {

                newState={data:data.data,message:''};
                console.log(newState);
                dispatch(investDetailActions.stateModify(newState));
            }).catch(err=>{
                newState={data:{},message:'连接错误'};
                dispatch(investDetailActions.stateModify(newState));
        });


    },

    //修改状态
    stateModify: json => ({
        type: 'investDetail/investRecords/MODIFY_STATE',
        payload: json
    }),

};
export default investDetailActions;

