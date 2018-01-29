import React from 'react';
import PropTypes from 'prop-types';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import './withdrawPage.less';

export default ({ location, match, history }) => {
    return (
        <div className="member__main">
            <Crumbs/>
            <div className="member__cbox">
                <Tab>
                    <div name="提现">
                        <p className="info"><strong>提示：</strong>亲爱的用户，您还没有绑定银行卡，请先
                            <a href="javascript:void(0);" className="btn_bindCard">绑定银行卡！</a>
                        </p>
                        <form id="frm">
                            <dl className="form_bar">
                                <dt><label>可用余额</label></dt>
                                <dd><p><i>1,000.00</i>元</p></dd>
                            </dl>
                            <dl className="form_bar">
                                <dt><label>提现金额</label></dt>
                                <dd>
                                    <input name="transAmt" id="transAmt"  placeholder="请输入提现金额" maxLength={20} type="text" className="textInput w300" />
                                    <i className="unit">元</i>
                                    <span className="tips error"></span>
                                </dd>
                            </dl>
                            <dl className="form_bar">
                                <dt><label>交易密码</label></dt>
                                <dd>
                                    <input name="password" id="password"  placeholder="请输入交易密码" maxLength={20}  type="password" className="textInput w300" />
                                    <span className="tips error"></span>
                                </dd>
                            </dl>

                            <dl className="form_bar">
                                <dt><label>验证码</label></dt>
                                <dd>
                                    <input name="vCode" id="vCode"  type="text" className="textInput w170" placeholder="请输入验证码" maxLength={8} style={{float:`left`,marginRight:`20px`}} />
                                    <div id="get_phone_code" className="yz_button_able vCode" style={{float:`left`}}>获取验证码</div>
                                    <input type="hidden" id="uphone" value="13945441111" />
                                    <span className="tips error phone_code"></span>
                                </dd>
                            </dl>
                            <dl className="form_bar">
                                <dt><label>手续费</label></dt>
                                <dd><p> <i id="money">0.00</i> 元</p></dd>
                            </dl>
                            <dl className="form_bar">
                                <dt><label>实际到账</label></dt>
                                <dd><p><i id="money">0.00</i> 元</p>
                                </dd>

                            </dl>
                            <dl className="form_bar">
                                <dt><label>&nbsp;</label></dt>
                                <dd><button  className="btn">立即提现</button></dd>
                            </dl>
                        </form>
                    </div>
                </Tab>
            </div>
            <div className="member__cbox m-wxts">
                <Tab>
                    <div name="温馨提示">
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
                </Tab>
            </div>
        </div>
    );
};
