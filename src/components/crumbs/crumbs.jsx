import React from 'react';
import { Route, Link } from 'react-router-dom';

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


export default ({ location, match, history, ...props}) => {
    console.log(location);
    console.log(match);
    console.log(history);
    return (
        <div className="crumb">
            <div>
                <b>您所在的位置：</b>
            </div>
        </div>
    );
}

