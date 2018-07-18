import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import { connect } from 'react-redux';
import Pagination from '../../../../components/pagination/pagination';
import {Loading,NoRecord} from '../../../../components/bbhAlert/bbhAlert';
import {addCommas, toMoney, toNumber} from "../../../../utils/famatData";
class InvestRecords extends React.Component{
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
        let {investRecords,isFetching}=this.props.investDetail;
        let {callback,pageSize,pageNum} =this.props;
        let {list}=investRecords;
        if(investRecords.total>0){
            list=list.slice((this.state.pageNum-1)*pageSize,(this.state.pageNum-1)*pageSize+pageSize);
        }
        return (
            <ul  className="m-record">
                {(investRecords === '') ? <li><Loading isShow={isFetching} /></li>
                    : (investRecords.total>0)?
                        <li>
                            <div className="table__wrapper">
                                <table className="tableList">
                                    <thead>
                                    <tr>
                                        <th>出借人</th>
                                        <th>出借金额（元）</th>
                                        <th>出借时间</th>
                                        <th>出借方式</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        list.map((l, i) => (
                                            <tr key={`row-${i}`}>
                                                <td>{l.investor}</td>
                                                <td className="money">{toMoney(l.investAmt)}</td>
                                                <td>{l.investTime}</td>
                                                <td>{l.investWayString}</td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>

                            </div>
                            <Pagination config={
                                {
                                    currentPage: this.state.pageNum,
                                    pageSize: pageSize,
                                    totalPage: Math.ceil(investRecords.total/pageSize),
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
export default connect(mapStateToProps)(InvestRecords);