import React from 'react';
import PropTypes from 'prop-types';
import PieChart from '../../../../components/charts/pie';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import Pagination from '../../../../components/pagination/pagination';
import { Spin,Icon  } from 'antd';
import ModalRepaymentApp from '../../../../components/modal/modal-repayment/modalRepaymentApp';
import {toMoney,toNumber,addCommas} from '../../../../utils/famatData';
import { connect } from 'react-redux';
import {memberLoansAc, repaymentsAc} from '../../../../actions/member-loans';
import {Loading,NoRecord} from '../../../../components/bbhAlert/bbhAlert';
import moment from "moment";
import './my-loan.less';
import {modal_config} from "../../../../utils/modal_config";
import {accountAc} from "../../../../actions/account";
import investDetailActions from "../../../../actions/invest-detail";
import {memberInvestAc} from "../../../../actions/member-investments";

class MyLoans extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bbhModal:false,
            currentModule:``,
            currentId:``,
            key:Math.random(),
            loading:false
        }
    }
    componentDidMount () {
        const {auth}=this.props;
        if(auth.user.remarks===`1`){
            this.props.history.push({ pathname : '/my-account'});//如果是借款用户自动跳转到我的借款页
        }
        window.scrollTo(0,0);
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
        this.props.dispatch(memberLoansAc.stateModify({status:3,myList:``}));
        this.props.dispatch(memberLoansAc.getList({status:3}));
        this.toggleModal('bbhModal',false);
    }
    downLoan(params){
        this.setState({
            loading: true
        },()=>{
            this.props.dispatch(memberLoansAc.downLoad(params)).then(res => {
                this.setState({
                    loading: false
                })
                let a = document.createElement('a');
                let event = new MouseEvent('click');
                a.download=``;
                a.href=res.value.pactUrl;
                a.target = "_blank";
                a.dispatchEvent(event);
            })
        })

    }
    downLoadInform(params){
        this.setState({
            loading: true
        },()=>{
            this.props.dispatch(memberLoansAc.downLoadInform(params)).then(res => {
                this.setState({
                    loading: false
                })
                let a = document.createElement('a');
                let event = new MouseEvent('click');
                a.download=``;
                a.href=res.value.pactUrl;
                a.target = "_blank";
                a.dispatchEvent(event);
            })
        })

    }
    render(){
        let {dispatch}=this.props;
        let {myLoans,isFetching}=this.props.memberLoans;
        let {myList,charts,status}=myLoans;
        let tHead=[];
        tHead[0]=<tr><th>项目名称</th><th>项目类型</th><th>借款金额(元)</th><th>借款年利率(%)</th><th>借款期限</th><th>还款方式</th><th>申请日期</th><th>状态</th></tr>;
        tHead[1]=<tr><th>项目名称</th><th>借款总额(元)</th><th>借款期限</th><th>发布日期</th><th>募集金额(元)</th><th>募集进度(%)</th><th>募集截止日期</th><th>状态</th></tr>;
        tHead[2]=<tr><th>项目名称</th><th>借款总额(元)</th><th>借款期限</th><th>放款日期</th><th>下期还款日期</th><th>下期还款金额(元)</th><th>操作</th></tr>;
        tHead[3]=<tr><th>项目名称</th><th>借款金额(元)</th><th>借款期限</th><th>放款日期</th><th>还款本金(元)</th><th>还款利息(元)</th><th>逾期罚金(元)</th><th>逾期罚息(元)</th><th>结清日期</th><th>操作</th></tr>;
        return(
            <div className="member__main">
                <Spin tip="合同加载中..." wrapperClassName='skin_loading' size='large' spinning={this.state.loading}>
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
                <div className="member__cbox myLoans" style={{ padding:'20px 30px' }} id='mask'>
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
                    {(myList=='') ? <Loading isShow={isFetching} />
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
                                                            <td>{l.projectTypeName}</td>
                                                            <td>{l.money}</td>
                                                            <td>--</td>
                                                            <td>{l.loanExpiry}个月</td>
                                                            <td>{l.refundWayName}</td>
                                                            <td>{l.applyTime ? moment(l.applyTime).format('YYYY-MM-DD') : ''}</td>
                                                            <td>{l.statusName}</td>
                                                        </tr>
                                                    ) : ((status === 2) ? (
                                                        <tr key={`row-${i}`}>
                                                            <td><p><a href={`/invest-detail/${l.projectId}`} title={l.name} target="_blank">{l.name}</a></p></td>
                                                            <td>{l.money}</td>
                                                            <td>{l.loanExpiry}个月</td>
                                                            <td>{l.putTime ? moment(l.putTime).format('YYYY-MM-DD') : ''}</td>
                                                            <td>{l.moneyEnd}</td>
                                                            <td>{l.investProgress}%</td>
                                                            <td>{l.endDate ? moment(l.endDate).format('YYYY-MM-DD') : ''}</td>
                                                            <td>招标中</td>
                                                        </tr>
                                                    ) : ((status === 3) ? (
                                                        <tr key={`row-${i}`}>
                                                            <td><p><a href={`/invest-detail/${l.projectId}`} title={l.name} target="_blank">{l.name}</a></p></td>
                                                            <td>{l.money}</td>
                                                            <td>{l.loanExpiry}个月</td>
                                                            <td>{l.transferTime ? moment(l.transferTime).format('YYYY-MM-DD') : ''}</td>
                                                            <td>{l.shdRpmtDate ? moment(l.shdRpmtDate).format('YYYY-MM-DD') : ''}</td>
                                                            <td>{l.shdRpmtMoney}</td>
                                                            <td>
                                                                {
                                                                    l.refundStatus=='0'?('提前还款申请中')
                                                                        :(
                                                                            <a onClick={() => this.toggleModal(`ModalRepaymentApp`,true,l.projectId)}>提前还款</a>
                                                                        )
                                                                }
                                                                <a href="javascript:void(0);"  onClick={() => { this.downLoan(l.projectId)}} >借款合同</a>
                                                                <a href="javascript:void(0);"  onClick={() => { this.downLoadInform(l.projectId)}} >告知书</a>
                                                            </td>
                                                        </tr>
                                                    ) : ((status === 4) ? (
                                                        <tr key={`row-${i}`}>
                                                            <td><p><a href={`/invest-detail/${l.projectId}`} title={l.name} target="_blank">{l.name}</a></p></td>
                                                            <td>{l.money}</td>
                                                            <td>{l.loanExpiry}个月</td>
                                                            <td>{l.transferTime ? moment(l.transferTime).format('YYYY-MM-DD') : ''}</td>
                                                            <td>{l.rpmtCapital}</td>
                                                            <td>{l.rpmtIint}</td>
                                                            <td>{l.lateFine}</td>
                                                            <td>{l.lateIint}</td>
                                                            <td>{l.settleTime ? moment(l.settleTime).format('YYYY-MM-DD') : ''}</td>
                                                            <td>
                                                                <a href="javascript:void(0);"  onClick={() => { this.downLoan(l.projectId)}} >借款合同</a>
                                                                <a href="javascript:void(0);"  onClick={() => { this.downLoadInform(l.projectId)}} >告知书</a>
                                                            </td>
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
                </Spin>
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
export default connect(mapStateToProps)(MyLoans);