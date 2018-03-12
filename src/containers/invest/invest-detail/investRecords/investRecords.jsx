import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import Pagination from '../../../../components/pagination/pagination';

export default class InvestRecords extends React.Component{

    render(){
        return (
            <ul  className="m-record">
                <li>
                    <div className="table__wrapper">
                        <table  className="tableList">
                            <thead>
                            <tr>
                                <th>投资人</th>
                                <th>投资金额（元）</th>
                                <th>投资时间</th>
                                <th>投资方式</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>9a**ae</td>
                                <td>500.00</td>
                                <td>2017-08-23 11:06:46</td>
                                <td>APP端加入</td>
                            </tr>
                            <tr>
                                <td>15**61</td>
                                <td>2000.00</td>
                                <td>2017-08-22 17:49:55</td>
                                <td>APP端加入</td>
                            </tr>
                            <tr>
                                <td>sa**00</td>
                                <td>10000.00</td>
                                <td>2017-08-19 14:13:45</td>
                                <td>APP端加入</td>
                            </tr>
                            <tr>
                                <td>18**89</td>
                                <td>5000.00</td>
                                <td>2017-08-18 15:17:47</td>
                                <td>APP端加入</td>
                            </tr>
                            <tr>
                                <td>18**59</td>
                                <td>12500.00</td>
                                <td>2017-08-18 14:52:27</td>
                                <td>APP端加入</td>
                            </tr>
                            </tbody>
                        </table>

                    </div>
                    <Pagination config = {
                        {
                            currentPage:1,
                            pageSize:10,
                            totalPage:3,
                            paging:(obj)=>{
                                this.loadData(obj.currentPage,obj.pageCount,this.state.dataSetting.filter);
                            }
                        }
                    } ></Pagination>
                </li>
            </ul>
        );
    }
}
