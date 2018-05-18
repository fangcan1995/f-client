import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { Avatar } from 'antd';
import './member-sidebar.less';
import MyAvatar from '../myAvatar/myAdatar';
import {accountAc} from "../../actions/account";
const ListItemLink = ({ to, ...rest }) => (
  <Route path={to} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} {...rest}/>
    </li>
  )}/>
)

class MemberSidebar extends React.Component {
    componentWillMount() {
        console.log('执行了');
        this.props.dispatch(accountAc.getAccountInfo());  //获取会员帐户信息
    }
    render(){
        let {account,auth}=this.props;
        let {accountsInfo}=account;
        let {photo,treeName,availableBalance,memberRedInfo,memberCoupon,postResult,isCertification,isOpenAccount,isRisk,riskLevel,isNovice}=accountsInfo;
        console.log('返回的会员信息');
        console.log(this.props);
        return (
            <main className="main member">
                <div className="wrapper">
                    <div className="member__sidebar">
                        <div className="member__info">
                            <div className="info">
                                <MyAvatar photo={photo}/>
                                <div className="username">
                                    {
                                    (treeName!='')? treeName
                                        :auth.user.userName
                                    }
                                </div>
                                <div className="step">
                                    <i className="iconfont icon-phone able1" onClick={()=>{this.props.history.push('/my-account/recharge')}}></i>
                                    <i className={`iconfont icon-card able${isOpenAccount || 0}`} onClick={()=>{this.props.history.push('/my-account/bank-card')}}></i>
                                    <i className={`iconfont icon-fxcp able${isRisk || 0}`} onClick={()=>{this.props.history.push('/my-settings/my-riskAssess')}}></i>
                                </div>
                            </div>
                            <div className="action">
                                <button className="btn btn__recharge" onClick={()=>{this.props.history.push('/my-account/recharge')}}>充值</button>
                                <button className="btn btn__withdrawals" onClick={()=>{this.props.history.push('/my-account/withdrawals')}}>提现</button>
                            </div>
                        </div>
                        <div className="menu">
                            <h3><i className="iconfont icon-all"></i>账户总览</h3>
                            <ul>
                                <ListItemLink to="/my-account/account-overview">我的账户</ListItemLink>
                                <ListItemLink to="/my-account/bank-card">银行卡</ListItemLink>
                                <ListItemLink to="/my-account/recharge">充值</ListItemLink>
                                <ListItemLink to="/my-account/withdrawals">提现</ListItemLink>
                                <ListItemLink to="/my-account/transaction-record" >交易记录</ListItemLink>
                            </ul>
                            <h3><i className="iconfont icon-invest"></i>我的投资</h3>
                            <ul>
                                <ListItemLink to="/my-investments/my-investments">我的投资</ListItemLink>
                                <ListItemLink to="/my-investments/receiving">回款统计</ListItemLink>
                            </ul>
                            <h3><i className="iconfont icon-myloan"></i>我的借款</h3>
                            <ul>
                                <ListItemLink to="/my-loan/my-loan">我的借款</ListItemLink>
                                <ListItemLink to="/my-loan/RepaymentPlans">还款计划</ListItemLink>
                            </ul>
                            <h3><i className="iconfont icon-invitation"></i>奖励管理</h3>
                            <ul>
                                {/*{
                                    (accountsInfo.memberIdentity===0)?
                                        <ListItemLink to="/my-reward/partner-list">注册理财师</ListItemLink>
                                        :``
                                }
                                 {
                                    (accountsInfo.memberIdentity===1)?
                                        <ListItemLink to="/my-reward/super-partner">超级合伙人</ListItemLink>
                                        :``
                                } */}
                                <ListItemLink to="/my-reward/my-redEnvelopes">我的红包</ListItemLink>
                                <ListItemLink to="/my-reward/my-rateCoupons">我的加息券</ListItemLink>
                            </ul>
                            <h3><i className="iconfont icon-setting"></i>基本设置</h3>
                            <ul>
                                <ListItemLink to="/my-settings/my-authInfo">个人资料</ListItemLink>
                                <ListItemLink to="/my-settings/my-riskAssess">风险评估</ListItemLink>
                                <ListItemLink to="/my-settings/my-messages">站内信箱</ListItemLink>
                            </ul>
                        </div>
                    </div>
                    {this.props.children}
                </div>
            </main>
        );
    }
}

function mapStateToProps(state) {
    const { auth,account } = state.toJS();
    return {
        auth,
        account
    };
}

export default connect(mapStateToProps)(MemberSidebar);

