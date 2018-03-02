import fetch from 'isomorphic-fetch';



let url = `http://172.16.1.221:9090/statistics/totalData?access_token=1480826e-71b9-4cb0-8590-abbbe81ef9a0`;

export const actionTest = () => {
    return {
        type: 'GET_TOTALDATA', 
        async payload () {
            const constantData = await fetch(url, {
                method: 'GET',
            }).then(res => {
                return res.json()
            }).then(json => {
                console.log(json);
            });
        },
    }
}