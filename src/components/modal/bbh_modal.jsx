import React,{ Component } from "react";
import './bbh_modal.less';
import { Modal,Button } from 'antd';
import PieChart from "../charts/pie";


export default class BbhModal extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        //alert(this.refs.pop);
        console.log('弹框的参数');
        console.log(this.props);
        let {config,visible,onCancel}=this.props;
        let {title,width,height}=config;

        return(
            <Modal
                title={title||``}
                wrapClassName="vertical-center-modal"
                visible={visible}
                width={width||`520px`}
                footer={null}
                onCancel={() => {
                    onCancel();
                }}
            >
                <div className="pop" ref='pop' style={{minHeight:`${height||`400px`}`}}>
                {this.props.children}
                </div>
            </Modal>
            )

    }
}