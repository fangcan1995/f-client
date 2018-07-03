import React from 'react';
import PropTypes from 'prop-types';
import PieChart from '../../../../components/charts/pie'
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import Pagination from '../../../../components/pagination/pagination';
import {addCommas} from '../../../../utils/cost';
import { Select,DatePicker } from 'antd';
import BbhModal from "../../../../components/modal/bbh_modal";
import { connect } from 'react-redux';
import  {repaymentsAc}  from '../../../../actions/member-loans';
import {Loading,NoRecord} from '../../../../components/bbhAlert/bbhAlert';
import './repaymentPlans.less';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {transactionRecordAc} from "../../../../actions/member";
import {modal_config} from "../../../../utils/modal_config";

moment.locale('zh-cn');

const Option = Select.Option;
const { RangePicker } = DatePicker;

class RepaymentPlans extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            bbhModal:false,
            currentModule:``,
            currentId:``,
            key:Math.random(),
        }
        this.selectProject = this.selectProject.bind(this);
        this.dateChange = this.dateChange.bind(this);
    }
    componentDidMount () {
        window.scrollTo(0,0);
        this.props.dispatch(repaymentsAc.stateRepaymentPlanModify(
            {
                myList:``,
                filter:{
                    projectId:'',
                    dateStart:'',
                    dateEnd:'',
                },
            }
            ));//清空数据
        this.props.dispatch(repaymentsAc.getPie());
        this.props.dispatch(repaymentsAc.getList());
        this.props.dispatch(repaymentsAc.getProList());
    }
    //按项目查询
    selectProject(e) {
        let {filter}=this.props.memberLoans.repaymentPlans;
        let filter_new=Object.assign({},filter);
        if(e!=''){
            filter_new.projectId=e
        };
        this.props.dispatch(repaymentsAc.stateRepaymentPlanModify({filter:filter_new,myList:``}));
        filter_new.pageNum=1;
        this.props.dispatch(repaymentsAc.getList(filter_new));    //获取数据
    }
    dateChange(value,dateString) {
        let {filter} = this.props.memberLoans.repaymentPlans;
        let filter_new=Object.assign({},filter);
        filter_new.dateStart=dateString[0];
        filter_new.dateEnd=dateString[1];
        this.props.dispatch(repaymentsAc.stateRepaymentPlanModify({filter:filter_new,myList:``}));
        filter_new.pageNum=1;
        this.props.dispatch(repaymentsAc.getList(filter_new));    //获取数据
    }
    //模态框开启关闭
    toggleModal=(modal,visile,id)=>{
        if(visile){
            this.setState({
                bbhModal:true,
                currentModule: modal,
                currentId:id

            });
        }else{
            this.setState({
                bbhModal:false,
                currentModule: ``,
                currentId: ``,
                key:Math.random()
            });
        }
    };
    closeModal(status){
        const {investInfo,dispatch}=this.props;
        let {filter}=this.props.memberLoans.repaymentPlans;
        dispatch(repaymentsAc.stateRepaymentPlanModify({filter:filter,myList:``,postResult:``}));
        this.toggleModal('bbhModal',false);
        dispatch(repaymentsAc.getPie());
        dispatch(repaymentsAc.getList(filter));
    }
    render(){
        let {dispatch}=this.props;
        let {repaymentPlans,isFetching}=this.props.memberLoans;

        let {myList,charts,modalRepayment,currentId,proList,projectId,dateStart,dateEnd,filter}=repaymentPlans;
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
                                        <PieChart
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
                <div className="member__cbox repayRecord" id='mask'>
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
                                                    <td><p><a href={`/invest-detail/${l.projectId}`} target="_blank">{l.name}</a></p></td>
                                                    <td>{l.shdRpmtDate ? moment(l.shdRpmtDate).format('YYYY-MM-DD') : ''}{/*应还日期*/}</td>
                                                    <td>{l.rpmtIssue}{/*还款期数*/}</td>
                                                    <td>{l.rpmtCapital}{/*应还本金*/}</td>
                                                    <td>{l.rpmtIint}{/*应还利息*/}</td>
                                                    <td>{l.lateTotal}{/*应还罚息*/}</td>
                                                    <td>{l.rpmtTotal}{/*还款总额*/}</td>
                                                    <td>{l.statusName}{/*还款状态*/}</td>
                                                    <td>
                                                        {/*{
                                                            (l.proStatus==3)? <a onClick={() => this.toggleModal('ModalRepayment', true, l.rpmtplanId)}>还款</a>:''
                                                        }*/}
                                                        {
                                                            (l.proStatus==4||l.proStatus==5)? <a onClick={() => this.toggleModal( 'ModalRepayment',true, l.rpmtplanId)}>还款</a>:''
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
                                                    filter.pageNum=obj.currentPage;
                                                    dispatch(repaymentsAc.stateRepaymentPlanModify({filter:filter,myList:''}));  //初始化页面
                                                    dispatch(repaymentsAc.getList(filter));
                                                }
                                            }
                                        } ></Pagination>
                                    </div>
                                    :<NoRecord isShow={true} />
                            }
                        </div>
                    </Tab>
                </div>

                {this.state.currentModule!=``?
                    <BbhModal
                        config={modal_config[this.state.currentModule]}
                        visible={this.state.bbhModal}
                        closeFunc={()=>this.closeModal()}
                        moduleName={this.state.currentModule}
                        key={this.state.key}
                        currentId={this.state.currentId}
                    >

                    </BbhModal>
                    :``
                }
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