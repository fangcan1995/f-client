import React,{ Component } from "react";
import ModalSteps from '../modal/modal-steps/modal-steps';
import ModalTradePassword from '../modal/modal-tradePassword/modal-tradePassword';
import ModalBindCard from '../modal/modal-bindCard/modal-bindCard';
import ModalRiskAssess from '../modal/modal-riskAssess/modal-riskAssess';
import ModalInvestSteps from '../modal/modal-invest-steps/modal-invest-steps';
import ModalCertification from '../modal/modal-certification/modal-certification';
import { Modal } from 'antd';
import './bbh_modal.less';

export default class BbhModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            key:Math.random(),
        }
    }
    onCancel(){
        let {closeFunc}=this.props;
        this.setState({
            key:Math.random(),
        })
        closeFunc();
    }
    render(){
        let {config,visible,moduleName,investAmount}=this.props;
        let {title,width,height}=config;
        let moduleContent=``;
        switch (moduleName) {
            case `ModalSteps`:
                moduleContent=<ModalSteps key={this.state.key}  onSuccess={()=>{this.onCancel()}} />;
                break;
            case `ModalCertification`:
                moduleContent=<ModalCertification key={this.state.key} onSuccess={()=>{this.onCancel()}} />;
                break;
            case `ModalTradePassword`:
                moduleContent=<ModalTradePassword key={this.state.key} onSuccess={()=>{this.onCancel()}} />;
                break;
            case `ModalBindCard`:
                moduleContent=<ModalBindCard key={this.state.key} onSuccess={()=>{this.onCancel()}} />;
                break;
            case `ModalRiskAssess`:
                moduleContent=<ModalRiskAssess key={this.state.key} onSuccess={()=>{this.onCancel()}} />;
                break;
            case `ModalInvestSteps`:
                moduleContent=<ModalInvestSteps key={this.state.key} value={investAmount} onSuccess={()=>{this.onCancel()}} />;
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