import React from 'react';
import PropTypes from 'prop-types';
import {  Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {memberAc} from '../../../../actions/member'
import  investDetailActions  from '../../../../actions/invest-detail';
import InvestBox from "./investBox"
import moment from "moment";

class TransferDetailMaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project:{},
            member:{},
            investAmount:0,
            modalInvest: false,
            modalRecharge: false,
            modalRiskAssess: false,
            tips:'',
            allowedInvest:true,
            code:100
        }
    }
    componentDidMount () {
        const {proId,transferId}=this.props;
        this.props.dispatch(investDetailActions.getTransferInvestInfo(transferId));
        //this.props.dispatch(investDetailActions.getInvestInfo(proId));
    }
    //模态框开启关闭
    toggleModal=(modal,visile,id)=>{
        if(visile){
            this.setState({
                [modal]: true,
            });
        }else{
            this.setState({
                [modal]: false,
            });
        }
    };
    rechargeCallback(){
        this.toggleModal(`modalRecharge`,false);
        //this.loadData();
        let newState= {
            code:0,
            type:'',
            message:'',
            description:''
        };
        dispatch(investDetailActions.statePostResultModify(newState));
    }
    getStatusName(status,id,transferId){
        //console.log('状态是：'+status);
        let investButton=``;
        switch(status){
            case 1:
                investButton=<Link to={`/transfer-detail/${transferId}/${id}`} className="btn end">待审核</Link>;
                break;
            case 2:
                investButton=<Link to={`/transfer-detail/${transferId}/${id}`} className="btn start">立即加入</Link>;
                break;
            case 3:
                investButton=<Link to={`/transfer-detail/${transferId}/${id}`} className="btn end">满标待划转</Link>;
                break;
            case 4:
                investButton=<Link to={`/transfer-detail/${transferId}/${id}`} className="btn end">还款中</Link>;
                break;
            case 5:
                investButton=<Link to={`/transfer-detail/${transferId}/${id}`} className="btn end">已流标</Link>;
                break;
            case 6:
                investButton=<Link to={`/transfer-detail/${transferId}/${id}`} className="btn end">已流标</Link>;
                break;

        }
        return investButton;
    }
    render(){
        let {investAmount}=this.state;
        let {dispatch,auth,member,returnAmount}=this.props;
        let {investInfo}=this.props.investDetail;
        const {minInvestAmount,maxInvestAmount,surplusAmount}=investInfo;
        let min,max;
        (surplusAmount<100)? min=surplusAmount:min=100;
        (maxInvestAmount<surplusAmount)?max=maxInvestAmount:max=surplusAmount;
        return (
            <div>
                <div>
                    <div className="master">
                        <dl className="info">
                            <dt className="title">
                                <h2>抵押标</h2>
                                <p>{investInfo.transNo||``}</p>
                            </dt>
                            <dd className="content">
                                <dl className="item1">
                                    <dt className="subtitle">预期年化利率</dt>
                                    <dd>
                                        <i>{investInfo.annualRate?investInfo.annualRate+investInfo.raiseRate:``}</i>%
                                    </dd>

                                </dl>
                                <dl className="item2">
                                    <dt className="subtitle">借款期限</dt>
                                    <dd><i>{investInfo.transferPeriod}</i>个月</dd>
                                </dl>
                                <dl className="item3">
                                    <dt className="subtitle">起借金额</dt>
                                    <dd><i>{investInfo.minInvestAmount}</i>元</dd>
                                </dl>
                                <dl className="progressbar">
                                    <dt><div className="finished" style={{ width:`${investInfo.investmentProgress}%`}}><i className="iconfont">&#xe64d;</i></div></dt>
                                    <dd><strong>出借进度：<em>{investInfo.investmentProgress}%</em></strong></dd>
                                </dl>
                                <ul className="safe">
                                    <li><i className="iconfont icon-star"></i>国企背景</li>
                                    <li><i className="iconfont icon-user"></i>真实借款</li>
                                    <li><i className="iconfont icon-heart"></i>实物抵押</li>
                                    <li><i className="iconfont icon-money"></i>{investInfo.refundWayString}</li>
                                </ul>
                            </dd>
                        </dl>
                        <div className="m-invest">
                            {(investInfo !=``)?
                                <InvestBox type={1}
                                           investInfo={{
                                               id:investInfo.id,
                                               status:investInfo.transStatus,
                                               money:investInfo.transAmt,
                                               surplusAmount:investInfo.surplusAmount,
                                               min:100,
                                               max:max,
                                               step:100,  //递增金额
                                               rate:(investInfo.annualRate+((investInfo.raiseRate)?investInfo.raiseRate:0)),
                                               loanExpiry:investInfo.transferPeriod,
                                               noviceLoan:investInfo.noviceLoan, //'1'新手标
                                               isTransfer:`1`,
                                               projectId:investInfo.projectId,
                                               returnAmount:returnAmount  //回调的金额

                                           }}
                                />



                                :``
                            }
                        </div>
                    </div>
                    <ul className="detail steps">
                        <li className="step1"><i className="iconfont icon-1"></i>
                            <dl>
                                <dt>债转发布</dt>
                                <dd>发布日期：{moment(investInfo.putDate).format('YYYY-MM-DD')}</dd>
                            </dl>
                        </li>
                        <li className="step2"><i className="iconfont icon-2"></i>
                            <dl>
                                <dt>债转募集</dt>
                                <dd>截止日期：{moment(investInfo.loanEndDate).format('YYYY-MM-DD')}</dd>
                            </dl>
                        </li>
                        <li className="step3"><i className="iconfont icon-3"></i>
                            <dl>
                                <dt>项目放款</dt>
                                <dd>放款日期：
                                    {(investInfo.transferDate )? `${moment(investInfo.transferDate).format('YYYY-MM-DD')} ` : '— —'}
                                </dd>
                            </dl>
                        </li>
                        <li className="step4"><i className="iconfont icon-4"></i>
                            <dl>
                                <dt>项目还款</dt>
                                <dd>还款日期：{(investInfo.repaymentDateString!='')? `${investInfo.repaymentDateString} ` : '— —'}</dd>
                            </dl>
                        </li>
                    </ul>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const { auth,investDetail,member } = state.toJS();
    return {
        auth,
        investDetail,
        member
    };
}
export default connect(mapStateToProps)(TransferDetailMaster);


