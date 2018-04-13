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
import  {repaymentsAc}  from '../../../../actions/member-loans';
import {Loading,NoRecord} from '../../../../components/bbhAlert/bbhAlert';
import './repaymentPlans.less';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Option = Select.Option;

class RepaymentPlans extends React.Component{
    constructor(props) {
        super(props);
        this.state={
        }
        this.selectProject = this.selectProject.bind(this);
        this.handleDateStartChange = this.handleDateStartChange.bind(this);
        this.handleDateEndChange = this.handleDateEndChange.bind(this);
    }
    componentDidMount () {
        window.scrollTo(0,0);
        this.props.dispatch(repaymentsAc.getPie());
        this.props.dispatch(repaymentsAc.getList());
        this.props.dispatch(repaymentsAc.getProList());
    }
    //按项目查询
    selectProject(e) {
        let filter={};
        if(e!=''){
            filter.projectId=e
        };
        let {dateStart,dateEnd}=this.props.memberLoans.repaymentPlans;
        if(dateStart!=='') filter.dateStart=dateStart;
        if(dateEnd!=='') filter.dateEnd=dateEnd;
        this.props.dispatch(repaymentsAc.stateRepaymentPlanModify({myList:``,projectId:e}));
        this.props.dispatch(repaymentsAc.getList(filter));
    }
    handleDateStartChange(date,dateString) {
        let filter={};
        if(dateString!=''){
            dateString=dateString+' 00:00:00';
            filter.dateStart=dateString
        };
        let {projectId,dateEnd}=this.props.memberLoans.repaymentPlans;
        if(projectId!=='') filter.projectId=projectId;
        if(dateEnd!=='') filter.dateEnd=dateEnd;

        this.props.dispatch(repaymentsAc.stateRepaymentPlanModify({myList:``,dateStart:dateString}));
        this.props.dispatch(repaymentsAc.getList(filter));
    }
    handleDateEndChange(date,dateString) {
        let filter={};
        if(dateString!=''){
            dateString=dateString+' 23:59:59';
            filter.dateEnd=dateString
        };
        let {projectId,dateStart}=this.props.memberLoans.repaymentPlans;
        if(projectId!=='') filter.projectId=projectId;
        if(dateStart!=='') filter.dateStart=dateStart;
        this.props.dispatch(repaymentsAc.stateRepaymentPlanModify({myList:``,dateEnd:dateString}));
        this.props.dispatch(repaymentsAc.getList(filter));
    }
    toggleModal(visile,id) {
        let {dispatch}=this.props;
        if(visile){
            dispatch(repaymentsAc.stateRepaymentPlanModify({modalRepayment:true,currentId:id}));
        }else{
            dispatch(repaymentsAc.stateRepaymentPlanModify({modalRepayment:false,currentId:``}));
        }
    }
    repaymentCallback(){
        let {dispatch}=this.props;
        //dispatch(repaymentsAc.stateRepaymentPlanModify({postResult:0}));
        this.toggleModal(false,'');
        this.props.dispatch(repaymentsAc.getPie());
        this.props.dispatch(repaymentsAc.getList());

    }
    render(){
        let {dispatch}=this.props;
        let {repaymentPlans,isFetching}=this.props.memberLoans;
        let {myList,charts,modalRepayment,currentId,proList,projectId,dateStart,dateEnd}=repaymentPlans;
        console.log('-------还款数据--------');
        console.log(myList);
        return(
            <div className="member__main" id="area">
                <Crumbs/>
                {(charts==='')?``
                :<div className="member__cbox">
                    <Tab>
                        <div name="还款统计" className="chart">
                            <Tab>
                                <div name="还款总额">

                                        <PieChart
                                            data={charts.repayments.data}
                                            style={{height: '300px', width: '930px'}}
                                            totalTitle="借款总额"
                                        >
                                        </PieChart>
                                </div>
                                <div name="未还金额">
                                    <PieChart
                                            data={charts.todoDto.data}
                                            style={{height: '300px', width: '930px'}}
                                            totalTitle="累计利息"
                                        >
                                        </PieChart>

                                </div>
                                <div name="已还金额">
                                        (<PieChart
                                            data={charts.doneDto.data}
                                            style={{height: '300px', width: '930px'}}
                                            totalTitle="累计利息"
                                        >
                                        </PieChart>
                                </div>
                            </Tab>
                        </div>
                    </Tab>
                </div>
                }
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
                                                    onChange={this.selectProject}
                                                    getPopupContainer={() => document.getElementById('area')}
                                                >
                                                    <Option value="">全部</Option>
                                                    {
                                                        (proList==='')?``
                                                            :proList.map((l, i) => (
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
                            {(myList === '') ? <Loading isShow={isFetching} />
                                    : (myList.total > 0) ?
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
                                            {myList.list.map((l, i) => (
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
                                                            (l.proStatus==4||l.proStatus==5)? <a onClick={() => this.toggleModal( true, l.projectId)}>还款</a>:''
                                                        }

                                                    </td>
                                                </tr>
                                            ))
                                            }
                                            </tbody>
                                        </table>

                                        <Pagination config = {
                                            {
                                                currentPage:myList.pageNum,
                                                pageSize:myList.pageSize,
                                                totalPage:myList.pages,
                                                paging:(obj)=>{
                                                    dispatch(repaymentsAc.stateRepaymentPlanModify({myList:``}));
                                                    dispatch(repaymentsAc.getList(
                                                        {
                                                            pageNum:obj.currentPage,
                                                            pageSize:obj.pageCount,
                                                            projectId:projectId,
                                                            dateStart:dateStart,
                                                            dateEnd:dateEnd
                                                        }
                                                    ));
                                                }
                                            }
                                        } ></Pagination>
                                    </div>
                                    :<NoRecord isShow={true} />
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