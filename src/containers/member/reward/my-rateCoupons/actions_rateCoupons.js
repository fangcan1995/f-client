import cFetch from './../../../../utils/cFetch';
import cookie from 'js-cookie';
let actionsRateCoupons = {
    getData: (pageNum=1,pageSize=10,filter={}) => (dispatch, myRedEnvelopes) => {
        let conditions='';
        if(JSON.stringify(filter)!={}){
            for(var item in filter){
                conditions += "&"+item+"="+filter[item];
            }
        }
        let url = `http://172.16.1.221:9090/members/memberRateCoupons?access_token=1480826e-71b9-4cb0-8590-abbbe81ef9a0&pageNum=${pageNum}&pageSize=${pageSize}${conditions}`
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    dispatch(actionsRateCoupons.refreshFail('后端代码'));
                }
            })
            .then((data) => data.json())
            .then((data) => {
                setTimeout(() => {
                    dispatch(actionsRateCoupons.refreshSuccess(data.data));
                }, 1000);
            }).catch(err=>{
                dispatch(actionsRateCoupons.refreshFail('连接错误'));
            });

    },
    filter: (pram) => (dispatch, myRedEnvelopes) => {
        dispatch(actionsRateCoupons.toggleClass(pram));
        dispatch(actionsRateCoupons.refreshStart());
        dispatch(actionsRateCoupons.getData(1,10,{rcStatus:pram}));
    },
    refreshStart: () => ({
        type: 'FETCH_START',
    }),

    refreshSuccess: json => ({
        type: 'FETCH_SUCCESS',
        payload: json
    }),

    refreshFail: errMsg => ({
        type: 'FETCH_FAIL',
        payload: errMsg,
        error: true
    }),
    toggleClass: id => ({
        type: 'TOGGLE_CLASS',
        payload: id
    }),



};
export default actionsRateCoupons;