import React from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import PropTypes from 'prop-types';
import './crumbs.less';


const CrumbLink = ({ to, ...rest }) => (
  <Route path={to} children={({ match }) => <Link to={to} className={ match && match.isExact ? 'active' : '' } {...rest}/>}/>
)

const Crumbs = ({ location, match, history, ...props}) => {
    
    const breadcrumbNameMap = {
        '/my-account': '我的账户',
        '/my-account/account-overview': '账户总览',
        '/my-account/bank-card': '我的银行卡',
        '/my-account/recharge': '充值',
        '/my-account/withdrawals': ' 提现',
        '/my-account/transaction-record': ' 交易记录',
        '/my-loan': ' 我的借款',
        '/my-loan/my-loan': ' 我的借款',
        '/about': ' 关于我们',
        '/about/team': ' 管理团队',
        '/about/introduce': ' 公司简介'

    };
    
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <span key={url}>&nbsp;>&nbsp;<CrumbLink to={url}>{breadcrumbNameMap[url]}</CrumbLink></span>
        );
    });
    const breadcrumbItems = [<CrumbLink to="/" key="home">首页</CrumbLink>].concat(extraBreadcrumbItems);
    return (
        <div className="crumb">
            <div>
                <b>您所在的位置：</b>
                {breadcrumbItems}
            </div>
        </div>
    );
}

export default withRouter(Crumbs);

