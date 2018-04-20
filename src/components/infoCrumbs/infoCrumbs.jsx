import React from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';


import { aboutContentAction, articalListAction } from '../../actions/aboutContent';

import PropTypes from 'prop-types';
import '../crumbs/crumbs.less';


const CrumbLink = ({ to, ...rest }) => (
    <Route path={to} children={({ match }) => <Link to={to} className={match && match.isExact ? 'active' : ''} {...rest} />} />
)

const Crumbs = ({ location, match, history, dispatch, ...props }) => {

    const handleCrumbs = (childId) => {
        dispatch(articalListAction(childId, 1));
    }

    const breadcrumbNameMap = {
        '/about': '信息披露',
        '/about/67': ' 关于我们',
        '/about/67/68': ' 平台介绍',
        '/about/67/69': ' 基本信息',
        '/about/67/70': ' 管理团队',
        '/about/67/71': ' 资质证书',
        '/about/67/72': ' 合作伙伴',
        '/about/73': ' 承诺书',
        '/about/73/74': ' 承诺书',
        '/about/75': ' 对外公告',
        '/about/75/76': ' 审计报告',
        '/about/75/77': ' 重大事项',
        '/about/75/78': ' 律所尽调',
        '/about/75/79': ' 备案信息',
        '/about/75/80': ' 收费标准',
        '/about/81': ' 运营数据',
        '/about/81/82': ' 运营数据',
        '/about/81/83': ' 运营报告',
        '/about/84': ' 风险保障',
        '/about/84/85': ' 信用保障',
        '/about/84/86': ' 风险管理',
        '/about/84/87': ' 技术安全',
        '/about/88': ' 法律法规',
        '/about/88/89': ' 法律法规',
        '/about/90': ' 咨讯中心',
        '/about/90/91': ' 平台公告',
        '/about/90/92': ' 网贷课堂',
        '/about/90/93': ' 行业新闻',
        '/about/90/94': ' 公司动态',
        '/about/90/95': ' 媒体报道',
        '/about/90/96': ' 常见问题'
    };

    const pathSnippets = location.pathname.split('/').filter(i => i);
    const length = pathSnippets.length;
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        if(index < 3) {
            if(index === length -1) {
                return (
                    <span key={url}>&nbsp;>&nbsp;<CrumbLink to={url} className=''>{breadcrumbNameMap[url]}</CrumbLink></span>
                );
            }
            return (
                <span key={url}>&nbsp;>&nbsp;<CrumbLink to={url} >{breadcrumbNameMap[url]}</CrumbLink></span>
            );
        }
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
