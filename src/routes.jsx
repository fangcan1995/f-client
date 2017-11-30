import React from 'react';
import { Route, IndexRoute, Switch, Redirect } from 'react-router-dom';

import App from './components/app/app';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import MemberSidebar from './components/member-sidebar/member-sidebar';

import HomePage from './containers/home-page/home-page';
import InvestIndex from './containers/invest-index/invest-index';
import InvestList from './containers/invest-list/invest-list';
import LoanIndex from './containers/loan-index/loan-index';
import AccountOverview from './containers/account-overview/account-overview';
import TransactionRecord from './containers/transaction-record/transaction-record';
import SuperPartner from './containers/super-partner/super-partner';
import PartnerList from './containers/partner-list/partner-list';
export default (
    <App>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/invest-index" component={InvestIndex} />
        <Route path="/invest-list" component={InvestList} />
        <Route path="/loan-index" component={LoanIndex} />
        <Route strict path="/my-account" render={(props) => {
          const { match } = props;
          return (
            <MemberSidebar {...props}>
              <Switch>
                <Redirect exact from={`${match.url}`} to={`${match.url}/account-overview`} />
                <Route path={`${match.url}/account-overview`} component={AccountOverview} />
                <Route path={`${match.url}/transaction-record`} component={TransactionRecord} />
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
        <Redirect to="/" />
      </Switch>
    </App>
);