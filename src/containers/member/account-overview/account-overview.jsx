import React from 'react';
import PropTypes from 'prop-types';

import PieChart from '../../../components/charts/pie';
import BarChart from '../../../components/charts/bar';
import {addCommas} from '../../../assets/js/cost';
import './account-overview.less';
import Tab from '../../../components/tab/tab';
import { connect } from 'react-redux';

class AccountOverview extends React.Component{
    render(){
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
                                <div>账户余额: <span>0.00</span>&nbsp;元<em>?<strong>包含您可用余额及投资冻结的金额，满标划转后统一扣除</strong></em></div>
                                <div>可用余额: <span>0.00</span>&nbsp;元</div>
                            </div>
                            <div className="infoLine">
                                <div>昨日收益: <span>0.00</span>&nbsp;元</div>
                                <div>累计收益: <span>0.00</span>&nbsp;元</div>
                            </div>
                        </div>
                        <div className="accountRedbag">
                            <i className="iconfont icon-hongbao"></i>
                            <div className="numInfo">
                                <div className="topM">可用红包</div>
                                <div><span>1</span>个</div>
                            </div>
                            <div className="accountControl">
                                <a className="topF" href="/invest-list">立即使用</a>
                                <a href="/my-reward/my-redEnvelopes">查看明细</a>
                            </div>
                        </div>
                        <div className="accountInterests">
                            <i className="iconfont icon-icongao"></i>
                            <div className="numInfo">
                                <div className="topM">加息券</div>
                                <div><span>0</span>个</div>
                            </div>
                            <div className="accountControl">
                                <a className="topF" href="">立即使用</a>
                                <a href="">查看明细</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="member__cbox pieChart">
                    <Tab>
                        <div name="账户总资产">
                            <PieChart
                                data={[
                                    {name:'散标资产',value:10000.00,instruction:`${addCommas(1000)}元` },
                                    {name:'可用余额',value:500.00,instruction:`${addCommas(1000)}元` },
                                    {name:'冻结金额',value:500.00,instruction:`${addCommas(1000)}元` },
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
                                            xAxis_data:['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
                                            xAxis_data:['3月1','3月2','3月3','3月4','3月5','3月6','3月7','3月8','3月9', '3月10', '3月11', '3月12', '3月13', '3月14', '3月15'],
                                            series_data:[
                                                {
                                                    data:[1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15]
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
    const { auth } = state.toJS();
    return {
        auth,

    };
}

export default connect(mapStateToProps)(AccountOverview);

