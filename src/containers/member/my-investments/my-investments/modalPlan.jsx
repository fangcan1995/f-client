import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import { connect } from 'react-redux';
import {memberInvestAc} from "../../../../actions/member-investments";
import {Loading,NoRecord} from '../../../../components/bbhAlert/bbhAlert';
class ModalPlan extends React.Component {
    componentDidMount () {
        this.props.dispatch(memberInvestAc.getPlanList(this.props.info.currentId));
    }
    render() {
        console.log('计划');
        console.log(this.props.memberInvestments);
        let {isFetching}=this.props.memberInvestments;
        let {currentId,planList}=this.props.memberInvestments.myInvestments;
        let {callback}=this.props.info;
        return (
                    <div className="table__wrapper">
                        {(planList==='')?<Loading isShow={isFetching}/>
                            :
                            <table className="tableList">
                                <thead>
                                <tr>
                                    <th>回款时间</th>
                                    <th>回款期数</th>
                                    <th>已回款（元）</th>
                                    <th>待回本金（元）</th>
                                    <th>待回利息（元）</th>
                                    <th>逾期罚息（元）</th>
                                </tr>
                                </thead>

                                <tbody>
                                {(planList.length>0)?
                                    planList.map((l, i) => (
                                        <tr key={`row-${i}`}>
                                            <td>{l.earnShdEarnDate ? moment(l.earnShdEarnDate).format('YYYY-MM-DD') : ''}</td>
                                            <td>{l.earnIssue}</td>
                                            <td>{l.earnIint2}</td>
                                            <td>{l.earnCapital}</td>
                                            <td>{l.earnIint}</td>
                                            <td>{l.lateIint}</td>
                                        </tr>
                                    ))
                                    :(<tr colSpan="6"><p className="noRecord">暂无记录</p></tr>)
                                }
                                </tbody>

                            </table>
                            }
                    </div>
        );
    }
};

function mapStateToProps(state) {
    const { auth,memberInvestments } = state.toJS();
    return {
        auth,
        memberInvestments,
    };
}
export default connect(mapStateToProps)(ModalPlan);