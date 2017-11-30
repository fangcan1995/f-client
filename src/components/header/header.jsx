import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import './header.less';
import logo from '../../assets/images/public/logo.png';
export default (props) => {
  return (
    <header className="header">
      <div className="top">
        <div className="wrapper">
          <div className="top__right">
            <div className="user">
              <a href="" className="welcome">你好！&nbsp;<span className="username">15940804086</span></a>
              <a href="" className="logout">退出</a>
            </div>
            <nav className="shortnav">
              <ul>
                <li><a href="">新手指南</a></li>
                <li><a href="">帮助中心</a></li>
                <li><a href=""><i className="iconfont icon-222"></i>手机APP</a></li>
              </ul>
            </nav>
            <nav className="thirdparty">
              <ul>
                <li><a href="http://www.weibo.com"><i className="iconfont icon-xinlang"></i></a></li>
                <li><a href="http://www.wechat.com"><i className="iconfont icon-weixin"></i></a></li>
                <li><a href="http://www.qq.com"><i className="iconfont icon-tengxun_fuzhi"></i></a></li>
              </ul>
            </nav>
          </div>
          <div className="top__left">
            <p className="hotline">服务热线：400-024-0909（周一至周五8:30～17:00）</p>
          </div>
        </div>
      </div>

      <div className="navbar">
        <div className="wrapper">
          <div className="navbar__left">
            <div className="logo">
              <img src={logo} alt="" className="logo__img" />
            </div>
          </div>
          
          <div className="navbar__right">
            <nav className="nav">
              <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/invest-list">我要投资</Link></li>
                <li><Link to="/loan-index">我要借款</Link></li>
                <li><Link to="/constantTable">信息披露</Link></li>
              </ul>
            </nav>
            <div className="account">
              <div className="dropdown">
                <Link to="/my-account" className="dropdown__toggle">我的账户<i className="iconfont icon-sanjiaojiantou-xia"></i></Link>
                <div className="dropdown__menu">
                  <ul>
                    <li><Link to="/member2">我的投资</Link></li>
                    <li><Link to="/member">我的借款</Link></li>
                    <li><Link to="/member">基本设置</Link></li>
                    <li><Link to="/member">奖励管理</Link></li>
                  </ul>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </header>
    );
};
