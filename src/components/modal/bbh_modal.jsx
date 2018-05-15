import React,{ Component } from "react";
import './bbh_modal.less';
import { Modal,Button } from 'antd';
import PieChart from "../charts/pie";


export default class BbhModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            key:Math.random(),
        }
    }
    onCancel(){
        let {onCancel}=this.props;
        this.setState({
            key:Math.random(),
        })
        onCancel();
    }
    render(){
        let {config,visible,onCancel}=this.props;
        let {title,width,height}=config;
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
                <div key={this.state.key} className="pop" ref='pop' style={{minHeight:`${height||`400px`}`}}>
                {this.props.children}
                </div>
            </Modal>
            )

    }
}