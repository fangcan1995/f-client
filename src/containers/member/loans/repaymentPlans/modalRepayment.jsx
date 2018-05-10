import React from 'react';
import PropTypes from 'prop-types';
import  {getData}  from '../../../../assets/js/getData';
import  {poundage,addCommas,checkMoney}  from '../../../../utils/cost';
import { Checkbox,message } from 'antd';
export default class ModalRepayment extends React.Component {
    constructor(props) {
        super(props);
        //this.handleChange = this.handleChange.bind(this);
        this.state={
            value:0,  //债转金额
            tips:'',  //错误提示
            transferInfo:{}
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
                <div className="form__wrapper">
                    <dl className="form__bar">
                        <dt><label>项目名称：</label></dt>
                        <dd>汇车贷-HCD201704170002</dd>
                    </dl>
                    <dl className="form__bar">
                        <dt><label>还款期数：</label></dt>
                        <dd>3 期</dd>
                    </dl>
                    <dl className="form__bar">
                        <dt><label>应还日期：</label></dt>
                        <dd>2018-01-08</dd>
                    </dl>
                    <dl className="form__bar">
                        <dt><label>应还本金：</label></dt>
                        <dd><p>0.00元</p></dd>
                    </dl>
                    <dl className="form__bar">
                        <dt><label>应还利息：</label></dt>
                        <dd>1000.00 元</dd>
                    </dl>
                    <dl className="form__bar">
                        <dt><label>应还罚息：</label></dt>
                        <dd>10.00 元</dd>
                    </dl>
                    <dl className="form__bar">
                        <dt><label>应还罚金：</label></dt>
                        <dd>0.00 元</dd>
                    </dl>
                    <dl className="form__bar">
                        <dt><label>还款总额：</label></dt>
                        <dd>1010.00 元</dd>
                    </dl>
                    <dl className="form__bar">
                        <dt><label>交易密码: </label></dt>
                        <dd><input type="password" name="traderPassword" id="traderPassword" className="textInput"  autoComplete="off" maxLength="20" /></dd>
                    </dl>
                    <dl className="form__bar" >
                        <dt><label>验证码: </label></dt>
                        <dd>
                            <input type="text" name="imgcode" id="imgcode" className="textInput"  autoComplete="off" maxLength="6" />
                            <img src="/images/account/pt1.png" data-url="/user/captcha" id="img-code" title="看不清？点击图片更换验证码" className="vCode" />
                        </dd>
                    </dl>
                    <div className="form__bar">
                            <span className="errorMessages">
                                {this.state.tips}
                            </span>
                    </div>
                    <div className="form__bar">
                        <button  className="button able">1确认</button>
                    </div>
                </div>
            </div>
        );
    }
};