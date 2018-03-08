import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
export default class ModalPlan extends React.Component {
    render() {
        let {currentId,planData}=this.props.currentPro;
        return (
                    <div className="table__wrapper">
                        {(JSON.stringify(planData)=='{}')?(<p></p>)
                            :(
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
                                    {(planData.length>0)?
                                        planData.map((l, i) => (
                                            <tr key={`row-${i}`}>
                                                <td>{moment(l.earnShdEarnDate).format('YYYY-MM-DD')}</td>
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
                            )}
                    </div>
        );
    }
};