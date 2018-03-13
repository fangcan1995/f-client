import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import Pagination from '../../../../components/pagination/pagination';


export default class RepayRecords extends React.Component{
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
        //console.log('------还款记录-----');
        //console.log(this.props);
        let {repayRecords,callback,pageSize,pageNum} =this.props;
        let {data}=repayRecords;
        let {list}=data;
        if(data.list.length>0){
            list=list.slice((this.state.pageNum-1)*pageSize,(this.state.pageNum-1)*pageSize+pageSize);
        }
        return (
            <ul  className="m-record">
                {
                    (data == "{}") ? <li>{data.message}</li>
                        : (data.total>0)?
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
                                    totalPage: Math.ceil(data.total/pageSize),
                                    paging: (obj) => {
                                        this.changePage(obj.currentPage);
                                    }
                                }
                            }></Pagination>
                        </li>
                        :<li>暂无记录</li>
                }
            </ul>
        );
    }
}