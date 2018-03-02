import React from 'react';
import PropTypes from 'prop-types';
import  {getData}  from '../../../../assets/js/getData';
import  {poundage,addCommas,checkMoney}  from '../../../../assets/js/cost';
import { Checkbox,message } from 'antd';
export default class ModalTransfer extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            value:0,  //债转金额
            tips:'',  //错误提示
            transferInfo:{},  //债转详情
            isRead:false
        }
    }
    handleSubmit(e){
        const {callback} = this.props.config;
        //1 验证输入是否正确
        let result=checkMoney({
            'value':this.state.value,
            'type':0,
            'min_v':this.state.transferInfo.proMinInvestAmount,
            'max_v':this.state.transferInfo.transFinanced,
            'label':'转让金额',
            'interval':this.state.transferInfo.proIncreaseAmount
        });
        if(!result[0]){
            this.setState({
                tips:`${result[2]}`
            });
            return false;
        }
        //2 验证是否同意协议
        if(!this.state.isRead){
            this.setState({
                tips:`请同意债权转让服务协议！`
            });
            return false;
        }
        //3 提交后台

        fetch(`http://172.16.4.5:8084/test.php`, {
            method: "POST",
            mode:'cors',
            cache: 'default',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({projectId: this.props.config.proId,moneyEnd:this.state.value})
        }).then(function (response){
            if (response.status == 200){
                return response;
            }
        })
            .then((data) => data.json())
            .then((data) => {
                    if(data.code==='0'){
                        message.success('您的申请已经提交');
                        callback({});
                    }else{
                        message.error('err,申请不通过');
                    }

             })
            .catch((err)=>{
                message.error('连接失败，请重试');
        });
        //4 关闭弹窗
    }
    onChange(e) {
        this.setState({
            isRead: e.target.checked
        });
        if(this.state.tips===`请同意债权转让服务协议！`){
            this.setState({
                tips: ``
            });
        }
    }
    //改变转让金额
    handleChange(event) {
        let result=checkMoney({
            'value':event.target.value,
            'type':0,
            'min_v':this.state.transferInfo.proMinInvestAmount,
            'max_v':this.state.transferInfo.transFinanced,
            'label':'转让金额',
            'interval':this.state.transferInfo.proIncreaseAmount
        });
        if(result[0]==false){
            if(result[1]==1){
                this.setState({
                    value: event.target.value,
                    tips:`${result[2]}`
                });
            }else{
                this.setState({
                    value: 0,
                    tips:`${result[2]}`
                });
            }

        }else {
            this.setState(
                {
                    value: event.target.value,
                    tips: ``
                });
        }
    }
    loadData(){
        let data=getData(`http://localhost:9002/members/investments/transfer/id`);
        if (data){
        }else{
            let mockDate={
                data: {
                    transProjectId:1,
                    transFinanced:10000.00,
                    proMinInvestAmount:1000,
                    proIncreaseAmount:100,
                    proTransferFee:0.02
                },
                code: "0",
                message: "SUCCESS",
            };

            this.setState({
                transferInfo:mockDate.data
            },()=>{
                console.log(this.state.transferInfo);
            });
        }
    }
    componentDidMount () {
        this.loadData();
    }
    render() {
        return (
            <div className="pop__transfer">
                <div className="form__wrapper">
                    <dl className="form__bar">
                        <dt><label>实际投资金额:</label></dt>
                        <dd><i id="Accountbalance" className="money">{this.state.transferInfo.transFinanced}</i> 元</dd>
                    </dl>
                    <dl className="form__bar">
                        <dt><label>转让金额:</label></dt>
                        <dd>
                            <input type="text" name="amount"  className="textInput moneyInput"  autoComplete="off" maxLength="13" onChange={this.handleChange} />
                            <span className="unit" >元</span>
                        </dd>
                    </dl>
                    <dl className="form__bar short">
                        <dt><label>手续费：</label></dt>
                        <dd><i id="cost" className="money">{addCommas(poundage(this.state.value,this.state.transferInfo.proTransferFee))}</i> 元
                        </dd>
                    </dl>
                    <dl className="form__bar short">
                        <dt><label>预期到账金额：</label></dt>
                        <dd><i id="money" className="money">
                            {this.state.value!=0?
                                addCommas(this.state.value-poundage(this.state.value,this.state.transferInfo.proTransferFee))
                                : `0.00`
                            }
                            </i>元
                        </dd>
                    </dl>
                    <div className="form__bar">
                        <p>
                            <Checkbox onChange={this.onChange}>我已阅读并同意<a href="/transfer.html" target="_blank">《巴巴汇债权转让服务协议》</a></Checkbox>
                        </p>
                    </div>
                    <div className="form__bar">
                            <span className="errorMessages">
                                {this.state.tips}
                            </span>
                    </div>
                    <div className="form__bar">
                        <button  className="button able"　onClick={this.handleSubmit}>确认</button>
                    </div>
                </div>
            </div>
        );
    }
};