import React from 'react';
import PropTypes from 'prop-types';
import StepperInput from '../../../../components/stepperInput/stepperInput';
import { connect } from 'react-redux';
import  investDetailActions  from '../../../../actions/invest-detail';
import  {memberAc}  from '../../../../actions/member';
class TransferDetailMaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
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
        /*let url = `http://172.16.1.221:9090/detail`;
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
            raiseRate:0,//加息
            repayType:'按月付息，到期还本',//还款方式
            loanApplyExpiry:3,   				//投资期限，单位
            sxDateTemp:'2017-01-10',                         //上线日期
            jsDateTemp:'2017-01-29',                         //结束日期
            mjNumTemp:'19',                         //募集天数
            fkDateTemp:'2017-01-29',                         //放款日期
            hkDateTemp:'每月8号',                         //还款日期
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
        })*/
        if(this.props.auth.isAuthenticated){
            this.props.dispatch(memberAc.getInfo());
        }
        this.props.dispatch(investDetailActions.getInvestInfo(this.props.id));
    }
    render(){
        //console.log(this.state);
        let {member,auth,investInfo,type}=this.props;
        //let {investInfo}=this.props.investDetail;
        //let {member,auth}=this.props;
        //let {project,member,investAmount}=this.state;
        return (
            <div>
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
                            {/*<ul className="m-amount">
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
                                                (member.user='')? <a className="btn" href="#">我要登录(增加仅限新手，重新测评)</a>
                                                    : (!member.isOpenAccount)?<a className="btn" href="#">立即开户</a>
                                                    :(!member.isFxpg)?<a className="btn" href="#">立即风险评估</a>
                                                        :(member.accountBalance<investAmount)? <a className="btn" href="#">立即充值</a>
                                                            :<a className="btn" href="#">立即投资</a>
                                            }

                                        </div>

                                    </div>*/}
                            {(investInfo !=``)?
                                < InvestBox investInfo={investInfo} auth={auth} member={member} >12311111</InvestBox>
                                :``}
                        </div>
                    </div>
                    <ul className="detail steps">
                        <li className="step1"><i className="iconfont icon-1"></i>
                            <dl>
                                <dt>债转发布</dt>
                                <dd>发布日期：{project.sxDateTemp}</dd>
                            </dl>
                        </li>
                        <li className="step2"><i className="iconfont icon-2"></i>
                            <dl>
                                <dt>债转募集</dt>
                                <dd>结束日期：{project.jsDateTemp}</dd>
                            </dl>
                        </li>
                        <li className="step3"><i className="iconfont icon-3"></i>
                            <dl>
                                <dt>原项目放款</dt>
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
            </div>
        )
    }
}

class InvestBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            member:{},
            investAmount:props.investInfo.minInvestAmount,
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

    };
    bindCard(){
        this.props.dispatch(memberAc.postOpenAccount());  //绑卡
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
    //是否登录，根据是否开户，是否需要风险测评，是否新手，投资金额，获取操作按钮
    //noviceStatus 是否新手（0：不是；1：是） ,
    //openAccountStatus (integer, optional): 开户状态（0：未开户；1：已开户） ,
    //riskStatus (integer, optional): 是否风险测评（0：未测评；1：已测评） ,
    //auth.isAuthenticated true登录 false未登录
    getButton(){
        console.log('aaaaaaaaaaaaaaaaaaaa');
        let {auth,member,investInfo}=this.props;
        console.log(this.props.auth);
        console.log(this.props.member);
        let {openAccountStatus,riskStatus,riskLevel,amount,noviceStatus}=member.accountsInfo;
        console.log(investInfo);
        if(!auth.isAuthenticated){
            //
            return(
                <Link  to={`/login?redirect=%2Finvest-detail%2F${investInfo.id}`} className="btn">我要登录</Link>
            )
        }else if(openAccountStatus===0){
            return(
                <a  className="btn" onClick={()=>{this.bindCard}}>立即开户</a>
            )
        }else if(openAccountStatus===1){
            if(riskStatus===`0`){
                return(
                    <a className="btn" onClick={() => this.toggleModal(`modalRiskAssess`,true,investInfo.id)}>立即风险评估</a>
                )
            }else if(riskLevel==='riskLevel'){
                return(
                    <a className="btn" onClick={() => this.toggleModal(`modalRiskAssess`,true,investInfo.id)}>重新风险评估</a>
                )
            }else if(noviceStatus===1 && investInfo.noviceLoan=='1'){
                return(
                    <a className='btn end'>仅限新手</a>
                )
            }else　if(amount.availableBalance<this.state.investAmount){
                return(
                    <a className="btn" onClick={() => this.toggleModal(`modalRecharge`,true,investInfo.id)}>立即充值</a>
                )
            }else{
                if(this.state.tips!=''){
                    return(
                        <a className='btn end'>立即投资</a>
                    )
                }else{
                    return(
                        <a className='btn' onClick={() => this.toggleModal(`modalInvest`,true,investInfo.id)}>立即投资</a>
                    )
                }
            }
        }
    }
    render(){
        let {member,auth}=this.props;
        let investInfo=this.props.investInfo;
        let {amount,redInfo,couponInfo}=member.accountsInfo;
        /*let button=``;
        //auth.isAuthenticated
        if(1==2){
            button=<Link  to={`/login?redirect=%2invest-detail%${investInfo.id}`} className="btn">我要登录</Link>;
        }else{
            if(openAccountStatus=0){
                button=<a  className="btn" onClick={()=>{window.location.href="http://www.baidu.com?redirect"}}>立即开户</a>
            }else{
                if(riskStatus=0){
                    button=<a className="btn" onClick={() => this.toggleModal(`modalRiskAssess`,true,investInfo.id)}>立即风险评估</a>/!*（级别不够）*!/
                }else{
                    if((amount.availableBalance<this.state.investAmount)){
                        button=<a className="btn" onClick={() => this.toggleModal(`modalRecharge`,true,investInfo.id)}>立即充值</a>/!*(仅限新手)*!/
                    }else{
                        //console.log('this.state.tips='+this.state.tips);
                        if(this.state.tips!=''){
                            button=<a className='btn end'>立即投资</a>
                        }else{
                            button=<a className='btn' onClick={() => this.toggleModal(`modalInvest`,true,investInfo.id)}>立即投资</a>
                        }

                    }
                }
            }
        }*/
        if(investInfo==''){
            return (
                <div className="form_area"></div>
            )
        }else if(investInfo.status!=2){
            return(
                <div className="form_area">
                    <ul className="m-amount">
                        <li><strong>开放金额：</strong>{investInfo.money}元</li>
                    </ul>
                    {this.getStatusName(investInfo.status,investInfo.id)}
                </div>
            )
        }
        else{
            return(
                <div>
                    <div className="form_area">
                        <div>
                            <ul className="m-amount">
                                <li><strong>开放金额：</strong>{investInfo.money}元</li>
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
                                    <strong>我的可用余额：</strong>
                                    {
                                        (1==1)? `${toMoney(amount.availableBalance)} 元`
                                            : <Link  to={`/login?redirect=%2invest-detail%${investInfo.id}`} >登陆查看</Link>
                                    }
                                </li>
                                <li>
                                    <strong>可用红包总计：</strong>
                                    {
                                        (1==1)? `${toMoney(redInfo.amountSum)} 元`
                                            : <Link  to={`/login?redirect=%2invest-detail%${investInfo.id}`} >登陆查看</Link>
                                    }
                                </li>
                                <li>
                                    <strong>可用加息券：</strong>
                                    {
                                        (1==1)? `${toNumber(couponInfo.number)} 张`
                                            : <Link  to={`/login?redirect=%2invest-detail%${investInfo.id}`} >登陆查看</Link>
                                    }
                                </li>
                                <li>
                                    <strong>预期可赚取：</strong>
                                    <i id="money">
                                        {(this.state.investAmount==0)?income(investInfo.minInvestAmount,(investInfo.annualRate),investInfo.loanExpiry,'m')
                                            :income(this.state.investAmount,(investInfo.annualRate),investInfo.loanExpiry,'m')
                                        }
                                    </i>元
                                </li>
                            </ul>
                            {this.getButton()}

                        </div>
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
                            <ModalInvest config = {
                                {

                                    investAmount:this.state.investAmount,  //投资金额
                                    //账户余额
                                    callback:(obj)=>{
                                        this.toggleModal(`modalInvest`,false);
                                        this.props.dispatch(memberAc.modifyState({accountsInfo:``}));
                                        this.props.dispatch(memberAc.getInfo());  //充值成功重载数据
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
                        onCancel={() => this.toggleModal(`modalRecharge`,false,'')}
                    >
                        {this.state.modalRecharge===true?
                            <ModalRecharge
                                config = {
                                    {
                                        proId:investInfo.id,
                                        accountBalance:amount.accountBalance,  //账户余额
                                        callback:(obj)=>{
                                            this.toggleModal(`modalRecharge`,false);
                                            this.props.dispatch(memberAc.modifyState({accountsInfo:``}));
                                            this.props.dispatch(memberAc.getInfo());  //充值成功重载数据
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
                            <MyRiskAssess
                                config={{
                                    callback:(obj)=>{
                                        this.toggleModal(`modalRiskAssess`,false);
                                        this.props.dispatch(investDetailActions.getData(investInfo.id));  //重载数据
                                    }
                                }}
                            />:''
                        }
                    </Modal>
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