import React from 'react';
import PieChart from '../../../../components/charts/pie';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import Pagination from '../../../../components/pagination/pagination';
import { Spin  } from 'antd';
import {memberInvestAc} from "../../../../actions/member-investments";
import {Loading,NoRecord} from '../../../../components/bbhAlert/bbhAlert';
import {modal_config} from "../../../../utils/modal_config";
import BbhModal from "../../../../components/modal/bbh_modal";
import moment from "moment";
import { connect } from 'react-redux';
import './investments.less';

class MyInvestments extends React.Component{
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            bbhModal:false,
            currentModule:``,
            currentId:``,
            key:Math.random(),
            loading: false
        }

    }
    componentDidMount () {
        const {auth}=this.props;
        if(auth.user.remarks===`2`){
            this.props.history.push({ pathname : '/my-loan/my-loan'});//如果是借款用户自动跳转到我的借款页
        }
        window.scrollTo(0,0);
        this.props.dispatch(memberInvestAc.stateModify({status:1,myList:``}));
        this.props.dispatch(memberInvestAc.getPie());
        this.props.dispatch(memberInvestAc.getList({status:1}));
    }
    filter(params){
        this.props.dispatch(memberInvestAc.stateModify({status:params,myList:``}));
        this.props.dispatch(memberInvestAc.getList({status:params}));
    }
    //模态框开启关闭
    toggleModal=(modal,visile,id)=>{
        if(visile){
            this.setState({
                bbhModal:true,
                currentId:id,
                currentModule: modal,

            });
        }else{
            this.setState({
                bbhModal:false,
                currentModule: ``,
                currentId:``,
                key:Math.random()
            });
        }
    };

    closeModal(){
        let {onSuccess,onFail,dispatch}=this.props;

        if(this.state.currentModule==`ModalTransferApp`){
            this.props.dispatch(memberInvestAc.getList({status:this.props.memberInvestments.myInvestments.status}));
        }
        //重新载入数据
        this.toggleModal('bbhModal',false);
    }
    downLoan(params){
        this.setState({
            loading: true
        },()=>{
            this.props.dispatch(memberInvestAc.downLoad(params)).then(res => {
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

        const {dispatch,memberInvestments}=this.props;
        const {myInvestments,isFetching}=memberInvestments;
        const {myList,charts,status,modalPlan,modalTransfer,currentPro,currentId,pactUrl,pactsList}=myInvestments;
        let thead=[];
        thead[0]=<tr><th>项目名称</th><th>出借总额(元)</th><th>锁定期限</th><th>还款方式</th><th>出借金额(元)</th><th>出借时间</th><th>出借进度</th></tr>;
        thead[1]=<tr><th>项目名称</th><th>出借总额(元)</th><th>锁定期限</th><th>出借金额(元)</th><th>出借时间</th><th>下期回款日期</th><th>下期回款金额(元)</th><th>操作</th></tr>;
        thead[2]=<tr><th>项目名称</th><th>出借总额(元)</th><th>锁定期限</th><th>出借金额(元)</th><th>出借时间</th><th>回款金额(元)</th><th>结清时间</th><th>操作</th></tr>;
        thead[3]=<tr><th>项目名称</th><th>原始项目名称</th><th>出借金额（元）</th><th>转让金额（元）</th><th>手续费（元）</th><th>转让申请日期</th><th>状态</th></tr>;
        thead[4]=<tr><th>项目名称</th><th>原始项目名称</th><th>转让金额（元）</th><th>当前出借额（元）</th><th>出借进度</th><th>转让日期</th><th>状态</th></tr>;
        thead[5]=<tr><th>项目名称</th><th>原始项目名称</th><th>转让金额（元）</th><th>转让成功日期</th><th>操作</th></tr>;
        return(
            <div className="member__main">
                <Spin tip="合同加载中..." wrapperClassName='skin_loading' size='large' spinning={this.state.loading}>
                    <Crumbs/>
                    {(charts=='')?``
                        :<div className="member__cbox">
                            <Tab>
                                <div name="我的出借" className="chart">
                                    <Tab>
                                        <div name="出借总额">
                                            <PieChart
                                                data={charts.totalInvestment.data}
                                                style={{height: '300px', width: '930px'}}
                                                totalTitle="出借总额"
                                            >
                                            </PieChart>
                                        </div>
                                        <div name="累计回款">
                                            <PieChart
                                                data={charts.accumulatedIncome.data}
                                                style={{height: '300px', width: '930px'}}
                                                totalTitle="出借总额"
                                            >
                                            </PieChart>
                                        </div>
                                    </Tab>
                                </div>
                            </Tab>
                        </div>
                    }
                    <div className="member__cbox myInvestments"  style={{ padding:'20px 30px' }} id='mask'>
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
                                                                    {l.transId?<td><p><a href={`/transfer-detail/${l.transId}/${l.proId}`} target="_blank">{l.transNo}</a></p></td>
                                                                        : <td><p><a href={`/invest-detail/${l.proId}`} target="_blank">{l.proName}</a></p></td>
                                                                    }
                                                                    <td>{l.proMoney}</td>
                                                                    <td>{l.loanExpiry}个月</td>
                                                                    <td>{l.loanRefundWay}</td>
                                                                    <td>{l.proMoneyEnd}</td>
                                                                    <td>{l.inveCreateTime ? moment(l.inveCreateTime).format('YYYY-MM-DD') : ''}</td>
                                                                    <td>{l.proMoneyPercent}%</td>
                                                                </tr>
                                                            ) : ((status === 2) ? (
                                                                <tr key={`row-${i}`}>
                                                                    {l.transId?<td><p><a href={`/transfer-detail/${l.transId}/${l.proId}`} target="_blank">{l.transNo}</a></p></td>
                                                                        : <td><p><a href={`/invest-detail/${l.proId}`} target="_blank">{l.proName}</a></p></td>
                                                                    }
                                                                    <td>{l.proMoney}</td>
                                                                    <td>{l.loanExpiry}个月</td>
                                                                    <td>{l.proMoneyEnd}</td>
                                                                    <td>{l.inveCreateTime ? moment(l.inveCreateTime).format('YYYY-MM-DD') : ''}</td>
                                                                    <td>{l.earnNextShdEarnDate ? moment(l.earnNextShdEarnDate).format('YYYY-MM-DD') : ''}</td>
                                                                    <td>{l.earnNextShdEarnAmou}</td>
                                                                    <td>
                                                                        <a onClick={() => this.toggleModal('ModalPlan', true, l.investId)}>回款计划</a>
                                                                        <a onClick={() => this.toggleModal('ModalTransferApp', true, l.investId)}
                                                                           disabled={l.loanRefundTranStatus=='1'}
                                                                           className={ l.loanRefundTranStatus=='1'?'disabled':'' }>
                                                                            {l.loanRefundTranStatus=='1'?`申请中`:`债权转让`}
                                                                        </a>
                                                                        <a href="javascript:void(0);"  onClick={() => { this.downLoan(l.investId)}}>出借合同</a>

                                                                    </td>
                                                                </tr>
                                                            ) : ((status === 3) ? (
                                                                <tr key={`row-${i}`}>
                                                                    {l.transId?<td><p><a href={`/transfer-detail/${l.transId}/${l.proId}`} target="_blank">{l.transNo}</a></p></td>
                                                                        : <td><p><a href={`/invest-detail/${l.proId}`} target="_blank">{l.proName}</a></p></td>
                                                                    }
                                                                    <td>{l.proMoney}</td>
                                                                    <td>{l.loanExpiry}个月</td>
                                                                    <td>{l.proMoneyEnd}</td>
                                                                    <td>{l.inveCreateTime ? moment(l.inveCreateTime).format('YYYY-MM-DD') : ''}</td>
                                                                    <td>{l.earnRemittancAmou}</td>
                                                                    <td>{l.earnRealEarnDate ? moment(l.earnRealEarnDate).format('YYYY-MM-DD') : ''}</td>
                                                                    <td>
                                                                        <a onClick={() => this.toggleModal('ModalPlan', true, l.investId)}>回款计划</a>
                                                                        <a href="javascript:void(0);"  onClick={() => { this.downLoan(l.investId)}} >出借合同</a>
                                                                    </td>
                                                                </tr>
                                                            ) : ((status === 4) ? (
                                                                <tr key={`row-${i}`}>
                                                                    <td>--</td>
                                                                    <td><p><a href={`/invest-detail/${l.proId}`} target="_blank">{l.proName}</a></p></td>
                                                                    <td>{l.proMoneyEnd}</td>
                                                                    <td>{l.transAmt}</td>
                                                                    <td>{l.transFee}</td>
                                                                    <td>{l.transApplyTime ? moment(l.transApplyTime).format('YYYY-MM-DD') : ''}</td>
                                                                    <td>{l.transStatus}</td>
                                                                </tr>
                                                            ) : ((status === 5) ? (
                                                                <tr key={`row-${i}`}>
                                                                    <td><p><a href={`/transfer-detail/${l.transId}/${l.proId}`} target="_blank">{l.transNo}</a></p></td>
                                                                    <td><p><a href={`/invest-detail/${l.proId}`} target="_blank">{l.proName}</a></p></td>
                                                                    <td>{l.transAmt}</td>
                                                                    <td>{l.transFinanced}</td>
                                                                    <td>{l.transSchedule}%</td>
                                                                    <td>{l.transPutDate ? moment(l.transPutDate).format('YYYY-MM-DD') : ''}</td>
                                                                    <td>
                                                                        {l.transStatus}
                                                                    </td>
                                                                </tr>
                                                            ) : ((status === 6) ? (
                                                                <tr key={`row-${i}`}>
                                                                    <td><p><a href={`/transfer-detail/${l.transId}/${l.proId}`} target="_blank">{l.transNo}</a></p></td>
                                                                    <td><p><a href={`/invest-detail/${l.proId}`} target="_blank">{l.proName}</a></p></td>
                                                                    <td>{l.transAmt}</td>
                                                                    <td>{l.transferDate ? moment(l.transferDate).format('YYYY-MM-DD') : ''}</td>
                                                                    <td>
                                                                        <a onClick={() => this.toggleModal('ModalPactsList', true, l.transId)}>出借合同</a>
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

                </Spin>
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