import React from 'react';
import PropTypes from 'prop-types';
import Crumbs from '../../../components/crumbs/crumbs';
import Tab from '../../../components/tab/tab';

import { connect } from 'react-redux';
import  memberActions  from '../../../actions/member';
import {memberAc} from '../../../actions/member';
import {toMoney,toNumber} from  '../../../assets/js/famatData';

import './recharge.less';

class Recharge extends React.Component{
    constructor(props) {
        super(props);
        this.recharge= this.recharge.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(memberAc.getInfo());
    }

    bindCard(){
        alert('去开户');
    }
    recharge(value){
        //console.log(this.props);
        value=this.refs.amount.value;
        let postData={
            escrowCode:100100,
            amount:value,
            type:1
        };
        this.props.dispatch(memberActions.postData(postData));
    }
    render(){

        console.log(this.props);
        let {openAccountStatus,amount}=this.props.member.accountsInfo;
        console.log(openAccountStatus);
        return (
            <div className="member__main recharge">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="快速充值">
                            <div className="tab_content" style={{width:'500px'}}>
                                {
                                    (openAccountStatus === 0) ?
                                        <p className="info"><strong>提示：</strong>亲爱的用户，您还没有绑定银行卡，请先
                                            <a href="javascript:void(0);" style={{color: '#31aaf5'}} onClick={() => {
                                                this.bindCard()
                                            }}> 绑定银行卡！</a>
                                        </p>
                                        : <div className="form__wrapper">
                                            <dl className="form__bar">
                                                <dt><label>可用余额:</label></dt>
                                                <dd><i>{toMoney(amount.availableBalance)}</i>元</dd>
                                            </dl>
                                            <dl className="form__bar">
                                                <dt><label>充值金额:</label></dt>
                                                <dd>
                                                    <input  maxLength={20} type="text" className="textInput moneyInput" ref="amount"/>
                                                    <span className="unit">元</span>
                                                    <span className="tips error"></span>
                                                </dd>
                                            </dl>
                                            {/*<div className="form__bar">
                                                <p>充值后可用余额: <i id="money">1,000.00</i>元</p>
                                            </div>*/}
                                            <div className="form__bar">
                                                <button className="button able" style={{width: '200px', marginTop: '20px'}}
                                                    onClick={this.recharge}
                                                >
                                                    确定
                                                </button>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                    </Tab>
                </div>
                <div className="member__cbox">
                    <Tab>
                        <div name="温馨提示">
                            <div className="tab_content">
                                <div className="m-wxts">
                                    <p> 1. 需完成实名认证并绑定银行卡后，才能进行充值操作；<br/>
                                        2. 请使用借记卡充值，信用卡无法充值；<br/>
                                        3. 充值服务手续费0元<br/>
                                        4. 充值金额将会在充值成功后10-15分钟内到账，请耐心等候；<br/>
                                        5. 单笔充值金额需大于或等于10元；<br/>
                                        6. 单笔充值如果超出银行卡支付限额，可以拆分金额多次充值；<br/>
                                        7. 每日的充值限额依据各银行限额为准，请注意您的银行卡充值限制，以免造成不便；<br/>
                                        8. 如果在充值过程中遇到问题请联系客服：400-024-0909，我们将竭诚为您服务。
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
        auth,member
    };
}
export default connect(mapStateToProps)(Recharge);