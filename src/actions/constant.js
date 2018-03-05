import fetch from 'isomorphic-fetch';
import constantTable from '../containers/about/constant/constant';



let urlTotalData = `http://172.16.1.221:9090/statistics/totalData?access_token=284f3e8c-815c-4edd-931c-524e2b6153b3`;
let urlBorrowInfo = `http://172.16.1.221:9090/statistics/borrowInfo?access_token=284f3e8c-815c-4edd-931c-524e2b6153b3`;
let urlInvestInfo = `http://172.16.1.221:9090/statistics/investInfo?access_token=284f3e8c-815c-4edd-931c-524e2b6153b3`;

const urls = [
    `http://172.16.1.221:9090/statistics/totalData?access_token=284f3e8c-815c-4edd-931c-524e2b6153b3`,
    `http://172.16.1.221:9090/statistics/borrowInfo?access_token=284f3e8c-815c-4edd-931c-524e2b6153b3`,
    `http://172.16.1.221:9090/statistics/investInfo?access_token=284f3e8c-815c-4edd-931c-524e2b6153b3`
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