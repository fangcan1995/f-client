import fetch from 'isomorphic-fetch';



let urlTotalData = `http://172.16.1.221:9090/statistics/totalData?access_token=284f3e8c-815c-4edd-931c-524e2b6153b3`;
let urlBorrowInfo = `http://172.16.1.221:9090/statistics/borrowInfo?access_token=284f3e8c-815c-4edd-931c-524e2b6153b3`;
let urlInvestInfo = `http://172.16.1.221:9090/statistics/investInfo?access_token=284f3e8c-815c-4edd-931c-524e2b6153b3`;

const urls = [
    `http://172.16.1.221:9090/statistics/totalData?access_token=5738fa58-9635-45d9-badf-b03ae7f5b14c`,
    `http://172.16.1.221:9090/statistics/borrowInfo?access_token=5738fa58-9635-45d9-badf-b03ae7f5b14c`,
    `http://172.16.1.221:9090/statistics/investInfo?access_token=5738fa58-9635-45d9-badf-b03ae7f5b14c`
] 

export const actionTest = () => {
    return {
        type: 'GET_TOTALDATA', 
        async payload () {
            return Promise.all(urls.map(url => 
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
    const loanMoneyUrl = `http://172.16.1.221:9090/statistics/borrowInfo?access_token=5738fa58-9635-45d9-badf-b03ae7f5b14c&type=1&year=${year}`;
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
    const loanCountUrl = `http://172.16.1.221:9090/statistics/borrowInfo?access_token=5738fa58-9635-45d9-badf-b03ae7f5b14c&type=3&year=${year}`;
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
    const loanMemberCountUrl = `http://172.16.1.221:9090/statistics/borrowInfo?access_token=5738fa58-9635-45d9-badf-b03ae7f5b14c&type=2&year=${year}`;
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
    const investInfoUrl = `http://172.16.1.221:9090/statistics/investInfo?access_token=5738fa58-9635-45d9-badf-b03ae7f5b14c&year=${year}`;
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