import React from 'react';
import PropTypes from 'prop-types';
import './riskAssess.less';

export default ({ location, match, history }) => {
    return (
        <div className="member__main">
            <div className="crumb">
                <div>
                    <b>您所在的位置：</b>
                    <a href="/">首页</a>&nbsp;&gt;
                    <a href="" >基本设置</a>&nbsp;&gt;
                    <a  className="actice">风险评估</a>
                </div>
            </div>
            <div className="member__cbox">
                <div className="tab">
                    <div className="tab_title">
                        <ul>
                            <li className="on"><h3>风险评估</h3></li>
                        </ul>
                    </div>
                    <div className="tab_content">
                        {/*如果已经评估过*/}
                        <div className="record">
                            <ul className="result">
                                <li><strong>姓名：</strong>
                                    <p>佟鑫</p>
                                </li>
                                <li><strong>评测等级：</strong>
                                    <p>B</p>
                                </li>
                                <li><strong>获得称号：</strong>
                                    <p>
                                        <em>稳健型投资者</em>
                                        投资风险是做出投资决策时首先考虑的问题，但若冒一定的风险能够带来相当收益回报，也可能考虑投资。
                                        可通过推荐理财降低风险是比较适合的投资选择。
                                    </p>
                                </li>
                                <li><strong>投资最大额度为：</strong>
                                    <p>300000.00元</p>
                                </li>
                                <li><strong>剩余可投金额：</strong>
                                    <p>290000.00元</p>
                                </li>
                                <li className="form_bar"><a href="javascript:void(0);" className="btn btn_repeat">重新评估</a></li>
                            </ul>
                        </div>
                        {/*如果未评估过，或重新评估*/}
                        <div className="riskAssessApp">
                            <form id="frm">
                                <dl className="controls">
                                    <dt>1.您的投资目的是什么？</dt>
                                    <dd>
                                        <label><input name="radio1" type="radio" value="1" required data-msg-required="必选" />A. 我希望存点钱以备不时之需 </label>
                                        <label><input name="radio1" type="radio" value="2" />B. 我希望保障我现有的资产价值，获取超过银行存款和通货膨胀率的收益</label>
                                        <label><input name="radio1" type="radio" value="3" />C. 在深思熟虑后愿意承担一定的风险 </label>
                                        <label><input name="radio1" type="radio" value="4" />D. 我希望通过投资增加我未来的收入，获取一定的收益</label>
                                        <span className="error"></span>
                                    </dd>
                                </dl>
                                <dl className="controls">
                                    <dt>2.您的投资目的是什么？</dt>
                                    <dd>
                                        <label><input name="radio2" type="radio" value="1" required data-msg-required="必选" />A. 我希望存点钱以备不时之需 </label>
                                        <label><input name="radio2" type="radio" value="2" />B. 我希望保障我现有的资产价值，获取超过银行存款和通货膨胀率的收益</label>
                                        <label><input name="radio2" type="radio" value="3" />C. 在深思熟虑后愿意承担一定的风险 </label>
                                        <label><input name="radio2" type="radio" value="4" />D. 我希望通过投资增加我未来的收入，获取一定的收益</label>
                                        <span className="error"></span>
                                    </dd>
                                </dl>
                                <dl className="controls">
                                    <dt>3.您的投资目的是什么？</dt>
                                    <dd>
                                        <label><input name="radio3" type="radio" value="1" required data-msg-required="必选" />A. 我希望存点钱以备不时之需 </label>
                                        <label><input name="radio3" type="radio" value="2" />B. 我希望保障我现有的资产价值，获取超过银行存款和通货膨胀率的收益</label>
                                        <label><input name="radio3" type="radio" value="3" />C. 在深思熟虑后愿意承担一定的风险 </label>
                                        <label><input name="radio3" type="radio" value="4" />D. 我希望通过投资增加我未来的收入，获取一定的收益</label>
                                        <span className="error"></span>
                                    </dd>
                                </dl>
                                <dl className="controls">
                                    <dt>4.您的投资目的是什么？</dt>
                                    <dd>
                                        <label><input name="radio4" type="radio" value="1" required data-msg-required="必选" />A. 我希望存点钱以备不时之需 </label>
                                        <label><input name="radio4" type="radio" value="2" />B. 我希望保障我现有的资产价值，获取超过银行存款和通货膨胀率的收益</label>
                                        <label><input name="radio4" type="radio" value="3" />C. 在深思熟虑后愿意承担一定的风险 </label>
                                        <label><input name="radio4" type="radio" value="4" />D. 我希望通过投资增加我未来的收入，获取一定的收益</label>
                                        <span  className="error"></span>
                                    </dd>
                                </dl>

                                <div className="form_bar">
                                    <button className="btn">立即评估</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};