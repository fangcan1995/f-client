import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Crumbs from '../../../components/crumbs/crumbs';
import Tab from '../../../components/tab/tab';
import Pagination from '../../../components/pagination/pagination';
import  {getData}  from '../../../assets/js/getData';
import './transaction-record.less';
import { Modal,Select,DatePicker } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
class TransactionRecord extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateStartChange = this.handleDateStartChange.bind(this);
        this.handleDateEndChange = this.handleDateEndChange.bind(this);
        this.state={
            dataList:{},  //数据
            status:0,
            DateStart:'',
            DateEnd:'',
        };
    }
    handleChange(value) {
        this.setState({
            status:value
        },()=>{
            let filter={
                status:this.state.status,
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
    handleDateEndChange(date,dateString) {
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
    componentDidMount () {
        this.loadData(1,10,{status:0});
    }
    render(){
        const {list,pageNum,total,pageSize}=this.state.dataList;
        const totalPage=Math.ceil(total/pageSize);
        return (
            <div className="member__main" id="area">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>

                        <div name="交易记录">
                            <div className="tab_content">
                                <p className="info">
                                    <strong>提示：</strong>资金历史记录了您各种交易产生的支出和收入的明细，请选择事件类型和时间。
                                </p>
                                <div className="filter">
                                    <div className="filter__outer">
                                        <div className="filter__inner">
                                            <div className="filter__row">
                                                <div className="filter__cell">
                                                    <h5>交易类型:</h5>
                                                </div>
                                                <div className="filter__cell">
                                                    <Select
                                                        defaultValue="0"
                                                        style={{ width: 100 }}
                                                        onChange={this.handleChange}
                                                        getPopupContainer={() => document.getElementById('area')}
                                                    >
                                                        <option value="0">全部</option>
                                                        <option value="1">充值</option>
                                                        <option value="2">提现</option>
                                                        <option value="3">投资</option>
                                                        <option value="4">回款</option>
                                                        <option value="5">费用</option>
                                                        <option value="6">奖励</option>
                                                    </Select>
                                                </div>
                                                <div className="filter__cell">
                                                    <h5>状态:</h5>
                                                </div>
                                                <div className="filter__cell">
                                                    <Select
                                                        defaultValue="0"
                                                        style={{ width: 100 }}
                                                        onChange={this.handleChange}
                                                        getPopupContainer={() => document.getElementById('area')}
                                                    >
                                                        <option value="">全部</option>
                                                        <option value="1">成功</option>
                                                        <option value="0">失败</option>
                                                    </Select>
                                                </div>
                                                <div className="filter__cell">
                                                    <h5>交易时间:</h5>
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
                                                        <th>交易时间</th>
                                                        <th>交易类型</th>
                                                        <th>交易金额 (元)</th>
                                                        <th>状态</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        list.map((item, rowIndex) => (
                                                            <tr key={`row-${rowIndex}`}>
                                                                <td>{item.col1}</td>
                                                                <td>{item.col2}</td>
                                                                <td>{item.col3}</td>
                                                                <td>{item.col4}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                <Pagination config = {
                                                    {
                                                        currentPage:1,
                                                        pageSize:10,
                                                        totalPage:2,
                                                        filter:this.state.status,
                                                        paging:(obj)=>{
                                                            this.loadData(obj.currentPage,obj.pageCount,{status:obj.filter});
                                                        }
                                                    }
                                                } ></Pagination>
                                            </div>
                                            :''
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
    const { auth, } = state.toJS();
    return {
        auth,

    };
}

export default connect(mapStateToProps)(TransactionRecord);