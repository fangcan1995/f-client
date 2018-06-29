import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StepperInput from '../../../../components/stepperInput/stepperInput';
import {income} from "../../../../utils/cost";
import {addCommas, toMoney, toNumber} from "../../../../utils/famatData"
import {  withRouter,Link} from 'react-router-dom';
import  {accountAc}  from '../../../../actions/account';
import {InvestButton} from '../../invest-list/investComponents';
import investDetailActions from "../../../../actions/invest-detail";
import BbhModal from "../../../../components/modal/bbh_modal";
import {modal_config} from "../../../../utils/modal_config";
import { Button,Popconfirm} from 'antd';


class MasterInvestBox extends Component {
    constructor(props) {
        super(props);
        let defaultValue=``;
        if(props.investInfo.returnAmount){
            if(this.checkMoney(props.investInfo.returnAmount).code==100) {
                defaultValue = props.investInfo.returnAmount;
            }
        }else{
            defaultValue=props.investInfo.min;
        }
        this.state = {
            member:{},
            investAmount:defaultValue,
            bbhModal:false,
            currentModule:``,
            tips:'',
            code:100
        }
    }

    componentDidMount () {
        if(this.props.auth.isAuthenticated){
            this.props.dispatch(accountAc.getAccountInfo());  //获取会员帐户信息
        }
    }
    checkMoney(value){
        /*console.log('//////////');
        console.log(value);*/
        const {min,max,step,surplusAmount} = this.props.investInfo;
        if(value.length<=0){
            return {code:0,tips:'请输入投资金额'};
        }else {
            let reg=/^\+?[1-9][0-9]*$/;
            if(reg.test(value)){
                if(value<min){
                    return {code:2,tips: `最低可投${min}元`};
                }else if(value>max){
                    return {code:3,tips: `最高可投${max}元`};
                }else{
                    /*if((surplusAmount-value)<min && max!=value){
                        return {code:4,tips: `投资后剩余金额不能小于起投金额，请投满剩余金额或留出最小投资金额`};
                    }*/
                    if(value%step!=0 && max!=value){
                        return {code:4,tips: `必须是${step}的倍数`};
                    }
                    return {code:100,tips: ``};
                }
            }else{
                return {code:1,tips: `金额格式不正确`};
            };
        };
    }
    handle_confirmRechange() {
        let {dispatch, account,investInfo} = this.props;
        let {accountsInfo}=account;
        let {availableBalance}=accountsInfo;
        let value=this.state.investAmount-availableBalance;
        dispatch(accountAc.getFuyouInfo({type:'reCharge',url:'transfer-detail_'+investInfo.id+'_'+investInfo.projectId,value:value}))
            .then((res)=>{
                let toOthersInfo=res.value;
                if(toOthersInfo.code==406  ){
                    console.log('不能充值');
                }else if(toOthersInfo!=``){
                    document.getElementById('webReg').submit();
                }
            })
            .catch(()=>{
                //没获取到
            });
    }
    handle_confirmRisk(){
        window.location='/my-settings/my-riskAssess';
    }
    //模态框开启关闭
    toggleModal=(modal,visile,id)=>{
        //
        let {isCertification,isOpenAccount,isSetTradepassword,isRisk,riskLevel,surplusAmount,availableBalance}=this.props.account.accountsInfo;
        let currentModule=``;
        if(isCertification===`0`) {
            currentModule = `ModalSteps`;   //没有实名认证
        }else if(isCertification===`1`){
            //完成实名认证
            if(isOpenAccount==='0' && isSetTradepassword===`0`){
                currentModule = `ModalSteps`;  //实名认证,未开户，未设置交易密码，跳到三步走第二部
            }else if(isOpenAccount===`0`){
                currentModule = `ModalBindCard`;  //去开户
            }else if(isSetTradepassword===`0`){
                currentModule = `ModalTradePassword`;  //去交易密码
            }else{
                //完成开户和设置交易密码
                if(isRisk==='0'){
                    currentModule = `ModalRiskAssess`;   //去测评
                }else if(isRisk==='1'){
                    //测评结果中剩余的可投限额不小于投资金额(暂时用1000替代)
                    if(surplusAmount>=1000){
                        //currentModule=`ModalInvestSteps`;  //去投资
                        if(availableBalance<this.state.investAmount){
                            currentModule=`ModalRecharge`//去充值
                        }else{
                            currentModule=`ModalInvest`;  //去投资
                        }

                    }else{
                        currentModule = `ModalRiskAssess`;   //去测评
                    }
                }
            }
        }
        if(visile){
            this.setState({
                currentModule:currentModule,
                [modal]: true,
            });
        }else{
            this.setState({
                currentModule:``,
                [modal]: false,
                key:Math.random(),
            });
        }
        //

    };
    closeModal(status){
        const {investInfo,dispatch}=this.props;
        dispatch(accountAc.getAccountInfo());  //成功重载数据
        if(investInfo.isTransfer==`1`){
            dispatch(investDetailActions.getInvestInfo(investInfo.projectId)).then(()=>{
                const {investDetail}=this.props;
                    this.setState({
                        investAmount:(investDetail.investInfo.surplusAmount>investInfo.min)? investInfo.min:investDetail.investInfo.surplusAmount
                    })//修改默认投资金额
                }
            );   //标的信息
            dispatch(investDetailActions.getInvestRecords(investInfo.projectId));//投资记录
            dispatch(investDetailActions.getTransferInvestRecords(investInfo.id)); //债转投资记录
        }else{
            dispatch(investDetailActions.getInvestInfo(investInfo.id)).then(()=> {
                    const {investDetail}=this.props;
                    this.setState({
                        investAmount: (investDetail.investInfo.surplusAmount > investInfo.min) ? investInfo.min : investDetail.investInfo.surplusAmount
                    })//修改默认投资金额
                }
            );   //标的信息
            dispatch(investDetailActions.getInvestRecords(investInfo.id));//投资记录
        }
        this.toggleModal('bbhModal',false);
    }
    render(){
        let {account,auth,investInfo,type,investDetail}=this.props;
        let {isFetching,accountsInfo,toOthersInfo}=account;
        let {availableBalance,memberRedInfo,memberCoupon,postResult,isCertification,isOpenAccount,isRisk,riskLevel,isNovice,surplusAmount}=accountsInfo;
        let loginReturnUrl=``;
        if(investInfo.isTransfer==`1`){
            loginReturnUrl=`/login?redirect=%2Ftransfer-detail%2F${investInfo.id}%2F${investInfo.projectId}`
        }else{
            loginReturnUrl=`/login?redirect=%2Finvest-detail%2F${investInfo.id}`
        }

        return(
            <div className="form_area">
                {investInfo===``?``
                    :(investInfo.status!=2)?
                        <div>
                            <ul className="m-amount">
                                <li><strong>开放金额：</strong>{addCommas(toMoney(investInfo.money))}元</li>
                            </ul>
                            <InvestButton status={investInfo.status} id={investInfo.id} />
                        </div>
                        :<div>
                            <ul className="m-amount">
                                <li><strong>开放金额：</strong>{addCommas(investInfo.money)}元</li>
                                <li><strong>可投金额：</strong>{addCommas(investInfo.surplusAmount)}元</li>
                            </ul>
                            <StepperInput config = {{
                                    defaultValue:this.state.investAmount, //默认金额
                                    returnAmount:investInfo.returnAmount,
                                    min:investInfo.min,
                                    max:investInfo.max,
                                    step:investInfo.step,
                                    surplusAmount:investInfo.surplusAmount,
                                    callback:(obj)=>{
                                        this.setState({
                                            tips:obj.tips,
                                            investAmount:parseFloat(obj.value),
                                            code:obj.code
                                        });
                                    }
                                }}>
                            </StepperInput>
                            <div className="tips__area">
                                {this.state.tips!=''? <span className="errorMessages">{this.state.tips}</span>
                                    :''}
                            </div>
                            {(!auth.isAuthenticated)?
                                <div>
                                    <ul className="others">
                                        <li>
                                            <strong>我的可用余额：</strong>
                                            <Link  to={loginReturnUrl} >登陆查看</Link>
                                        </li>
                                        <li>
                                            <strong>可用红包总计：</strong>
                                            <Link  to={loginReturnUrl} >登陆查看</Link>
                                        </li>
                                        <li>
                                            <strong>可用加息券：</strong>
                                            <Link  to={loginReturnUrl} >登陆查看</Link>
                                        </li>
                                        <li>
                                            <strong>预期可赚取：</strong>
                                            <i id="money">
                                                {(this.state.investAmount==0)?
                                                    (this.state.investAmount)
                                                    :income(this.state.investAmount,(investInfo.rate),investInfo.loanExpiry,'m')
                                                }
                                            </i>元
                                        </li>
                                    </ul>
                                    <div>
                                        <Link  to={loginReturnUrl} className="btn">我要登录</Link>
                                    </div>
                                </div>
                                :<div>
                                    <ul className="others">
                                        <li>
                                            <strong>我的可用余额：</strong>
                                            {(accountsInfo!=``)? `${toMoney(availableBalance)} ` : ``} 元
                                        </li>
                                        <li>
                                            <strong>可用红包总计：</strong>
                                            {(accountsInfo!=``)? `${toMoney(memberRedInfo.amountSum)} ` : ``} 元
                                        </li>
                                        <li>
                                            <strong>可用加息券：</strong>
                                            {(accountsInfo!=``)? `${memberRedInfo.number} ` : ``} 张
                                        </li>
                                        <li>
                                            <strong>预期可赚取：</strong>
                                            <i id="money">
                                                {(this.state.investAmount==0)?toMoney(this.state.investAmount)
                                                    :income(this.state.investAmount,(investInfo.rate),investInfo.loanExpiry,'m')
                                                }
                                            </i>元
                                        </li>
                                    </ul>
                                    <div>
                                        {
                                            (accountsInfo===``)?``
                                                :(investInfo.noviceLoan=='1' && isNovice==='0')?<Button type="primary"  className="pop__wp100" disabled={true}>仅限新手</Button>
                                                :<Button type="primary" onClick={() => this.toggleModal(`bbhModal`,true)} className="pop__wp100" disabled={isFetching || this.state.code!=100}>立即投资</Button>

                                        }

                                    </div>
                                    <form name="webReg" id="webReg" method="post"  action={toOthersInfo.url}>
                                        <input type="hidden" name="mchnt_cd" value={toOthersInfo.mchnt_cd} />
                                        <input type="hidden" name="mchnt_txn_ssn" value={toOthersInfo.mchnt_txn_ssn} />
                                        <input type="hidden" name="login_id" value={toOthersInfo.login_id} />
                                        <input type="hidden" name="amt" value={toOthersInfo.amt} />
                                        <input type="hidden" name="page_notify_url" value={toOthersInfo.page_notify_url} />
                                        <input type="hidden" name="back_notify_url" value={toOthersInfo.back_notify_url} />
                                        <input type="hidden" name="signature" value={toOthersInfo.signature} />
                                    </form>
                                </div>
                            }
                        </div>
                }
                {this.state.currentModule!=``?
                    investInfo.isTransfer==`1`?
                        <BbhModal
                            config={modal_config[this.state.currentModule]}
                            visible={this.state.bbhModal}
                            closeFunc={()=>this.closeModal()}
                            moduleName={this.state.currentModule}
                            investAmount={this.state.investAmount}
                            returnPage={`transfer-detail_${investInfo.id}_${investInfo.projectId}_${this.state.investAmount}`}
                            isTransfer={`1`}
                        >
                        </BbhModal>
                        : <BbhModal
                            config={modal_config[this.state.currentModule]}
                            visible={this.state.bbhModal}
                            closeFunc={()=>this.closeModal()}
                            moduleName={this.state.currentModule}
                            investAmount={this.state.investAmount}
                            returnPage={`invest-detail_${investInfo.id}_${this.state.investAmount}`}
                            isTransfer={`0`}
                        >
                        </BbhModal>
                    :``
                }
            </div>
        )

    }
}
function mapStateToProps(state) {
    const { auth,account,investDetail } = state.toJS();
    return {
        auth,
        account,
        investDetail
    };
}
export default  connect(mapStateToProps)(MasterInvestBox);