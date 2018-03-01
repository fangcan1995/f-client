// 统一声明默认State
import cookie from 'js-cookie';

export default {
    auth: {
        isFetching: false,
        isAuthenticated: cookie.get('access_token') ? true : false
    },
    users: {
        isFetching: false,
        meta: {
            total: 0,
            perPage: 10,
            page: 1
        },
        data: []
    },
    riskAssess:{
    },
    myRedEnvelopes:{
        reStatus:0,
        data:{
            list:[],
            pageNum:1,
            total:0,
            pageSize:10
        },
        loaded:false,
    },

};