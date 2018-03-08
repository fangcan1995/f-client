import React from 'react';
import PropTypes from 'prop-types';
import PieChart from '../../../../components/charts/pie';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import Pagination from '../../../../components/pagination/pagination';
import actionsMyReceiving from './actions_myReceiving';
import './receiving.less';
import { connect } from 'react-redux';
import moment from "moment";
class Receiving extends React.Component{
    componentDidMount () {
        this.props.dispatch(actionsMyReceiving.getData());
    }
    render(){
        let {dispatch}=this.props;
        let {myReceiving}=this.props.memberInvestments;
        let {myList,charts}=myReceiving;
        return(
            <div className="member__main">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="回款统计" className="chart">
                            <Tab>
                                <div name="已回金额">
                                    {
                                        JSON.stringify(charts.data) != "{}"?
                                            <PieChart
                                                data={charts.data.doneDto.data}
                                                style={{height: '300px', width: '930px'}}
                                                totalTitle="已回金额"
                                            >
                                            </PieChart>
                                            :<p>{charts.message}</p>
                                    }
                                </div>
                                <div name="未回金额">
                                    {
                                        JSON.stringify(charts.data) != "{}"?
                                            <PieChart
                                                data={charts.data.todoDto.data}
                                                style={{height: '300px', width: '930px'}}
                                                totalTitle="未回金额"
                                            >
                                            </PieChart>
                                            :<p>{charts.message}</p>
                                    }
                                </div>
                            </Tab>
                        </div>
                    </Tab>
                </div>
                <div className="member__cbox" style={{ padding:'20px 30px' }}>
                    {(JSON.stringify(myList) == '{}') ? (<p>{myList.message}</p>)
                        : (
                            (myList.data.total > 0) ? (
                                    <div className="table__wrapper">
                                        {
                                            myList.data.list.map((l, i) => (
                                                <dl key={`row-${i}`}>
                                                    <dt><p><a href="#">{l.proName}</a></p><strong>{l.proStatus}回款中</strong></dt>
                                                    <dd>投资金额：{l.proMoneyEnd}元</dd>
                                                    <dd>投资日期：{moment(l.inveCreateTime).format('YYYY-MM-DD')}</dd>
                                                    <dd>收益率：{l.proAnnualRate}%</dd>
                                                    <dd>下期回款日：{l.earnShdEarnDate}</dd>
                                                    <dd>结清日期：{l.earnRealEarnDate}</dd>
                                                    <dd>奖励金额：{l.rewardAmount}元</dd>
                                                    <dd>预估收益：{l.earnIncome}元</dd>
                                                    <dd>已回本金：{l.earnTotalCapital}元</dd>
                                                    <dd>已回利息：{l.earnTotalIint}元</dd>
                                                    <dd>已回罚息：{l.earnTotalLateIint}元</dd>
                                                </dl>
                                            ))
                                        }

                                        <Pagination config = {
                                            {
                                                currentPage:myList.data.pageNum,
                                                pageSize:myList.data.pageSize,
                                                totalPage:Math.ceil(myList.data.total/myList.data.pageSize),
                                                paging:(obj)=>{
                                                    dispatch(actionsMyReceiving.getList(obj.currentPage,obj.pageCount));
                                                }
                                            }
                                        } ></Pagination>
                                    </div>
                                )
                                : '暂无记录'
                        )
                    }
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { auth,memberInvestments } = state.toJS();
    return {
        auth,
        memberInvestments,
    };
}
export default connect(mapStateToProps)(Receiving);