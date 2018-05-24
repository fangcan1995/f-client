import cFetch from './../utils/cFetch';
import parseJson2URL from "../utils/parseJson2URL";
import {API_CONFIG} from "../config/api";

const url_incomeMonth=API_CONFIG.hostWeb+API_CONFIG.getIncomeMonth; //获取月收益统计
const url_incomeDay=API_CONFIG.hostWeb+API_CONFIG.getIncomeDay; //获取日收益统计
const url_loginPassword=API_CONFIG.baseUri+API_CONFIG.setLoginPassword ; //修改登录密码

export const memberAc= {
    //获取月收益统计数据
    getMonth: (params) => {
        return {
            type: 'member/FETCH_CHARTS',
            async payload() {
                const res = await cFetch(`${url_incomeMonth}` , {method: 'GET'}, true);
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
    //获取日收益统计数据
    getDay: (params) => {
        return {
            type: 'member/FETCH_CHARTS',
            async payload() {
                const res = await cFetch(`${url_incomeDay}` , {method: 'GET'}, true);
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
    //修改登录密码密码
    setLoginPassword: (params) => {
        params=parseJson2URL(params);
        return {
            type: 'member/tradePassword/FETCH',
            async payload() {
                const res = await cFetch(`${url_loginPassword}?${params}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: ``,
                    },
                    true);

                let type=``;
                (res.code == 0)?type='success':type='error';
                console.log('修改密码返回的结果');
                console.log(res);
                return {
                        code:res.code,
                        type:type,
                        message:res.message||``,
                        description:res.data||``,
                };
            }
        }
    },
    modifyState: (prams) => {
        return {
            type: 'member/MODIFY_STATE',
            payload() {
                return prams
            }
        }
    },
    clear: (prams) => {
        return {
            type: 'member/CLEAR',
            payload() {
                return prams
            }
        }
    },
}

