import React from 'react';
import PropTypes from 'prop-types';
import  {getData}  from '../../../../assets/js/getData';
import  {poundage,addCommas,checkMoney}  from '../../../../assets/js/cost';
export default class ModalTransfer extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            value:0,  //债转金额
            tips:'',  //错误提示
            transferInfo:{}  //债转详情

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
                <form className="form__wrapper">
                    <dl className="form_bar">
                        <dt><label>实际投资金额:{this.props.proId}</label></dt>
                        <dd><i id="Accountbalance" className="money">{this.state.transferInfo.transFinanced}</i> 元</dd>
                    </dl>
                    <dl className="form_bar">
                        <dt><label>转让金额:</label></dt>
                        <dd>
                            <input type="text" name="amount"  className="textInput moneyInput"  autoComplete="off" maxLength="13" onChange={this.handleChange} />
                            <span className="unit" >元</span>
                        </dd>
                    </dl>
                    <dl className="form_bar short">
                        <dt><label>手续费：</label></dt>
                        <dd><i id="cost" className="money">{addCommas(poundage(this.state.value,this.state.transferInfo.proTransferFee))}</i> 元
                        </dd>
                    </dl>
                    <dl className="form_bar short">
                        <dt><label>预期到账金额：</label></dt>
                        <dd><i id="money" className="money">
                            {this.state.value!=0?
                                addCommas(this.state.value-poundage(this.state.value,this.state.transferInfo.proTransferFee))
                                : `0.00`
                            }
                            </i>元
                        </dd>
                    </dl>
                    <div className="ps">
                        <p>
                            <i className="iconfont icon-accept radio_switchbtn"></i>
                            <input type="hidden" id="accept" value="0" />
                            我已阅读并同意<a href="/transfer.html" target="_blank">《巴巴汇债权转让服务协议》</a>
                        </p>
                    </div>
                    <div className="tips__area">
                            <span className="tips error">
                                {this.state.tips}
                            </span>
                    </div>
                    <div className="form_bar">
                        <button  className="btn w120">确认</button>
                    </div>
                </form>
            </div>
        );
    }
};