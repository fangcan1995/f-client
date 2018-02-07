import React from 'react';
import PropTypes from 'prop-types';
import PieChart from '../../../../components/charts/pie'
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import Pagination from '../../../../components/pagination/pagination';
import  {getData}  from '../../../../assets/js/getData';
import {addCommas} from '../../../../assets/js/cost';
import { Modal,Select,DatePicker } from 'antd';
import ModalRepayment from './modalRepayment';
import './repaymentPlans.less';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Option = Select.Option;

export default class RepaymentPlans extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateStartChange = this.handleDateStartChange.bind(this);
        this.handleDateEndChange = this.handleDateEndChange.bind(this);
        this.state={
            modalRepayment: false,
            dataList:{},  //项目数据
            charts:{
                totalInvestment:{},
                accumulatedIncome:{},
                accumulatedIncome2:{},
            },  //统计数据
            pid:0,
            DateStart:'',
            DateEnd:'',
        };
    }
    handleChange(value) {
        this.setState({
            pid:value
        },()=>{
            let filter={
                pid:this.state.pid,
                DateStart:this.state.DateStart,
                DateEnd:this.state.DateEnd,
            };
            this.loadData(1,10,filter);
        })
    }
    handleDateStartChange(date,dateString) {
        dateString=dateString+' 00:00:00';
        this.setState({
            DateStart:moment(dateString)
        },()=>{
            let filter={
                pid:this.state.pid,
                DateStart:this.state.DateStart,
                DateEnd:this.state.DateEnd,
            }
            this.loadData(1,10,filter);
        })
    }
    handleDateEndChange(date,dateString,aaa) {
        dateString=dateString+' 23:59:59';
        this.setState({
            DateEnd:moment(dateString),
        },()=>{
            let filter={
                pid:this.state.pid,
                DateStart:this.state.DateStart,
                DateEnd:this.state.DateEnd,
            }
            this.loadData(1,10,filter);
        })
    }
    loadData(currentPage,pageSize,filter){
        let data=getData(`http://localhost:9002/members`,currentPage,pageSize,filter);
        if (data){
            this.setState({
                dataList:data.data
            });
        }else{
            let mockDate={
                code: "0",
                data:{
                    list:[
                        {
                            proId:'1',
                            proStatus:'4',
                            col1:'汇车贷-HCD201704170002',
                            col2:'2018-07-08',
                            col3:'9',
                            col4:'100000.00',
                            col5:'1000.00',
                            col6:'0.00',
                            col7:'0.00',
                            col8:'11000.00',
                            col9:'待还款',
                        },
                        {
                            proId:'1',
                            proStatus:'4',
                            col1:'汇车贷-HCD201704170002',
                            col2:'2018-06-08',
                            col3:'8',
                            col4:'0.00',
                            col5:'1000.00',
                            col6:'0.00',
                            col7:'0.00',
                            col8:'1000.00',
                            col9:'待还款',
                        },
                        {
                            proId:'1',
                            proStatus:'4',
                            col1:'汇车贷-HCD201704170002',
                            col2:'2018-05-08',
                            col3:'7',
                            col4:'0.00',
                            col5:'1000.00',
                            col6:'0.00',
                            col7:'0.00',
                            col8:'1000.00',
                            col9:'待还款',
                        },
                        {
                            proId:'1',
                            proStatus:'4',
                            col1:'汇车贷-HCD201704170002',
                            col2:'2018-04-08',
                            col3:'6',
                            col4:'0.00',
                            col5:'1000.00',
                            col6:'0.00',
                            col7:'0.00',
                            col8:'1000.00',
                            col9:'待还款',
                        },
                        {
                            proId:'1',
                            proStatus:'4',
                            col1:'汇车贷-HCD201704170002',
                            col2:'2018-03-08',
                            col3:'5',
                            col4:'0.00',
                            col5:'1000.00',
                            col6:'0.00',
                            col7:'0.00',
                            col8:'1000.00',
                            col9:'待还款',
                        },
                        {
                            proId:'1',
                            proStatus:'4',
                            col1:'汇车贷-HCD201704170002',
                            col2:'2018-02-08',
                            col3:'4',
                            col4:'0.00',
                            col5:'1000.00',
                            col6:'0.00',
                            col7:'0.00',
                            col8:'1000.00',
                            col9:'待还款',
                        },
                        {
                            proId:'1',
                            proStatus:'7',
                            col1:'汇车贷-HCD201704170002',
                            col2:'2018-01-08',
                            col3:'3',
                            col4:'0.00',
                            col5:'1000.00',
                            col6:'10.00',
                            col7:'0.00',
                            col8:'1010.00',
                            col9:'逾期未还',
                        },
                        {
                            proId:'1',
                            proStatus:'2',
                            col1:'汇车贷-HCD201704170002',
                            col2:'2017-12-08',
                            col3:'2',
                            col4:'0.00',
                            col5:'1000.00',
                            col6:'100.00',
                            col7:'0.00',
                            col8:'1100.00',
                            col9:'逾期还款',
                        },
                        {
                            proId:'1',
                            proStatus:'1',
                            col1:'汇车贷-HCD201704170002',
                            col2:'2017-11-08',
                            col3:'1',
                            col4:'0.00',
                            col5:'1000.00',
                            col6:'0.00',
                            col7:'0.00',
                            col8:'1000.00',
                            col9:'已正常还款',
                        },
                        {
                            proId:'2',
                            proStatus:'0',
                            col1:'汇车贷-HCD201704170001',
                            col2:'2016-10-08',
                            col3:'4',
                            col4:'10000.00',
                            col5:'1000.00',
                            col6:'0.00',
                            col7:'0.00',
                            col8:'11000.00',
                            col9:'已提前还款',
                            col10:''
                        },

                    ],
                    pageNum: 1,
                    pageSize: 10,
                    total:13
                },
                message: "SUCCESS",
                time: "2018-01-17 11:49:39"
            };
            this.setState({
                dataList:mockDate.data
            });
        }

    }
    loadChartsData(){
        let data=getData(`http://localhost:9002/members`);
        if (data){
            /*this.setState({
                charts:{
                    totalInvestment:{
                        legend:{data:['招标中','回款中','已回款','已转出']},
                        series_data:{
                            data:[
                                {value:data.data.totalInvestment.proMoneyBidding, name:'招标中'},
                                {value:data.data.totalInvestment.proMoneyInBack, name:'回款中'},
                                {value:data.data.totalInvestment.proMoneyBacked, name:'已回款'},
                                {value:data.data.totalInvestment.proMoneyOut, name:'已转出'}
                            ]
                        }
                    },
                    accumulatedIncome:{
                        legend:{data:['招标中','回款中','已回款','已转出']},
                        series_data:{
                            data:[
                                {value:data.data.totalInvestment.proMoneyBidding, name:'招标中'},
                                {value:data.data.totalInvestment.proMoneyInBack, name:'回款中'},
                                {value:data.data.totalInvestment.proMoneyBacked, name:'已回款'},
                                {value:data.data.totalInvestment.proMoneyOut, name:'已转出'}
                            ]
                        }
                    }
                }
            });*/
        }else{
            let mockDate={
                data: {
                    totalInvestment: {
                        proMoneyBidding:5000.00,
                        proMoneyInBack:2000.00,
                        proMoneyBacked:3000.00,
                        proMoneyOut:1000.00,
                    },  //投资总额
                    accumulatedIncome: {
                        earnMoneyInBack:5000.00,
                        earnMoneyBacked:5000.00,
                        earnMoneyOut:2000.00,
                    },  //累计收益
                },
                code: "0",
                message: "SUCCESS",
            };
            let {totalInvestment,accumulatedIncome}=mockDate.data;
            this.setState({
                charts:{
                    totalInvestment:{
                        data:[
                            {name:'逾期未还',value:totalInvestment.proMoneyBidding,instruction:`5期 ${addCommas(totalInvestment.proMoneyBidding)}元` },
                            {name:'待还款',value:totalInvestment.proMoneyInBack,instruction:`5期 ${addCommas(totalInvestment.proMoneyInBack)}元`},
                            {name:'逾期已还',value:totalInvestment.proMoneyBacked,instruction:`5期 ${addCommas(totalInvestment.proMoneyBacked)}元`},
                            {name:'已提前还款',value:totalInvestment.proMoneyOut,instruction:`5期 ${addCommas(totalInvestment.proMoneyOut)}元`},
                            {name:'已正常还款',value:totalInvestment.proMoneyOut,instruction:`5期 ${addCommas(totalInvestment.proMoneyOut)}元`}
                        ]
                    },
                    accumulatedIncome:{
                        data:[
                            {name:'未还本金',value:1000,instruction:`${addCommas(1000)}元` },
                            {name:'未还利息',value:1000,instruction:`${addCommas(1000)}元` },
                            {name:'未还罚息',value:1000,instruction:`${addCommas(1000)}元` },
                            {name:'未还罚金',value:1000,instruction:`${addCommas(1000)}元` },
                        ]
                    },
                    accumulatedIncome2:{
                        data:[
                            {name:'已还本金',value:20000,instruction:`${addCommas(20000)}元` },
                            {name:'已还利息',value:1000.85,instruction:`${addCommas(1000.85)}元` },
                            {name:'已还罚息',value:0,instruction:`${addCommas(0)}元` },
                            {name:'已还罚金',value:0,instruction:`${addCommas(0)}元` },
                        ]
                    },
                }
            },()=>{
            });
        }
    }
    componentDidMount () {
        this.loadChartsData();
        this.loadData(1,10,{status:1});

    }
    toggleModal=(modal,visile,id)=>{
        if(visile){
            this.setState({
                [modal]: true,
                currentId:id,
            });
        }else{
            this.setState({
                [modal]: false,
                currentId:'',
            });
        }
    };
    render(){
        const {list,pageNum,total,pageSize}=this.state.dataList;
        const totalPage=Math.ceil(total/pageSize);
        return(
            <div className="member__main" id="area">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="还款统计" className="chart">
                            <Tab>
                                <div name="还款总额">
                                    {
                                        JSON.stringify(this.state.charts.totalInvestment) != "{}"?
                                            <PieChart
                                                data={this.state.charts.totalInvestment.data}
                                                style={{height: '300px', width: '930px'}}
                                                totalTitle="还款总额"
                                                >
                                            </PieChart>
                                            :''
                                    }
                                </div>
                                <div name="未还金额">
                                    {
                                        JSON.stringify(this.state.charts.accumulatedIncome) != "{}"?
                                            <PieChart
                                                data={this.state.charts.accumulatedIncome.data}
                                                style={{height: '300px', width: '930px'}}
                                                totalTitle="未还金额"
                                                >
                                            </PieChart>
                                            :''
                                    }
                                </div>
                                <div name="已还金额">
                                    {
                                        JSON.stringify(this.state.charts.accumulatedIncome2) != "{}"?
                                            <PieChart
                                                data={this.state.charts.accumulatedIncome2.data}
                                                style={{height: '300px', width: '930px'}}
                                                totalTitle="已还金额"
                                                >
                                            </PieChart>
                                            :''
                                    }
                                </div>
                            </Tab>
                        </div>
                    </Tab>
                </div>
                <div className="member__cbox repayRecord">
                    <Tab>
                        <div name="还款记录">
                            <div className="filter">
                                <div className="filter__outer">
                                    <div className="filter__inner">
                                        <div className="filter__row">
                                            <div className="filter__cell">
                                                <h5>项目名称:</h5>
                                            </div>
                                            <div className="filter__cell">
                                                <Select
                                                    defaultValue="0"
                                                    style={{ width: 210 }}
                                                    onChange={this.handleChange}
                                                    getPopupContainer={() => document.getElementById('area')}
                                                >
                                                    <Option value="0">全部</Option>
                                                    <Option value="1">汇车贷-HCD201704170001</Option>
                                                    <Option value="2">汇车贷-HCD201704170002</Option>
                                                </Select>
                                            </div>
                                            <div className="filter__cell">
                                                <h5>应还日期:</h5>
                                            </div>
                                            <div className="filter__cell">
                                                <DatePicker
                                                    format={ 'YYYY-MM-DD'}
                                                    placeholder="开始日期"
                                                    onChange={ this.handleDateStartChange }
                                                    getCalendarContainer={() => document.getElementById('area')}
                                                />
                                            </div>
                                            <div className="filter__cell">
                                                <h5>-</h5>
                                            </div>
                                            <div className="filter__cell">
                                                <DatePicker
                                                    /*defaultValue={moment(`${getNowFormatDate('-')}`, dateFormat)}*/
                                                    format={ 'YYYY-MM-DD'}
                                                    placeholder="结束日期"
                                                    onChange={ this.handleDateEndChange}
                                                    getCalendarContainer={() => document.getElementById('area')}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {
                                JSON.stringify(this.state.dataList) == "{}"? <div>连接错误,请稍后再试</div>
                                    :
                                    list.length>0 ?
                                        <div className="table__wrapper">
                                            <table className={`tableList table${this.state.status}`}>
                                                <thead>
                                                <tr>
                                                    <th>项目名称</th>
                                                    <th>应还日期</th>
                                                    <th>还款期数</th>
                                                    <th>应还本金(元)</th>
                                                    <th>应还利息(元)</th>
                                                    <th>应还罚息(元)</th>
                                                    <th>已还罚金(元)</th>
                                                    <th>还款总额(元)</th>
                                                    <th>还款状态</th>
                                                    <th>操作</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    list.map((item, rowIndex) => (
                                                        <tr key={`row-${rowIndex}`}>
                                                            <td>
                                                                <p><a href='${item.proId}'>{item.col1}</a>{/*项目名称*/}</p>
                                                            </td>
                                                            <td>{item.col2}{/*应还日期*/}</td>
                                                            <td>{item.col3}{/*还款期数*/}</td>
                                                            <td>{item.col4}{/*应还本金*/}</td>
                                                            <td>{item.col5}{/*应还利息*/}</td>
                                                            <td>{item.col6}{/*应还罚息*/}</td>
                                                            <td>{item.col7}{/*已还罚金*/}</td>
                                                            <td>{item.col8}{/*还款总额*/}</td>
                                                            <td>{item.col9}{/*还款状态*/}</td>
                                                            <td>
                                                                {
                                                                    (item.proStatus==4)? '还款':''
                                                                }
                                                                {
                                                                    (item.proStatus==7||item.proStatus==6)? <a onClick={() => this.toggleModal(`modalRepayment`,true,item.proId)}>还款</a>:''
                                                                }
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                                </tbody>
                                            </table>
                                            <Pagination config = {
                                                {
                                                    currentPage:1,
                                                    pageSize:10,
                                                    totalPage:2,
                                                    filter:this.state.status,
                                                    paging:(obj)=>{
                                                        this.loadData(obj.currentPage,obj.pageCount,{re_status:obj.filter});
                                                    }
                                                }
                                            } ></Pagination>
                                        </div>
                                        : <div>暂无记录</div>
                            }
                        </div>
                    </Tab>
                </div>
                <Modal
                    title="还款"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.modalRepayment}
                    width="520px"
                    footer={null}
                    onCancel={() => this.toggleModal(`modalRepayment`,false,'')}
                >
                    {this.state.modalRepayment===true?
                        <ModalRepayment proId={this.state.currentId} />:''
                    }
                </Modal>
            </div>

        )

    }
}