import cFetch from './../../../../utils/cFetch';
import cookie from 'js-cookie';
const prefix = 'apple/';

let actions = {
    //注意这里需要 () => ... , 不然 pickAppleAction 不是一个actionCreator, 而是一个thunk
    getData: (pageNum=1,pageSize=10,filter={}) => (dispatch, myRedEnvelopes) => {
        let conditions='';
        if(JSON.stringify(filter)!={}){
            for(var item in filter){
                conditions += "&"+item+"="+filter[item];
            }
        }
        let url = `http://172.16.1.221:9090/members/memberRedEnvelopes?access_token=1ce9477f-f3c7-4885-90e3-5da81d368f13&pageNum=${pageNum}&pageSize=${pageSize}${conditions}`
        console.log('获取地址');
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(json => {
                setTimeout(() => {
                    dispatch(actions.refreshSuccess(json.data));
                }, 1000);
            }).catch(err=>{
                dispatch(actions.refreshFail('连接错误'));
            });

    },
    filter: (pram) => (dispatch, myRedEnvelopes) => {
        dispatch(actions.toggleClass(pram));
        dispatch(actions.refreshStart());
        dispatch(actions.getData(1,10,{reStatus:pram}));
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
export default actions;