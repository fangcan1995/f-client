import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import { connect } from 'react-redux';
import Pagination from '../../../../components/pagination/pagination';
import {Loading,NoRecord} from '../../../../components/bbhAlert/bbhAlert';

class RepayRecords extends React.Component{
    constructor(props) {
        super(props);
        this.changePage = this.changePage.bind(this);
        this.state={
            pageNum:1,
        }
    }
    changePage(currentPage){
        this.setState({
            pageNum:currentPage,
        });
    }
    render(){

        let {repayRecords,isFetching}=this.props.investDetail;
        let {callback,pageSize,pageNum} =this.props;
        let {list}=repayRecords;
        if(repayRecords.total>0){
            if(repayRecords.list.length>0){
                list=list.slice((this.state.pageNum-1)*pageSize,(this.state.pageNum-1)*pageSize+pageSize);
            }
        }
        return (
            <ul  className="m-record">
                {
                    (repayRecords == '') ? <li><Loading isShow={isFetching} /></li>
                        : (repayRecords.total>0)?
                        <li>
                            <div className="table__wrapper">
                                <table className="tableList">
                                    <thead>
                                    <tr>
                                        <th>还款期数</th>
                                        <th>还款日期</th>
                                        <th>应还本金（元）</th>
                                        <th>应还利息（元）</th>
                                        <th>应还本息（元）</th>
                                        <th>还款状态</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        list.map((l, i) => (
                                            <tr key={`row-${i}`}>
                                                <td>{l.rpmtIssue}</td>
                                                <td>{moment(l.shdRpmtDate).format('YYYY-MM-DD')}</td>
                                                <td>{l.rpmtCapital}</td>
                                                <td>{l.rpmtIint}</td>
                                                <td>{l.rpmtCapitalIintSum}</td>
                                                <td>{l.rpmtStatusString}</td>
                                            </tr>
                                        ))}

                                    </tbody>

                                </table>

                            </div>
                            <Pagination config={
                                {
                                    currentPage: this.state.pageNum,
                                    pageSize: pageSize,
                                    totalPage: Math.ceil(repayRecords.total/pageSize),
                                    paging: (obj) => {
                                        this.changePage(obj.currentPage);
                                    }
                                }
                            }></Pagination>
                        </li>
                        :<li><NoRecord isShow={true}/></li>
                }
            </ul>
        );
    }
}
function mapStateToProps(state) {
    const { auth,investDetail } = state.toJS();
    return {
        auth,
        investDetail
    };
}
export default connect(mapStateToProps)(RepayRecords);