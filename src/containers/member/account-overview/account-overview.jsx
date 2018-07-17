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
    componentWillMount() {
        const {auth}=this.props;
        if(auth.user.remarks===`2`){
            this.props.history.push({ pathname : '/my-loan/my-loan'});//如果是借款用户自动跳转到我的借款页
        }
    }
    componentDidMount() {
        window.scrollTo(0,0);
        this.props.dispatch(accountAc.getAccountInfo());  //获取账户信息
        this.props.dispatch(memberAc.getMonth());  //获取月收益统计数据
        this.props.dispatch(memberAc.getDay()); //获取日收益统计数据
    }
    render(){
        const {member,account}=this.props;
        const {accountsInfo}=account;
        const {accountBalance,availableBalance,memberRedInfo,memberCoupon,investAmount,freezingAmount}=accountsInfo;
        const {charts}=member;
        let totalEarns=charts.chartsMonth.series_data;
        let yestEarns=charts.chartsDay.series_data;

        /*if(totalEarns){
            console.log('累计收益')
            console.log(totalEarns[0].data[11])
        }*/
        return (
            <div className="member__main">
                <Crumbs />
                <div className="member__cbox">
                    <div className="master">
                        <div className="accountInfo">
                            <div className="infoLine">
                                <div>

                                        <span style={{cursor:'default'}}>账户余额:</span>

                                    <span className='money'>{toMoney(accountBalance)}</span>&nbsp;元
                                <Tooltip
                                    placement="topLeft"
                                    title="包含您可用余额及投资冻结的金额，满标划转后统一扣除"
                                    arrowPointAtCenter overlayClassName='myTooltip'
                                >
                                    <span style={{cursor:'default'}} className='readme'>?</span>
                                </Tooltip>
                                </div>
                                <div>可用余额:<span className='money'>{toMoney(availableBalance)}</span>&nbsp;元</div>
                            </div>
                            <div className="infoLine">
                                <div>昨日收益:
                                    {(yestEarns)?<span className='money'>{toMoney(yestEarns[0].data[yestEarns[0].data.length-2])}</span>
                                        :``
                                    }
                                    &nbsp;元
                                </div>
                                <div>


                                        <span style={{cursor:'default'}}>累计收益:</span>


                                    {(totalEarns)?<span className='money'>{toMoney(totalEarns[0].data[totalEarns[0].data.length-1])}</span>
                                        :``
                                    }
                                    &nbsp;元
                                <Tooltip
                                    placement="topLeft"
                                    title="出借人在巴巴汇出借累计获得的预估回款总额（已扣除相关费用）"
                                    arrowPointAtCenter overlayClassName='myTooltip'
                                >
                                    <span style={{cursor:'default'}} className='readme'>?</span>
                                </Tooltip>
                                </div>
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
                                        {name:'散标资产',value:investAmount,instruction: `${addCommas(investAmount)}元`,readMe:`散标和债权转让标回款中的金额总和` },
                                        {name:'可用余额',value:availableBalance,instruction: `${addCommas(availableBalance)}元`,readMe:`账户内可用于出借和提现的金额，不包含冻结金额` },
                                        {name:'冻结金额',value:freezingAmount,instruction: `${addCommas(freezingAmount)}元` ,readMe:`冻结金额=散标/债权转让招标中金额+提现在途资金`},
                                    ]}
                                    unit={`元`}
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
                            {/*<dl className='total_income'>
                                <dt>累计回款：
                                    <Tooltip
                                        placement="topLeft"
                                        title='出借人在巴巴汇出借累计获得的预估回款总额（已扣除相关费用）'
                                        arrowPointAtCenter overlayClassName='myTooltip'
                                    >
                                        <span style={{cursor:'default'}} className='readme'>?</span>
                                    </Tooltip>
                                </dt>
                                <dd>{totalEarns[0].data[11] || `0.00`}元</dd>
                            </dl>*/}
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

