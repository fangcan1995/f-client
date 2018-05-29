import React,{ Component } from "react";
import ModalSteps from '../modal/modal-steps/modal-steps';
import ModalTradePassword from '../modal/modal-tradePassword/modal-tradePassword';
import ModalLoginPassword from '../modal/modal-loginPassword/modal-loginPassword';
import ModalBindCard from '../modal/modal-bindCard/modal-bindCard';
import ModalRiskAssess from '../modal/modal-riskAssess/modal-riskAssess';
import ModalInvestSteps from '../modal/modal-invest-steps/modal-invest-steps';
import ModalCertification from '../modal/modal-certification/modal-certification';
import ModalInvest from '../modal/modal-invest/modalInvest';
import ModalRecharge from '../modal/modal-recharge/modaRecharge';
import ModalRepaymentApp from '../modal/modal-repayment/modalRepaymentApp';
import ModalRepayment from '../modal/modal-repayment/modalRepayment';
import ModalLoanApp from '../modal/modal-loanApp/modal-loanApp';
import ModalTransferApp from '../modal/modal-tranferApp/modal-transferApp';
import ModalPlan from '../modal/modal-plan/modal-plan';
import { Modal } from 'antd';
import './bbh_modal.less';
import {accountAc} from "../../actions/account";
import investDetailActions from "../../actions/invest-detail";

export default class BbhModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            key:Math.random(),
        }
    }
    onCancel(){
        let {closeFunc,dispatch}=this.props;
        this.setState({
            key:Math.random(),
        })
        console.log('在这重新载入数据');
        console.log(this.props)
        /*dispatch(accountAc.getAccountInfo());  //成功重新获取新户信息
        dispatch(investDetailActions.getInvestRecords(this.props.id));//成功重新获取投资记录
        dispatch(investDetailActions.getInvestInfo(this.props.id)); //成功重新获取标的信息*/
        closeFunc();
    }
    render(){
        let {config,visible,moduleName,investAmount,repeat,stepslength,returnPage,currentId}=this.props;
        let {title,width,height}=config;
        let moduleContent=``;

        switch (moduleName) {
            case `ModalSteps`:
                moduleContent=<ModalSteps key={this.state.key}  onSuccess={()=>{this.onCancel()}} stepslength={stepslength||3} returnPage={returnPage||``} />;
                break;
            case `ModalCertification`:
                moduleContent=<ModalCertification key={this.state.key} onSuccess={()=>{this.onCancel()}} />;
                break;
            case `ModalTradePassword`:
                moduleContent=<ModalTradePassword key={this.state.key} onSuccess={()=>{this.onCancel()}}  />;
                break;
            case `ModalLoginPassword`:
                moduleContent=<ModalLoginPassword key={this.state.key} onSuccess={()=>{this.onCancel()}} />;
                break;
            case `ModalBindCard`:
                moduleContent=<ModalBindCard key={this.state.key} onSuccess={()=>{this.onCancel()}} returnPage={returnPage||``} />;
                break;
            case `ModalRecharge`:
                moduleContent=<ModalRecharge key={this.state.key} onSuccess={()=>{this.onCancel()}} value={investAmount} returnPage={returnPage||``} />;
                break;
            case `ModalRiskAssess`:
                moduleContent=<ModalRiskAssess key={this.state.key} onSuccess={()=>{this.onCancel()}} />;
                break;
            case `ModalInvestSteps`:
                moduleContent=<ModalInvestSteps key={this.state.key} value={investAmount} onSuccess={()=>{this.onCancel()}} />;
                break;
            case `ModalInvest`:
                moduleContent=<ModalInvest key={this.state.key} value={investAmount} onSuccess={()=>{this.onCancel()}} />;
                break;
            case `ModalRepaymentApp`:
                moduleContent=<ModalRepaymentApp key={this.state.key} currentId={currentId} onSuccess={()=>{this.onCancel()}} />;
                break;
            case `ModalRepayment`:
                moduleContent=<ModalRepayment key={this.state.key} currentId={currentId} onSuccess={()=>{this.onCancel()}} />;
                break;
            case `ModalLoanApp`:
                moduleContent=<ModalLoanApp key={this.state.key} currentId={currentId} onSuccess={()=>{this.onCancel()}} />;
                break;
            case `ModalTransferApp`:
                moduleContent=<ModalTransferApp key={this.state.key} currentId={currentId} onSuccess={()=>{this.onCancel()}} />;
                break;
            case `ModalPlan`:
                moduleContent=<ModalPlan key={this.state.key} currentId={currentId} onSuccess={()=>{this.onCancel()}} />;
                break;
            default:
                break
        }

        return(
            <Modal
                title={title||``}
                wrapClassName="vertical-center-modal"
                visible={visible}
                width={width||`520px`}
                footer={null}
                maskClosable={false}  //点击蒙层不关闭
                onCancel={() => {
                    this.onCancel();
                }}
            >
                <div  className="pop" ref='pop' style={{minHeight:`${height||`400px`}`}}>
                    {moduleContent}
                </div>
            </Modal>
            )

    }
}