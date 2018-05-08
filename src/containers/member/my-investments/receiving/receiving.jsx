import React from 'react';
import PropTypes from 'prop-types';
import PieChart from '../../../../components/charts/pie';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import Pagination from '../../../../components/pagination/pagination';
import {memberReceivingAc} from "../../../../actions/member-investments";
import './receiving.less';
import { connect } from 'react-redux';
import {Loading,NoRecord} from '../../../../components/bbhAlert/bbhAlert';
import moment from "moment";
class Receiving extends React.Component{
    componentDidMount () {
        window.scrollTo(0,0);
        this.props.dispatch(memberReceivingAc.getPie());
        this.props.dispatch(memberReceivingAc.getList({
            pageNum:1,
            pageSize:10,
        }));
    }
    render(){
        let {dispatch}=this.props;
        let {myReceiving,isFetching}=this.props.memberInvestments;
        let {myList,charts}=myReceiving;
        console.log('回款记录');
        console.log(myList);
        return(
            <div className="member__main receiving">
                <Crumbs/>
                {(charts==='')?``
                    :<div className="member__cbox">
                        <Tab>
                            <div name="回款统计" className="chart">
                                <Tab>
                                    <div name="已回金额">
                                        <PieChart
                                            data={charts.doneDto.data}
                                            style={{height: '300px', width: '930px'}}
                                            totalTitle="已回金额"
                                        >
                                        </PieChart>

                                    </div>
                                    <div name="未回金额">
                                        <PieChart
                                            data={charts.todoDto.data}
                                            style={{height: '300px', width: '930px'}}
                                            totalTitle="未回金额"
                                        >
                                        </PieChart>
                                    </div>
                                </Tab>
                            </div>
                        </Tab>
                    </div>
                }
                <div className="member__cbox" style={{ padding:'20px 30px' }}>
                    {(myList === '') ? <Loading isShow={isFetching} />
                        :<div  className="table__wrapper">
                            {(myList.total > 0) ? (
                                    <div>
                                        {
                                            myList.list.map((l, i) => (
                                                <dl key={`row-${i}`}>
                                                    <dt><p><a href="#">{l.proName}</a></p><strong>{l.proStatus}</strong>
                                                    </dt>
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
                                        <Pagination config={
                                            {
                                                currentPage: myList.pageNum,
                                                pageSize: myList.pageSize,
                                                totalPage: myList.pages,
                                                paging: (obj) => {
                                                    this.props.dispatch(memberReceivingAc.stateModify({myList:``}));
                                                    dispatch(memberReceivingAc.getList(
                                                        {
                                                            pageNum:obj.currentPage,
                                                            pageSize:obj.pageCount,
                                                        }
                                                    ))
                                                }
                                            }
                                        }></Pagination>
                                    </div>
                                )
                                : <NoRecord isShow={true} />
                            }
                        </div>
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