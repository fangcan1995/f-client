import React from 'react';
import PropTypes from 'prop-types';

import PieChart from '../../../components/charts/pie';
import BarChart from '../../../components/charts/bar';
import './account-overview.less';
import Tab from '../../../components/tab/tab';
import { connect } from 'react-redux';
import  memberActions  from '../../../actions/member';
import  {memberAc}  from '../../../actions/member';
import { Link, NavLink } from 'react-router-dom';
import {toMoney,toNumber,addCommas} from '../../../utils/famatData';
import Crumbs from '../../../components/crumbs/crumbs';
import {BbhAlert} from '../../../components/bbhAlert/bbhAlert';
class AccountOverview extends React.Component{
    componentDidMount() {
        //this.props.dispatch(memberAc.getInfo());
        console.log('这也执行了');
        window.scrollTo(0,0);
        this.props.dispatch(memberAc.getMonth());
        this.props.dispatch(memberAc.getDay());
    }
    render(){

        let {member,account}=this.props;
        console.log('账户信息');
        console.log(account);
        let {accountsInfo}=account;
        let {accountBalance,availableBalance,yestEarns,totalEarns,memberRedInfo,memberCoupon}=accountsInfo;
        let {charts}=member;
        let {amount}=member.accountsInfo;

        return (
            <div className="member__main">
                <Crumbs />
                <div className="member__cbox">
                    <div className="master">
                        <div className="accountInfo">
                            <div className="infoLine">
                                <div>账户余额: <span>{toMoney(accountBalance)}</span>&nbsp;元<em>?<strong>包含您可用余额及投资冻结的金额，满标划转后统一扣除</strong></em></div>
                                <div>可用余额: <span>{toMoney(availableBalance)}</span>&nbsp;元</div>
                            </div>
                            <div className="infoLine">
                                <div>昨日收益: <span>{toMoney(yestEarns)}</span>&nbsp;元</div>
                                <div>累计收益: <span>{toMoney(totalEarns)}</span>&nbsp;元</div>
                            </div>
                        </div>
                        <div className="accountRedbag">
                            <i className="iconfont icon-hongbao"></i>
                            <div className="numInfo">
                                <div className="topM">可用红包</div>
                                <div>
                                    {
                                        (accountsInfo===``)?`<span>toNumber(memberRedInfo.number)</span>个`
                                        :``
                                    }
                                    </div>
                            </div>
                            <div className="accountControl">
                                <Link to="/invest-list" className="topF">立即使用</Link>
                                <Link to="/my-reward/my-redEnvelopes" >查看明细</Link>
                            </div>
                        </div>
                        <div className="accountInterests">
                            <i className="iconfont icon-icongao"></i>
                            <div className="numInfo">
                                <div className="topM">加息券</div>
                                <div>
                                    {
                                        (accountsInfo===``)?`<span>toNumber(memberCoupon.number)</span>个`
                                            :``
                                    }
                                </div>
                            </div>
                            <div className="accountControl">
                                <Link to="/invest-list" className="topF">立即使用</Link>
                                <Link to="/my-reward/my-rateCoupons" >查看明细</Link>
                            </div>
                        </div>
                    </div>
                </div>
                {(amount==='')?``
                    :<div className="member__cbox pieChart">
                        <Tab>
                            <div name="账户总资产">
                                <PieChart
                                    data={[
                                        {name:'散标资产',value:amount.investAmount,instruction: `${addCommas(amount.investAmount)}元` },
                                        {name:'可用余额',value:availableBalance,instruction: `${addCommas(availableBalance)}元` },
                                        {name:'冻结金额',value:amount.freezingAmount,instruction: `${addCommas(amount.freezingAmount)}元` },
                                    ]}
                                    style={{height: '300px', width: '930px'}}
                                    totalTitle="资产总额"
                                >
                                </PieChart>
                            </div>
                        </Tab>
                    </div>
                    }
                <div className="member__cbox">
                    <Tab>
                        <div name="收益情况" className="chart">
                            <Tab>
                                <div name="累计收益">
                                    <BarChart
                                        data={{
                                            xAxis_data:charts.chartsMonth.xAxis_data,
                                            series_data:charts.chartsMonth.series_data
                                        }}
                                        style={{height: '300px', width: '930px'}}
                                    >
                                    </BarChart>
                                </div>
                                <div name="每日收益">
                                    <BarChart
                                        data={{
                                            xAxis_data:charts.chartsDay.xAxis_data,
                                            series_data:charts.chartsDay.series_data
                                        }}
                                        style={{height: '300px', width: '930px'}}
                                    >
                                    </BarChart>
                                </div>
                            </Tab>
                        </div>
                    </Tab>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { auth,account,member } = state.toJS();
    return {
        auth,
        account,
        member
    };
}

export default connect(mapStateToProps)(AccountOverview);

