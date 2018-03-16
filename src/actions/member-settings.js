import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';


let memberSettingsActions = {

    getList: (pageNum=1,pageSize=10,filter={}) => (dispatch, memberLoans) => {
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
                    dispatch(memberSettingsActions.stateModify(newState));
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
                dispatch(memberSettingsActions.stateModify(newState));
            }).catch(err=>{
            newState={
                myList: {
                    data:{},
                    message:'连接错误'
                }
            };
            dispatch(memberSettingsActions.stateModify(newState));
        });


    },

    filter: (pram) => (dispatch, memberLoans) => {
        dispatch(memberSettingsActions.toggleClass(pram));
        //dispatch(memberSettingsActions.refreshListFail(''));
        dispatch(memberSettingsActions.getList(1,10,{status:pram}));

    },
    //选项卡样式切换
    toggleClass:(pram)=>(dispatch, memberLoans)=>{
        let newState={};
        newState= {
            status:pram
        };
        dispatch(memberSettingsActions.stateModify(newState));
    },
    //提交提前还款申请
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




    //修改状态
    stateModify: json => ({
        type: 'mySettings/messages/MODIFY_STATE',
        payload: json
    }),

};
export default memberSettingsActions;

