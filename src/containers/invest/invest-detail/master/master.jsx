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

class InvestDetailMaster extends React.Component {
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
    render(){
        console.log('------userIsAuthenticated--------');
        //console.log(userIsAuthenticated);
        let {investAmount}=this.state;
        console.log('投资信息');
        console.log(this.props);
        let {dispatch}=this.props;
        let project=this.props.investInfo.data;
        let member=this.props.memberInfo.data;

        return (
            <div>
                {
                    JSON.stringify(project) != "{}" ?
                        <div>
                            <div className="master">
                                <dl className="info">
                                    <dt className="title">
                                        <h2>抵押标</h2>
                                        <p>{project.name}</p>
                                    </dt>
                                    <dd className="content">
                                        <dl className="item1">
                                            <dt className="subtitle">预期年化回报率</dt>
                                            <dd>
                                                <i>{project.annualRate}</i>%
                                                {(project.noviceLoan=='1') ?
                                                    <div className="addtips"><strong>新手</strong></div>
                                                    :''
                                                }
                                            </dd>

                                        </dl>
                                        <dl className="item2">
                                            <dt className="subtitle">锁定期限</dt>
                                            <dd><i>{project.loanExpiry}</i>个月</dd>
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
                                    <ul className="m-amount">
                                        <li><strong>开放金额：</strong>{project.money}元</li>
                                        <li><strong>可投金额：</strong>{project.surplusAmount}元</li>
                                    </ul>
                                    <div className="form_area">
                                        <StepperInput config = {
                                            {
                                                defaultValue:1000, //默认金额investAmount
                                                min:project.minMoneyTemp,
                                                max:(project.maxMoneyTemp<project.restMoneyTemp)?project.maxMoneyTemp:project.restMoneyTemp,
                                                step:project.rangeMoneyTemp,
                                                callback:(obj)=>{
                                                    //console.log(obj);
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
                                            {this.state.tips!=''?
                                                <span className="tips error">{this.state.tips}</span>
                                                :''
                                            }
                                        </div>
                                        <ul className="others">
                                            <li>
                                                <i className="iconfont icon-user"></i> <strong>
                                                我的可用余额：</strong>
                                                {
                                                    (JSON.stringify(member) == '{}')? <a href="#">登陆查看</a>
                                                        : `${member.accountBalance} 元`
                                                }
                                            </li>
                                            <li>
                                                <strong>可用红包总计：</strong>
                                                {
                                                    (JSON.stringify(member) == '{}')? <a href="#">登陆查看</a>
                                                        : `${member.redAmount} 元`
                                                }
                                            </li>
                                            <li>
                                                <strong>可用加息券：</strong>
                                                {
                                                    (JSON.stringify(member) == '{}')? <a href="#">登陆查看</a>
                                                        : `${member.rateNum} 张`
                                                }
                                            </li>
                                            <li><strong>预期可赚取：</strong> <i id="money">
                                                {income(investAmount,(project.rate+project.raiseRate),project.loanApplyExpiry,'m')}</i> 元
                                            </li>
                                        </ul>
                                        <div className="form_bar">

                                            {
                                                (JSON.stringify(member) == '{}')?
                                                    <Link  to="/login?redirect=%2invest-detail%29" className="btn">我要登录</Link>
                                                    : (!member.isOpenAccount)?<a  className="btn" onClick={()=>{window.location.href="http://www.baidu.com?redirect"}}>立即开户</a>
                                                    :(!member.isFxpg)?<a className="btn" onClick={() => this.toggleModal(`modalRiskAssess`,true,project.pid)}>立即风险评估</a>
                                                        :(member.accountBalance<investAmount)? <a className="btn" onClick={() => this.toggleModal(`modalRecharge`,true,project.pid)}>立即充值</a>
                                                            :<a className="btn enable" onClick={() => this.toggleModal(`modalInvest`,true,project.pid)}>立即投资</a>
                                            }

                                        </div>

                                    </div>
                                </div>

                            </div>
                            <ul className="detail steps">
                                <li className="step1"><i className="iconfont icon-1"></i>
                                    <dl>
                                        <dt>项目上线</dt>
                                        <dd>上线日期：{moment(project.putTime).format('YYYY-MM-DD')}</dd>
                                    </dl>
                                </li>
                                <li className="step2"><i className="iconfont icon-2"></i>
                                    <dl>
                                        <dt>项目募集<em>(募集总时间:{project.collectDays}天)</em></dt>
                                        <dd>结束日期：{moment(project.endDate).format('YYYY-MM-DD')}</dd>
                                    </dl>
                                </li>
                                <li className="step3"><i className="iconfont icon-3"></i>
                                    <dl>
                                        <dt>项目放款</dt>
                                        <dd>放款日期：
                                             {(project.fkDateTemp!='')? `${moment(project.fkDateTemp).format('YYYY-MM-DD')} ` : '— —'}
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
                                    proId:1,
                                    investAmount:1000,  //投资金额
                                    proMinInvestAmount:1000,   //起投金额
                                    proMaxInvestAmount:10000, //投资上限
                                    proIncreaseAmount:100,    //递增金额
                                    restMoney:1100,//标的剩余金额
                                    rate:project.rate+project.raiseRate, //年化收益
                                    loanApplyExpiry:project.loanApplyExpiry,  //投资期限
                                    //账户余额

                                    callback:(obj)=>{
                                        this.toggleModal(`modalInvest`,false);
                                        /*this.setState({
                                            status:1
                                        });*/
                                        this.loadData();
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
export default connect(mapStateToProps)(InvestDetailMaster);


