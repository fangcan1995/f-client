import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Crumbs from '../../../components/crumbs/crumbs';
import Tab from '../../../components/tab/tab';
import Pagination from '../../../components/pagination/pagination';
import {Loading,NoRecord} from '../../../components/bbhAlert/bbhAlert';

import './transaction-record.less';
import { Modal,Select,DatePicker } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import {transactionRecordAc} from "../../../actions/transaction-record";
const { RangePicker } = DatePicker;
const Option = Select.Option;

class TransactionRecord extends React.Component{
    constructor(props){
        super(props);
        this.typeChange = this.typeChange.bind(this);
        this.statusChange = this.statusChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
    }
    componentDidMount () {
        window.scrollTo(0,0);  //转到页面顶部
        let {transactionRecord,dispatch} = this.props;
        let {filter}=transactionRecord;
        let filter_new=Object.assign({},filter);
        for(var name in filter_new){
            filter_new[name]=``;
        }
        dispatch(transactionRecordAc.modifyState({filter:filter_new,data:``}));
        dispatch(transactionRecordAc.getData(filter_new));    //获取数据
    }
    typeChange(value) {
        let {transactionRecord,dispatch} = this.props;
        let {filter}=transactionRecord;
        let filter_new=Object.assign({},filter);
        filter_new.trade_type=value;
        this.props.dispatch(transactionRecordAc.modifyState({filter:filter_new,data:``}));
        dispatch(transactionRecordAc.getData(filter_new));    //获取数据
    }
    statusChange(value) {
        let {transactionRecord,dispatch} = this.props;
        let {filter}=transactionRecord;
        let filter_new=Object.assign({},filter);
        filter_new.trade_result=value;
        this.props.dispatch(transactionRecordAc.modifyState({filter:filter_new,data:``}));
        dispatch(transactionRecordAc.getData(filter_new));    //获取数据
    }
    dateChange(value,dateString) {
        let {transactionRecord,dispatch} = this.props;
        let {filter}=transactionRecord;
        let filter_new=Object.assign({},filter);
        filter_new.dateStart=dateString[0];
        filter_new.dateEnd=dateString[1];
        this.props.dispatch(transactionRecordAc.modifyState({filter:filter_new,data:``}));
        filter_new.dateStart=dateString[0]+' 00:00:00';
        filter_new.dateEnd=dateString[1]+' 23:59:59';
        dispatch(transactionRecordAc.getData(filter_new));    //获取数据
    }
    render(){
        console.log('-----this.props--------');
        console.log(this.props);
        let {transactionRecord,dispatch} = this.props;
        let {filter,data,isFetching}=transactionRecord;
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
                                                        defaultValue=""
                                                        style={{ width: 100 }}
                                                        onChange={this.typeChange}
                                                        getPopupContainer={() => document.getElementById('area')}
                                                    >
                                                        <Option value="">全部</Option>
                                                        <Option value="1">充值</Option>
                                                        <Option value="2">提现</Option>
                                                        <Option value="3">投资</Option>
                                                        <Option value="4">回款</Option>
                                                        <Option value="5">费用</Option>
                                                        <Option value="6">奖励</Option>
                                                    </Select>
                                                </div>
                                                <div className="filter__cell">
                                                    <h5>状态:</h5>
                                                </div>
                                                <div className="filter__cell">
                                                    <Select
                                                        defaultValue=""
                                                        style={{ width: 100 }}
                                                        onChange={this.statusChange}
                                                        getPopupContainer={() => document.getElementById('area')}
                                                    >
                                                        <Option value="">全部</Option>
                                                        <Option value="1">成功</Option>
                                                        <Option value="0">失败</Option>
                                                    </Select>
                                                </div>
                                                <div className="filter__cell">
                                                    <h5>交易时间:</h5>
                                                </div>
                                                <div className="filter__cell">
                                                    <RangePicker
                                                        format={ 'YYYY-MM-DD'}
                                                        placeholder={['开始日期', '结束日期']}
                                                        onChange={ this.dateChange }
                                                        getCalendarContainer={() => document.getElementById('area')}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    (data === '') ? <Loading isShow={isFetching}/>
                                        :
                                        data.page.total>0 ?
                                            <div className="table__wrapper">
                                                <table className={`tableList table${filter.trade_type}`}>
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
                                                        data.page.list.map((item, rowIndex) => (
                                                            <tr key={`row-${rowIndex}`}>
                                                                <td>{item.sendTime}</td>
                                                                <td>{item.col2}</td>
                                                                <td>{item.col3}</td>
                                                                <td>{item.col4}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                <Pagination config = {
                                                    {
                                                        currentPage:data.page.pageNum,
                                                        pageSize:data.page.pageSize,
                                                        totalPage:data.page.pages,
                                                        paging: (obj) => {
                                                            filter.pageNum=obj.currentPage,
                                                                dispatch(transactionRecordAc.modifyState({filter:filter,data:''}));  //初始化页面
                                                            dispatch(transactionRecordAc.getData(filter));    //获取数据
                                                        }
                                                    }
                                                } ></Pagination>
                                            </div>
                                            :<NoRecord isShow={true} title={`暂无记录`}/>
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
    const { auth,transactionRecord } = state.toJS();
    return {
        auth,
        transactionRecord
    };
}

export default connect(mapStateToProps)(TransactionRecord);