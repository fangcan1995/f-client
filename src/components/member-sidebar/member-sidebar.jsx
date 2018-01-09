import React from 'react';
import { Route, Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import './member-sidebar.less';


const ListItemLink = ({ to, ...rest }) => (
  <Route path={to} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} {...rest}/>
    </li>
  )}/>
)

export default ({ location, match, history, ...props }) => {

  return (
    <div className="mainBlock member">
        <div className="sidebar">
            <div className="sideMenu">
                <div className="sideMenu__memberInfo">
                    <figure className="memberPhoto">
                        <img src={require('../../assets/images/account/picture.png')} id="tx" />
                    </figure>
                    <div className="memberId">tongxin</div>
                    <div className="memberStep">
                        <i className="iconfont icon-phone able"></i>
                        <i className="iconfont icon-card able"></i>
                        <i className="iconfont icon-fxcp unable"></i>
                    </div>
                    <div className="memberControl">
                        <a href="#" className="btn btn_recharge">充值</a>
                        <a href="#" className="btn btn_withdrawals">提现</a>
                    </div>
                </div>
                <div className="sideMenu__nav">
                    <h3><i className="iconfont icon-all"></i>账户总览</h3>
                    <ul>
                        <ListItemLink to="/member/account-overview">我的账户</ListItemLink>
                        <ListItemLink to="/member/my-account/cardInfo">银行卡</ListItemLink>
                        <li><a href="#">充值</a></li>
                        <li><a href="#">提现</a></li>
                        <ListItemLink to="/member/my-account/transaction-record">交易记录</ListItemLink>
                    </ul>
                    <h3><i className="iconfont icon-invest"></i>我的投资</h3>
                    <ul>
                        <li><a href="#">我的投资</a></li>
                        <li><a href="#">回款记录</a></li>
                    </ul>
                    <h3><i className="iconfont icon-myloan"></i>我的借款</h3>
                    <ul>
                        <li><a href="#">我的借款</a></li>
                        <li><a href="#" >还款计划</a></li>
                    </ul>
                    <h3><i className="iconfont icon-invitation"></i>奖励管理</h3>
                    <ul>
                      <ListItemLink to="/my-reward/super-partner">超级合伙人</ListItemLink>
                      <li><a href="/#">我的红包</a></li>
                      <li><a href="#">我的加息券</a></li>
                    </ul>
                    <h3><i className="iconfont icon-setting"></i>基本设置</h3>
                    <ul>
                        <li><a href="#">个人资料</a></li>
                        <li><a href="#">认证中心</a></li>
                        <li><a href="#">风险评估</a></li>
                        <li><a href="#">站内信箱</a></li>
                    </ul>
                </div>
            </div>
        </div>
        {props.children}
    </div>
    );
};
