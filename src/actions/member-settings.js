import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import { API_CONFIG } from './../config/api';
import parseJson2URL from './../utils/parseJson2URL';

const url_getMList=`http://172.16.1.234:9090/message/mail/page?access_token=8b1ae302-f58e-4517-a6a1-69c9b94662e8`;  //获取消息列表
const url_setRead=`http://172.16.1.234:9090/message/mail/read?access_token=8b1ae302-f58e-4517-a6a1-69c9b94662e8`; //设为已读
const url_delete=`http://172.16.1.234:9090/message/mail?access_token=8b1ae302-f58e-4517-a6a1-69c9b94662e8`; //删除消息

const url_getResult=`http://172.16.1.221:9090/members/riskEvaluation/result?access_token=564ddc2e-88f7-4140-827e-8aaf472f7e41`;  //获取风险测评结果
const url_getRList=`http://172.16.1.221:9090/members/riskEvaluation?access_token=564ddc2e-88f7-4140-827e-8aaf472f7e41`;  //获取风险测评题目
const url_putRList=`http://172.16.1.221:9090/members/riskEvaluation?access_token=564ddc2e-88f7-4140-827e-8aaf472f7e41`;  //提交测评结果
export const myMessagesAc= {
    getMessagesList: (params) => {
        return {
            type: 'mySettings/messages/FETCH',
            async payload() {
                params = parseJson2URL(params);
                const res = await cFetch(`${url_getMList}&` + params, {method: 'GET'}, false);
                const {code, data} = res;
                if (data.page.total > 0) {
                    for (let index of data.page.list.keys()) {
                        data.page.list[index] = Object.assign({isShow: '0',isChecked: 0}, data.page.list[index]);
                    }
                }
                if (code == 0) {
                    return {myList: data};
                } else {
                    throw res;
                }
            }
        }
    },
    setRead: (pram) => {
        return {
            type: 'mySettings/messages/FETCH',
            async payload() {
                const res = await cFetch(`${url_setRead}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: `[${pram}]`,
                    },
                    false);
                if (res.code == 0) {
                    return {readResult: res};
                } else {
                    throw res;
                }
            }
        }
    },
    deleteMessage: (pram,dispatch) => {
        return {
            type: 'mySettings/messages/FETCH',
            async payload() {
                const res = await cFetch(`${url_delete}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: `[${pram}]`,
                    },
                    false);
                if (res.code == 0) {
                    return {deleteResult: res};
                } else {
                    throw res;
                }
            }
        }
    },
    modifyState: (prams) => {
        return {
            type: 'mySettings/messages/MODIFY_STATE',
            payload() {
                return prams
            }
        }
    },
}
export const myRiskAssessAc={
    getResult: () => {
        return {
            type: 'mySettings/riskAssess/FETCH',
            async payload() {
                const res = await cFetch(`${url_getResult}`, {method: 'GET'}, false);
                const {code, data} = res;
                /*console.log('***************');
                console.log(url_getResult);
                console.log(data);*/

                if (code == 0) {
                    return {
                        result: data,
                        status:data.requireEval
                    };
                } else {
                    throw res;
                }
            }
        }
    },
    getRiskAssessList: () => {
        return {
            type: 'mySettings/riskAssess/FETCH',
            async payload() {
                const res = await cFetch(`${url_getRList}` , {method: 'GET'}, false);
                const {code, data} = res;
                if (code == 0) {
                    for(let index of data.keys()){
                        data[index]=Object.assign({isChecked:''},data[index]);
                    }
                    return {myList: data};
                } else {
                    throw res;
                }
            }
        }
    },
    putRiskAssess: (pram,dispatch) => {
        pram=JSON.stringify(pram)
        return {
            type: 'mySettings/riskAssess/FETCH',
            async payload() {
                const res = await cFetch(`${url_putRList}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: pram,
                    },
                    false);
                if (res.code == 0) {
                    return {postResult: res};
                } else {
                    throw res;
                }
            }
        }
    },
    modifyState: (prams) => {
        return {
            type: 'mySettings/riskAssess/MODIFY_STATE',
            payload() {
                return prams
            }
        }
    },
}
/*let memberSettingsActions = {
    //消息
    getMessagesList: (pageNum=1,pageSize=10,filter={}) => (dispatch, memberLoans) => {
        let newState={};
        // 获取数据列表
        let conditions='';
        if(JSON.stringify(filter)!={}){
            for(var item in filter){
                conditions += "&"+item+"="+filter[item];
            }
        }
        let url=`http://172.16.4.5:8084/getloansList.php?pageNum=${pageNum}&pageSize=${pageSize}${conditions}`;

        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState={
                        myList:{
                            data:{},
                            message:'无响应'
                        }
                    };
                    dispatch(memberSettingsActions.stateMessagesModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {
                let isRead=[];
                let isShow=[];
                let defaultChecked=[];
                for(var key in data.data.list){
                    isRead.push(data.data.list[key].isRead);
                    isShow.push(0);
                    defaultChecked.push(0);
                }

                newState={
                    myList:
                        {
                            data:data.data,
                            message:''
                        },
                    readState:{
                        isRead:isRead,
                        isShow:isShow,
                    },
                    defaultChecked:defaultChecked
                };
                dispatch(memberSettingsActions.stateMessagesModify(newState));
            }).catch(err=>{
            newState={
                myList: {
                    data:{},
                    message:'连接错误'
                }
            };
            dispatch(memberSettingsActions.stateMessagesModify(newState));
        });


    },
    messagesFilter: (pram) => (dispatch, memberLoans) => {
        dispatch(memberSettingsActions.stateMessagesModify({isRead:pram}));
        dispatch(memberSettingsActions.getList(1,10,{isRead:pram}));
    },
    //提交
    setReadState:(pram) => (dispatch, memberLoans) => {
        console.log(pram);
        let newState={};
        let url = `http://172.16.4.5:8084/test.php`;
        fetch(url,{
            method: "POST",
            mode:'cors',
            cache: 'default',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pram)
        })
            .then(function (response){
                if (response.status == 200){
                    return response;
                }
            })
            .then((data) => data.json())
            .then(data => {

            })
            .catch(err=>{

            });
    },
    deleteMessage:(pram) => (dispatch, memberLoans) => {
        console.log(pram);
        let newState={};
        let url = `http://172.16.4.5:8084/test.php`;
        fetch(url,{
            method: "POST",
            mode:'cors',
            cache: 'default',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pram)
        })
            .then(function (response){
                if (response.status == 200){
                    return response;
                }
            })
            .then((data) => data.json())
            .then(data => {

            })
            .catch(err=>{

            });
    },

    //风险测评
    getRiskAssessResult:(pram) => (dispatch, memberLoans) => {
        let newState={};
        let url=`http://172.16.4.5:8084/getloansList.php`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState={
                        result:{
                            data:{},
                            message:'无响应'
                        }
                    };
                    dispatch(memberSettingsActions.stateRiskAssessModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {
                var requireEval=1;
                newState={
                    result:
                        {

                            requireEval:requireEval,
                            result:{},
                            message:''
                        },
                    status:requireEval,
                };
                dispatch(memberSettingsActions.stateRiskAssessModify(newState));
                if(requireEval===1){
                    dispatch(memberSettingsActions.getRiskAssessList());
                }
            }).catch(err=>{
            newState={
                result: {
                    data:{},
                    message:'连接错误'
                }
            };
            dispatch(memberSettingsActions.stateRiskAssessModify(newState));
        })
    },
    getRiskAssessList:(pram) => (dispatch, memberLoans) => {
        let newState={};
        let url=`http://172.16.4.5:8084/getloansList.php?pageNum=1&pageSize=100`;
        fetch(url,{method:"get"})
            .then(function (response){
                if (response.status == 200){
                    return response;
                }else{
                    newState={
                        result:{
                            data:{},
                            message:'无响应'
                        }
                    };
                    dispatch(memberSettingsActions.stateRiskAssessModify(newState));
                }
            })
            .then((data) => data.json())
            .then(data => {
                for(let index of data.data.list.keys()){
                    data.data.list[index]=Object.assign({isChecked:''},data.data.list[index]);
                }
                newState={
                    myList:data.data.list,
                };
                dispatch(memberSettingsActions.stateRiskAssessModify(newState));
            }).catch(err=>{
                newState={
                    myList: {
                        data:{},
                        message:'连接错误'
                    }
                };
                dispatch(memberSettingsActions.stateRiskAssessModify(newState));
            })
    },
    putRiskAssess:(pram) => (dispatch, memberLoans) => {
        console.log(pram);
        let newState={};
        let url = `http://172.16.4.5:8084/test.php`;
        fetch(url,{
            method: "POST",
            mode:'cors',
            cache: 'default',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pram)
        })
            .then(function (response){
                if (response.status == 200){
                    return response;
                }
            })
            .then((data) => data.json())
            .then(data => {
                alert('成功');
                this.disabled(memberSettingsActions.getRiskAssessResult());

            })
            .catch(err=>{
                alert('失败');
            });
    },

    //修改状态
    stateMessagesModify: json => ({
        type: 'mySettings/messages/MODIFY_STATE',
        payload: json
    }),
    stateRiskAssessModify: json => ({
        type: 'mySettings/riskAssess/MODIFY_STATE',
        payload: json
    }),

    
};
export default memberSettingsActions;*/

