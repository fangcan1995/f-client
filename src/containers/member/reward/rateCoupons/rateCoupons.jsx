import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '../../../../components/pagination/pagination';
import './rateCoupons.less';
import moment from "moment";
export default class RateCoupons extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dataSetting:{},  //数据
            rcStatus: 0  //默认显示全部
        }
    }
    filterClassName = (index) => {
        return index === this.state.rcStatus ? "filter__opt filter__opt--active" : "filter__opt"
    }
    loadData(currentPage,pageSize,filter){
        let conditions = "";
        if(filter){
            for(var item in filter){
                conditions += "&"+item+"="+filter[item];
            }
        }
        let url = `http://172.16.1.221:9090/members/memberRateCoupons?access_token=137c6472-22ba-4dde-aa15-e1dff2436641&pageNum=${currentPage}&pageSize=${pageSize}${conditions}`;
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
    }
    componentDidMount () {
        this.loadData(1,10);
    }
    filter(pram){
        this.setState({ rcStatus: pram });
        this.loadData(1,10,{rcStatus:pram});
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
                        <a className="actice">我的加息券</a>
                    </div>
                </div>
                <div className="member__cbox">
                    <div className="tab">
                        <div className="tab_title">
                            <ul>
                                <li className="on"><h3>我的加息券</h3></li>
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
                                                }}>未使用</p>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={this.filterClassName(2)} onClick={() => {
                                                    this.filter(2)
                                                }}>已使用</p>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={this.filterClassName(3)} onClick={() => {
                                                    this.filter(3)
                                                }}>已过期</p>
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
                                            <ul className="couponList">
                                                {
                                                    list.map((entry, rowIndex) => (

                                                        <li className={`reStatus-${entry['rcStatus']}`} key={`row-${rowIndex}`}>
                                                            <div className='img'>
                                                                <p className="denomination">{entry['rcAmount']}</p>
                                                                <p className="remark"></p>
                                                            </div>
                                                            <div className="txt">
                                                                <p>
                                                                    <strong>使用规则：</strong>{entry['productCategoryName']}满{entry['useMinAmount']}元可用
                                                                </p>
                                                                <p><strong>有效期：</strong>
                                                                    {
                                                                        !entry['beginTime']?'' :moment(entry['beginTime']).format('YYYY-MM-DD')
                                                                    }
                                                                    --
                                                                    {
                                                                        !entry['endTime']?'' :moment(entry['endTime']).format('YYYY-MM-DD')
                                                                    }
                                                                </p>
                                                            </div>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
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
                                        : <div>暂无加息券</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="member__cbox">
                    <div className="tab m-wxts">
                        <div className="tab_title">
                            <ul>
                                <li className="on"><h3>温馨提示</h3></li>
                            </ul>
                        </div>
                        <p> 1. 投资时需满足红包使用规则，才可使用；<br/>
                            2. 使用过程遇到问题时，请（工作日9:00-20:00）咨询客服<br/>
                        </p>
                    </div>
                </div>
            </div>
        )

    }
}


