import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '../../../../components/pagination/pagination';
import './message.less';
import moment from "moment";
export default class Message extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dataSetting:{},
            reStatus: 0
        }
    }
    filterClassName = (index) => {
        return index === this.state.reStatus ? "filter__opt filter__opt--active" : "filter__opt"
    }
    loadData(currentPage,pageSize,filter){
        let conditions = "";
        if(filter){
            for(var item in filter){
                conditions += "&"+item+"="+filter[item];
            }
        }
        let url = `http://172.16.1.221:9090/members/memberRedEnvelopes?access_token=137c6472-22ba-4dde-aa15-e1dff2436641&pageNum=${currentPage}&pageSize=${pageSize}${conditions}`;
        fetch(url,{
            method:"get"
        })
            .then(function (response){
                if (response.status == 200){
                    return response;
                }
            })
            .then((data) => data.json())
            .then((data) => {
                    this.setState({ dataSetting:data.data });
                }

            )
            .catch(function(err){
                console.log("Fetch错误:"+err);
            });
        let mockDate={
            code: "0",
            data:{
                list:[
                    {id:1,projectStatus:50,projectCode:'汇车贷-HCD20180116005',applyAmt:'200000.00',loanApplyExpiry:'3',
                        rate:'12','publishTime':'2017-08-16',syje:'100000.00','tzrs':'3','tzjd':'50'},
                    {id:2,projectStatus:60,projectCode:'汇车贷-HCD20180116004',applyAmt:'10000.00',loanApplyExpiry:'3',
                        rate:'8','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100'},
                    {id:7,projectStatus:70,projectCode:'汇车贷-HCD20180116003',applyAmt:'100000.00',loanApplyExpiry:'12',
                        rate:'8','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100'},
                    {id:3,projectStatus:90,projectCode:'汇车贷-HCD20180116002',applyAmt:'100000.00',loanApplyExpiry:'3',
                        rate:'10','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100'},
                    {id:4,projectStatus:100,projectCode:'汇车贷-HCD20180116001',applyAmt:'100000.00',loanApplyExpiry:'6',
                        rate:'12','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100'},
                    {id:1,projectStatus:50,projectCode:'汇车贷-HCD20180116005',applyAmt:'200000.00',loanApplyExpiry:'3',
                        rate:'12','publishTime':'2017-08-16',syje:'100000.00','tzrs':'3','tzjd':'50'},
                    {id:2,projectStatus:60,projectCode:'汇车贷-HCD20180116004',applyAmt:'10000.00',loanApplyExpiry:'3',
                        rate:'8','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100'},
                    {id:7,projectStatus:70,projectCode:'汇车贷-HCD20180116003',applyAmt:'100000.00',loanApplyExpiry:'12',
                        rate:'8','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100'},
                    {id:3,projectStatus:90,projectCode:'汇车贷-HCD20180116002',applyAmt:'100000.00',loanApplyExpiry:'3',
                        rate:'10','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100'},
                    {id:4,projectStatus:100,projectCode:'汇车贷-HCD20180116001',applyAmt:'100000.00',loanApplyExpiry:'6',
                        rate:'12','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100'},
                ],
                pageNum: 1,
                pageSize: 10,
                total:13
            },
            message: "SUCCESS",
            time: "2018-01-17 11:49:39"
        }
        this.setState({
            dataSetting:mockDate.data
        });

    }
    componentDidMount () {
        this.loadData(1,10);
    }
    filter(pram){
        this.setState({ reStatus: pram });
        this.loadData(1,10,{reStatus:pram});
    }
    render(){
        const {list,pageNum,total,pageSize}=this.state.dataSetting;
        const totalPage=Math.ceil(total/pageSize);
        return(
            <div className="member__main">
                <div className="crumb">
                    <div>
                        <b>您所在的位置：</b>
                        <a href="/">首页</a>&nbsp;&gt;
                        奖励管理&nbsp;&gt;
                        <a className="actice">站内邮箱</a>
                    </div>
                </div>
                <div className="member__cbox">
                    <div className="tab">
                        <div className="tab_title">
                            <ul>
                                <li className="on"><h3>系统消息</h3></li>
                            </ul>
                        </div>
                        <div className="tab_content">
                            <div className="filter">
                                <div className="filter__outer">
                                    <div className="filter__inner">
                                        <div className="filter__row">
                                            <div className="filter__cell">
                                                <h5>类型:</h5>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={this.filterClassName(0)} onClick={() => {
                                                    this.filter(0)
                                                }}>全部</p>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={this.filterClassName(1)} onClick={() => {
                                                    this.filter(1)
                                                }}>未读</p>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={this.filterClassName(2)} onClick={() => {
                                                    this.filter(2)
                                                }}>已使用</p>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={this.filterClassName(3)} onClick={() => {
                                                    this.filter(3)
                                                }}>已读</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                JSON.stringify(this.state.dataSetting) == "{}"? <div>连接错误,请稍后再试</div>
                                    :
                                    list.length>0 ?
                                        <div>
                                            <table id="table">
                                                <thead>
                                                <tr>
                                                    <th width="50px"></th>
                                                    <th width="30px"></th>
                                                    <th>消息类型</th>
                                                    <th>内容</th>
                                                    <th>时间</th>
                                                    <th>操作</th>
                                                </tr>
                                                </thead>
                                                <tbody id="list">
                                                {
                                                    list.map((item, index) => (
                                                        <tr className="master"  key={`row-${index}`}>
                                                            <td>
                                                                <span className="checkbox"><i className="check"></i></span>
                                                                <input type="hidden" name="id" className="check" value="1" />
                                                            </td>
                                                            <td className="view">
                                                                <i className="iconfont"></i>
                                                            </td>
                                                            <td className="view">红包发放</td>
                                                            <td className="view">
                                                                <p className="title">恭喜您获得新手礼包888元投资红包+8%加息红包恭喜您获得新手礼包888元投资红包+8%</p>
                                                            </td>
                                                            <td className="view">2017-01-20 10:30:48</td>
                                                            <td>
                                                                <a className="iconfont btn_del"></a>
                                                            </td>
                                                        </tr>
                                                    ))
                                                    }
                                                </tbody>
                                            </table>

                                            <Pagination config = {
                                                {
                                                    currentPage:pageNum,
                                                    pageSize:pageSize,
                                                    totalPage:totalPage,
                                                    paging:(obj)=>{
                                                        this.loadData(obj.currentPage,obj.pageCount,{reStatus:this.state.reStatus});
                                                    }
                                                }
                                            } >
                                            </Pagination>
                                        </div>
                                        : <div>暂无消息</div>
                            }
                        </div>
                    </div>
                </div>

            </div>
        )

    }
}



