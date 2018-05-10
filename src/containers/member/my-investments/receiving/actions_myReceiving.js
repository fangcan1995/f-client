import cFetch from './../../../../utils/cFetch';
import cookie from 'js-cookie';
import {addCommas} from '../../../../utils/cost';
let actionsMyReceiving = {
    getData: (status) => (dispatch, memberInvestments) => {
        dispatch(actionsMyReceiving.getPie());
        dispatch(actionsMyReceiving.getList(1,10));
    },
    getPie:()=>(dispatch,memberInvestments)=>{
        // 获取统计数据
        let myReceiving_new={};
        let url = `http://172.16.4.62:9090/members/investments/receiving/statistics?access_token=97c8feba-9a64-4f9a-93ed-100816046afe`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    dispatch(actionsMyReceiving.refreshChartsSuccess({myReceiving:{charts: {},message:'无响应'}}));
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
                    myReceiving_new={
                        charts:
                                {
                                    data:charts,
                                    message:''
                                }
                    };
                    dispatch(actionsMyReceiving.stateModify(myReceiving_new));
                }, 1000);
            })
            .catch(err=>{
                myReceiving_new={
                    charts:{
                        data:{},
                        message:'连接错误'
                    }
                };
                dispatch(actionsMyReceiving.stateModify(myReceiving_new));
            });
    },
    getList: (pageNum=1,pageSize=10,filter={}) => (dispatch, memberInvestments) => {
        let myReceiving_new={};
        // 获取数据列表
        let conditions='';
        if(JSON.stringify(filter)!={}){
            for(var item in filter){
                conditions += "&"+item+"="+filter[item];
            }
        }
        let url=`http://172.16.4.62:9090/members/investments/receiving?access_token=97c8feba-9a64-4f9a-93ed-100816046afe&pageNum=${pageNum}&pageSize=${pageSize}${conditions}`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    dispatch(actionsMyReceiving.stateModify({myReceiving:{data: {},message:'无响应'}}));
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
                dispatch(actionsMyReceiving.stateModify(myReceiving_new));
            }).catch(err=>{
                myReceiving_new={
                    myList: {
                        data:{},
                        message:'连接错误'
                    }
                };
                dispatch(actionsMyReceiving.stateModify(myReceiving_new));
            });
    },
    stateModify: json => ({
        type: 'myInvest/receiving/MODIFY_STATE',
        payload: json
    })
};
export default actionsMyReceiving;

