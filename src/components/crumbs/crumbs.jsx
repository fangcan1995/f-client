import React from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import PropTypes from 'prop-types';
import './crumbs.less';


/*const CrumbsLink = ({ to, name }) => {
    <Route path={to} children={({ match }) => (
        <a className={match ? 'active' : ''}>
            <Link to={to} />
            {name ? name : ''}
        </a>
    )} />
} */


const Crumbs = ({ location, match, history, ...props}) => {
    console.log(location);
    console.log(match);
    console.log(history);
    
    const breadcrumbNameMap = {
        '/my-account': '我的账户',
        '/my-account/account-overview': '账户总览',
    };
    
    let pathes = location.pathname;
    let path = pathes.split('/').filter(i => i);
    const pathNew = path.map((_, index) => {
        const url = `/${path.slice(0, index+1).join('/')}`;
        if(index >= path.length) {
            return (
                <span key={url}><Link to={url}>{breadcrumbNameMap[url]}</Link></span>
            );
        }
        else {
            return (
                <span key={url}>><Link to={url} >{breadcrumbNameMap[url]}</Link></span>
                
            );
        }
        /*return (<Link to={url} key={url}>{breadcrumbNameMap[url]}<span>></span></Link>);*/
    });
    
    console.log(pathNew);
    
    const breadcrumbItems = [(
        <Link to="/" key="home">首页</Link>
    )].concat(pathNew);
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

