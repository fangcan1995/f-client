import fetch from 'isomorphic-fetch';
import {urls,token} from '../utils/url'


let urlTotalData = `${urls}/statistics/totalData?access_token=${token}`;
let urlBorrowInfo = `${urls}/statistics/borrowInfo?access_token=${token}`;
let urlInvestInfo = `${urls}/statistics/investInfo?access_token=${token}`;

const urlss = [
    `${urls}/statistics/totalData?access_token=${token}`,
    `${urls}/statistics/borrowInfo?access_token=${token}`,
    `${urls}/statistics/investInfo?access_token=${token}`
] 

export const actionTest = () => {
    return {
        type: 'GET_TOTALDATA', 
        async payload () {
            return Promise.all(urlss.map(url => 
                fetch(url, {method: 'GET'}))
            ).then(responses => Promise.all(responses.map(response => response.json()))
            ).then(result => {
                console.log(result);
                return result;
            });
        },
    }
}

export const actionUpdateLoanMoney = (year) => {
    const loanMoneyUrl = `${urls}/statistics/borrowInfo?access_token=${token}&type=1&year=${year}`;
    return {
        type: 'UPDATE_LOANMONEY',
        async payload () {
            const loanMoney = await fetch(loanMoneyUrl, {
                method: 'GET'
            }).then(res => {
                return res.json();
            });
            return loanMoney;
        }
    }
}

export const actionUpdateLoanCount = (year) => {
    const loanCountUrl = `${urls}/statistics/borrowInfo?access_token=${token}&type=3&year=${year}`;
    return {
        type: 'UPDATE_LOANCOUNT',
        async payload () {
            const loanCount = await fetch(loanCountUrl, {
                method: 'GET'
            }).then(res => {
                return res.json();
            });
            console.log(loanCount);
            return loanCount;
        }
    }
}

export const actionUpdateLoanMemberCount = (year) => {
    const loanMemberCountUrl = `${urls}/statistics/borrowInfo?access_token=${token}&type=2&year=${year}`;
    return {
        type: 'UPDATE_LOANMEMBERCOUNT',
        async payload () {
            const loanMemberCount = await fetch(loanMemberCountUrl, {
                method: 'GET'
            }).then(res => {
                return res.json();
            });
            console.log(loanMemberCount);
            return loanMemberCount;
        }
    }
}


export const actionUpdateInvestInfo = (year) => {
    const investInfoUrl = `${urls}/statistics/investInfo?access_token=${token}&year=${year}`;
    return {
        type: 'UPDATE_INVESTINFO',
        async payload () {
            const InvestInfo = await fetch(investInfoUrl, {
                method: 'GET'
            }).then(res => {
                return res.json();
            });
            console.log(InvestInfo);
            return InvestInfo;
        }
    }
}