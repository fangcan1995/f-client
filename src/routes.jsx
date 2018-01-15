import React from 'react';
import { Route, IndexRoute, Switch, Redirect } from 'react-router-dom';

import App from './components/app/app';
import MemberSidebar from './components/member-sidebar/member-sidebar';

import HomePage from './containers/home-page/home-page';
import Login from './containers/login/login';
import InvestIndex from './containers/invest-index/invest-index';
import InvestList from './containers/invest-list/invest-list';
import LoanIndex from './containers/loan-index/loan-index';

import SuperPartner from './containers/super-partner/super-partner';
import PartnerList from './containers/partner-list/partner-list';
import AccountOverview from './containers/member/overview/account-overview/account-overview';
import CardInfo from './containers/member/overview/cardInfo/cardInfo'
import TransactionRecord from './containers/member/overview/transaction-record/transaction-record';
import redEnvelopes from './containers/member/reward/redEnvelopes/redEnvelopes';

import About from './components/about/aboutus-common'
import Team from './containers/about/team/team'
import Partners from './containers/about/partners/partners'
import ArticleList from './containers/about/list/list'

export default (
    <App>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/invest-list" component={InvestList} />
            <Route path="/loan-index" component={LoanIndex} />
            <Route strict path="/my-account" render={(props) => {
                const { match } = props;
                return (
                    <MemberSidebar {...props}>
                        <Switch>
                            <Redirect exact from={`${match.url}`} to={`${match.url}/account-overview`} />
                            <Route path={`${match.url}/overview/cardInfo`} component={CardInfo} />
                            <Route path={`${match.url}/overview/account-overview`} component={AccountOverview} />
                            <Route path={`${match.url}/overview/transaction-record`} component={TransactionRecord} />
                            <Route path={`${match.url}/reward/redEnvelopes`} component={redEnvelopes} />
                            <Redirect to="/" />
                        </Switch>
                    </MemberSidebar>
                )
            }} />
            <Route strict path="/my-reward" render={(props) => {
                const { match } = props;
                return (
                    <MemberSidebar {...props}>
                        <Switch>
                            <Route path={`${match.url}/super-partner`} component={SuperPartner} />
                            <Route path={`${match.url}/partner-list`} component={PartnerList} />
                            <Redirect to="/" />
                        </Switch>
                    </MemberSidebar>
                )
            }} />
            {/*<Route path="/about/" render={(props) => {
                const { match } = props;
                return(
                    <About>
                        <Switch>
                            <Route path={`${match.url}/aboutus/team`} component={Team} />
                            <Route path={`${match.url}/aboutus/partners`} component={Partners} />
                            <Route path={`${match.url}/news/mediaReport`} component={ArticleList} />
                            <Redirect to="/" />
                        </Switch>
                    </About>
                )
            }} />*/}
            <Redirect to="/" />
        </Switch>
    </App>
);