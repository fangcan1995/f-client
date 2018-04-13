import cFetch from './../utils/cFetch';
import {
    urls,
    token
} from '../utils/url'


let aboutUrl = `http://172.16.1.221:9090/information/type`;
let urlArticalList = `http://172.16.1.221:9090/information/articles`;

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


export const articalListAction = (typeId = '', pageNum = 1, pageSize = 10) => {
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
                const articalList = data;
                return articalList || {};
            } else {
                throw res;
            }
        }
    }
}