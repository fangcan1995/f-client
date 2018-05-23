import React from 'react';
import PropTypes from 'prop-types';
import PieChart from '../../../components/charts/pie';
import BarChart from '../../../components/charts/bar';
import Tab from '../../../components/tab/tab';
import { connect } from 'react-redux';
import {accountAc} from '../../../actions/account';
import  {memberAc}  from '../../../actions/member';
import { Link } from 'react-router-dom';
import {toMoney,toNumber,addCommas} from '../../../utils/famatData';
import Crumbs from '../../../components/crumbs/crumbs';
import { Tooltip, message, Button } from 'antd';
import './account-overview.less';

class AccountOverview extends React.Component{
    componentDidMount() {
        window.scrollTo(0,0);
        this.props.dispatch(accountAc.getAccountInfo());  //获取账户信息
        this.props.dispatch(memberAc.getMonth());  //获取月收益统计数据
        this.props.dispatch(memberAc.getDay()); //获取日收益统计数据
    }
    render(){
        let {member,account}=this.props;
        let {accountsInfo}=account;
        let {accountBalance,availableBalance,yestEarns,totalEarns,memberRedInfo,memberCoupon,investAmount,freezingAmount}=accountsInfo;
        let {amount}=member.accountsInfo;
        let {charts}=member;

        return (
            <div className="member__main">
                <Crumbs />
                <div className="member__cbox">
                    <div className="master">
                        <div className="accountInfo">
                            <div className="infoLine">
                                <div>
                                    <Tooltip
                                        placement="topLeft"
                                        title="包含您可用余额及投资冻结的金额，满标划转后统一扣除"
                                        arrowPointAtCenter overlayClassName='myTooltip'
                                    >
                                        <span style={{cursor:'default'}}>账户余额:</span>
                                    </Tooltip>
                                    <span className='money'>{toMoney(accountBalance)}</span>&nbsp;元
                                </div>
                                <div>可用余额: <span className='money'>{toMoney(availableBalance)}</span>&nbsp;元</div>
                            </div>
                            <div className="infoLine">
                                <div>昨日收益: <span className='money'>{toMoney(yestEarns)}</span>&nbsp;元</div>
                                <div>累计收益: <span className='money'>{toMoney(totalEarns)}</span>&nbsp;元</div>
                            </div>
                        </div>
                        <div className="accountRedbag">
                            <i className="iconfont icon-hongbao"></i>
                            <div className="numInfo">
                                <div className="topM">可用红包</div>
                                    {
                                        (accountsInfo!=``)?
                                            <div>
                                                <span>{toNumber(memberRedInfo.number)}</span>个
                                            </div>
                                            :<div></div>
                                    }
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
                                    {
                                        (accountsInfo!=``)?
                                            <div>
                                                <span>{toNumber(memberCoupon.number)}</span>个
                                            </div>
                                            :<div></div>
                                    }
                            </div>
                            <div className="accountControl">
                                <Link to="/invest-list" className="topF">立即使用</Link>
                                <Link to="/my-reward/my-rateCoupons" >查看明细</Link>
                            </div>
                        </div>
                    </div>
                </div>
                {(accountsInfo==='')?``
                    :<div className="member__cbox pieChart">
                        <Tab>
                            <div name="账户总资产">
                                <PieChart
                                    data={[
                                        {name:'散标资产',value:investAmount,instruction: `${addCommas(investAmount)}元` },
                                        {name:'可用余额',value:availableBalance,instruction: `${addCommas(availableBalance)}元` },
                                        {name:'冻结金额',value:freezingAmount,instruction: `${addCommas(freezingAmount)}元` },
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

