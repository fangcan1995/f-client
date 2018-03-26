import fetch from 'isomorphic-fetch';
import {urls,token} from '../utils/url'

let urlArticalList = `${urls}/information/articles?access_token=${token}`;

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