import React from 'react';
import PropTypes from 'prop-types';
import './super-partner.less';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {getSuperPartnerInfo} from '../../../../actions/superPartner'

class SuperPartner extends React.Component{
    handleStandardClick =()=>{
        this.props.history.push(`/invest-list`)
    }
    handleAccountClick =() =>{
        this.props.history.push(`/my-account/account-overview`)
    }
    componentDidMount(){
        const {dispatch}=this.props;
        dispatch(getSuperPartnerInfo())
    }
    render(){
        const {superPartner}=this.props
        console.log(superPartner)
        return (
            <div className="member__main super-partner">
            
                <div className="crumb">
                    <div>
                        <b>您所在的位置：</b>
                        <a href="">首页</a>&nbsp;&gt;
                        <a href="">奖励管理</a>&nbsp;&gt;
                        <a href="" className="actice">超级合伙人</a>
                    </div>
                </div>
                
                <div className="inviteBlock">
                    <div className="alreadyGet">
                        <i className="iconfont icon-jiangli"></i>
                        <div className="alreadyGet__text">
                            <div>已获得业绩</div>
                            <div><span>{superPartner.totalCommission}</span>&nbsp;元</div>
                        </div>
                    </div>
                    <div className="alreadyInvite">
                        <i className="iconfont icon-add_user"></i>
                        <div className="alreadyInvite__text">
                            <div>已邀请人数</div>
                            <div><span>{superPartner.totalInviteNum}</span>&nbsp;人</div>
                        </div>
                    </div>
                    <div className="inviteControl">
                        <Link to="#" className="inviteControl__button">我要邀请</Link>
                        <a href="/my-reward/super-list" className="inviteControl__link">查看邀请详细</a>
                    </div>
                </div>
                
                <div className="member__cbox">
                    <div className="title__list">
                        <div className="tab_title">
                            <ul><li className="on"><h3>活动规则</h3></li></ul>
                        </div>
                        <div className="clearfix"></div>
                        <div className="tab_content">
                            <dl className="myReward">
                                <dt>我的奖励</dt>
                                <dd>
                                    <img src={require('../../../../assets/images/account/lcs_pt1.jpg')} className="myReward__img" />
                                    <div className="myReward__main">
                                        <p>注册理财师邀请的好友注册成功后30天内首次投资<em onClick={this.handleStandardClick}><a>散标</a></em>注册理财师可获得返现红包。</p>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th scope="col">好友首投 </th>
                                                    <th scope="col">可获返现红包</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{'X<=10000'}</td>
                                                    <td>20</td>
                                                </tr>
                                                <tr>
                                                    <td>{'10000<X<=30000'}</td>
                                                    <td>40</td>
                                                </tr>
                                                <tr>
                                                    <td>{'30000<X<=50000'}</td>
                                                    <td>60</td>
                                                </tr>
                                                <tr>
                                                    <td>{'X<=50000'}</td>
                                                    <td>80</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </dd>
                                <dd>
                                    <img src={require('../../../../assets/images/account/lcs_pt2.jpg')} className="myReward__img" />
                                    <div className="myReward__main">
                                        <p>直 接 被 邀 请 人 每 投 资 成 功 一 笔 <em onClick={this.handleStandardClick}><a>散 标</a></em> ， 合 伙 人 可 获 取 直 接 被 邀 请 人 的 年 化 投 资 金 额 的 <em>0.2%</em> 的 现 金 红 包， 红 包 金 额 直 接 返 至 <em><a onClick={this.handleAccountClick}>【 我 的 账户 】</a></em> 内 可 进 行 提 现 。<br />
                                            注：邀请人分为两级，第一级为直接被邀请人，第二级为间接被邀请人<br />
                                            间 接 被 邀 请 人 每 投 资 成 功 一 笔 <em onClick={this.handleStandardClick}><a>散 标</a></em>， 合 伙 人 可 获 取 间 接 被 邀 请 人 的 年 化 投 资 金 额 的 <em>0 .1%</em> 的 现 金 红 包 ， 红 包 金 额 直 接 返 至 <em><a onClick={this.handleAccountClick}>【 我 的 账户 】</a></em> 内 可 进 行 提 现。</p>
                                    </div>
                                </dd>
                            </dl>
                            <dl className="partnerReward">
                                <dt>合伙人奖励</dt>
                                <dd>
                                    <img  src={require('../../../../assets/images/account/lcs_pt3.jpg')} />
                                    <img src={require('../../../../assets/images/account/lcs_pt4.jpg')} />
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div className="member__cbox">
                    <div className="title__list">
                        <div className="tab_title">
                            <ul><li className="on"><h3>邀请方式</h3></li></ul>
                        </div>
                        <div className="tab_content">
                            <ul className="invite__way">
                                <li>
                                    <a href="javascript:void(0);">
                                        <img src={require('../../../../assets/images/account/invite_Wechat.png')} />
                                        <div className="float float1">
                                            <img title="我的二维码" src={require('../../../../assets/images/account/pt.png')} />
                                            <p>这是您的专属邀请链接，打开微信“扫一扫”，点击右上角“发送给朋友”或“分享到朋友圈“即可。</p>
                                        </div>
                                    </a>
                                    <h3>微信</h3>
                                </li>
                                <li>
                                    <a href="javascript:void(0);">
                                        <img src={require('../../../../assets/images/account/invite_code.png')} />
                                        <div className="float float2">
                                            <strong>请您邀请的好友</strong>
                                            在注册时输入
                                            <strong>V7H8N8</strong>
                                            或您的手机号码<br />
                                            <span className="btn" id="copyyqm" data-clipboard-text="我是被复制的邀请码">复制邀请码</span>
                                        </div>
                                    </a>
                                    <h3>邀请码</h3>
                                </li>
                                <li>
                                    <a href="javascript:void(0);">
                                        <img src={require('../../../../assets/images/account/invite_link.png')} />
                                        <div className="float float3">
                                            <strong>您可以复制该链接</strong>发送给你的好友：
                                            <input type="text" readOnly value="http://588ku.com/sucai/0-defa" className="input_txt" />
                                            <span className="btn" id="copylink">复制链接</span>我是被复制的链接
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
                                        让好友通过你的链接<br />注册/开户/绑卡/投资
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        恭喜您和被邀请人可以坐等奖励<br />红包/加息券/现金奖励
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            );
    }
};
function select(state) {
    const { superPartner } = state.toJS();
    return {
      superPartner
    };
  }
export default connect(select)(SuperPartner)