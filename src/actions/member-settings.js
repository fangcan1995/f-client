import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';

const urls = [
    `http://172.16.4.5:8084/getloansList.php?access_token=930b366c-2e78-4c87-8f09-0b12b194b475`,  //获取消息列表
    `http://172.16.4.5:8084/test.php?access_token=930b366c-2e78-4c87-8f09-0b12b194b475`, 　　　//消息设为已读
    `http://172.16.4.5:8084/test.php?access_token=930b366c-2e78-4c87-8f09-0b12b194b475`,  //删除消息
    `http://172.16.1.221:9090/homes/standard?access_token=930b366c-2e78-4c87-8f09-0b12b194b475`,
    `http://172.16.1.221:9090/homes/ad?access_token=930b366c-2e78-4c87-8f09-0b12b194b475`,
    `http://172.16.1.221:9090/homes/media?access_token=930b366c-2e78-4c87-8f09-0b12b194b475`,
    `http://172.16.1.221:9090/homes/partner?access_token=930b366c-2e78-4c87-8f09-0b12b194b475`,
]


let memberSettingsActions = {

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
export default memberSettingsActions;

