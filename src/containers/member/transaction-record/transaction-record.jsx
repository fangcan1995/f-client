import React,{Component} from 'react';
import Crumbs from '../../../components/crumbs/crumbs';
import Tab from '../../../components/tab/tab';
import Pagination from '../../../components/pagination/pagination';
import {Loading,NoRecord} from '../../../components/bbhAlert/bbhAlert';
import { Select,DatePicker } from 'antd';
import { connect } from 'react-redux';
import {transactionRecordAc} from "../../../actions/transaction-record";
import {addCommas, toMoney} from "../../../utils/famatData";

const { RangePicker } = DatePicker;
const Option = Select.Option;

class TransactionRecord extends Component{
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
        //清空上一次请求的状态
        let filter_new=Object.assign({},filter);
        this.props.dispatch(transactionRecordAc.modifyState({filter:filter_new,data:``}));

        dispatch(transactionRecordAc.getData(filter_new));    //获取数据
    }
    typeChange(value) {
        let {transactionRecord,dispatch} = this.props;
        let {filter}=transactionRecord;
        let filter_new=Object.assign({},filter);
        filter_new.payType=value;
        filter_new.pageNum=1;
        this.props.dispatch(transactionRecordAc.modifyState({filter:filter_new,data:``}));
        dispatch(transactionRecordAc.getData(filter_new));    //获取数据
    }
    statusChange(value) {
        let {transactionRecord,dispatch} = this.props;
        let {filter}=transactionRecord;
        let filter_new=Object.assign({},filter);
        filter_new.transState=value;
        filter_new.pageNum=1;
        this.props.dispatch(transactionRecordAc.modifyState({filter:filter_new,data:``}));
        dispatch(transactionRecordAc.getData(filter_new));    //获取数据
    }
    dateChange(value,dateString) {
        let {transactionRecord,dispatch} = this.props;
        let {filter}=transactionRecord;
        let filter_new=Object.assign({},filter);
        filter_new.startTime=dateString[0];
        filter_new.endTime=dateString[1];
        this.props.dispatch(transactionRecordAc.modifyState({filter:filter_new,data:``}));
        filter_new.startTime=dateString[0]+' 00:00:00';
        filter_new.endTime=dateString[1]+' 23:59:59';
        filter_new.pageNum=1;
        dispatch(transactionRecordAc.getData(filter_new));    //获取数据
    }
    render(){

        let {transactionRecord,dispatch} = this.props;
        let {filter,data,isFetching}=transactionRecord;
        console.log('获取的数据');
        console.log(data);
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
                                                        <Option value="0">充值</Option>
                                                        <Option value="1">提现</Option>
                                                        <Option value="2">投资</Option>
                                                        <Option value="3">资金划转</Option>
                                                        <Option value="4">还款</Option>
                                                        <Option value="5">冻结</Option>
                                                        <Option value="6">商户转账</Option>
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
                                                        <Option value="2">失败</Option>
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
                                        data.total>0 ?
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
                                                        data.list.map((item, rowIndex) => (
                                                            <tr key={`row-${rowIndex}`}>
                                                                <td>{item.createTime}</td>
                                                                <td>{item.payType}</td>
                                                                <td>{toMoney(item.transAmt)}</td>
                                                                <td>{item.transState}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                <Pagination config = {
                                                    {
                                                        currentPage:data.pageNum,
                                                        pageSize:data.pageSize,
                                                        totalPage:data.pages,
                                                        paging: (obj) => {
                                                            filter.pageNum=obj.currentPage;
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