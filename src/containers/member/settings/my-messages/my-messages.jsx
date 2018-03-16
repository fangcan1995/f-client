import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '../../../../components/pagination/pagination';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import './message.less';
import moment from "moment";
import  memberSettingsActions  from '../../../../actions/member-settings';
import { Checkbox,message,Select } from 'antd';
import { connect } from 'react-redux';


let selectIds = [];
class MyMessages extends React.Component {
    constructor(props){
        super(props);

        this.setReaded = this.setReaded.bind(this);
        this.delete = this.delete.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onAllChange = this.onAllChange.bind(this);

    }

    componentDidMount() {
        this.props.dispatch(memberSettingsActions.getList(1, 10));
    }
    setReaded(index,id){
        let isRead=this.props.memberSettings.messages.readState.isRead;
        let isShow=this.props.memberSettings.messages.readState.isShow;
        let noReadTotal=this.props.memberSettings.messages.myList.data.noReadTotal;

        if(isRead[index]===0){
            noReadTotal=noReadTotal-1;
            isRead[index]=1;
            this.props.dispatch(memberSettingsActions.setReadState(id));  //后台设为已读
        }
        (isShow[index]===0)?isShow[index]=1:isShow[index]=0;
        let newState={
            myList:{
                data:{
                    noReadTotal:noReadTotal
                }
            },
            readState:{
                isRead:isRead,
                isShow:isShow,
            }
        }
        this.props.dispatch(memberSettingsActions.stateModify(newState));
    }
    delete(pram){
        console.log('删除');
        pram=pram.toString();
        //console.log(pram);
        this.props.dispatch(memberSettingsActions.deleteMessage(pram));
        this.props.dispatch(memberSettingsActions.getList(0,10));
    }
    onChange(e) {
        let value=e.target.value;
        let isExist=selectIds.findIndex((value)=>{
            return value ==e.target.value;
        });
        if(isExist===-1){
            selectIds.push(value);
        }else{
            selectIds.splice(isExist,1);
        }
        //console.log(selectIds);

    }
    onAllChange(e){
        let defaultChecked=this.props.memberSettings.messages.defaultChecked;
        for(var item in defaultChecked){
            if(e.target.checked){
                defaultChecked[item]=1;
            }else{
                defaultChecked[item]=0;
            }
        }
        let newState={
            defaultChecked:defaultChecked
        }
        console.log(defaultChecked);
        this.props.dispatch(memberSettingsActions.stateModify(newState));
        selectIds=[];
        this.props.memberSettings.messages.myList.data.list.map((l, i) => (
            selectIds.push(l.proId)
        ))


    }

    render() {
        console.log('---------myMessages------');
        console.log(this.props);
        let {isRead,myList,readState,defaultChecked} = this.props.memberSettings.messages;

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
                                                <p className={(isRead === '') ? 'filter__opt filter__opt--active' : 'filter__opt'}
                                                   onClick={() => {
                                                       this.props.dispatch(memberSettingsActions.getList(1, 10,{isRead:''}));
                                                   }}>全部</p>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={(isRead === 0) ? 'filter__opt filter__opt--active' : 'filter__opt'}
                                                   onClick={() => {
                                                       this.props.dispatch(memberSettingsActions.getList(1, 10,{isRead:0}));
                                                   }}>未读</p>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={(isRead === 1) ? 'filter__opt filter__opt--active' : 'filter__opt'}
                                                   onClick={() => {
                                                       this.props.dispatch(memberSettingsActions.getList(1, 10,{isRead:1}));
                                                   }}>已读</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab_content" style={{marginTop:'15px'}}>
                                {
                                    myList.data == '' ? <div><p>loading</p></div>
                                        :
                                        myList.data.total > 0 ?
                                            <div>
                                                <p className="info" style={{textAlign:'right',paddingBottom:'10px'}}>（共{myList.data.total}条，{myList.data.noReadTotal}条未读）</p>
                                                <div className="list">
                                                    <ul className="thead">
                                                        <li> 1</li>
                                                        <li> 2</li>
                                                        <li>消息类型</li>
                                                        <li>内容</li>
                                                        <li>时间</li>
                                                        <li>操作</li>
                                                    </ul>
                                                    {
                                                        myList.data.list.map((l, i) => (
                                                            <div key={`row-${i}`}>
                                                                <ul className="body">
                                                                    <li><Checkbox onChange={this.onChange} value={`${l.proId}`} checked={defaultChecked[i]}></Checkbox></li>
                                                                    <li>{(readState.isRead[i]===0)?<i className="iconfont noread"></i>:<i className="iconfont"></i>}</li>
                                                                    <li>{l.shortText}</li>
                                                                    <li onClick={()=>{this.setReaded(i,l.proId)}}>{l.longText}</li>
                                                                    <li>{l.dateTime}</li>
                                                                    <li><a className="iconfont btn_del" onClick={()=>{this.delete(l.proId)}}></a></li>
                                                                </ul>
                                                                {((readState.isShow[i]===1)?
                                                                    <div className="article" >
                                                                        <p>
                                                                            {l.longText}
                                                                        </p>
                                                                    </div>
                                                                    :``)}
                                                            </div>
                                                        ))}

                                                </div>
                                                <Pagination config={
                                                    {
                                                        currentPage:  myList.data.pageNum,
                                                        pageSize: myList.data.pageSize,
                                                        totalPage: Math.ceil(myList.data.total/myList.data.pageSize),
                                                        paging: (obj) => {

                                                            this.props.dispatch(memberSettingsActions.getList(obj.currentPage, obj.pageCount,{isRead:isRead}));
                                                        }
                                                    }
                                                }>
                                                </Pagination>
                                            </div>

                                            :`<div><p>暂无消息</p></div>`
                                }
                                <div className="control">
                                    <Checkbox onChange={this.onAllChange} >
                                        <button className="del_botton" onClick={()=>{this.delete(selectIds)}}>删除</button>
                                    </Checkbox>

                                </div>

                            </div>
                        </div>
                    </Tab>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const { auth,memberSettings } = state.toJS();
    return {
        auth,
        memberSettings

    };
}

export default connect(mapStateToProps)(MyMessages);