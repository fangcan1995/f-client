import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StepperInput from '../../../../components/stepperInput/stepperInput';
import {income} from "../../../../utils/cost";
import {addCommas, toMoney, toNumber} from "../../../../utils/famatData"
import {  Link} from 'react-router-dom';
import  {accountAc}  from '../../../../actions/account';
import ModalSteps from '../../../../components/modal/modal-steps/modal-steps';
import ModalTradePassword from '../../../../components/modal/modal-tradePassword/modal-tradePassword';
import ModalBindCard from '../../../../components/modal/modal-bindCard/modal-bindCard';
import ModalRiskAssess from '../../../../components/modal/modal-riskAssess/modal-riskAssess';
import ModalInvestSteps from '../../../../components/modal/modal-invest-steps/modal-invest-steps';
import {InvestButton} from '../../invest-list/investComponents';
import investDetailActions from "../../../../actions/invest-detail";
import {formItemLayout} from "../../../../utils/formSetting";
import BbhModal from "../../../../components/modal/bbh_modal";
import { Button} from 'antd';
const modal_config={
    ModalSteps: {
        title: "",
        width: "620px",
        height: "400px"
    },
    ModalBindCard: {
        title: "开户",
        width: "620px",
        height: "400px"
    },
    ModalTradePassword: {
        title: "设置交易密码",
        width: "620px",
        height: "400px"
    },
    ModalRiskAssess: {
        title: "用户风险承受能力测评",
        width: "800px",
        height: "600px"
    },
    ModalInvestSteps: {
        title: "投资",
        width: "620px",
        height: "400px"
    },

}

class MasterInvestBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            member:{},
            investAmount:props.investInfo.min,
            bbhModal:false,
            currentModule:``,
            key:Math.random(),
            tips:'',
            /*allowedInvest:true,*/
            code:100
        }
    }

    componentDidMount () {
        if(this.props.auth.isAuthenticated){
            this.props.dispatch(accountAc.getAccountInfo());  //获取会员帐户信息
        }
    }

    //模态框开启关闭
    toggleModal=(modal,visile,id)=>{
        //
        let {isCertification,isOpenAccount,isSetTradepassword,isRisk,riskLevel,surplusAmount}=this.props.account.accountsInfo;
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
                        currentModule=`ModalInvestSteps`;  //去投资
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
    callback(status){
        this.toggleModal('bbhModal',false);
        //this.props.dispatch(accountAc.modifyState({accountsInfo:``}));
        //this.props.dispatch(accountAc.getInfo());  //成功重载数据
    }
    render(){
        let {account,auth,investInfo,type}=this.props;
        let {isFetching,accountsInfo}=account;
        let {availableBalance,memberRedInfo,memberCoupon,postResult,isCertification,isOpenAccount,isRisk,riskLevel,isNovice}=accountsInfo;
        console.log('--------accountsInfo---------');
        console.log(accountsInfo);
        return(
            <div className="form_area">
                <button onClick={() => this.toggleModal(`bbhModal`,true)}>测试用</button>
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
                                    defaultValue:investInfo.min, //默认金额
                                    min:investInfo.min,
                                    max:investInfo.max,
                                    step:investInfo.step,
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
                                {this.state.tips!=''? <span className="tips error">{this.state.tips}</span>
                                    :''}
                            </div>
                            {(!auth.isAuthenticated)?
                                <div>
                                    <ul className="others">
                                        <li>
                                            <strong>我的可用余额：</strong>
                                            <Link  to={`/login?redirect=%2invest-detail%${investInfo.id}`} >登陆查看</Link>
                                        </li>
                                        <li>
                                            <strong>可用红包总计：</strong>
                                            <Link  to={`/login?redirect=%2invest-detail%${investInfo.id}`} >登陆查看</Link>
                                        </li>
                                        <li>
                                            <strong>可用加息券：</strong>
                                            <Link  to={`/login?redirect=%2invest-detail%${investInfo.id}`} >登陆查看</Link>
                                        </li>
                                        <li>
                                            <strong>预期可赚取：</strong>
                                            <i id="money">
                                                {(this.state.investAmount==0)?income(investInfo.min,(investInfo.rate),investInfo.loanExpiry,'m')
                                                    :income(this.state.investAmount,(investInfo.rate),investInfo.loanExpiry,'m')
                                                }
                                            </i>元
                                        </li>
                                    </ul>
                                    <div>
                                        <Link  to={`/login?redirect=%2Finvest-detail%2F${investInfo.id}`} className="btn">我要登录</Link>
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
                                            {(accountsInfo!=``)? `${toMoney(memberRedInfo.number)} ` : ``} 张
                                        </li>
                                        <li>
                                            <strong>预期可赚取：</strong>
                                            <i id="money">
                                                {(this.state.investAmount==0)?income(investInfo.min,(investInfo.rate),investInfo.loanExpiry,'m')
                                                    :income(this.state.investAmount,(investInfo.rate),investInfo.loanExpiry,'m')
                                                }
                                            </i>元
                                        </li>
                                    </ul>
                                    <div>
                                        {
                                            (accountsInfo===``)?``
                                                :(investInfo.noviceLoan=='1' && isNovice==='0')?<Button type="primary"  className="pop__wp100" disabled={true}>仅限新手</Button>
                                                :<Button type="primary" onClick={() => this.toggleModal(`bbhModal`,true)} className="pop__wp100" disabled={isFetching}>立即投资</Button>

                                        }

                                    </div>
                                </div>
                            }

                        </div>
                }
                {this.state.currentModule!=``?
                    <BbhModal config={modal_config[this.state.currentModule]} visible={this.state.bbhModal} onCancel={()=>this.callback()}>
                        {this.state.currentModule === `ModalSteps` ?
                            <ModalSteps key={this.state.key} onSuccess={()=>{this.callback()}} onFail={()=>{this.callback()}}  />
                            :(this.state.currentModule === `ModalTradePassword`)?
                                <ModalTradePassword onSuccess={()=>{this.callback()}} onFail={()=>{this.callback()}} />
                                :(this.state.currentModule === `ModalBindCard`)?
                                    <ModalBindCard onSuccess={() => {this.callback();}}  onFail={() => {this.callback();}} />
                                    :(this.state.currentModule === `ModalRiskAssess`)?
                                        <ModalRiskAssess onSuccess={()=>{this.callback()}} onFail={()=>{this.callback()}} value={10000} />
                                        :(this.state.currentModule === `ModalInvestSteps`)?<ModalInvestSteps key={this.state.key} value={10000} onSuccess={()=>{this.callback()}} onFail={()=>{this.callback()}} />
                                            :``
                        }
                    </BbhModal>
                    :``
                }


            </div>
        )

    }
}
function mapStateToProps(state) {
    const { auth,account } = state.toJS();
    return {
        auth,
        account
    };
}
export default  connect(mapStateToProps)(MasterInvestBox);