import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import {addCommas,checkMoney} from './../assets/js/cost';
import { message } from 'antd';
const url_memberInfo=`http://172.16.1.234:9090/accounts/my/info?access_token=9cf1b242-8bcf-4a95-bada-2caabfd43792`; //获取会员信息
const url_incomeMonth=`http://172.16.1.234:9090/accounts/income/month?access_token=9cf1b242-8bcf-4a95-bada-2caabfd43792`; //获取月收益统计
const url_incomeDay=`http://172.16.1.234:9090/accounts/income/day?access_token=9cf1b242-8bcf-4a95-bada-2caabfd43792`; //获取日收益统计

const url_openAccount=`http://172.16.1.234:9090/accounts?access_token=9cf1b242-8bcf-4a95-bada-2caabfd43792&custId=123&escrowCode=100100&accountBalance=0&freezingAmount=0&availableBalance=0`; //开户
const url_recharge=`http://172.16.1.234:9090/accounts/operation?access_token=9cf1b242-8bcf-4a95-bada-2caabfd43792&escrowCode=100100&type=1`; //充值
const url_withdrawals=`http://172.16.1.234:9090/accounts/operation?access_token=9cf1b242-8bcf-4a95-bada-2caabfd43792&escrowCode=100100&type=3`; //提现


export const memberAc= {
    getInfo: (params) => {
        return {
            type: 'member/FETCH',
            async payload() {
                const res = await cFetch(`${url_memberInfo}`,{method: 'GET'}, false);
                const {code, data} = res;
                console.log('发回的数据');
                console.log(data);
                if (code == 0) {
                    return {
                        basicInfo:{
                            trueName:data.baseInfo.trueName,
                        },
                        amount:data.accountInfo,
                        redInfo:data.memberRedInfo,
                        couponInfo:data.memberCoupon,
                        openAccountStatus:data.openAccountStatus,
                        acBack:data.acBank,
                    };
                } else {
                    throw res;
                }
            }
        }
    },
    getMonth: (params) => {
        return {
            type: 'member/FETCH_CHARTS',
            async payload() {
                const res = await cFetch(`${url_incomeMonth}` , {method: 'GET'}, false);
                const {code, data} = res;
                let xAxis_data=[];
                let series_data=[];
                for (var key in data.monthTimeSituationDto) {
                    xAxis_data.push(data.monthTimeSituationDto[key]);
                }
                for (var key in data.monthIncomeSituationDto) {
                    series_data.push(data.monthIncomeSituationDto[key]);
                }

                if (code == 0) {
                    return {
                        chartsMonth:{
                            xAxis_data:xAxis_data,
                            series_data:[{data:series_data}]
                        }
                    };
                } else {
                    throw res;
                }
            }
        }
    },
    getDay: (params) => {
        return {
            type: 'member/FETCH_CHARTS',
            async payload() {
                const res = await cFetch(`${url_incomeDay}` , {method: 'GET'}, false);
                const {code, data} = res;
                let xAxis_data=[];
                let series_data=[];
                for (var key in data.dayTimeSituationDto) {
                    xAxis_data.push(data.dayTimeSituationDto[key]);
                }
                for (var key in data.dayIncomeSituationDto) {
                    series_data.push(data.dayIncomeSituationDto[key]);
                }

                if (code == 0) {
                    return {
                        chartsDay:{
                            xAxis_data:xAxis_data,
                            series_data:[{data:series_data}]
                        }
                    };
                } else {
                    throw res;
                }
            }
        }
    },
    //开户
    postOpenAccount: (pram) => {
        return {
            type: 'member/FETCH',
            async payload() {
                const res = await cFetch(`${url_openAccount}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: `[${pram}]`,
                    },
                    false);
                if (res.code == 0) {
                    message.success('开户成功');
                    return {result: res};
                } else {
                    throw res;
                }
            }
        }
    },
    //充值
    recharge: (pram) => {
        return {
            type: 'member/FETCH',
            async payload() {
                const res = await cFetch(`${url_recharge}&amount=`+pram, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: ``,
                    },
                    false);
                if (res.code == 0) {
                    message.success('充值成功');
                    return {result: res};
                } else {
                    throw res;
                }
            }
        }
    },
    //提现
    withdrawals: (pram) => {

        return {
            type: 'member/FETCH',
            async payload() {
                const res = await cFetch(`${url_withdrawals}&amount=`+pram, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: ``,
                    },
                    false);
                if (res.code == 0) {
                    message.success('提现成功');
                    return {result: res};
                } else {
                    throw res;
                }
            }
        }
    },
    /*//提交充值或提现申请  type 1 充值 3提现
    postOperation: (pram) => {
        return {
            type: 'member/FETCH',
            async payload() {
                const res = await cFetch(`${url_operation}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: `[${pram}]`,
                    },
                    false);
                if (res.code == 0) {
                    return {readResult: res};
                } else {
                    throw res;
                }
            }
        }
    },*/

    modifyState: (prams) => {
        return {
            type: 'member/MODIFY_STATE',
            payload() {
                return prams
            }
        }
    },
}

/*
let memberActions = {

    getMonth:()=>(dispatch,member)=>{
        let newState={};
        // 获取统计数据
        let url = `http://172.16.1.234:9090/accounts/income/month?access_token=9cf1b242-8bcf-4a95-bada-2caabfd43792`;
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
        let url = `http://172.16.1.234:9090/accounts/my/info?access_token=9cf1b242-8bcf-4a95-bada-2caabfd43792`;
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

    //提交充值申请  type 1 充值 3提现
    postData:(pram) => (dispatch, member) => {
        let newState={};
        let conditions='';
        if(JSON.stringify(pram)!={}){
            for(var item in pram){
                conditions += "&"+item+"="+pram[item];
            }
        }
        let url = `http://172.16.1.234:9090/accounts/operation?access_token=9cf1b242-8bcf-4a95-bada-2caabfd43792${conditions}`;
        console.log(url);
        fetch(url,{
            method: "PUT",
            mode:'cors',
            cache: 'default',
            headers: {
                "Accept": "*!/!*"
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
                    /!*newState= {
                        code:2,
                        type:'success',
                        message:'提交成功'
                    };*!/
                    alert('成功');
                    dispatch(memberActions.getInfo());
                }, 100);
            })
            .catch(err=>{
                alert('失败');
                /!*newState= {
                    code:1,
                    type:'fail',
                    message:'提交失败'
                };
                dispatch(memberActions.stateModify(newState));*!/
            });
    },
    //开户
    postOpenAccount:(pram) => (dispatch, member) => {
    let newState={};
    let conditions='';
    if(JSON.stringify(pram)!={}){
        for(var item in pram){
            conditions += "&"+item+"="+pram[item];
        }
    }
    let url = `http://172.16.1.234:9090/accounts?access_token=9cf1b242-8bcf-4a95-bada-2caabfd43792${conditions}`;
    console.log(url);
    fetch(url,{
        method: "PUT",
        mode:'cors',
        cache: 'default',
        headers: {
            "Accept": "*!/!*"
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
                /!*newState= {
                    code:2,
                    type:'success',
                    message:'提交成功'
                };*!/
                alert('成功');
                dispatch(memberActions.getInfo());
            }, 100);
        })
        .catch(err=>{
            alert('失败');
            /!*newState= {
                code:1,
                type:'fail',
                message:'提交失败'
            };
            dispatch(memberActions.stateModify(newState));*!/
        });
},
    //提现
    postWithdrawals:(pram) => (dispatch, member) => {
        let newState={};
        let url = `http://172.16.1.234:9090/accounts/operation?access_token=9cf1b242-8bcf-4a95-bada-2caabfd43792&`;
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

export default memberActions;*/
