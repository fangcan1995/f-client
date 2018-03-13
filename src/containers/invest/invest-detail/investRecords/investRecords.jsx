import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import Pagination from '../../../../components/pagination/pagination';

export default class InvestRecords extends React.Component{
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
        //console.log('------投资记录-----');
        //console.log(this.props);
        let {investRecords,callback,pageSize,pageNum} =this.props;
        let {data}=investRecords;
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
                                        <th>投资人</th>
                                        <th>投资金额（元）</th>
                                        <th>投资时间</th>
                                        <th>投资方式</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        list.map((l, i) => (
                                            <tr key={`row-${i}`}>
                                                <td>{i}{l.shortTxt}</td>
                                                <td>500.00</td>
                                                <td>{l.dateTime}</td>
                                                <td>APP端加入</td>
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
