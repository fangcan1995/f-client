import fetch from 'isomorphic-fetch';
import cFetch from './../utils/cFetch';
import { urls, token } from '../utils/url'

let urlArticalList = `${urls}/information/articles`;

/* export const articalListAction = () => {
    return {
        type: 'GET_ARTICALLIST',
        async payload() {
            const articalList = await fetch(urlArticalList, {
                method: 'GET'
            }).then(response => {
                return response.json();
            });
            console.log(articalList);
            return articalList;
        }
    }
} */

export const articalListAction = () => {
    return {
        type: 'GET_ARTICALLIST',
        async payload() {
            const res = await cFetch(urlArticalList, { method: 'GET' }, false);
            const { code, data } = res;
            if (code == 0) {
                console.log(data)
                const articalList = data;
                return articalList || {};
            } else {
                throw res;
            }
        }
    }
}