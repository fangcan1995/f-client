import React from 'react';
import PropTypes from 'prop-types';
import Crumbs from '../../../components/crumbs/crumbs';
import Tab from '../../../components/tab/tab';
import './withdrawals.less';
import CountDownButton from '../../../components/countDownButton/countDownButton';

import { connect } from 'react-redux';
import {memberAc} from '../../../actions/member';
import {toMoney} from  '../../../assets/js/famatData';
import  {checkMoney,addCommas}  from '../../../assets/js/cost';
import {Button} from 'antd';
class Withdrawals extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            value:'',
            tips:'',
            disabled:true,
        }
        this.withdrawals= this.withdrawals.bind(this);
        this.handleChange= this.handleChange.bind(this);

    }
    componentDidMount() {
        //this.props.dispatch(memberAc.getInfo());
    }
    bindCard(){
        alert('去开户');
    }
    withdrawals(value){
        value=this.refs.amount.value;
        this.props.dispatch(memberAc.withdrawals(value));
    }
    handleChange(event){
        let result=checkMoney({
            'value':event.target.value,
            'type':0,
            'min_v':1,
            'max_v':this.props.member.accountsInfo.amount.availableBalance,
            'label':'提现金额',
            'interval':1
        });
        if(result[0]==false){
            if(result[1]==1){
                this.setState({
                    value: event.target.value,
                    tips:`${result[2]}`,
                    disabled:true
                });
            }else{
                this.setState({
                    value: 0,
                    tips:`${result[2]}`,
                    disabled:true
                });
            }

        }else {
            this.setState(
                {
                    value: event.target.value,
                    tips: ``,
                    disabled:false
                });
        }
    }
    render(){
        console.log(this.props);
        let {openAccountStatus,amount,result}=this.props.member.accountsInfo;

        if(result.code==='0'){
            this.props.dispatch(memberAc.modifyState({result:''}));
            this.refs.amount.value='';
            this.props.dispatch(memberAc.getInfo());
        }
        return (
            <div className="member__main withdrawals">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="提现">
                            <div className="tab_content" style={{width:'500px'}}>
                                {
                                    (openAccountStatus===0)?
                                        <p className="info"><strong>提示：</strong>亲爱的用户，您还没有绑定银行卡，请先
                                            <a href="javascript:void(0);" style={{color:'#31aaf5'}} onClick={()=>{this.bindCard()}}> 绑定银行卡！</a>
                                        </p>
                                        :
                                        <div className="form__wrapper">
                                            <dl className="form__bar">
                                                <dt><label>可用余额</label></dt>
                                                <dd><p><i>{toMoney(amount.availableBalance)}</i>元</p></dd>
                                            </dl>
                                            <dl className="form__bar">
                                                <dt><label>提现金额</label></dt>
                                                <dd>
                                                    <input name="transAmt" id="transAmt"   maxLength={20} type="text" className="textInput moneyInput" ref="amount"
                                                           onChange={this.handleChange}
                                                    />
                                                    <i className="unit">元</i>
                                                </dd>
                                            </dl>
                                            <div className="form__bar">
                                                {(this.state.tips!='')?
                                                <div className="errorMessages">
                                                    {this.state.tips}
                                                </div>:``
                                                }
                                            </div>
                                            {/*<dl className="form__bar">
                                        <dt><label>交易密码</label></dt>
                                        <dd>
                                            <input name="password" id="password"   maxLength={20}  type="password" className="textInput" />
                                            <span className="tips error"></span>
                                        </dd>
                                    </dl>
                                    <dl className="form__bar">
                                        <dt><label>验证码</label></dt>
                                        <dd>
                                            <input name="vCode" id="vCode"  type="text" className="textInput"  maxLength={8} style={{width:`175px`,marginRight:`10px`}} />
                                            <CountDownButton
                                                phoneNumber="13945441111"
                                                disabled={false}
                                                interval={20}

                                            />
                                            <span className="tips error phone_code"></span>
                                        </dd>
                                    </dl>
                                    <dl className="form__bar">
                                        <dt><label>手续费</label></dt>
                                        <dd><p> <i id="money">0.00</i> 元</p></dd>
                                    </dl>
                                    <dl className="form__bar">
                                        <dt><label>实际到账</label></dt>
                                        <dd><p><i id="money">0.00</i> 元</p>
                                        </dd>

                                    </dl>*/}
                                            <div className="form__bar">
                                                {/*<button className="button able" style={{ width: '200px',marginTop:'20px'}} onClick={this.withdrawals}>确定</button>*/}
                                                <Button type="primary" htmlType="submit" className="pop__large" onClick={this.withdrawals}
                                                 disabled={this.state.disabled}>
                                                    确认
                                                </Button>
                                            </div>
                                        </div>
                                }


                            </div>
                        </div>
                    </Tab>
                </div>
                <div className="member__cbox m-wxts">
                    <Tab>
                        <div name="温馨提示">
                            <div className="tab_content">
                                <div className="m-wxts">
                                    <p> 1. 需完成实名认证并绑定提现银行卡后，才能进行提现操作；<br/>
                                        2. 提现银行卡仅支持借记卡，不支持信用卡、存折提现；<br/>
                                        3. 提现金额单笔上限为50万元，单日提现总额无上限；<br/>
                                        4. 提现申请成功后，资金预计T+3日到账，工作日最快2小时到账，实际以富友支付处理时效为准；<br/>
                                        5. 当单笔提现金额>5万元，可能会出现多笔到账记录，具体以富友支付风控为准；<br/>
                                        6. 提现过程遇到问题时，请（工作日9:00-18:00）咨询
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Tab>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { auth,member } = state.toJS();
    return {
        auth,
        member
    };
}
export default connect(mapStateToProps)(Withdrawals);