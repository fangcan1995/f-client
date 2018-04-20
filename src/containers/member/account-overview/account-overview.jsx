import React from 'react';
import PropTypes from 'prop-types';

import PieChart from '../../../components/charts/pie';
import BarChart from '../../../components/charts/bar';
import {addCommas} from '../../../assets/js/cost';
import './account-overview.less';
import Tab from '../../../components/tab/tab';
import { connect } from 'react-redux';
import  memberActions  from '../../../actions/member';
import  {memberAc}  from '../../../actions/member';
import { Link, NavLink } from 'react-router-dom';
import {toMoney,toNumber} from  '../../../assets/js/famatData';
import Crumbs from '../../../components/crumbs/crumbs';
import {BbhAlert} from '../../../components/bbhAlert/bbhAlert';
class AccountOverview extends React.Component{
    componentDidMount() {
        //this.props.dispatch(memberAc.getInfo());
        window.scrollTo(0,0);
        this.props.dispatch(memberAc.getMonth());
        this.props.dispatch(memberAc.getDay());
    }
    render(){
        console.log('-------this.props-------');
        console.log(this.props);
        let {charts,accountsInfo}=this.props.member;
        console.log('统计图表数据');
        console.log(charts);
        let {amount,redInfo,couponInfo}=accountsInfo;
        return (
            <div className="member__main">
                <Crumbs />
                <div className="member__cbox">
                    {/*<div className="pop__invest">
                        <BbhAlert
                            info={{message:'成功',description:'开户成功',type:'success',
                                callback:()=>{
                                    this.modalClose()
                                }
                            }}
                        />
                    </div>*/}
                    <div className="master">
                        <div className="accountInfo">
                            <div className="infoLine">
                                <div>账户余额: <span>{toMoney(amount.accountBalance)}</span>&nbsp;元<em>?<strong>包含您可用余额及投资冻结的金额，满标划转后统一扣除</strong></em></div>
                                <div>可用余额: <span>{toMoney(amount.availableBalance)}</span>&nbsp;元</div>
                            </div>
                            <div className="infoLine">
                                <div>昨日收益: <span>{toMoney(amount.freezingAmount)}</span>&nbsp;元</div>
                                <div>累计收益: <span>{toMoney(amount.investAmount)}</span>&nbsp;元</div>
                            </div>
                        </div>
                        <div className="accountRedbag">
                            <i className="iconfont icon-hongbao"></i>
                            <div className="numInfo">
                                <div className="topM">可用红包</div>
                                <div><span>{toNumber(redInfo.number)}</span>个</div>
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
                                <div><span>{toNumber(couponInfo.number)}</span>个</div>
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
                                        {name:'可用余额',value:amount.availableBalance,instruction: `${addCommas(amount.availableBalance)}元` },
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
    const { auth,member } = state.toJS();
    return {
        auth,
        member
    };
}

export default connect(mapStateToProps)(AccountOverview);

