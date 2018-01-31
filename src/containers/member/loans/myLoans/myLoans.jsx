import React from 'react';
import PropTypes from 'prop-types';
/*import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';*/
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import Pagination from '../../../../components/pagination/pagination';
import './myLoans.less';

import  {getData}  from '../../../../assets/js/getData'
import  {getBeforeDate}  from '../../../../assets/js/getBeforeDate'

class MyLoans extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dataSetting:{},  //数据
            status: 0,  //申请中 招标中 还款中 已结清
            dateBegin:'',
            dateEnd:'',
            dateBtn:7,
        }

    }
    /*filterClassName = (index) => {
        return index === this.state.status ? "filter__opt filter__opt--active" : "filter__opt"
    }*/
    switchFilterStyle = (item,index) => {
        return index === this.state[item] ? "filter__opt filter__opt--active" : "filter__opt"
    }
    loadData(currentPage,pageSize,filter){
        let data=getData(`http://localhost:9002/members/redEnvelopes`,currentPage,pageSize,filter);
        if (data){
            this.setState({
                dataSetting:data.data
            });
        }else{
            let mockDate={
                code: "0",
                data:{
                    list:[
                        {id:1,status:0,projectCode:'---',applyAmt:'200000.00',loanApplyExpiry:'3',
                            rate:'12','publishTime':'2017-08-16',syje:'100000.00','tzrs':'3','tzjd':'50','hkfs':'每月还息，到期还本'},
                        {id:2,status:1,projectCode:'汇车贷-HCD20180116004',applyAmt:'10000.00',loanApplyExpiry:'3',
                            rate:'8','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100','hkfs':'每月还息，到期还本'},
                        {id:7,status:2,projectCode:'汇车贷-HCD20180116003',applyAmt:'100000.00',loanApplyExpiry:'12',
                            rate:'8','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100','hkfs':'每月还息，到期还本'},
                        {id:3,status:3,projectCode:'汇车贷-HCD20180116002',applyAmt:'100000.00',loanApplyExpiry:'3',
                            rate:'10','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100','hkfs':'每月还息，到期还本'},
                    ],
                    pageNum: 1,
                    pageSize: 10,
                    total:13
                },
                message: "SUCCESS",
                time: "2018-01-17 11:49:39"
            };
            this.setState({
                dataSetting:mockDate.data
            });
        }

    }
    componentDidMount () {
        this.loadData(1,10,{status:0});
    }
    /*filter(pram){
        this.setState({ status: pram });
        this.loadData(this.dataSet.pageNum,this.dataSet.pageSize,{re_status:pram});
    }*/
    filter=(item,index)=>{

        this.setState({
            [item]: index
        }, () => {
            let dateBegin,dateEnd,filter;
            dateBegin=getBeforeDate(this.state.dateBtn);
            dateEnd=getBeforeDate(0);
            filter={
                status:this.state.status,
                dateBegin:dateBegin,
                dateEnd:dateEnd,
                //dateBtn:this.state.dateBtn
            }

            this.loadData(1,10,filter);
        });

    }
    render(){

        const {list,pageNum,total,pageSize}=this.state.dataSetting;
        const totalPage=Math.ceil(total/pageSize);
        return(
            <div className="member__main">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="我的借款">
                            统计图表
                        </div>
                    </Tab>
                </div>
                <div className="member__cbox">
                    <Tab>
                        <div name="借款记录">
                            <div className="filter">
                                <div className="filter__outer">
                                    <div className="filter__inner">
                                        <div className="filter__row">
                                            <div className="filter__cell">
                                                <h5>类型:</h5>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={ this.switchFilterStyle('status',0) } onClick={ () => { this.filter('status',0) } }>申请中</p>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={  this.switchFilterStyle('status',1) } onClick={ () => { this.filter('status',1) } }>招标中</p>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={  this.switchFilterStyle('status',2)  } onClick={ () => { this.filter('status',2) } }>还款中</p>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={  this.switchFilterStyle('status',3) } onClick={ () => { this.filter('status',3) } }>已结清</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="filter__outer">
                                    <div className="filter__inner">
                                        <div className="filter__row">
                                            <div className="filter__cell">
                                                <h5>日期:</h5>
                                            </div>
                                            <div className="filter__cell">
                                                <input type="date"/> -- <input type="date"/>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={ this.switchFilterStyle('dateBtn',7) } onClick={ () => { this.filter('dateBtn',7) } }>最近7天</p>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={ this.switchFilterStyle('dateBtn',30)} onClick={ () => { this.filter('dateBtn',30) } }>30天</p>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={ this.switchFilterStyle('dateBtn',60) } onClick={ () => { this.filter('dateBtn',60) } }>60天</p>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={ this.switchFilterStyle('dateBtn',90) } onClick={ () => { this.filter('dateBtn',90) } }>90天</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {
                                JSON.stringify(this.state.dataSetting) == "{}"? <div>连接错误,请稍后再试</div>
                                    :
                                    list.length>0 ?
                                        <div className="table__wrapper">
                                            <table className="tableList">
                                                <thead>
                                                <tr>

                                                    <th>项目名称</th>
                                                    {this.state.status==0?
                                                        <th>项目类型</th>
                                                        :''
                                                    }
                                                    <th>借款金额(元)</th>
                                                    <th>借款年利率(%)</th>
                                                    <th>借款期限</th>
                                                    <th>还款方式</th>
                                                    <th>申请日期</th>
                                                    <th>状态</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    list.map((item, rowIndex) => (
                                                        <tr key={`row-${rowIndex}`}>
                                                    <td></td>
                                                    {this.state.status==0?
                                                        <td>信用标</td>
                                                        :''
                                                    }
                                                    <td>{item.applyAmt}</td>
                                                    <td>{item.rate}%</td>
                                                    <td>{item.loanApplyExpiry}个月</td>
                                                    <td>{item.hkfs}</td>
                                                    <td>{item.publishTime}</td>
                                                    <td><a href="">申请中</a></td>
                                                </tr>
                                                    ))
                                                }
                                                </tbody>
                                            </table>
                                            <Pagination config = {
                                                {
                                                    currentPage:this.state.dataSetting.pageNum,
                                                    pageSize:pageSize,
                                                    totalPage:totalPage,
                                                    filter:this.state.re_status,
                                                    paging:(obj)=>{
                                                        this.loadData(obj.currentPage,obj.pageCount,{re_status:obj.filter});
                                                    }
                                                }
                                            } ></Pagination>
                                        </div>
                                        : <div>暂无借款记录</div>
                            }


                        </div>
                    </Tab>
                </div>
            </div>
        )
    }
}
export default MyLoans;


