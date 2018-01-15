import React from 'react';
import PropTypes from 'prop-types';
import './invest-list.less';
import Tab from '../../components/tab/tab';
import Pagination from '../../components/pagination/pagination';
export default ({ location, match, history }) => {
    return (
        <main className="main invest-list" id="invest-list">
            <div className="wrapper">
                <Tab>
                    <div name="散标">
                        <div className="filter">
                            <div className="filter__outer">
                                <div className="filter__inner">
                                    <div className="filter__row">
                                        <div className="filter__cell">
                                            <h5 className="filter__tit">标的类型</h5>
                                        </div>
                                        <div className="filter__cell">
                                            <p className="filter__opt filter__opt--active">全部</p>
                                        </div>
                                        <div className="filter__cell">
                                            <p className="filter__opt">新手</p>
                                        </div>
                                        <div className="filter__cell">
                                            <p className="filter__opt">普通</p>
                                        </div>
                                    </div>

                                    <div className="filter__row">
                                        <div className="filter__cell">
                                            <h5 className="filter__tit">投资期限</h5>
                                        </div>
                                        <div className="filter__cell">
                                            <p className="filter__opt filter__opt--active">全部</p>
                                        </div>
                                        <div className="filter__cell">
                                            <p className="filter__opt">3个月</p>
                                        </div>
                                        <div className="filter__cell">
                                            <p className="filter__opt">6个月</p>
                                        </div>
                                        <div className="filter__cell">
                                            <p className="filter__opt">12个月</p>
                                        </div>
                                    </div>

                                    <div className="filter__row">
                                        <div className="filter__cell">
                                            <h5 className="filter__tit">预期年化收益率</h5>
                                        </div>
                                        <div className="filter__cell">
                                            <p className="filter__opt filter__opt--active">全部</p>
                                        </div>
                                        <div className="filter__cell">
                                            <p className="filter__opt">6%~8%</p>
                                        </div>
                                        <div className="filter__cell">
                                            <p className="filter__opt">8%~10%</p>
                                        </div>
                                        <div className="filter__cell"><p className="filter__opt">10%~12%</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table__wrapper">
                            <table className="tableList">
                                <thead>
                                <tr>
                                    <th>项目名称</th>
                                    <th>投资总额</th>
                                    <th className="order">预期年化收益率<i></i></th>
                                    <th className="order">投资期限<i></i></th>
                                    <th className="order">发布时间<i></i></th>
                                    <th className="order">剩余金额<i></i></th>
                                    <th>投资人数</th>
                                    <th className="order progress">投资进度<i></i></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="t_table"><p><a href="#"  title=" 汇车贷-HCD201708180004">汇车贷-HCD201708180004</a></p></td>
                                    <td className="rtxt">200000.00元</td>
                                    <td><em className="redTxt">12%</em></td>
                                    <td>12个月</td>
                                    <td>2017-01-20</td>
                                    <td className="rtxt">100000.00元</td>
                                    <td>3人</td>
                                    <td><dl className="progressbar">
                                        <dt><div className="finished" style={{width: '50%'}}></div></dt>
                                        <dd><strong>50%</strong></dd>
                                    </dl></td>
                                    <td>
                                        <a href="#" className="btn start">立即加入</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td><p><a href="#">汇车贷-HCD201708180003</a></p></td>
                                    <td className="rtxt">200000.00元</td>
                                    <td><em className="redTxt">9%</em></td>
                                    <td>6个月</td>
                                    <td>2017-01-20</td>
                                    <td className="rtxt">0元</td>
                                    <td >266人</td>
                                    <td>
                                        <dl className="progressbar">
                                            <dt><div className="finished" style={{width: '100%'}}></div></dt>
                                            <dd><strong>100%</strong></dd>
                                        </dl>
                                    </td>
                                    <td>
                                        <a href="#" className="btn end">满标待划转</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td><p><a href="#">汇车贷-HCD201708180002</a></p></td>
                                    <td className="rtxt">200000.00元</td>
                                    <td><em className="redTxt">9%</em></td>
                                    <td>6个月</td>
                                    <td>2017-01-20</td>
                                    <td className="rtxt">0元</td>
                                    <td >266人</td>
                                    <td>
                                        <dl className="progressbar">
                                            <dt><div className="finished" style={{width: '100%'}}></div></dt>
                                            <dd><strong>100%</strong></dd>
                                        </dl>
                                    </td>
                                    <td>
                                        <a href="#" className="btn end">满标待划转</a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <Pagination config = {
                                {
                                    currentPage:1,
                                    pageSize:10,
                                    totalPage:5,
                                    paging:(obj)=>{
                                        this.loadData(obj.currentPage,obj.pageCount);
                                    }
                                }
                            } ></Pagination>
                        </div>
                    </div>
                    <div name="债权">
                        <div className="table__wrapper">
                            <table className="tableList">
                                <thead>
                                <tr>
                                    <th>项目名称</th>
                                    <th>投资总额</th>
                                    <th className="order">预期年化收益率<i></i></th>
                                    <th className="order">投资期限<i></i></th>
                                    <th className="order">发布时间<i></i></th>
                                    <th className="order">剩余金额<i></i></th>
                                    <th>投资人数</th>
                                    <th className="order progress">投资进度<i></i></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="t_table"><p><a href="#"  title="债转-ZZ201712171355">债转-ZZ201712171355</a></p></td>
                                    <td className="rtxt">200000.00元</td>
                                    <td><em className="redTxt">12%</em></td>
                                    <td>2个月</td>
                                    <td>2017-01-20</td>
                                    <td className="rtxt">0.00元</td>
                                    <td>1人</td>
                                    <td><dl className="progressbar">
                                        <dt><div className="finished" style={{width: '100%'}}></div></dt>
                                        <dd><strong>100%</strong></dd>
                                    </dl></td>
                                    <td>
                                        <a href="#" className="btn end">正在收益</a>
                                    </td>
                                </tr>

                                </tbody>
                            </table>

                            <Pagination config = {
                                {
                                    currentPage:1,
                                    pageSize:10,
                                    totalPage:1,
                                    paging:(obj)=>{
                                        this.loadData(obj.currentPage,obj.pageCount);
                                    }
                                }
                            } ></Pagination>
                        </div>
                    </div>
                </Tab>

            </div>
        </main>
    );
};
