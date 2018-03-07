import React from 'react';
import PropTypes from 'prop-types';
import PieChart from '../../../../components/charts/pie';
import {addCommas} from '../../../../assets/js/cost';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import Pagination from '../../../../components/pagination/pagination';
import { Modal } from 'antd';
import ModalPlan from './modalPlan';
import ModalTransfer from './modalTransfer';
import moment from "moment";
import { connect } from 'react-redux';
import actionsMyInvestments from './actions_myInvestments';
import './investments.less';
class MyInvestments extends React.Component{
    componentDidMount () {
        this.props.dispatch(actionsMyInvestments.getData(1));
    }
    transferCallback(){
        let {dispatch}=this.props;
        dispatch(actionsMyInvestments.refreshPostResult(0));
        dispatch(actionsMyInvestments.refreshTransferSuccess('',{}));
        dispatch(actionsMyInvestments.toggleModal('modalTransfer',false,''));
        dispatch(actionsMyInvestments.filter(2));
    }
    render(){
        let {myInvestments,dispatch} = this.props;
        console.log('-------myInvestments--------');
        console.log(myInvestments);
        let {status,myList,charts,modalPlan,modalTransfer,currentPro,currentId}=myInvestments;

        let thead=[];
        thead[0]=<tr><th>项目名称</th><th>投资总额(元)</th><th>锁定期限</th><th>还款方式</th><th>投资金额(元)</th><th>投资时间</th><th>投资进度</th></tr>;
        thead[1]=<tr><th>项目名称</th><th>投资总额(元)</th><th>锁定期限</th><th>投资金额(元)</th><th>投资时间</th><th>下期回款日期</th><th>下期回款金额(元)</th><th>操作</th></tr>;
        thead[2]=<tr><th>项目名称</th><th>投资总额(元)</th><th>锁定期限</th><th>投资金额(元)</th><th>投资时间</th><th>回款金额(元)</th><th>结清时间</th><th>操作</th></tr>;
        thead[3]=<tr><th>项目名称</th><th>原始项目名称</th><th>投资金额（元）</th><th>转让金额（元）</th><th>手续费（元）</th><th>转让申请日期</th><th>状态</th></tr>;
        thead[4]=<tr><th>项目名称</th><th>原始项目名称</th><th>转让金额（元）</th><th>当前投资额（元）</th><th>投资进度</th><th>转让日期</th><th>状态</th></tr>;
        thead[5]=<tr><th>项目名称</th><th>原始项目名称</th><th>转让金额（元）</th><th>转让成功日期</th><th>操作</th></tr>;
        return(
            <div className="member__main">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="我的投资" className="chart">
                            <Tab>
                                <div name="投资总额">
                                    {(JSON.stringify(charts.totalInvestment)=='{}')?(<p>{charts.message}</p>)
                                        :(<PieChart
                                            data={charts.totalInvestment.data}
                                            style={{height: '300px', width: '930px'}}
                                            totalTitle="投资总额"
                                        >
                                        </PieChart>)

                                    }
                                </div>
                                <div name="累计收益">
                                    {(JSON.stringify(charts.accumulatedIncome)=='{}')?(<p>{charts.message}</p>)
                                        :(<PieChart
                                            data={charts.accumulatedIncome.data}
                                            style={{height: '300px', width: '930px'}}
                                            totalTitle="投资总额"
                                        >
                                        </PieChart>)
                                    }
                                </div>
                            </Tab>
                        </div>
                    </Tab>
                </div>
                <div className="member__cbox"  style={{ padding:'20px 30px' }}>
                    <div className="filter">
                        <div className="filter__outer">
                            <div className="filter__inner">
                                <div className="filter__row">
                                    <div className="filter__cell">
                                        <h5>类型:</h5>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(status===1)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { dispatch(actionsMyInvestments.filter(1)) } }>招标中</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(status===2)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { dispatch(actionsMyInvestments.filter(2)) } }>回款中</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(status===3)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { dispatch(actionsMyInvestments.filter(3)) } }>已回款</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(status===4)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { dispatch(actionsMyInvestments.filter(4)) } }>转让申请</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(status===5)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { dispatch(actionsMyInvestments.filter(5)) } }>转让中</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(status===6)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { dispatch(actionsMyInvestments.filter(6)) } }>已转出</p>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                    {(JSON.stringify(myList.data)=='{}')?(<p>{myList.message}</p>)
                        :(
                            <div  className="table__wrapper">
                                <table className={`tableList table${status}`}>
                                    <thead>
                                        {thead[status-1]}
                                    </thead>

                                    {(myList.data.total>0)?(
                                            <tbody>
                                            {
                                                myList.data.list.map((l, i) => (
                                                    (status===1)?(
                                                        <tr key={`row-${i}`}>
                                                            <td>{l.proName}</td><td>{l.proMoney}</td><td>{l.loanExpiry}</td><td>{l.loanRefundWay}</td><td>{l.proMoneyEnd}</td><td>{l.inveCreateTime}</td><td>{l.proMoneyPercent}%</td>
                                                        </tr>
                                                    ):((status===2)?(
                                                        <tr key={`row-${i}`}>
                                                            <td>{l.proName}</td><td>{l.proMoney}</td><td>{l.loanExpiry}</td><td>{l.proMoneyEnd}</td><td>{l.inveCreateTime}</td><td>{l.earnShdEarnDate}</td><td>{l.earnShdEarnAmou}</td>
                                                            <td>
                                                                <a onClick={() => dispatch(actionsMyInvestments.toggleModal('modalPlan',true,l.investId))}>回款计划</a>
                                                                <a onClick={() => dispatch(actionsMyInvestments.toggleModal('modalTransfer',true,l.investId))}>债权转让</a>
                                                                <a href="">投资合同</a>
                                                            </td>
                                                        </tr>
                                                    ):((status===3)?(
                                                        <tr key={`row-${i}`}>
                                                            <td>{l.proName}</td><td>{l.proMoney}</td><td>{l.loanExpiry}</td><td>{l.proMoneyEnd}</td><td>{l.inveCreateTime}</td><td>{l.earnRemittancAmou}</td><td>{l.earnRealEarnDate}</td>
                                                            <td>
                                                                <a onClick={() => dispatch(actionsMyInvestments.toggleModal('modalPlan',true,l.investId))}>回款计划</a>
                                                                <a href="">投资合同</a>
                                                            </td>
                                                        </tr>
                                                    ):((status===4)?(
                                                        <tr key={`row-${i}`}>
                                                            <td>--</td><td>{l.proName}</td><td>{l.proMoneyEnd}</td><td>{l.transAmt}</td><td>{l.transFee}</td><td>{l.transApplyTime}</td>
                                                            <td>
                                                                {l.transStatus}
                                                            </td>
                                                        </tr>
                                                    ):((status===5)?(
                                                        <tr key={`row-${i}`}>
                                                            <td>{l.transNo}</td><td>{l.proName}</td><td>{l.transAmt}</td><td>{l.transFinanced}</td><td>{l.transSchedule}</td><td>{l.transPutDate}</td>
                                                            <td>
                                                                {l.transStatus}
                                                            </td>
                                                        </tr>
                                                    ):((status===6)?(
                                                        <tr key={`row-${i}`}>
                                                            <td>{l.transNo}</td><td>{l.proName}</td><td>{l.transAmt}</td><td>{l.transferDate}</td>
                                                            <td>
                                                                <a href="">投资合同</a>
                                                            </td>
                                                        </tr>
                                                    ):(''))))))
                                                ))
                                            }
                                            </tbody>)
                                        :(<tbody><p className="noRecord">暂无记录</p></tbody>)
                                    }
                                </table>
                                {(myList.data.total>0)?(
                                        <Pagination config = {
                                            {
                                                currentPage:myList.data.pageNum,
                                                pageSize:myList.data.pageSize,
                                                totalPage:Math.ceil(myList.data.total/myList.data.pageSize),
                                                filter:status,
                                                paging:(obj)=>{
                                                    dispatch(actionsMyInvestments.getList(obj.currentPage,obj.pageCount,{status:status}));
                                                }
                                            }
                                        } ></Pagination>)
                                    :('')}

                            </div>
                        )
                    }
                </div>
                <Modal
                    title="回款计划"
                    wrapClassName="vertical-center-modal"
                    visible={modalPlan}
                    width="680px"
                    footer={null}
                    onCancel={() => dispatch(actionsMyInvestments.toggleModal('modalPlan',false,''))}
                >
                    {modalPlan===true?
                        <ModalPlan currentPro={
                            {
                                currentId:currentPro.currentId,
                                planData:currentPro.planData,
                            }

                        }
                         />:''
                    }
                </Modal>
                <Modal
                    title="转让申请"
                    wrapClassName="vertical-center-modal"
                    visible={modalTransfer}
                    width="520px"
                    footer={null}
                    onCancel={() => this.transferCallback()}
                >
                    {modalTransfer===true?
                        <ModalTransfer info={
                            {
                                currentId:currentId,
                                callback:(obj)=>{
                                    this.transferCallback();
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
    const { auth,myInvestments } = state.toJS();
    return {
        auth,
        myInvestments,
    };
}

export default connect(mapStateToProps)(MyInvestments);