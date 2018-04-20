import cFetch from './../utils/cFetch';
import {
    urls,
    token
} from '../utils/url'


/* let aboutUrl = `${urls}/information/type`;
let urlArticalList = `${urls}/information/articles`; */

let aboutUrl = `http://172.16.1.234:8020/web/information/type`;
let urlArticalList = `http://172.16.1.234:8020/web/information/articles`;

let constantUrls = [
    `${urls}/statistics/totalData`,
    `${urls}/statistics/borrowInfo`,
    `${urls}/statistics/investInfo`
];

export const aboutContentAction = () => {
    return {
        type: 'GET_ABOUT_CONTENT',
        async payload() {
            const res = await cFetch(aboutUrl, {
                method: 'GET'
            }, false);
            const {
                code,
                data
            } = res;
            if (code == 0) {
                return data || {};
            } else {
                throw res;
            }
        }
    };
}

const paramsToUrl = (params, url) => {
    let newUrl = '?';
    const paramKey = Object.keys(params);
    paramKey.map((param, i) => {
        if (i === paramKey.length - 1) {
            newUrl += `${param}=${params[param]}`;
        } else {
            newUrl += `${param}=${params[param]}&`;
        }

    });
    return url + newUrl;
}


export const articalListAction = (typeId = '', status = 0, pageNum = 1, pageSize = 10) => {
    const params = {
        pageNum: pageNum,
        pageSize: pageSize,
        typeId: typeId
    };

    const paramsUrl = paramsToUrl(params, urlArticalList);
    return {
        type: 'GET_ARTICALLIST',
        async payload() {
            const res = await cFetch(paramsUrl, {
                method: 'GET',
                body: params
            }, false);
            const {
                code,
                data
            } = res;
            if (code == 0) {
                const articalList = {
                    data,
                    status
                };
                return articalList || {};
            } else {
                throw res;
            }
        }
    }
}

export const articalAction = (articalId, status = 2) => {
    return {
        type: 'GET_ARTICAL',
        async payload() {
            const res = await cFetch(`${urlArticalList}/${articalId}`, {
                method: 'GET',
            }, false);
            const { code, data } = res;
            if(code == 0) {
                const artical = {
                    data, 
                    status
                }
                return artical || {};
            }
            else {
                throw res;
            }
        }
    }
}
