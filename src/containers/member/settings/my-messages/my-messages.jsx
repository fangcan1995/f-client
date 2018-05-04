import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '../../../../components/pagination/pagination';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import {myMessagesAc} from '../../../../actions/member-settings';
import { Checkbox  } from 'antd';
import { connect } from 'react-redux';
import {Loading,NoRecord} from '../../../../components/bbhAlert/bbhAlert';
import './message.less';

let selectIds = [];  //用于保存全中的消息id
class MyMessages extends React.Component {
    constructor(props){
        super(props);
        this.deleteMessage = this.deleteMessage.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onAllChange = this.onAllChange.bind(this);
        this.setReaded= this.setReaded.bind(this);
        this.filter=this.filter.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0,0);
        this.props.dispatch(myMessagesAc.modifyState({readTag:``,messagesList:''}));  //修改状态
        this.props.dispatch(myMessagesAc.getMessagesList());

    }
    filter(params){
        this.props.dispatch(myMessagesAc.modifyState({readTag:params,messagesList:''}));  //修改状态
        this.props.dispatch(myMessagesAc.getMessagesList({readTag:params}));  //获取数据
    }
    //读消息，并设为已读
    setReaded(index,id){
        let {list} = this.props.memberMessages.messagesList.page;
        let {readCount}=this.props.memberMessages.messagesList;
        (list[index].isShow=='0')?list[index].isShow='1':list[index].isShow='0';
        if(list[index].readTag=='0'){
            readCount=readCount-1;
            list[index].readTag='1';
            this.props.dispatch(myMessagesAc.setRead(Array.of(id)));  //后台设为已读
        };
        let newState={
            messagesList:{
                page:{
                    list:list
                },
                readCount:readCount
            }
        }
        this.props.dispatch(myMessagesAc.modifyState(newState));   //显示消息内容

    }
    //删除一条或多条消息
    deleteMessage(pram){
        /*如删除一条或多条数据，则重新获取数据，删除1条时，体验较差
        最好删除一条时前端删除，实现比较麻烦，后期迭代
        */
        console.log('要删除的数据');
        console.log(pram);
        if(pram.length>0){
            pram=pram.toString();
            this.props.dispatch(myMessagesAc.deleteMessage(pram));
            //this.props.dispatch(myMessagesAc.modifyState({messagesList:''}));  //修改状态
            //this.props.dispatch(myMessagesAc.getMessagesList());
        }
    }
    //选取一个
    onChange(e) {
        let {list} = this.props.memberSettings.messages.messagesList.page;
        let index=list.findIndex((x)=>
             x.id ==parseInt(e.target.value)
        );
        if(e.target.checked){
            list[index].isChecked=1;
            selectIds.push(list[index].id);
        }else{
            list[index].isChecked=0;
            let selectIdsIndex=selectIds.findIndex((x)=>
                x ==parseInt(e.target.value)
            );
            selectIds.splice(selectIdsIndex,1); //从选中的数组中删除
        }
        let newState={
            messagesList:{
                page:{
                    list:list
                },
            }
        }
        this.props.dispatch(myMessagesAc.modifyState(newState));
    }
    //全选
    onAllChange(e){
        let {list} = this.props.memberMessages.messagesList.page;
        if(e.target.checked){
            for(let index of list.keys()){
                list[index].isChecked=1;
                selectIds.push(list[index].id);
            }
        }else{
            for(let index of list.keys()){
                list[index].isChecked=0;
            }
            selectIds=[];
        }
        let newState={
            messagesList:{
                page:{
                    list:list
                },
            }
        }
        this.props.dispatch(myMessagesAc.modifyState(newState));   //
    }
    render() {
        console.log(this.props);
        let {messagesList,readTag,isFetching,deleteResult} = this.props.memberMessages;
        console.log(messagesList);
        /*if(deleteResult!=``){
            this.props.dispatch(myMessagesAc.modifyState({deleteResult:''}));  //修改状态
            this.props.dispatch(myMessagesAc.getMessagesList());
        }*/
        return (
            <div className="member__main myMessage">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="系统消息">
                            <div className="filter" style={{marginTop:'15px'}}>
                                <div className="filter__outer">
                                    <div className="filter__inner">
                                        <div className="filter__row">
                                            <div className="filter__cell">
                                                <h5>类型:</h5>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={(readTag === '') ? 'filter__opt filter__opt--active' : 'filter__opt'}
                                                   onClick={ () => { this.filter('') } }>全部</p>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={(readTag === '0') ? 'filter__opt filter__opt--active' : 'filter__opt'}
                                                   onClick={ () => { this.filter('0') }  }>未读</p>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={(readTag === '1') ? 'filter__opt filter__opt--active' : 'filter__opt'}
                                                   onClick={ () => { this.filter('1') } }>已读</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab_content" style={{marginTop:'15px'}}>
                                {
                                    messagesList === '' ? <Loading isShow={isFetching}/>
                                        :
                                        messagesList.page.total > 0 ?
                                            <div>
                                                <p className="info" style={{textAlign:'right',paddingBottom:'10px'}}>
                                                    （共{messagesList.page.total}条
                                                        {(readTag === '')?`, ${messagesList.readCount}条未读`:``
                                                    }）
                                                </p>
                                                <div className="list">
                                                    <ul className="thead">
                                                        <li>&nbsp;</li>
                                                        <li>&nbsp;</li>
                                                        <li>消息类型</li>
                                                        <li>内容</li>
                                                        <li>时间</li>
                                                        <li>操作</li>
                                                    </ul>
                                                    {
                                                        messagesList.page.list.map((l, i) => (
                                                            <div key={`row-${i}`}>
                                                                <ul className="body">
                                                                    <li><Checkbox onChange={this.onChange} value={`${l.id}`} checked={l.isChecked}></Checkbox></li>
                                                                    <li>{(l.readTag==='0')?<i className="iconfont noread"></i>:<i className="iconfont"></i>}</li>
                                                                    <li><p>{l.msgProfile}</p></li>
                                                                    <li onClick={()=>{this.setReaded(i,l.id)}}>{l.msgTitle}</li>
                                                                    <li>{l.sendTime}</li>
                                                                    <li><a className="iconfont btn_del" onClick={()=>{this.deleteMessage(l.id)}}></a></li>
                                                                </ul>
                                                                {((l.isShow==='1')?
                                                                    <div className="article" >
                                                                        <p>
                                                                            {l.msgContent}
                                                                        </p>
                                                                    </div>
                                                                    :``)}
                                                            </div>
                                                        ))}

                                                </div>
                                                <div className="control">
                                                    <Checkbox onChange={this.onAllChange} >
                                                        <button className="del_botton" onClick={()=>{this.deleteMessage(selectIds)}}>删除</button>
                                                    </Checkbox>
                                                </div>
                                                <Pagination config={
                                                    {
                                                        currentPage:  messagesList.page.pageNum,
                                                        pageSize: messagesList.page.pageSize,
                                                        totalPage: messagesList.page.pages,
                                                        filter:readTag,
                                                        paging: (obj) => {
                                                            this.props.dispatch(myMessagesAc.modifyState({messagesList:''}));  //修改状态
                                                            this.props.dispatch(myMessagesAc.getMessagesList(
                                                                {
                                                                    pageNum:obj.currentPage,
                                                                    readTag:readTag
                                                                }
                                                                ))
                                                        }
                                                    }
                                                }>
                                                </Pagination>
                                            </div>
                                            :<NoRecord isShow={true} title={`暂无消息`}/>
                                }
                            </div>
                        </div>
                    </Tab>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { auth,memberMessages } = state.toJS();
    return {
        auth,
        memberMessages
    };
}

export default connect(mapStateToProps)(MyMessages);