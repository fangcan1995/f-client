import fetch from 'isomorphic-fetch';


let urlArticalList = `http://172.16.1.221:9090/information/articles?access_token=5738fa58-9635-45d9-badf-b03ae7f5b14c`;

export const articalListAction = () => {
    return {
        type: 'GET_ARTICALLIST',
        async payload () {
            const articalList = await fetch (urlArticalList, {
                method: 'GET'
            }).then(response => {
                return response.json();
            });
            console.log(articalList);
            return articalList;
        }
    }
}