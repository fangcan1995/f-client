import React from 'react';
import PropTypes from 'prop-types';
import PieChart from '../../../../components/charts/pie';
import {addCommas} from '../../../../assets/js/cost';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import Pagination from '../../../../components/pagination/pagination';
import { Modal } from 'antd';
import ModalRepaymentApp from './modalRepaymentApp';
import { connect } from 'react-redux';
import  {memberLoansAc}  from '../../../../actions/member-loans';
import {Loading,NoRecord} from '../../../../components/bbhAlert/bbhAlert';
import moment from "moment";
import './my-loan.less';
class MyLoans extends React.Component {
    componentDidMount () {
        this.props.dispatch(memberLoansAc.stateModify({status:1,myList:``}));
        this.props.dispatch(memberLoansAc.getPie());
        this.props.dispatch(memberLoansAc.getList({status:1}));
    }
    repaymentCallback(){
        let {dispatch}=this.props;
        dispatch(memberLoansAc.stateModify({postResult:''}));
        this.toggleModal(false,'');
        dispatch(memberLoansAc.filter(3));
    }
    filter(pram){
        this.props.dispatch(memberLoansAc.stateModify({status:pram,myList:``}));
        this.props.dispatch(memberLoansAc.getList({status:pram}));
    }
    toggleModal(visile,id) {
        let {dispatch}=this.props;
        if(visile){
            dispatch(memberLoansAc.stateModify({modalRepaymentApp:true,currentId:id}));
        }else{
            dispatch(memberLoansAc.stateModify({modalRepaymentApp:false,currentId:``}));
        }
    }
    render(){
        console.log('-------myLoans--------');
        console.log(this.props);
        let {dispatch}=this.props;
        let {myLoans,isFetching}=this.props.memberLoans;
        let {myList,charts,status,modalRepaymentApp,currentId}=myLoans;
        console.log('myList');
        console.log(myList);
        let tHead=[];
        tHead[0]=<tr><th>项目名称</th><th>项目类型</th><th>借款金额(元)</th><th>借款年利率(%)</th><th>借款期限</th><th>还款方式</th><th>申请日期</th><th>状态</th></tr>;
        tHead[1]=<tr><th>项目名称</th><th>借款总额(元)</th><th>借款期限</th><th>发布日期</th><th>当前投资金额(元)</th><th>投资进度(%)</th><th>募集结束日期</th><th>状态</th></tr>;
        tHead[2]=<tr><th>项目名称</th><th>借款总额(元)</th><th>借款期限</th><th>放款日期</th><th>下期还款日期</th><th>下期还款金额(元)</th><th>操作</th></tr>;
        tHead[3]=<tr><th>项目名称</th><th>借款金额(元)</th><th>借款期限</th><th>放款日期</th><th>还款本金(元)</th><th>还款利息(元)</th><th>逾期罚金(元)</th><th>逾期罚息(元)</th><th>结清日期</th><th>操作</th></tr>;
        return(
            <div className="member__main">
                <Crumbs/>
                {(charts==='')?``
                    :<div className="member__cbox">
                        <Tab>
                            <div name="我的借款" className="chart">
                                <Tab>
                                    <div name="借款总额">
                                        <PieChart
                                            data={charts.totalLoan.data}
                                            style={{height: '300px', width: '930px'}}
                                            totalTitle="借款总额"
                                        >
                                        </PieChart>
                                    </div>
                                    <div name="累计利息">
                                        <PieChart
                                            data={charts.accumulatedInterest.data}
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
                <div className="member__cbox" style={{ padding:'20px 30px' }}>
                    <div className="filter">
                        <div className="filter__outer">
                            <div className="filter__inner">
                                <div className="filter__row">
                                    <div className="filter__cell">
                                        <h5>类型:</h5>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(status===1)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { this.filter(1) } }>申请中</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(status===2)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { this.filter(2) } }>招标中</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(status===3)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { this.filter(3) } }>还款中</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(status===4)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { this.filter(4) } }>已结清</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {(myList==='') ? <Loading isShow={isFetching} />
                        :
                        <div className="table__wrapper">
                            {(myList.total > 0) ? (
                                <div>
                                    <table className={`tableList table${status}`}>
                                        <thead>
                                        {tHead[status - 1]}
                                        </thead>
                                        <tbody>
                                        {
                                            myList.list.map((l, i) => (
                                                    (status === 1) ? (
                                                        <tr key={`row-${i}`}>
                                                            <td>--</td>
                                                            <td>{l.name}</td>
                                                            <td>{l.money}</td>
                                                            <td>{l.annualRate}%</td>
                                                            <td>{l.loanExpiry}个月</td>
                                                            <td>{l.refundWayName}</td>
                                                            <td>{moment(l.applyTime).format('YYYY-MM-DD')}</td>
                                                            <td>申请中</td>
                                                        </tr>
                                                    ) : ((status === 2) ? (
                                                        <tr key={`row-${i}`}>
                                                            <td><p><a href={`/invest-list/${l.projectId}`} target="_blank">{l.name}</a></p></td>
                                                            <td>{l.money}</td>
                                                            <td>{l.loanExpiry}个月</td>
                                                            <td>{moment(l.dateTime).format('YYYY-MM-DD')}</td>
                                                            <td>{l.moneyEnd}</td>
                                                            <td>{l.investProgress}%</td>
                                                            <td>{moment(l.endDate).format('YYYY-MM-DD')}</td>
                                                            <td>招标中</td>
                                                        </tr>
                                                    ) : ((status === 3) ? (
                                                        <tr key={`row-${i}`}>
                                                            <td><p><a href={`/invest-list/${l.projectId}`} target="_blank">{l.name}</a></p></td>
                                                            <td>{l.money}</td>
                                                            <td>{l.loanExpiry}个月</td>
                                                            <td>{moment(l.transferTtime).format('YYYY-MM-DD')}</td>
                                                            <td>{moment(l.shdRpmtDate).format('YYYY-MM-DD')}</td>
                                                            <td>{l.shdRpmtMoney}</td>
                                                            <td>
                                                                {
                                                                    l.refundStatus=='0'?('提前还款申请中')
                                                                        :(
                                                                            <a onClick={() => this.toggleModal(true,l.projectId)}>提前还款</a>
                                                                        )
                                                                }
                                                                <a href="">借款合同</a>
                                                            </td>
                                                        </tr>
                                                    ) : ((status === 4) ? (
                                                        <tr key={`row-${i}`}>
                                                            <td><p><a href={`/invest-list/${l.projectId}`} target="_blank">{l.name}</a></p></td>
                                                            <td>{l.money}</td>
                                                            <td>{l.loanExpiry}个月</td>
                                                            <td>{moment(l.transferTtime).format('YYYY-MM-DD')}</td>
                                                            <td>{l.rpmtCapital}</td>
                                                            <td>{l.rpmtIint}</td>
                                                            <td>{l.lateFine}</td>
                                                            <td>{l.lateIint}</td>
                                                            <td>{moment(l.settleTime).format('YYYY-MM-DD')}</td>
                                                            <td><a href="">借款合同</a></td>
                                                        </tr>
                                                    ) : (''))))
                                                )

                                            )

                                        }
                                        </tbody>
                                    </table>
                                    <Pagination  config = {
                                        {
                                            currentPage:myList.pageNum,
                                            pageSize:myList.pageSize,
                                            totalPage:myList.pages,
                                            //filter:status,
                                            paging:(obj)=>{
                                                this.props.dispatch(memberLoansAc.stateModify({status:status,myList:``}));
                                                dispatch(memberLoansAc.getList(
                                                    {
                                                        pageNum:obj.currentPage,
                                                        pageSize:obj.pageCount,
                                                        status:status
                                                    }
                                                ))
                                            }
                                        }
                                    } ></Pagination>
                                </div>
                            ): <NoRecord isShow={true} />
                            }
                        </div>
                    }
                </div>
                <Modal
                    title="提前还款申请"
                    wrapClassName="vertical-center-modal"
                    visible={modalRepaymentApp}
                    width="420px"
                    footer={null}
                    onCancel={() => this.repaymentCallback()}
                >
                    {modalRepaymentApp===true?
                        <ModalRepaymentApp info={
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
export default connect(mapStateToProps)(MyLoans);