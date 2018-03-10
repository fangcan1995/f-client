import React from 'react';
import PropTypes from 'prop-types';
import PieChart from '../../../../components/charts/pie'
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import Pagination from '../../../../components/pagination/pagination';
import {addCommas} from '../../../../assets/js/cost';
import { Modal,Select,DatePicker } from 'antd';
import ModalRepayment from './modalRepayment';
import { connect } from 'react-redux';
import  memberLoansActions  from '../../../../actions/member-loans';
import './repaymentPlans.less';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Option = Select.Option;

class RepaymentPlans extends React.Component{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateStartChange = this.handleDateStartChange.bind(this);
        this.handleDateEndChange = this.handleDateEndChange.bind(this);
    }
    componentDidMount () {
        this.props.dispatch(memberLoansActions.getRepaymentPlanData(1));
    }
    handleChange(e) {
        let filter={
            pid:e,
            DateStart:this.props.memberLoans.repaymentPlans.DateStart,
            DateEnd:this.props.memberLoans.repaymentPlans.DateEnd,
        };
        let newState={};
        newState.pid=e;
        this.props.dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
        this.props.dispatch(memberLoansActions.getRepaymentPlanList(1,10,filter));
    }
    handleDateStartChange(date,dateString) {
        dateString=dateString+' 00:00:00';
        let filter={
            pid:this.props.memberLoans.repaymentPlans.pid,
            DateStart:dateString,
            DateEnd:this.props.memberLoans.repaymentPlans.DateEnd,
        };
        let newState={};
        newState.DateStart=dateString;
        this.props.dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
        this.props.dispatch(memberLoansActions.getRepaymentPlanList(1,10,filter));
    }
    handleDateEndChange(date,dateString) {
        dateString=dateString+' 23:59:59';
        let filter={
            pid:this.props.memberLoans.repaymentPlans.pid,
            DateStart:this.props.memberLoans.repaymentPlans.DateStart,
            DateEnd:dateString,
        };
        let newState={};
        newState.DateEnd=dateString;
        this.props.dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
        this.props.dispatch(memberLoansActions.getRepaymentPlanList(1,10,filter));
    }
    repaymentCallback(){
        let {dispatch}=this.props;
        let newState= {postResult:0};
        dispatch(memberLoansActions.stateModify(newState));
        dispatch(memberLoansActions.toggleModal('modalRepayment',false,''));
        this.props.dispatch(memberLoansActions.getRepaymentPlanData(1));
    }
    render(){
        console.log('-------myLoans--------');
        console.log(this.props);
        let {dispatch}=this.props;
        let {repaymentPlans}=this.props.memberLoans;
        let {myList,charts,modalRepayment,currentId,proList}=repaymentPlans;
        return(
            <div className="member__main" id="area">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="还款统计" className="chart">
                            <Tab>
                                <div name="还款总额">
                                    {(JSON.stringify(charts.data)=='{}')?(<p>{charts.message}</p>)
                                        :(<PieChart
                                            data={charts.data.repayments.data}
                                            style={{height: '300px', width: '930px'}}
                                            totalTitle="借款总额"
                                        >
                                        </PieChart>)
                                    }
                                </div>
                                <div name="未还金额">
                                    {(JSON.stringify(charts.data)=='{}')?(<p>{charts.message}</p>)
                                        :(<PieChart
                                            data={charts.data.todoDto.data}
                                            style={{height: '300px', width: '930px'}}
                                            totalTitle="累计利息"
                                        >
                                        </PieChart>)
                                    }
                                </div>
                                <div name="已还金额">
                                    {(JSON.stringify(charts.data)=='{}')?(<p>{charts.message}</p>)
                                        :(<PieChart
                                            data={charts.data.doneDto.data}
                                            style={{height: '300px', width: '930px'}}
                                            totalTitle="累计利息"
                                        >
                                        </PieChart>)
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
                                                    {
                                                        proList.map((l, i) => (
                                                        <Option value={`${l.proId}`} key={`row-${i}`}>{l.longText}</Option>
                                                        ))
                                                    }
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
                            {(JSON.stringify(myList.data) == '{}') ? (<p>{myList.message}</p>)
                                    : (myList.data.total > 0) ?
                                    <div className="table__wrapper">
                                        <table className={`tableList`}>
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
                                            {myList.data.list.map((l, i) => (
                                                <tr key={`row-${i}`}>
                                                    <td><p><a href="#">{l.longText}</a></p></td>
                                                    <td>{moment(l.dateTime).format('YYYY-MM-DD')}{/*应还日期*/}</td>
                                                    <td>{l.num}{/*还款期数*/}</td>
                                                    <td>{l.money}{/*应还本金*/}</td>
                                                    <td>{l.money}{/*应还利息*/}</td>
                                                    <td>{l.money}{/*应还罚息*/}</td>
                                                    <td>{l.money}{/*已还罚金*/}</td>

                                                    <td>{l.money}{/*还款总额*/}</td>
                                                    <td>{l.statusName}{/*还款状态*/}</td>
                                                    <td>
                                                        {
                                                            (l.proStatus==4)? '还款':''
                                                        }
                                                        {
                                                            (l.proStatus==7||l.proStatus==6)? <a onClick={() => dispatch(memberLoansActions.toggleModal('modalRepayment', true, l.proId))}>还款</a>:''
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
                                                //filter:this.state.status,
                                                paging:(obj)=>{
                                                    //this.loadData(obj.currentPage,obj.pageCount,{re_status:obj.filter});
                                                }
                                            }
                                        } ></Pagination>
                                    </div>
                                    :'暂无记录'
                            }
                        </div>
                    </Tab>
                </div>
                <Modal
                    title="还款"
                    wrapClassName="vertical-center-modal"
                    visible={modalRepayment}
                    width="520px"
                    footer={null}
                    onCancel={() => this.repaymentCallback()}
                >
                    {modalRepayment===true?
                        <ModalRepayment info={
                            {
                                currentId:currentId,
                                callback:(obj)=>{
                                    this.repaymentCallback();
                                }
                            }
                        }

                        />:''
                    }
                </Modal>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { auth,memberLoans } = state.toJS();
    return {
        auth,
        memberLoans
    };
}

export default connect(mapStateToProps)(RepaymentPlans);