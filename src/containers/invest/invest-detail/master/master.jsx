import React from 'react';
import PropTypes from 'prop-types';
import StepperInput from '../../../../components/stepperInput/stepperInput';
export default class InvestDetailMaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    /**
     * 计算收益函数
     * @param val投资额 y_per年化收益 time type
     * @returns 收益
     */
    income(val,y_per,time,type){
        //按月投资
        let amount=0;
        if(type=='m'){
            amount=(val * (y_per / 100)) / 12 * time;
        }
        //按天投资
        if(type=='d'){
            amount=(val * (y_per / 100)) / 365 * time.toFixed(2);
        }
        return amount.toFixed(2);
    }
    componentDidMount () {
        let url = `http://172.16.1.221:9090/detail`;
        fetch(url,{method:"get"})
            .then( (res)=>{
                if (res.status == 200){
                    return res;
                }
            })
            .then((res) => {
                res.json();
            }).then(
                this.setState({
                })
            ).catch((err) => {
                //console.log("Fetch错误:"+err);
                console.log('跳转到404页面');
                }
            );
        let data={
            projectName:'汇车贷_HCD201701080001',
            greenHand:1,   //是否新手标
            greenName:'新手',
            applyAmt:100000,  //借款金额
            minMoneyTemp:1000,                  //本标的起投金额
            maxMoneyTemp:200000,               //单笔投资上限
            rangeMoneyTemp:100,              //递增金额
            restMoneyTemp:50000,   			//标的剩余金额
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
        };
        let memberInfo={
            user:1,//是否登录
            isGreen:true, //是否新手
            isOpenAccount:true,             //是否开户
            isFxpg:true,
            accountBalance:1000, //账户余额
            redAmount:1548, //红包金额
            rateNum:3, //加息券数量

        }
        this.setState({
            project:data,
            member:memberInfo,
            investAmount:data.minMoneyTemp
        })
    }
    render(){
        //console.log(this.state);
        let {project,member,investAmount}=this.state;
        return (
            <div>
                {
                    JSON.stringify(this.state) == "{}" ? <div>loading</div>
                        :

                        <div className="wrapper">
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
                                                cost:(obj)=>{
                                                    this.setState({
                                                        investAmount:obj.value
                                                    });
                                                }
                                            }
                                        }
                                        >
                                        </StepperInput>
                                        <ul className="others">
                                            <li>
                                                <i className="iconfonticon-user"></i> <strong>
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
                                                {this.income(investAmount,(project.rate+project.raiseRate),project.loanApplyExpiry,'m')}</i> 元
                                            </li>
                                        </ul>
                                        <div className="form_bar">
                                            {
                                                (member.user='')? <a className="btn" href="#">我要登录</a>
                                                    : (!member.isOpenAccount)?<a className="btn" href="#">立即开户</a>
                                                    :(!member.isFxpg)?<a className="btn" href="#">立即风险评估</a>
                                                        :(member.accountBalance<investAmount)? <a className="btn" href="#">立即充值</a>
                                                            :<a className="btn" href="#">立即投资</a>
                                            }

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
                }
            </div>
        )
    }
}

