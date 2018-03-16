import React from 'react';
import PropTypes from 'prop-types';

import PieChart from '../../../components/charts/pie';
import BarChart from '../../../components/charts/bar';
import {addCommas} from '../../../assets/js/cost';
import './account-overview.less';
import Tab from '../../../components/tab/tab';
import { connect } from 'react-redux';
import  memberActions  from '../../../actions/member';
import { Link, NavLink } from 'react-router-dom';
import {toMoney,toNumber} from  '../../../assets/js/famatData';

class AccountOverview extends React.Component{
    componentDidMount() {
        this.props.dispatch(memberActions.getInfo());
    }
    render(){
        console.log('-------this.props-------');
        console.log(this.props);
        let {amount,redInfo,couponInfo}=this.props.member.accountsInfo;
        return (
            <div className="member__main">
                <div className="crumb">
                    <div>
                        <b>您所在的位置：</b>
                        <a href="">首页</a>&nbsp;&gt;
                        <a href="" className="actice">我的账户</a>
                    </div>
                </div>
                <a className="adver" href=""></a>
                <div className="member__cbox">
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
                <div className="member__cbox pieChart">
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
                <div className="member__cbox">
                    <Tab>
                        <div name="收益情况" className="chart">
                            <Tab>
                                <div name="累计收益">
                                    <BarChart
                                        data={{
                                            xAxis_data:['2018-03', '2018-02', '2018-01', '2017-12', '2017-11', '2017-10', '2017-09', '8月', '9月', '10月', '11月', '12月'],
                                            series_data:[
                                                {
                                                    data:[1, 2, 3, 4, 5, 6, 7, 8,9,10, 11, 12]
                                                }
                                            ]
                                        }}
                                        style={{height: '300px', width: '930px'}}
                                    >
                                    </BarChart>
                                </div>
                                <div name="每日收益">
                                    <BarChart
                                        data={{
                                            xAxis_data:['03-1','03-2','03-3','03-4','03-5','03-6','03-7','03-8','03-9', '03-10', '03-11', '03-12', '03-13', '03-14', '03-15'],
                                            series_data:[
                                                {
                                                    data:[0, 20.5, 20.5, 20.5, 20.5, 20.5, 20.5,18,18,18,18,12,13,14,15]
                                                }
                                            ]
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

