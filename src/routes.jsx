import React from 'react';
import { Route, IndexRoute, Switch, Redirect } from 'react-router-dom';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

import App from './components/app/app';
import MemberSidebar from './components/member-sidebar/member-sidebar';

import HomePage from './containers/home-page/home-page';
import Login from './containers/login/login';
import Signup from './containers/signup/signup';

import InvestList from './containers/invest/invest-list/invest-list';

import LoanIndex from './containers/loan/loan-index/loan-index';

import AccountOverview from './containers/member/account-overview/account-overview';
import BankCard from './containers/member/bank-card/bank-card';
import Recharge from './containers/member/recharge/recharge';
import Withdrawals from './containers/member/withdrawals/withdrawals';
import TransactionRecord from './containers/member/transaction-record/transaction-record';

import MyLoan from './containers/member/my-loan/my-loan/my-loan';
import RepaymentPlans from './containers/member/my-loan/repaymentPlans/repaymentPlans';

import MyInvestments from './containers/member/my-investments/my-investments/my-investments';
import Receiving from './containers/member/my-investments/receiving/receiving';

import SuperPartner from './containers/member/reward/super-partner/super-partner';
import PartnerList from './containers/member/reward/partner/master/master';
import MyRedEnvelopes from './containers/member/reward/my-redEnvelopes/myRedEnvelopes';
import MyRateCoupons from './containers/member/reward/my-rateCoupons/my-rateCoupons';

import MyAuthInfo from './containers/member/settings/my-authInfo/my-authInfo';
import MyMessage from './containers/member/settings/my-messages/my-messages';
import MyRiskAssess from './containers/member/settings/my-riskAssess/my-riskAssess';

import About from './components/about/aboutus-common';
import Team from './containers/about/team/team';
import Partners from './containers/about/partners/partners';
import ArticleList from './containers/about/list/list';



const userIsAuthenticated = connectedRouterRedirect({
   // The url to redirect user to if they fail
  redirectPath: '/login',
   // If selector is true, wrapper will not redirect
   // For example let's check that state contains user data
  authenticatedSelector: state => state.getIn(['auth', 'isAuthenticated']),
  // A nice display name for this check
  wrapperDisplayName: 'UserIsAuthenticated'
})

console.log(userIsAuthenticated)


export default (
    <App>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/invest-list" component={userIsAuthenticated(InvestList)} />
            <Route path="/loan-index" component={LoanIndex} />
            <Route strict path="/my-account" render={(props) => {
                const { match } = props;
                return (
                    <MemberSidebar {...props}>
                        <Switch>
                            <Redirect exact from={`${match.url}`} to={`${match.url}/account-overview`} />
                            <Route path={`${match.url}/account-overview`} component={AccountOverview} />
                            <Route path={`${match.url}/bank-card`} component={BankCard} />
                            <Route path={`${match.url}/recharge`} component={Recharge} />
                            <Route path={`${match.url}/withdrawals`} component={Withdrawals} />
                            <Route path={`${match.url}/transaction-record`} component={TransactionRecord} />
                            <Redirect to="/" />
                        </Switch>
                    </MemberSidebar>
                )
            }} />
            <Route strict path="/my-loan" render={(props) => {
                const { match } = props;
                return (
                    <MemberSidebar {...props}>
                        <Switch>
                            <Redirect exact from={`${match.url}`} to={`${match.url}/my-loan`} />
                            <Route path={`${match.url}/my-loan`} component={MyLoan} />
                            <Route path={`${match.url}/repaymentPlans`} component={RepaymentPlans} />
                            <Redirect to="/" />
                        </Switch>
                    </MemberSidebar>
                )
            }} />
            <Route strict path="/my-investments" render={(props) => {
                const { match } = props;
                return (
                    <MemberSidebar {...props}>
                        <Switch>
                            <Redirect exact from={`${match.url}`} to={`${match.url}/my-investments`} />
                            <Route path={`${match.url}/my-investments`} component={MyInvestments} />
                            <Route path={`${match.url}/receiving`} component={Receiving} />
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
                            <Route path={`${match.url}/my-redEnvelopes`} component={MyRedEnvelopes} />
                            <Route path={`${match.url}/my-rateCoupons`} component={MyRateCoupons} />
                            <Redirect to="/" />
                        </Switch>
                    </MemberSidebar>
                )
            }} />
            <Route strict path="/my-settings" render={(props) => {
                const { match } = props;
                return (
                    <MemberSidebar {...props}>
                        <Switch>
                            <Route path={`${match.url}/my-messages`} component={MyMessage} />
                            <Route path={`${match.url}/my-authInfo`} component={MyAuthInfo} />
                            <Route path={`${match.url}/my-riskAssess`} component={MyRiskAssess} />

                            <Redirect to="/" />
                        </Switch>
                    </MemberSidebar>
                )
            }} />
            <Route path="/about" render={(props) => {
                const { match } = props;
                return(
                    <About>
                        <Switch>
                            <Redirect exact from={`${match.url}`} to={`${match.url}/team`} />
                            <Route path={`${match.url}/team`} component={Team} />
                            <Route path={`${match.url}/partners`} component={Partners} />
                            <Redirect to="/" />
                        </Switch>
                    </About>
                )
            }} />
            <Route path="/news" render={(props) => {
                const { match } = props;
                return(
                    <About>
                        <Switch>
                            <Redirect exact from={`${match.url}`} to={`${match.url}/media-report`} />
                            <Route path={`${match.url}/media-report`} component={ArticleList} />
                            <Redirect to="/" />
                        </Switch>
                    </About>
                )
            }} />
            <Redirect to="/" />
        </Switch>
    </App>
);