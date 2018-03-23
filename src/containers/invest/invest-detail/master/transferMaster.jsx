import React from 'react';
import PropTypes from 'prop-types';
import  {getData}  from '../../../../assets/js/getData';
import {  Link} from 'react-router-dom';
import StepperInput from '../../../../components/stepperInput/stepperInput';
import { Modal } from 'antd';
import {income,addCommas} from "../../../../assets/js/cost";
import ModalInvest from '../modal-invest/modalInvest';
import ModalRecharge from '../modal-recharge/modaRecharge'
import ModalRiskAssess from '../modal-riskAssess/modal-riskAssess';
import { connect } from 'react-redux';
import {memberAc} from '../../../../actions/member'
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
        let {investAmount}=this.state;
        console.log('投资信息');
        console.log(this.props);
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
                            <InvestBox investInfo={investInfo} auth={auth} member={member} />
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
                                    proId:investInfo.id,
                                    investAmount:(investAmount>0)?investAmount:investInfo.minInvestAmount,  //投资金额
                                    proMinInvestAmount:investInfo.minInvestAmount,   //起投金额
                                    proMaxInvestAmount:(investInfo.maxInvestAmount<investInfo.surplusAmount)?investInfo.maxInvestAmount:investInfo.surplusAmount, //投资上限
                                    proIncreaseAmount:investInfo.increaseAmount,    //递增金额
                                    restMoney:investInfo.surplusAmount,//标的剩余金额
                                    rate:investInfo.annualRate, //年化收益
                                    loanApplyExpiry:investInfo.transferPeriod,  //投资期限
                                    callback:(obj)=>{
                                        this.toggleModal(`modalInvest`,false);
                                        dispatch(investDetailActions.getData(investInfo.projectId,investInfo.id));  //投资成功重载数据
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
                                    proId:investInfo.pid,
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
class InvestBox extends React.Component {
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
    getStatusName(status,id){
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
            case 6:
                investButton=<Link to={`/invest-detail/${id}`} className="btn end">已流标</Link>;
                break;
            case 5:
                investButton=<Link to={`/invest-detail/${id}`} className="btn end">已结清</Link>;
                break;
        }
        return investButton;

    }
    render(){
        let {member,auth}=this.props;
        let investInfo=this.props.investInfo;
        console.log('-----------auth---------');
        console.log(this.props);
        let button=``;
        if(!auth.isAuthenticated){
            button=<Link  to={`/login?redirect=%2invest-detail%${investInfo.id}%${investInfo.projectId}`} className="btn">我要登录</Link>;
        }else{
            if(!member.isOpenAccount){
                button=<a  className="btn" onClick={()=>{window.location.href="http://www.baidu.com?redirect"}}>立即开户</a>
            }else{
                if(!member.isFxpg){
                    button=<a className="btn" onClick={() => this.toggleModal(`modalRiskAssess`,true,investInfo.id)}>立即风险评估（级别不够）</a>
                }else{
                    if((member.accountBalance<investAmount)){
                        button=<a className="btn" onClick={() => this.toggleModal(`modalRecharge`,true,investInfo.id)}>立即充值(仅限新手)</a>
                    }else{
                        console.log('this.state.tips='+this.state.tips);
                        if(this.state.tips!=''){
                            button=<a className='btn end'>立即投资</a>
                        }else{
                            button=<a className='btn' onClick={() => this.toggleModal(`modalInvest`,true,investInfo.id)}>立即投资</a>
                        }

                    }
                }
            }
        }
        if(investInfo==''){
            return (
                <div className="form_area">

                </div>
            )
        }else if(investInfo.transStatus!=2){
            return(
                <div className="form_area">
                    <ul className="m-amount">
                        <li><strong>开放金额：</strong>{investInfo.transAmt}元</li>
                    </ul>
                    {this.getStatusName(investInfo.transStatus,investInfo.id)}
                </div>
            )
        }
        else{
            return(
                <div className="form_area">
                    <ul className="m-amount">
                        <li><strong>开放金额：</strong>{investInfo.transAmt}元</li>
                        <li><strong>可投金额：</strong>{investInfo.surplusAmount}元</li>
                    </ul>
                    <StepperInput config = {
                        {
                            defaultValue:investInfo.minInvestAmount, //默认金额
                            min:investInfo.minInvestAmount,
                            max:(investInfo.maxInvestAmount<investInfo.surplusAmount)?investInfo.maxInvestAmount:investInfo.surplusAmount,
                            step:investInfo.increaseAmount,
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
                                (auth.isAuthenticated)? `${member.accountBalance} 元`
                                    : <Link  to={`/login?redirect=%2invest-detail%${investInfo.id}`} >登陆查看</Link>
                            }
                        </li>
                        <li>
                            <strong>可用红包总计：</strong>
                            {
                                (JSON.stringify(member) == '{}')? `${member.redAmount} 元`
                                    : <Link  to={`/login?redirect=%2invest-detail%${investInfo.id}`} >登陆查看</Link>
                            }
                        </li>
                        <li>
                            <strong>可用加息券：</strong>
                            {
                                (JSON.stringify(member) == '{}')? `${member.rateNum} 张`
                                    : <Link  to={`/login?redirect=%2invest-detail%${investInfo.id}`} >登陆查看</Link>
                            }
                        </li>
                        <li><strong>预期可赚取：</strong> <i id="money">
                            {(this.state.investAmount==0)?income(investInfo.minInvestAmount,(investInfo.annualRate),investInfo.transferPeriod,'m')
                                :addCommas(income(this.state.investAmount,(investInfo.annualRate),investInfo.transferPeriod,'m'))
                            }

                        </i>元
                        </li>
                    </ul>
                    {button}
                </div>
            )
        }
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


