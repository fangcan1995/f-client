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
            projectId:e,
            dateStart:this.props.memberLoans.repaymentPlans.dateStart,
            dateEnd:this.props.memberLoans.repaymentPlans.dateEnd,
        };
        let newState={};
        newState.projectId=e;
        this.props.dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
        this.props.dispatch(memberLoansActions.getRepaymentPlanList(1,10,filter));
    }
    handleDateStartChange(date,dateString) {
        dateString=dateString+' 00:00:00';
        let filter={
            projectId:this.props.memberLoans.repaymentPlans.projectId,
            dateStart:dateString,
            dateEnd:this.props.memberLoans.repaymentPlans.dateEnd,
        };
        let newState={};
        newState.dateStart=dateString;
        this.props.dispatch(memberLoansActions.stateRepaymentPlanModify(newState));
        this.props.dispatch(memberLoansActions.getRepaymentPlanList(1,10,filter));
    }
    handleDateEndChange(date,dateString) {
        dateString=dateString+' 23:59:59';
        let filter={
            projectId:this.props.memberLoans.repaymentPlans.projectId,
            dateStart:this.props.memberLoans.repaymentPlans.dateStart,
            dateEnd:dateString,
        };
        let newState={};
        newState.dateEnd=dateString;
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
                                                    defaultValue=""
                                                    style={{ width: 210 }}
                                                    onChange={this.handleChange}
                                                    getPopupContainer={() => document.getElementById('area')}
                                                >
                                                    <Option value="">全部</Option>
                                                    {
                                                        proList.map((l, i) => (
                                                        <Option value={`${l.id}`} key={`row-${i}`}>{l.name}</Option>
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
                            {(myList.data == '') ? (<p>{myList.message}</p>)
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
                                                <th>还款总额(元)</th>
                                                <th>还款状态</th>
                                                <th>操作</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {myList.data.list.map((l, i) => (
                                                <tr key={`row-${i}`}>
                                                    <td><p><a href={`/invest-list/${l.projectId}`} target="_blank">{l.name}</a></p></td>
                                                    <td>{moment(l.shdRpmtDate).format('YYYY-MM-DD')}{/*应还日期*/}</td>
                                                    <td>{l.rpmtIssue}{/*还款期数*/}</td>
                                                    <td>{l.rpmtCapital}{/*应还本金*/}</td>
                                                    <td>{l.rpmtIint}{/*应还利息*/}</td>
                                                    <td>{l.lateTotal}{/*应还罚息*/}</td>
                                                    <td>{l.rpmtTotal}{/*还款总额*/}</td>
                                                    <td>{l.statusName}{/*还款状态*/}</td>
                                                    <td>
                                                        {
                                                            (l.proStatus==3)? '还款':''
                                                        }
                                                        {
                                                            (l.proStatus==4||l.proStatus==5)? <a onClick={() => dispatch(memberLoansActions.toggleModal('modalRepayment', true, l.projectId))}>还款</a>:''
                                                        }

                                                    </td>
                                                </tr>
                                            ))
                                            }
                                            </tbody>
                                        </table>

                                        <Pagination config = {
                                            {
                                                currentPage:myList.data.pageNum,
                                                pageSize:myList.data.pageSize,
                                                totalPage:Math.ceil(myList.data.total/myList.data.pageSize),
                                                paging:(obj)=>{
                                                    dispatch(memberLoansActions.getRepaymentPlanList(obj.currentPage,obj.pageCount,{}));
                                                }
                                            }
                                        } ></Pagination>
                                    </div>
                                    :<p>暂无记录</p>
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