import cFetch from './../../../../utils/cFetch';
import cookie from 'js-cookie';
let actionsRedEnvelopes = {

    getData: (pageNum=1,pageSize=10,filter={}) => (dispatch, myRedEnvelopes) => {
        let conditions='';
        if(JSON.stringify(filter)!={}){
            for(var item in filter){
                conditions += "&"+item+"="+filter[item];
            }
        }
        let url = `http://172.16.1.221:9090/members/memberRedEnvelopes?access_token=1480826e-71b9-4cb0-8590-abbbe81ef9a0&pageNum=${pageNum}&pageSize=${pageSize}${conditions}`
        fetch(url,{method:"get"})
            .then(response => {
                if(response.status==200){
                    return response;
                }else{
                    dispatch(actionsRedEnvelopes.refreshFail('后端代码'));
                }
            })
            .then((data) => data.json())
            .then((data) => {
                setTimeout(() => {
                        dispatch(actionsRedEnvelopes.refreshSuccess(data.data));
                    }, 1000);
                }

            )
            .catch(err=>{
                dispatch(actionsRedEnvelopes.refreshFail('服务器错误'));
            });

    },
    filter: (pram) => (dispatch, myRedEnvelopes) => {
        dispatch(actionsRedEnvelopes.toggleClass(pram));
        dispatch(actionsRedEnvelopes.refreshStart());
        dispatch(actionsRedEnvelopes.getData(1,10,{reStatus:pram}));
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
export default actionsRedEnvelopes;