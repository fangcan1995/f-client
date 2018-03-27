import cFetch from './../utils/cFetch';
import {urls,token} from '../utils/url'


let urlTotalData = `${urls}/statistics/totalData`;
let urlBorrowInfo = `${urls}/statistics/borrowInfo`;
let urlInvestInfo = `${urls}/statistics/investInfo`;

const urlss = [
    `${urls}/statistics/totalData`,
    `${urls}/statistics/borrowInfo`,
    `${urls}/statistics/investInfo`
] 

// export const actionTest = () => {
//     return {
//         type: 'GET_TOTALDATA', 
//         async payload () {
//             return Promise.all(urlss.map(url => 
//                 cFetch(url, {method: 'GET'},false))
//             ).then(responses => Promise.all(responses.map(response => response.json()))
//             ).then(result => {
//                 console.log(result);
//                 return result;
//             });
//         },
//     }
// }

export const actionTest = () => {
    return {
        type: 'GET_TOTALDATA', 
        async payload () {
            return Promise.all(urlss.map(url => 
                cFetch(url, {method: 'GET'},false))
            ).then(responses =>{
                console.log(responses);
                return responses;
            });
        },
    }
}

export const actionUpdateLoanMoney = (year) => {
    const loanMoneyUrl = `${urls}/statistics/borrowInfo?type=1&year=${year}`;
    return {
        type: 'UPDATE_LOANMONEY',
        async payload () {
            const loanMoney = await cFetch(loanMoneyUrl, {
                method: 'GET'
            },false).then(res => {
                return res.json();
            });
            return loanMoney;
        }
    }
}

export const actionUpdateLoanCount = (year) => {
    const loanCountUrl = `${urls}/statistics/borrowInfo?type=3&year=${year}`;
    return {
        type: 'UPDATE_LOANCOUNT',
        async payload () {
            const loanCount = await cFetch(loanCountUrl, {
                method: 'GET'
            },false).then(res => {
                return res.json();
            });
            console.log(loanCount);
            return loanCount;
        }
    }
}

export const actionUpdateLoanMemberCount = (year) => {
    const loanMemberCountUrl = `${urls}/statistics/borrowInfo?type=2&year=${year}`;
    return {
        type: 'UPDATE_LOANMEMBERCOUNT',
        async payload () {
            const loanMemberCount = await cFetch(loanMemberCountUrl, {
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
    const investInfoUrl = `${urls}/statistics/investInfo?year=${year}`;
    return {
        type: 'UPDATE_INVESTINFO',
        async payload () {
            const InvestInfo = await cFetch(investInfoUrl, {
                method: 'GET'
            }).then(res => {
                return res.json();
            });
            console.log(InvestInfo);
            return InvestInfo;
        }
    }
}