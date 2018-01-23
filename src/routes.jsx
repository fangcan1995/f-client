import React from 'react';
import { Route, IndexRoute, Switch, Redirect } from 'react-router-dom';

import App from './components/app/app';
import MemberSidebar from './components/member-sidebar/member-sidebar';

import HomePage from './containers/home-page/home-page';
import Login from './containers/login/login';
import InvestIndex from './containers/invest-index/invest-index';
import InvestList from './containers/invest/invest-list/invest-list';
import InvestDetail from './containers/invest/invest-detail/invest-detail';
import TransferDetail from './containers/invest/invest-detail/transfer-detail';

import LoanIndex from './containers/loan-index/loan-index';



import AccountOverview from './containers/member/overview/account-overview/account-overview';
import CardInfo from './containers/member/overview/cardInfo/cardInfo';
import Recharge from './containers/member/overview/recharge/recharge';
import WithdrawPage from './containers/member/overview/withdrawPage/withdrawPage';
import TransactionRecord from './containers/member/overview/transaction-record/transaction-record';
import RedEnvelopes from './containers/member/reward/redEnvelopes/redEnvelopes';
import RateCoupons from './containers/member/reward/rateCoupons/rateCoupons';
import SuperPartner from './containers/member/reward/super-partner/super-partner';
import Partner from './containers/member/reward/partner/master/master';
import PartnerDetail from './containers/member/reward/partner/detail/detail';
import MyLoans from './containers/member/loans/myLoans/myLoans';
import AuthInfo from './containers/member/settings/authInfo/authInfo';
import RiskAssess from './containers/member/settings/riskAssess/riskAssess';
import Message from './containers/member/settings/message/message';


import About from './components/about/aboutus-common';
import Team from './containers/about/team/team';
import Partners from './containers/about/partners/partners';
import Honor from './containers/about/honor/honor';
import ArticleList from './containers/about/list/list';
import MobileApp from './containers/about/mobile-app/mobileApp'
import Constant  from  './containers/about/constant/constant'
import Contact  from  './containers/about/contact/contact'

export default (
    <App>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/invest/invest-list" component={InvestList} />
            <Route path="/invest/invest-detail" component={InvestDetail} />
            <Route path="/invest/transfer-detail" component={TransferDetail} />
            <Route path="/loan-index" component={LoanIndex} />
            <Route path='/mobileApp' component={MobileApp} />

            <Route strict path="/my-account" render={(props) => {
                const { match } = props;
                return (
                    <MemberSidebar {...props}>
                        <Switch>
                            <Redirect exact from={`${match.url}`} to={`${match.url}/account-overview`} />
                            <Route path={`${match.url}/overview/cardInfo`} component={CardInfo} />
                            <Route path={`${match.url}/overview/account-overview`} component={AccountOverview} />
                            <Route path={`${match.url}/overview/recharge`} component={Recharge} />
                            <Route path={`${match.url}/overview/withdrawPage`} component={WithdrawPage} />
                            <Route path={`${match.url}/overview/transaction-record`} component={TransactionRecord} />

                            <Route path={`${match.url}/loans/myLoans`} component={MyLoans} />
                            <Route path={`${match.url}/settings/authInfo`} component={AuthInfo} />
                            <Route path={`${match.url}/settings/riskAssess`} component={RiskAssess} />
                            <Route path={`${match.url}/settings/message`} component={Message} />




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
                            <Route path={`${match.url}/partner`} component={Partner} />
                            <Route path={`${match.url}/partner-detail`} component={PartnerDetail} />
                            <Route path={`${match.url}/redEnvelopes`} component={RedEnvelopes} />
                            <Route path={`${match.url}/rateCoupons`} component={RateCoupons} />
                            <Redirect to="/" />
                        </Switch>
                    </MemberSidebar>
                )
            }} />
            <Route path="/about/" render={(props) => {
                const { match } = props;
                return(
                    <About>
                        <Switch>
                            <Route path={`${match.url}/constant`} component={Constant} />
                            <Route path={`${match.url}/aboutus/team`} component={Team} />
                            <Route path={`${match.url}/aboutus/partners`} component={Partners} />
                            <Route path={`${match.url}/aboutus/honor`} component={Honor} />
                            <Route path={`${match.url}/news/mediaReport`} component={ArticleList} />
                            <Route path={`${match.url}/help/contact`} component={Contact} />
                            <Redirect to="/" />
                        </Switch>
                    </About>
                )
            }} />
            <Redirect to="/" />
        </Switch>
    </App>
);