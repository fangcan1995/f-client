import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import {addCommas,checkMoney} from './../assets/js/cost';

let memberLoansActions = {
    getData: (status) => (dispatch, memberLoans) => {
        dispatch(memberLoansActions.getPie());
        dispatch(memberLoansActions.getList(1,10,{status:status}));
    },
    getPie:()=>(dispatch,memberLoans)=>{
        let newState={};
        // 获取统计数据
        let url = `http://172.16.4.5:8084/getCharts.php`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState={
                        charts:{
                            data:{},
                            message:'无响应'
                        }
                    };
                    dispatch(memberLoansActions.stateModify(newState));

                }
            })
            .then((data) => data.json())
            .then(data => {
                setTimeout(() => {
                    let {totalLoan,accumulatedInterest}=data.data;
                    let charts={
                        totalLoan:{
                            data:[
                                {name:'申请中',value:totalLoan.a,instruction:`${addCommas(totalLoan.a)}元`  },
                                {name:'招标中',value:totalLoan.b,instruction:`${addCommas(totalLoan.b)}元`},
                                {name:'还款中',value:totalLoan.c,instruction:`${addCommas(totalLoan.c)}元`},
                                {name:'已结清',value:totalLoan.d,instruction:`${addCommas(totalLoan.d)}元`}
                            ]
                        },
                        accumulatedInterest:{
                            data:[
                                {name:'还款中',value:accumulatedInterest.a,instruction:`${addCommas(accumulatedInterest.a)}元`  },
                                {name:'已结清',value:accumulatedInterest.b,instruction:`${addCommas(accumulatedInterest.b)}元`  },
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
        let url=`http://172.16.4.5:8084/getloansList.php?pageNum=${pageNum}&pageSize=${pageSize}${conditions}`;
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
                    dispatch(memberLoansActions.stateModify({myReceiving:{data: {},message:'无响应'}}));
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

    getRepayment:(pram)=>(dispatch, memberLoans)=>{
        let newState={};
        let url=`http://172.16.4.5:8084/getRepayment.php`;
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
        }

    },

    //选项卡样式切换
    toggleClass:(pram)=>(dispatch, memberLoans)=>{
        let newState={};
        newState= {
            status:pram
        };
        dispatch(memberLoansActions.stateModify(newState));
    },
    //提交债转申请
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

    stateModify: json => ({
        type: 'myLoans/myLoans/MODIFY_STATE',
        payload: json
    })

};
export default memberLoansActions;

