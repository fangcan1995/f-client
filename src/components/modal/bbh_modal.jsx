import React,{ Component } from "react";
import './bbh_modal.less';
import { Modal,Button } from 'antd';
import PieChart from "../charts/pie";


export default class BbhModal extends Component{
    constructor(props) {
        super(props);

    }
    render(){
        console.log('弹框的参数');
        console.log(this.props);
        let {config}=this.props;
        let {title,header,width,height,onCancel}=config;
        return(
            <Modal
                title="123456"
                wrapClassName="vertical-center-modal"
                visible={false}
                width="520px"
                height="400px"
                footer={null}
                onCancel={() => {
                    this.callback(`modalInvest`);
                }}
            >
                {this.props.children}
            </Modal>
            )

    }
}