import React from 'react';
import { Route, Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import './member-sidebar.less';
import MyAdatar from '../myAvatar/myAdatar'

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
        <div className="wrapper">
            <div className="member__sidebar">
                <div className="menu">
                    <div className="sideMenu__memberInfo">
                        {/*<figure className="memberPhoto">
                            <img src={require('../../assets/images/account/picture.png')} id="tx" />
                        </figure>*/}
                        <MyAdatar  />
                        <div className="memberId">tongxin</div>
                        <div className="memberStep">
                            <i className="iconfont icon-phone able"></i>
                            <i className="iconfont icon-card able"></i>
                            <i className="iconfont icon-fxcp unable"></i>
                        </div>
                        <div className="memberControl">
                            <a href="/my-account/overview/recharge" className="btn btn_recharge">充值</a>
                            <a href="/my-account/overview/withdrawPage" className="btn btn_withdrawals">提现</a>
                        </div>
                    </div>
                    <div className="sideMenu__nav">
                        <h3><i className="iconfont icon-all"></i>账户总览</h3>
                        <ul>
                            <ListItemLink to="/my-account/overview/account-overview">我的账户</ListItemLink>
                            <ListItemLink to="/my-account/overview/cardInfo">银行卡</ListItemLink>
                            <ListItemLink to="/my-account/overview/recharge">充值</ListItemLink>
                            <ListItemLink to="/my-account/overview/withdrawPage">提现</ListItemLink>
                            <ListItemLink to="/my-account/overview/transaction-record">交易记录</ListItemLink>
                        </ul>
                        <h3><i className="iconfont icon-invest"></i>我的投资</h3>
                        <ul>
                            <ListItemLink to="/my-account/invest/investments">我的投资</ListItemLink>
                            <ListItemLink to="/my-account/invest/receiving">回款统计</ListItemLink>
                        </ul>
                        <h3><i className="iconfont icon-myloan"></i>我的借款</h3>
                        <ul>
                            <ListItemLink to="/my-account/loans/myLoans">我的借款</ListItemLink>
                            <ListItemLink to="/my-account/loans/RepaymentPlans">还款计划</ListItemLink>
                        </ul>
                        <h3><i className="iconfont icon-invitation"></i>奖励管理</h3>
                        <ul>
                            <ListItemLink to="/my-reward/super-partner">超级合伙人</ListItemLink>
                            <ListItemLink to="/my-reward/partner">注册理财师</ListItemLink>
                            <ListItemLink to="/my-reward/redEnvelopes">我的红包</ListItemLink>
                            <ListItemLink to="/my-reward/rateCoupons">我的加息券</ListItemLink>
                        </ul>
                        <h3><i className="iconfont icon-setting"></i>基本设置</h3>
                        <ul>
                            <ListItemLink to="/my-account/settings/authInfo">个人资料</ListItemLink>
                            <ListItemLink to="/my-account/settings/riskAssess">风险评估</ListItemLink>
                            <ListItemLink to="/my-account/settings/message">站内信箱</ListItemLink>
                        </ul>
                    </div>
                </div>
            </div>
            {props.children}
        </div>
    </div>
    );
};
