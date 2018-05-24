import React from 'react';
import PropTypes from 'prop-types';
import PieChart from '../../../../components/charts/pie';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import Pagination from '../../../../components/pagination/pagination';
import { Modal } from 'antd';
import ModalPlan from './modalPlan';
import ModalTransfer from './modalTransfer';
import moment from "moment";
import { connect } from 'react-redux';
import actionsMyInvestments from '../../../../actions/member-investments';
import {memberInvestAc} from "../../../../actions/member-investments";
import {Loading,NoRecord} from '../../../../components/bbhAlert/bbhAlert';
import './investments.less';

class MyInvestments extends React.Component{
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            key:Math.random(),
        }
    }
    componentDidMount () {
        window.scrollTo(0,0);
        this.props.dispatch(memberInvestAc.stateModify({status:1,myList:``}));
        this.props.dispatch(memberInvestAc.getPie());
        this.props.dispatch(memberInvestAc.getList({status:1}));
    }
    filter(pram){
        this.props.dispatch(memberInvestAc.stateModify({status:pram,myList:``}));
        this.props.dispatch(memberInvestAc.getList({status:pram}));
    }
    toggleModal(modal,visile,id){
        let {dispatch}=this.props;
        let myReceiving_new={};
        if(modal=='modalPlan'){
            if(visile){
                //dispatch(actionsMyInvestments.getPlanList(id));//获取某项目回款计划
                console.log('---------------------');
                myReceiving_new={
                    modalPlan: true,
                    currentId: id,
                };
                dispatch(memberInvestAc.stateModify(myReceiving_new));
            }else{
                this.setState({
                    key:Math.random()
                });
                myReceiving_new={
                    modalPlan: false,
                    currentId: '',
                };
                dispatch(memberInvestAc.stateModify(myReceiving_new));
            }
        }else if(modal=='modalTransfer'){

            if(visile){
                myReceiving_new={
                    modalTransfer: true,
                    currentId: id,
                };
                dispatch(memberInvestAc.stateModify(myReceiving_new));
            }else{
                this.setState({
                    key:Math.random()
                });
                myReceiving_new={
                    modalTransfer: false,
                    currentId: '',
                };
                dispatch(memberInvestAc.stateModify(myReceiving_new));
            }
        }

    }
    transferCallback(){
        let {dispatch}=this.props;
        dispatch(actionsMyInvestments.stateModify({postResult:``}));
        this.toggleModal('modalTransfer',false,'');
        this.filter(2);
    }
    render(){
        //let {myInvestments,dispatch} = this.props;
        console.log('-------myInvestments--------');
        console.log(this.props);

        let {dispatch}=this.props;
        let {myInvestments,isFetching}=this.props.memberInvestments;
        let {myList,charts,status,modalPlan,modalTransfer,currentPro,currentId}=myInvestments;
        console.log(currentId);
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
                {(charts=='')?``
                    :<div className="member__cbox">
                        <Tab>
                            <div name="我的投资" className="chart">
                                <Tab>
                                    <div name="投资总额">
                                        <PieChart
                                            data={charts.totalInvestment.data}
                                            style={{height: '300px', width: '930px'}}
                                            totalTitle="投资总额"
                                        >
                                        </PieChart>
                                    </div>
                                    <div name="累计收益">
                                        <PieChart
                                            data={charts.accumulatedIncome.data}
                                            style={{height: '300px', width: '930px'}}
                                            totalTitle="投资总额"
                                        >
                                        </PieChart>
                                    </div>
                                </Tab>
                            </div>
                        </Tab>
                    </div>
                }
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
                                           onClick={ () => { this.filter(1) } }>招标中</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(status===2)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { this.filter(2) } }>回款中</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(status===3)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { this.filter(3) } }>已回款</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(status===4)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { this.filter(4) } }>转让申请</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(status===5)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { this.filter(5) } }>转让中</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(status===6)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { this.filter(6) } }>已转出</p>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                    {(myList === '') ? <Loading isShow={isFetching}/>
                        :
                        <div className="table__wrapper">
                            {(myList.total > 0) ?
                                <div>
                                    <table className={`tableList table${status}`}>
                                        <thead>
                                        {thead[status - 1]}
                                        </thead>
                                        {(myList.total > 0) ? (
                                                <tbody>
                                                {
                                                    myList.list.map((l, i) => (
                                                        (status === 1) ? (
                                                            <tr key={`row-${i}`}>
                                                                <td><p><a href={`/invest-detail/${l.proId}`} target="_blank">{l.proName}</a></p></td>
                                                                <td>{l.proMoney}</td>
                                                                <td>{l.loanExpiry}个月</td>
                                                                <td>{l.loanRefundWay}</td>
                                                                <td>{l.proMoneyEnd}</td>
                                                                <td>{moment(l.inveCreateTime).format('YYYY-MM-DD')}</td>
                                                                <td>{l.proMoneyPercent}%</td>
                                                            </tr>
                                                        ) : ((status === 2) ? (
                                                            <tr key={`row-${i}`}>
                                                                <td><p><a href={`/invest-detail/${l.proId}`} target="_blank">{l.proName}</a></p></td>
                                                                <td>{l.proMoney}</td>
                                                                <td>{l.loanExpiry}个月</td>
                                                                <td>{l.proMoneyEnd}</td>
                                                                <td>{moment(l.inveCreateTime).format('YYYY-MM-DD')}</td>
                                                                <td>{moment(l.earnNextShdEarnDate).format('YYYY-MM-DD')}</td>
                                                                <td>{l.earnNextShdEarnAmou}</td>
                                                                <td>
                                                                    <a onClick={() => this.toggleModal('modalPlan', true, l.investId)}>回款计划</a>
                                                                    <a onClick={() => this.toggleModal('modalTransfer', true, l.investId)}>债权转让</a>
                                                                    <a href="">投资合同</a>
                                                                </td>
                                                            </tr>
                                                        ) : ((status === 3) ? (
                                                            <tr key={`row-${i}`}>
                                                                <td><p><a href={`/invest-detail/${l.proId}`} target="_blank">{l.proName}</a></p></td>
                                                                <td>{l.proMoney}</td>
                                                                <td>{l.loanExpiry}个月</td>
                                                                <td>{l.proMoneyEnd}</td>
                                                                <td>{moment(l.inveCreateTime).format('YYYY-MM-DD')}</td>
                                                                <td>{l.earnRemittancAmou}</td>
                                                                <td>{moment(l.earnRealEarnDate).format('YYYY-MM-DD')}</td>
                                                                <td>
                                                                    <a onClick={() => this.toggleModal('modalPlan', true, l.investId)}>回款计划</a>
                                                                    <a href="">投资合同</a>
                                                                </td>
                                                            </tr>
                                                        ) : ((status === 4) ? (
                                                            <tr key={`row-${i}`}>
                                                                <td>{l.transNo}</td>
                                                                <td><p><a href={`/invest-detail/${l.proId}`} target="_blank">{l.proName}</a></p></td>
                                                                <td>{l.proMoneyEnd}</td>
                                                                <td>{l.transAmt}</td>
                                                                <td>{l.transFee}</td>
                                                                <td>{moment(l.transApplyTime).format('YYYY-MM-DD')}</td>
                                                                <td>{l.transStatus}</td>
                                                            </tr>
                                                        ) : ((status === 5) ? (
                                                            <tr key={`row-${i}`}>
                                                                <td>{l.transNo}</td>
                                                                <td><p><a href={`/invest-detail/${l.proId}`} target="_blank">{l.proName}</a></p></td>
                                                                <td>{l.transAmt}</td>
                                                                <td>{l.transFinanced}</td>
                                                                <td>{l.transSchedule}%</td>
                                                                <td>{moment(l.transPutDate).format('YYYY-MM-DD')}</td>
                                                                <td>
                                                                    {l.transStatus}
                                                                </td>
                                                            </tr>
                                                        ) : ((status === 6) ? (
                                                            <tr key={`row-${i}`}>
                                                                <td>{l.transNo}</td>
                                                                <td><p><a href={`/invest-detail/${l.proId}`} target="_blank">{l.proName}</a></p></td>
                                                                <td>{l.transAmt}</td>
                                                                <td>{moment(l.transferDate).format('YYYY-MM-DD')}</td>
                                                                <td>
                                                                    <a href="">投资合同</a>
                                                                </td>
                                                            </tr>
                                                        ) : (''))))))
                                                    ))
                                                }
                                                </tbody>)
                                            : (<tbody><p className="noRecord">暂无记录</p></tbody>)
                                        }
                                    </table>
                                    <Pagination config={
                                        {
                                            currentPage: myList.pageNum,
                                            pageSize: myList.pageSize,
                                            totalPage: myList.pages,
                                            //filter: status,
                                            paging: (obj) => {
                                                this.props.dispatch(memberInvestAc.stateModify({status:status,myList:``}));
                                                dispatch(memberInvestAc.getList(
                                                    {
                                                        pageNum:obj.currentPage,
                                                        pageSize:obj.pageCount,
                                                        status:status
                                                    }
                                                ))
                                            }
                                        }
                                    }></Pagination>
                                </div>
                                : <NoRecord isShow={true} />
                            }
                        </div>
                    }
                </div>
                <Modal
                    title="回款计划"
                    wrapClassName="vertical-center-modal"
                    visible={modalPlan}
                    width="680px"
                    footer={null}
                    onCancel={() => this.toggleModal('modalPlan',false,'')}
                >
                    {modalPlan===true?
                        <ModalPlan info={{currentId:currentId,}}
                        />:''
                    }
                </Modal>
                <Modal
                    title="转让申请"
                    wrapClassName="vertical-center-modal"
                    visible={modalTransfer}
                    width="520px"
                    footer={null}
                    onCancel={() => this.toggleModal('modalTransfer',false,'')}
                >
                    {modalTransfer===true?
                        <ModalTransfer
                            key={this.state.key}
                            info={{
                                currentId:currentId,
                                callback:(obj)=>{
                                    this.toggleModal('modalTransfer',false,'');
                                }
                            }}
                        />:''
                    }
                </Modal>
            </div>

        )

    }
}

function mapStateToProps(state) {
    const { auth,memberInvestments } = state.toJS();
    return {
        auth,
        memberInvestments
    };
}

export default connect(mapStateToProps)(MyInvestments);