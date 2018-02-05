import React from 'react';
import PropTypes from 'prop-types';
import  {getData}  from '../../../../assets/js/getData';
import  {poundage,addCommas,checkMoney}  from '../../../../assets/js/cost';
import { Checkbox,message } from 'antd';
export default class ModalRepaymentApp extends React.Component {
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
            <div className="pop__repayment">
                <form className="form__wrapper">
                    <div className="form_bar">
                        <dt><label>项目名称：</label></dt>
                        <dd>汇车贷-HCD201705020001</dd>
                    </div>
                    <div className="form_bar">
                        <dt><label>已还期数：</label></dt>
                        <dd>9 期</dd>
                    </div>
                    <div className="form_bar">
                        <dt><label>到期日期：</label></dt>
                        <dd>2017-12-03</dd>
                    </div>
                    <div className="form_bar">
                        <dt><label>应还本金：</label></dt>
                        <dd><p>20000.00元</p></dd>
                    </div>
                    <div className="form_bar">
                        <dt><label>应还利息：</label></dt>
                        <dd>200.00 元</dd>
                    </div>
                    <dl className="form_bar">
                        <dt><label>还款总额：</label></dt>
                        <dd>200200.00 元</dd>
                    </dl>
                    <dl className="form_bar">
                        <dt><label>交易密码: </label></dt>
                        <dd><input type="password" name="traderPassword" id="traderPassword" className="textInput"  autoComplete="off" maxLength="20" /></dd>
                    </dl>
                    {/*<dl className="form_bar" >
                        <dt><label>验证码: </label></dt>
                        <dd>
                            <input type="text" name="imgcode" id="imgcode" className="textInput"  autoComplete="off" maxLength="6" />
                            <img src="/images/account/pt1.png" data-url="/user/captcha" id="img-code" title="看不清？点击图片更换验证码" className="vCode" />
                        </dd>
                    </dl>*/}
                    <div className="ps">
                        <p>
                            <Checkbox onChange={this.onChange}>我已阅读并同意<a href="#" target="_blank">《提前还款规则》</a></Checkbox>
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