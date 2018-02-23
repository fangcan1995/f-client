import React from 'react';
import PropTypes from 'prop-types';
import  {getData}  from '../../../../assets/js/getData';
import StepperInput from '../../../../components/stepperInput/stepperInput';
import { Modal } from 'antd';
import {income} from "../../../../assets/js/cost";
import ModalInvest from '../modal-invest/modalInvest';
import ModalRiskAssess from '../modal-riskAssess/modal-riskAssess';

export default class InvestDetailMaster extends React.Component {
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
    //载入数据
    loadData(){
        let data=getData(`http://localhost:9002/detail`);
        if (data){
            //与后台对接
        }else{
            let mockDate={
                data: {
                    project: {
                        pid:'1',
                        projectName:'汇车贷_HCD201701080001',
                        greenHand:1,   //是否新手标
                        greenName:'新手',
                        applyAmt:100000,  //借款金额
                        minMoneyTemp:1000,                  //本标的起投金额
                        maxMoneyTemp:10000,               //单笔投资上限
                        rangeMoneyTemp:100,              //递增金额
                        restMoneyTemp:1980,   			//标的剩余金额
                        process:50,
                        rate:8,    					//年化收益，单位%
                        raiseRate:4,//加息
                        repayType:'按月付息，到期还本',//还款方式
                        loanApplyExpiry:3,   				//投资期限，单位
                        sxDateTemp:'2017-01-10',                         //上线日期
                        jsDateTemp:'2017-01-29',                         //结束日期
                        mjNumTemp:'19',                         //募集天数
                        fkDateTemp:'',                         //放款日期
                        hkDateTemp:'',                         //还款日期
                    },  //标的
                    memberInfo: {
                        user:1,//是否登录
                        isGreen:true, //是否新手
                        isOpenAccount:true,             //是否开户
                        isFxpg:true,
                        accountBalance:2000, //账户余额
                        redAmount:1548, //红包金额
                        rateNum:3, //加息券数量

                    },  //会员信息
                },
                code: "0",
                message: "SUCCESS",
            };
            let {project,memberInfo}=mockDate.data;
            this.setState({
                project:project,
                member:memberInfo,
                investAmount:project.minMoneyTemp
            },()=>{
            });
        }

    }
    componentDidMount () {
        this.loadData();
    }
    render(){
        let {project,member,investAmount}=this.state;
        return (
            <div>
                {
                    JSON.stringify(this.state.project) != "{}" ?
                        <div>
                            <div className="master">
                                <dl className="info">
                                    <dt className="title">
                                        <h2>抵押标</h2>
                                        <p>{project.projectName}</p>
                                    </dt>
                                    <dd className="content">
                                        <dl className="item1">
                                            <dt className="subtitle">预期年化回报率</dt>
                                            <dd>
                                                <i>{project.rate+project.raiseRate}</i>%
                                                {project.raiseRate>0 ?
                                                    <div className="addtips"><strong>{project.greenName}已奖4.0%</strong></div>
                                                    :''
                                                }
                                            </dd>

                                        </dl>
                                        <dl className="item2">
                                            <dt className="subtitle">锁定期限</dt>
                                            <dd><i>{project.loanApplyExpiry}</i>个月</dd>
                                        </dl>
                                        <dl className="item3">
                                            <dt className="subtitle">起投金额</dt>
                                            <dd><i>{project.minMoneyTemp}</i>元</dd>
                                        </dl>
                                        <dl className="progressbar">
                                            <dt><div className="finished" style={{ width:`${project.process}%`}}><i className="iconfont">&#xe64d;</i></div></dt>
                                            <dd><strong>投资进度：<em>{project.process}%</em></strong></dd>
                                        </dl>
                                        <ul className="safe">
                                            <li><i className="iconfont icon-star"></i>国企背景</li>
                                            <li><i className="iconfont icon-user"></i>真实借款</li>
                                            <li><i className="iconfont icon-heart"></i>实物抵押</li>
                                            <li><i className="iconfont icon-money"></i>{project.repayType}</li>
                                        </ul>
                                    </dd>
                                </dl>
                                {/**/}
                                <div className="m-invest">
                                    <ul className="m-amount">
                                        <li><strong>开放金额：</strong>{project.applyAmt}元</li>
                                        <li><strong>可投金额：</strong>{project.restMoneyTemp}元</li>
                                    </ul>
                                    <div className="form_area">
                                        <StepperInput config = {
                                            {
                                                defaultValue:investAmount,
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
                                                    (member.user='')? <a href="#">登陆查看</a>
                                                        : `${member.accountBalance} 元`
                                                }
                                            </li>
                                            <li>
                                                <strong>可用红包总计：</strong>
                                                {
                                                    (member.user='')? <a href="#">登陆查看</a>
                                                        : `${member.redAmount} 元`
                                                }
                                            </li>
                                            <li>
                                                <strong>可用加息券：</strong>
                                                {
                                                    (member.user='')? <a href="#">登陆查看</a>
                                                        : `${member.rateNum} 张`
                                                }
                                            </li>
                                            <li><strong>预期可赚取：</strong> <i id="money">
                                                {income(investAmount,(project.rate+project.raiseRate),project.loanApplyExpiry,'m')}</i> 元
                                            </li>
                                        </ul>
                                        <div className="form_bar">
                                            {
                                                (member.user='')? <button className="button able" >
                                                    我要登录
                                                </button>:''
                                            }
                                            {
                                                (!member.isOpenAccount)?<button className="button able" >
                                                    立即开户
                                                </button>:''
                                            }
                                            {
                                                (!member.isFxpg)?
                                                    <button className="button able" onClick={() => this.toggleModal(`modalRiskAssess`,true,project.pid)}>
                                                        立即风险评估
                                                    </button>
                                                    :''
                                            }
                                            {
                                                (member.accountBalance<investAmount)?
                                                    <button className="button able" onClick={() => this.toggleModal(`modalRecharge`,true,project.pid)}>
                                                        立即充值
                                                    </button>
                                                    :
                                                    (this.state.code == 100) ?
                                                        <button className="button able" onClick={() => this.toggleModal(`modalInvest`, true, project.pid)}>
                                                            立即投资
                                                        </button>
                                                        : <button className="button unable">立即投资</button>

                                            }
                                            {/*<button className="button unable">满标待审核</button>*/}


                                            {/*{
                                                (member.user='')? <a className="btn" href="#">我要登录</a>
                                                    : (!member.isOpenAccount)?<a className="btn" href="#" >立即开户</a>
                                                    :(!member.isFxpg)?<a className="btn" onClick={() => this.toggleModal(`modalRiskAssess`,true,project.pid)}>立即风险评估</a>
                                                        :(member.accountBalance<investAmount)? <a className="btn" onClick={() => this.toggleModal(`modalRecharge`,true,project.pid)}>立即充值</a>
                                                            :<a className="btn enable" onClick={() => this.toggleModal(`modalInvest`,true,project.pid)}>立即投资</a>
                                            }*/}

                                        </div>

                                    </div>
                                </div>
                            </div>
                            <ul className="detail steps">
                                <li className="step1"><i className="iconfont icon-1"></i>
                                    <dl>
                                        <dt>项目上线</dt>
                                        <dd>上线日期：{project.sxDateTemp}</dd>
                                    </dl>
                                </li>
                                <li className="step2"><i className="iconfont icon-2"></i>
                                    <dl>
                                        <dt>项目募集<em>(募集总时间:{project.mjNumTemp}天)</em></dt>
                                        <dd>结束日期：{project.jsDateTemp}</dd>
                                    </dl>
                                </li>
                                <li className="step3"><i className="iconfont icon-3"></i>
                                    <dl>
                                        <dt>项目放款</dt>
                                        <dd>放款日期：
                                            {(project.fkDateTemp!='')? `${project.fkDateTemp} ` : '— —'}
                                        </dd>
                                    </dl>
                                </li>
                                <li className="step4"><i className="iconfont icon-4"></i>
                                    <dl>
                                        <dt>项目还款</dt>
                                        <dd>还款日期：{(project.hkDateTemp!='')? `${project.hkDateTemp} ` : '— —'}</dd>
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
                    footer={null}
                    onCancel={() => this.toggleModal(`modalInvest`,false,'')}
                >
                    {this.state.modalInvest===true?
                        <ModalInvest
                            config = {
                                {
                                    proId:1,
                                    investAmount:this.state.investAmount,  //投资金额
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
                    footer={null}
                    onCancel={() => this.toggleModal(`modalRecharge`,false,'')}
                >
                    {this.state.modalRecharge===true?
                        <div>充值</div>:''
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

