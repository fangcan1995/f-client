import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import {accountAc} from "../../actions/account";
import { Tooltip,Popconfirm } from 'antd';
import MyAvatar from '../myAvatar/myAdatar';
import './member-sidebar.less';

const ListItemLink = ({ to, ...rest }) => (
  <Route path={to} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} {...rest}/>
    </li>
  )}/>
)

class MemberSidebar extends Component {
    componentWillMount() {
        this.props.dispatch(accountAc.getAccountInfo());  //获取会员帐户信息
    }
    handle_confirmOpen() {
        this.props.history.push('/my-settings/bank-card')
    }
    handle_confirmRisk() {
        this.props.history.push('/my-settings/my-riskAssess')
    }
    render(){
        const {account,auth}=this.props;
        const {accountsInfo}=account;
        const {photo,trueName,isOpenAccount,isRisk}=accountsInfo;
        return (
            <main className="main member">
                <div className="wrapper">
                    <div className="member__sidebar">
                        <div className="member__info">
                            <div className="info">
                                <MyAvatar photo={photo}/>
                                <div className="username">
                                    {
                                    (trueName!='')? trueName
                                        :auth.user.userName
                                    }
                                </div>
                                <div className="step">
                                    <Tooltip
                                        placement="topLeft"
                                        title="已绑定手机号"
                                        arrowPointAtCenter overlayClassName='myTooltip'
                                    >
                                        <i className="iconfont icon-phone able1" ></i>
                                    </Tooltip>
                                    {(isOpenAccount===`1`)?
                                        <Tooltip
                                            placement="topLeft"
                                            title="已开户"
                                            arrowPointAtCenter overlayClassName='myTooltip'
                                        >
                                            <i className='iconfont icon-card able1' ></i>
                                        </Tooltip>
                                        :<Popconfirm placement="top" title={`未开户，是否开户`}  okText="确定" cancelText="取消" trigger='hover'
                                                     onConfirm={this.handle_confirmOpen}

                                        >
                                            <i className='iconfont icon-card able0'></i>
                                        </Popconfirm>
                                    }
                                    {(isRisk===`1`)?
                                        <Tooltip
                                            placement="topLeft"
                                            title="已测评"
                                            arrowPointAtCenter overlayClassName='myTooltip'

                                        >
                                            <i className='iconfont icon-fxcp able1' ></i>
                                        </Tooltip>
                                        :<Popconfirm placement="top" title={`未测评，是否测评`} onConfirm={this.handle_confirmRisk} okText="确定" cancelText="取消" trigger='hover'>
                                            <i className='iconfont icon-fxcp able0'></i>
                                        </Popconfirm>
                                    }

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

