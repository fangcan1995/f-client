import React from 'react';
import PropTypes from 'prop-types';
import Crumbs from '../../../../../components/crumbs/crumbs';
import Tab from '../../../../../components/tab/tab';
import { Avatar } from 'antd';
import './master.less';

export default class PartnerList extends React.Component {
    render(){
        <div className="member__main super-partner">
            <Crumbs/>
            <div className="member__cbox">
                <div className="achievement">
                    <dl className="person">
                        <Avatar src={require('../../assets/images/account/picture.png')} />
                        <h3>刘静</h3>
                        <p>辽区-五一路-战狼队</p>
                    </dl>
                    <dl>
                        <dt>已获得业绩</dt>
                        <dd><em>1000.00</em> <i>元</i></dd>
                    </dl>
                    <dl>
                        <dt>业绩排名</dt>
                        <dd><em>1</em></dd>
                    </dl>
                    <dl className="nobor">
                        <dt></dt>
                        <dd><a href="/my-reward/partner-detail">查看详情</a></dd>
                    </dl>
                </div>
            </div>
            <div className="member__cbox">
                <Tab>
                    <div name="邀请方式">
                        <ul className="invite__way">
                            <li>
                                <a href="javascript:void(0);">
                                    <img src={require('../../../../../assets/images/account/invite_Wechat.png')} />
                                    <div className="float float1">
                                        <img title="我的二维码" src={require('../../../../../assets/images/account/pt.png')} />
                                        <p>这是您的专属邀请链接，打开微信“扫一扫”，点击右上角“发送给朋友”或“分享到朋友圈“即可。</p>
                                    </div>
                                </a>
                                <h3>微信</h3>
                            </li>
                            <li>
                                <a href="javascript:void(0);">
                                    <img src={require('../../../../../assets/images/account/invite_code.png')}  />
                                    <div className="float float2">
                                        <strong>请您邀请的好友</strong>
                                        在注册时输入
                                        <strong>V7H8N8</strong>
                                        或您的手机号码<br/>
                                        <span className="btn" id="copyyqm" data-clipboard-text="我是被复制的邀请码">复制邀请码</span>
                                    </div>
                                </a>
                                <h3>邀请码</h3>
                            </li>
                            <li>
                                <a href="javascript:void(0);">
                                    <img src={require('../../../../../assets/images/account/invite_link.png')}  />
                                    <div className="float float3">
                                        <strong>您可以复制该链接</strong>发送给你的好友：
                                        <input type="text" value="http://588ku.com/sucai/0-defa" className="input_txt" />
                                        <span className="btn" id="copylink" data-clipboard-text="我是被复制的链接">复制链接</span>
                                    </div>
                                </a>
                                <h3>邀请链接</h3>
                            </li>
                        </ul>
                        <ul className="invite__step">
                            <li>
                                <p>通过以上方式邀请好友</p>
                            </li>
                            <li>
                                <p>
                                    让好友通过你的链接<br/>注册/开户/绑卡/投资
                                </p>
                            </li>
                            <li>
                                <p>
                                    恭喜您和被邀请人可以坐等奖励<br/>红包/加息券/现金奖励
                                </p>
                            </li>
                        </ul>
                    </div>
                </Tab>
            </div>
            <div className="member__cbox">
                <Tab>
                    <div name="活动规则">
                        <dl className="myReward">
                            <dt>我的奖励</dt>
                            <dd>
                                <img src={require('../../../../../assets/images/account/lcs_pt1.jpg')} className="myReward__img" />
                                <div className="myReward__main">
                                    <p>注册理财师邀请的好友注册成功后30天内首次投资<em>散标</em>注册理财师可获得返现红包。</p>
                                    <table>
                                        <tr>
                                            <th scope="col">好友首投 </th>
                                            <th scope="col">可获返现红包</th>
                                        </tr>
                                        <tr>
                                            <td>{`X<=10000`}</td>
                                            <td>20</td>
                                        </tr>
                                        <tr>
                                            <td>{`10000<X<=30000`}</td>
                                            <td>40</td>
                                        </tr>
                                        <tr>
                                            <td>{`30000<X<=50000`}</td>
                                            <td>60</td>
                                        </tr>
                                        <tr>
                                            <td>{`X<=50000`}</td>
                                            <td>80</td>
                                        </tr>
                                    </table>
                                </div>
                            </dd>
                            <dd>
                                <img src={require('../../../../../assets/images/account/lcs_pt2.jpg')}  className="myReward__img" />
                                <div className="myReward__main">
                                    <p>直 接 被 邀 请 人 每 投 资 成 功 一 笔 <em>散 标</em> ， 合 伙 人 可 获 取 直 接 被 邀 请 人 的 年 化 投 资 金 额 的 <em>0.2%</em> 的 现 金 红 包， 红 包 金 额 直 接 返 至 <em>【 我 的 账户 】</em> 内 可 进 行 提 现 。<br/>
                                        注：邀请人分为两级，第一级为直接被邀请人，第二级为间接被邀请人<br/>
                                        间 接 被 邀 请 人 每 投 资 成 功 一 笔 <em>散 标</em>， 合 伙 人 可 获 取 间 接 被 邀 请 人 的 年 化 投 资 金 额 的 <em>0 .1%</em> 的 现 金 红 包 ， 红 包 金 额 直 接 返 至 <em>【 我 的 账 户 】</em> 内 可 进 行 提 现。
                                    </p>
                                </div>
                            </dd>
                        </dl>
                        <dl className="partnerReward">
                            <dt>合伙人奖励</dt>
                            <dd>
                                <img src={require('../../../../../assets/images/account/lcs_pt3.jpg')}  />
                                <img src={require('../../../../../assets/images/account/lcs_pt4.jpg')}  />
                            </dd>
                        </dl>
                    </div>
                </Tab>
            </div>
        </div>
    }
}

