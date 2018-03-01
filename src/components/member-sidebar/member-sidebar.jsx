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
    <main className="main member">
        <div className="wrapper">
            <div className="member__sidebar">
                <div className="member__info">
                    <div className="info">
                        <figure className="avatar">
                            <img src={require('../../assets/images/account/picture.png')} id="tx" />
                        </figure>
                        <div className="username">tongxin</div>
                        <div className="step">
                            <i className="iconfont icon-phone able"></i>
                            <i className="iconfont icon-card able"></i>
                            <i className="iconfont icon-fxcp unable"></i>
                        </div>
                    </div>
                    <div className="action">
                        <button className="btn btn__recharge">充值</button>
                        <button className="btn btn__withdrawals">提现</button>
                    </div>
                </div>
                <div className="menu">
                    <h3><i className="iconfont icon-all"></i>账户总览</h3>
                    <ul>
                        <ListItemLink to="/my-account/account-overview">我的账户</ListItemLink>
                        <ListItemLink to="/my-account/bank-card">银行卡</ListItemLink>
                        <ListItemLink to="/my-account/recharge">充值</ListItemLink>
                        <ListItemLink to="/my-account/withdrawals">提现</ListItemLink>
                        <ListItemLink to="/my-account/transaction-record">交易记录</ListItemLink>
                    </ul>
                    <h3><i className="iconfont icon-invest"></i>我的投资</h3>
                    <ul>
                        <li><a href="#">我的投资</a></li>
                        <li><a href="#">回款记录</a></li>
                    </ul>
                    <h3><i className="iconfont icon-myloan"></i>我的借款</h3>
                    <ul>
                        <ListItemLink to="/my-loan/my-loan">我的借款</ListItemLink>
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
            {props.children}
        </div>
    </main>
    );
};
