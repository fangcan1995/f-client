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
                                    {/*<tbody>
                                    {
                                        list.map((l, i) => (
                                            <tr key={`row-${i}`}>
                                                <td>{i}{l.shortTxt}</td>
                                                <td>{moment(l.dateTime).format('YYYY-MM-DD')}</td>
                                                <td>10000.00</td>
                                                <td>1000.00</td>
                                                <td>11000.00</td>
                                                <td>已经还款</td>
                                            </tr>
                                        ))}

                                    </tbody>*/}
                                    <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>2017-07-08</td>
                                        <td>0.00</td>
                                        <td>860.00</td>
                                        <td>860.00</td>
                                        <td>已经还款</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>2017-08-08</td>
                                        <td>0.00</td>
                                        <td>860.00</td>
                                        <td>860.00</td>
                                        <td>已经还款</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>2017-09-08</td>
                                        <td>0.00</td>
                                        <td>860.00</td>
                                        <td>860.00</td>
                                        <td>已经还款</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>2017-10-08</td>
                                        <td>0.00</td>
                                        <td>860.00</td>
                                        <td>860.00</td>
                                        <td>已经还款</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>2017-11-08</td>
                                        <td>0.00</td>
                                        <td>860.00</td>
                                        <td>860.00</td>
                                        <td>已经还款</td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>2017-12-08</td>
                                        <td>0.00</td>
                                        <td>860.00</td>
                                        <td>860.00</td>
                                        <td>已经还款</td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>2018-01-08</td>
                                        <td>0.00</td>
                                        <td>860.00</td>
                                        <td>860.00</td>
                                        <td>等待还款</td>
                                    </tr>
                                    <tr>
                                        <td>8</td>
                                        <td>2018-02-08</td>
                                        <td>0.00</td>
                                        <td>860.00</td>
                                        <td>860.00</td>
                                        <td>等待还款</td>
                                    </tr>
                                    <tr>
                                        <td>9</td>
                                        <td>2018-03-08</td>
                                        <td>0.00</td>
                                        <td>860.00</td>
                                        <td>860.00</td>
                                        <td>等待还款</td>
                                    </tr>
                                    <tr>
                                        <td>10</td>
                                        <td>2018-04-08</td>
                                        <td>0.00</td>
                                        <td>860.00</td>
                                        <td>860.00</td>
                                        <td>等待还款</td>
                                    </tr>
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