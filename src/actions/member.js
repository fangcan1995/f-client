import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import {addCommas,checkMoney} from './../assets/js/cost';

let memberActions = {

    getMonth:()=>(dispatch,member)=>{
        let newState={};
        // 获取统计数据
        let url = `http://172.16.1.234:9090/accounts/income/month?access_token=0db30c7d-cde4-4a6e-bcf5-e642c2eda816`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState={
                        chartsMonth:{
                            data:{},
                            message:'无响应'
                        }
                    };
                    dispatch(memberActions.stateModify(newState));

                }
            })
            .then((data) => data.json())
            .then(data => {
                setTimeout(() => {
                    let {totalLoanDto,accumulatedInterestDto}=data.data;
                    let charts={
                        chartsMonth:{
                            data:[
                                {name:'申请中',value:totalLoanDto.loaningMoney,instruction:`${addCommas(totalLoanDto.loaningMoney)}元`  },
                                {name:'招标中',value:totalLoanDto.investingMoney,instruction:`${addCommas(totalLoanDto.investingMoney)}元`},
                                {name:'还款中',value:totalLoanDto.repayingMoney,instruction:`${addCommas(totalLoanDto.repayingMoney)}元`},
                                {name:'已结清',value:totalLoanDto.settleMoney,instruction:`${addCommas(totalLoanDto.settleMoney)}元`}
                            ]
                        }
                    };
                    newState={
                        chartsMonth:
                            {
                                data:charts,
                                message:''
                            }
                    };
                    dispatch(memberActions.stateModify(newState));
                }, 1000);
            })
            .catch(err=>{
                newState={
                    charts:{
                        data:{},
                        message:'连接错误'
                    }
                };
                dispatch(memberActions.stateModify(newState));
            });
    },
    getInfo:()=>(dispatch,member)=>{
        let newState={};
        // 获取统计数据
        let url = `http://172.16.1.234:9090/accounts/my/info?access_token=0db30c7d-cde4-4a6e-bcf5-e642c2eda816`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    dispatch(memberActions.stateModify(''));

                }
            })
            .then((data) => data.json())
            .then(data => {
                console.log(data.data.accountInfo);
                setTimeout(() => {
                    //console.log(data.data.accountInfo);
                    newState={
                        basicInfo:{
                            realName:data.data.baseInfo.realName,
                        },
                        amount:data.data.accountInfo,
                        redInfo:data.data.memberRedInfo,
                        couponInfo:data.data.memberCoupon,
                        openAccountStatus:data.data.openAccountStatus,
                        acBack:data.data.acBank,
                    }

                    dispatch(memberActions.stateModify(newState));
                }, 1000);
            })
            .catch(err=>{

                dispatch(memberActions.stateModify(''));
            });
    },
    //开户
    //提交充值申请  type 1 充值 3提现
    postData:(pram) => (dispatch, member) => {
        let newState={};
        let conditions='';
        if(JSON.stringify(pram)!={}){
            for(var item in pram){
                conditions += "&"+item+"="+pram[item];
            }
        }
        let url = `http://172.16.1.234:9090/accounts/operation?access_token=0db30c7d-cde4-4a6e-bcf5-e642c2eda816${conditions}`;
        console.log(url);
        fetch(url,{
            method: "PUT",
            mode:'cors',
            cache: 'default',
            headers: {
                "Accept": "*/*"
            },
            //body: JSON.stringify(pram)
        })
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    alert('连接不上');
                    dispatch(memberActions.statePostResultModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {
                setTimeout(() => {
                    //dispatch(investDetailActions.refreshPostResult(2));
                    /*newState= {
                        code:2,
                        type:'success',
                        message:'提交成功'
                    };*/
                    alert('充值成功');
                    dispatch(memberActions.getInfo());
                }, 100);
            })
            .catch(err=>{
                alert('充值失败');
                /*newState= {
                    code:1,
                    type:'fail',
                    message:'提交失败'
                };
                dispatch(memberActions.stateModify(newState));*/
            });
    },
    //提现
    postWithdrawals:(pram) => (dispatch, member) => {
        let newState={};
        let url = `http://172.16.1.234:9090/accounts/operation?access_token=0db30c7d-cde4-4a6e-bcf5-e642c2eda816&`;
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
                        code:1,
                        type:'fail',
                        message:'提交失败'
                    };
                    dispatch(memberActions.statePostResultModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {
                setTimeout(() => {
                    //dispatch(investDetailActions.refreshPostResult(2));
                    newState= {
                        code:2,
                        type:'success',
                        message:'提交成功'
                    };
                    dispatch(memberActions.stateModify(newState));
                }, 100);
            })
            .catch(err=>{
                newState= {
                    code:1,
                    type:'fail',
                    message:'提交失败'
                };
                dispatch(memberActions.stateModify(newState));
            });
    },
    //修改状态
    stateModify: json => ({
        type: 'member/MODIFY_STATE',
        payload: json
    }),
}

export default memberActions;