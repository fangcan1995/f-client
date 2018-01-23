import React from 'react';
import PropTypes from 'prop-types';

import './recharge.less';

export default ({ location, match, history }) => {
    return (
        <div className="member__main">
            <div className="crumb">
                <div>
                    <b>您所在的位置：</b>
                    <a href="/">首页</a>&nbsp;&gt;
                    <a href="/member/overview/account-overview" >我的账户</a>&nbsp;&gt;
                    <a  className="actice">快速充值</a>
                </div>
            </div>
            <div className="member__cbox">
                <div className="title__list">
                    <div className="tab_title">
                        <ul>
                            <li className="on"><h3>快速充值</h3></li>
                        </ul>
                    </div>
                    <div className="tab_content">
                        <p className="info"><strong>提示：</strong>亲爱的用户，您还没有绑定银行卡，请先
                            <a href="javascript:void(0);" className="btn_bindCard">绑定银行卡！</a>
                        </p>
                        <form id="frm">
                            <dl className="form_bar">
                                <dt><label>可用余额:</label></dt>
                                <dd><p><i>1,000.00</i>元</p></dd>
                            </dl>
                            <dl className="form_bar">
                                <dt><label>充值金额:</label></dt>
                                <dd><input name="transAmt" id="transAmt" maxLength={20}  placeholder="最低充值金额10元"   type="text" className="textInput w300" />
                                    <span className="unit">元</span>
                                    <span className="tips error"></span>
                                </dd>
                            </dl>
                            <div className="form_bar">
                                <p>充值后可用余额 <i id="money"></i>元</p>
                            </div>
                            <dl className="form_bar">
                                <dt><label>&nbsp;</label></dt>
                                <dd><button  className="btn">确定</button></dd>
                            </dl>
                        </form>
                    </div>
                </div>
            </div>
            <div className="member__cbox m-wxts">
                <div className="title__list">
                    <div className="tab_title">
                        <ul>
                            <li className="on"><h3>温馨提示</h3></li>
                        </ul>
                    </div>
                    <div className="tab_content">
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
        </div>
    );
};
