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
        //console.log(this.props);
        this.props.dispatch(memberAc.getInfo());
        this.props.dispatch(investDetailActions.getTransferInvestInfo(this.props.id));
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
        console.log(this.state);
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
        console.log('状态是：'+status);
        let investButton=``;
        switch(status){
            case 1:
                investButton=<Link to={`/invest-detail/${id}`} className="btn end">待发布</Link>;
                break;
            case 2:
                investButton=<Link to={`/invest-detail/${id}`} className="btn start">立即加入</Link>;
                break;
            case 3:
                investButton=<Link to={`/invest-detail/${id}`} className="btn end">满标待划转</Link>;
                break;
            case 4:
                investButton=<Link to={`/invest-detail/${id}`} className="btn end">还款中</Link>;
                break;
            case 5:
                investButton=<Link to={`/invest-detail/${id}`} className="btn end">提前还款审核</Link>;
                break;
            case 6:
                investButton=<Link to={`/invest-detail/${id}`} className="btn end">已结清</Link>;
                break;
            case 7:
                investButton=<Link to={`/invest-detail/${id}`} className="btn end">已流标</Link>;
                break;

        }
        return investButton;
    }
    render(){
        let {investAmount}=this.state;
        let {dispatch,auth,member}=this.props;
        let {investInfo}=this.props.investDetail;
        return (
            <div>
                <div>
                    <div className="master">
                        <dl className="info">
                            <dt className="title">
                                <h2>抵押标</h2>
                                <p>{investInfo.transNo}</p>
                            </dt>
                            <dd className="content">
                                <dl className="item1">
                                    <dt className="subtitle">预期年化回报率</dt>
                                    <dd>
                                        <i>{investInfo.annualRate}</i>%

                                    </dd>

                                </dl>
                                <dl className="item2">
                                    <dt className="subtitle">锁定期限</dt>
                                    <dd><i>{investInfo.transferPeriod}</i>个月</dd>
                                </dl>
                                <dl className="item3">
                                    <dt className="subtitle">起投金额</dt>
                                    <dd><i>{investInfo.minInvestAmount}</i>元</dd>
                                </dl>
                                <dl className="progressbar">
                                    <dt><div className="finished" style={{ width:`${investInfo.investmentProgress}%`}}><i className="iconfont">&#xe64d;</i></div></dt>
                                    <dd><strong>投资进度：<em>{investInfo.investmentProgress}%</em></strong></dd>
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
                                               min:investInfo.minInvestAmount,
                                               max:(investInfo.maxInvestAmount<investInfo.surplusAmount)?investInfo.maxInvestAmount:investInfo.surplusAmount,
                                               step:investInfo.increaseAmount,
                                               rate:investInfo.annualRate,
                                               loanExpiry:investInfo.transferPeriod,
                                               noviceLoan:investInfo.noviceLoan //'1'新手标
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
                                <dd>结束日期：{moment(investInfo.loanEndDate).format('YYYY-MM-DD')}</dd>
                            </dl>
                        </li>
                        <li className="step3"><i className="iconfont icon-3"></i>
                            <dl>
                                <dt>原项目放款</dt>
                                <dd>放款日期：
                                    {(investInfo.projectTransferDate!='')? `${moment(investInfo.investInfoTransferDate).format('YYYY-MM-DD')} ` : '— —'}
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


