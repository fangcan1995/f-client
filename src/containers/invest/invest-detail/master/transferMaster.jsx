import React from 'react';
import PropTypes from 'prop-types';
import  {getData}  from '../../../../assets/js/getData';
import {  Link} from 'react-router-dom';
import StepperInput from '../../../../components/stepperInput/stepperInput';
import { Modal } from 'antd';
import {income} from "../../../../assets/js/cost";
import ModalInvest from '../modal-invest/modalInvest';
import ModalRecharge from '../modal-recharge/modaRecharge'
import ModalRiskAssess from '../modal-riskAssess/modal-riskAssess';
import { connect } from 'react-redux';
import  investDetailActions  from '../../../../actions/invest-detail';
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
            case 6:
                investButton=<Link to={`/transfer-detail/${transferId}/${id}`} className="btn end">已流标</Link>;
                break;
            case 5:
                investButton=<Link to={`/transfer-detail/${transferId}/${id}`} className="btn end">已结清</Link>;
                break;

        }
        return investButton;
    }
    render(){
        console.log('------userIsAuthenticated--------');
        //console.log(userIsAuthenticated);
        let {investAmount}=this.state;
        console.log('投资信息');
        console.log(this.props);
        let {dispatch}=this.props;
        let project=this.props.investInfo.data;
        let member=this.props.memberInfo.data;
        //定义投资区域
        let mInvest=``;
        if(project.transStatus!=2){
            mInvest=<div className="form_area">
                <ul className="m-amount">
                    <li><strong>开放金额：</strong>{project.transAmt}元</li>
                </ul>
                {this.getStatusName(project.transStatus,project.projectId,project.id)}
            </div>
        }else{
            let button=``;
            if(JSON.stringify(member.data) == '{}'){
                button=<Link  to={`/login?redirect=%2invest-detail%${project.id}`} className="btn">我要登录</Link>;
            }else{
                if(!member.isOpenAccount){
                    button=<a  className="btn" onClick={()=>{window.location.href="http://www.baidu.com?redirect"}}>立即开户</a>
                }else{
                    if(!member.isFxpg){
                        button=<a className="btn" onClick={() => this.toggleModal(`modalRiskAssess`,true,project.id)}>立即风险评估</a>
                    }else{
                        if((member.accountBalance<investAmount)){
                            button=<a className="btn" onClick={() => this.toggleModal(`modalRecharge`,true,project.id)}>立即充值</a>
                        }else{
                            console.log('this.state.tips='+this.state.tips);
                            if(this.state.tips!=''){
                                button=<a className='btn end'>立即投资</a>
                            }else{
                                button=<a className='btn' onClick={() => this.toggleModal(`modalInvest`,true,project.id)}>立即投资</a>
                            }

                        }
                    }
                }
            }
            mInvest=<div className="form_area">
                <ul className="m-amount">
                    <li><strong>开放金额：</strong>{project.transAmt}元</li>
                    <li><strong>可投金额：</strong>{project.surplusAmount}元</li>
                </ul>
                <StepperInput config = {
                    {
                        defaultValue:project.minInvestAmount, //默认金额
                        min:project.minInvestAmount,
                        max:(project.maxInvestAmount<project.surplusAmount)?project.maxInvestAmount:project.surplusAmount,
                        step:project.increaseAmount,
                        callback:(obj)=>{
                            this.setState({
                                tips:obj.tips,
                                investAmount:parseFloat(obj.value),
                                code:obj.code
                            });
                        }
                    }
                }
                >
                </StepperInput>
                <div className="tips__area">
                    {this.state.tips!=''? <span className="tips error">{this.state.tips}</span>
                        :''}
                </div>
                <ul className="others">
                    <li>
                        <i className="iconfont icon-user"></i>
                        <strong>我的可用余额：</strong>
                        {
                            (JSON.stringify(member) == '{}')? <Link  to={`/login?redirect=%2invest-detail%${project.id}`} className="btn">登陆查看</Link>
                                : `${member.accountBalance} 元`
                        }
                    </li>
                    <li>
                        <strong>可用红包总计：</strong>
                        {
                            (JSON.stringify(member) == '{}')? <Link  to={`/login?redirect=%2invest-detail%${project.id}`} className="btn">登陆查看</Link>
                                : `${member.redAmount} 元`
                        }
                    </li>
                    <li>
                        <strong>可用加息券：</strong>
                        {
                            (JSON.stringify(member) == '{}')? <Link  to={`/login?redirect=%2invest-detail%${project.id}`} className="btn">登陆查看</Link>
                                : `${member.rateNum} 张`
                        }
                    </li>
                    <li><strong>预期可赚取：</strong> <i id="money">
                        {(investAmount==0)?income(project.minInvestAmount,(project.annualRate),project.transferPeriod,'m')
                            :income(this.state.investAmount,(project.annualRate),project.transferPeriod,'m')
                        }

                    </i>元
                    </li>
                </ul>
                {button}
            </div>
        }
        //
        return (
            <div>
                {
                    JSON.stringify(project) != "{}" ?
                        <div>
                            <div className="master">
                                <dl className="info">
                                    <dt className="title">
                                        <h2>抵押标</h2>
                                        <p>{project.transNo}</p>
                                    </dt>
                                    <dd className="content">
                                        <dl className="item1">
                                            <dt className="subtitle">预期年化回报率</dt>
                                            <dd>
                                                <i>{project.annualRate}</i>%

                                            </dd>

                                        </dl>
                                        <dl className="item2">
                                            <dt className="subtitle">锁定期限</dt>
                                            <dd><i>{project.transferPeriod}</i>个月</dd>
                                        </dl>
                                        <dl className="item3">
                                            <dt className="subtitle">起投金额</dt>
                                            <dd><i>{project.minInvestAmount}</i>元</dd>
                                        </dl>
                                        <dl className="progressbar">
                                            <dt><div className="finished" style={{ width:`${project.investmentProgress}%`}}><i className="iconfont">&#xe64d;</i></div></dt>
                                            <dd><strong>投资进度：<em>{project.investmentProgress}%</em></strong></dd>
                                        </dl>
                                        <ul className="safe">
                                            <li><i className="iconfont icon-star"></i>国企背景</li>
                                            <li><i className="iconfont icon-user"></i>真实借款</li>
                                            <li><i className="iconfont icon-heart"></i>实物抵押</li>
                                            <li><i className="iconfont icon-money"></i>{project.refundWayString}</li>
                                        </ul>
                                    </dd>
                                </dl>
                                <div className="m-invest">
                                    {mInvest}
                                </div>
                            </div>
                            <ul className="detail steps">
                                <li className="step1"><i className="iconfont icon-1"></i>
                                    <dl>
                                        <dt>债转发布</dt>
                                        <dd>发布日期：{moment(project.putDate).format('YYYY-MM-DD')}</dd>
                                    </dl>
                                </li>
                                <li className="step2"><i className="iconfont icon-2"></i>
                                    <dl>
                                        <dt>债转募集</dt>
                                        <dd>结束日期：{moment(project.loanEndDate).format('YYYY-MM-DD')}</dd>
                                    </dl>
                                </li>
                                <li className="step3"><i className="iconfont icon-3"></i>
                                    <dl>
                                        <dt>原项目放款</dt>
                                        <dd>放款日期：
                                             {(project.projectTransferDate!='')? `${moment(project.projectTransferDate).format('YYYY-MM-DD')} ` : '— —'}
                                        </dd>
                                    </dl>
                                </li>
                                <li className="step4"><i className="iconfont icon-4"></i>
                                    <dl>
                                        <dt>项目还款</dt>
                                        <dd>还款日期：{(project.repaymentDateString!='')? `${project.repaymentDateString} ` : '— —'}</dd>
                                    </dl>
                                </li>
                            </ul>
                        </div>
                        :''
                }
                {/*投资弹窗*/}
                <Modal
                    title="投资"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.modalInvest}
                    width="520px"
                    height="400px"
                    footer={null}
                    onCancel={() => this.toggleModal(`modalInvest`,false,'')}
                >
                    {this.state.modalInvest===true?
                        <ModalInvest
                            config = {
                                {
                                    proId:project.id,
                                    investAmount:(investAmount>0)?investAmount:project.minInvestAmount,  //投资金额
                                    proMinInvestAmount:project.minInvestAmount,   //起投金额
                                    proMaxInvestAmount:(project.maxInvestAmount<project.surplusAmount)?project.maxInvestAmount:project.surplusAmount, //投资上限
                                    proIncreaseAmount:project.increaseAmount,    //递增金额
                                    restMoney:project.surplusAmount,//标的剩余金额
                                    rate:project.annualRate, //年化收益
                                    loanApplyExpiry:project.transferPeriod,  //投资期限
                                    callback:(obj)=>{
                                        this.toggleModal(`modalInvest`,false);
                                        dispatch(investDetailActions.getData(project.projectId,project.id));  //投资成功重载数据
                                    }
                                }
                            }
                        />:''
                    }
                </Modal>
                {/*充值弹窗*/}
                <Modal
                    title="充值"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.modalRecharge}
                    width="520px"
                    height="400px"
                    footer={null}
                    onCancel={() => this.rechargeCallback()}
                >
                    {this.state.modalRecharge===true?
                        <ModalRecharge
                            config = {
                                {
                                    proId:project.pid,
                                    accountBalance:member.accountBalance,  //账户余额
                                    callback:(obj)=>{
                                        this.rechargeCallback();
                                    },


                                }
                            }
                        />:''
                    }
                </Modal>
                {/*风险测评弹窗*/}
                <Modal
                    title="风险测评"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.modalRiskAssess}
                    width="800px"
                    footer={null}
                    onCancel={() => this.toggleModal(`modalRiskAssess`,false,'')}
                >
                    {this.state.modalRiskAssess===true?
                        <ModalRiskAssess
                            config={{
                                callback:(obj)=>{
                                    this.toggleModal(`modalRiskAssess`,false);
                                    this.loadData();
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
    const { auth,investDetail } = state.toJS();
    return {
        auth,
        investDetail
    };
}
export default connect(mapStateToProps)(TransferDetailMaster);


