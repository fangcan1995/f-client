import React from 'react';
import PropTypes from 'prop-types';
import './transaction-record.less';
export default ({ location, match, history }) => {
  return (
    <div className="member__main">
        <div className="crumb">
            <div>
                <b>您所在的位置：</b><a href="/">首页</a> > <a href="#">账户总览</a> > <a href="#" className="actice">交易记录</a></div>
        </div>
        <div className="member__cbox">
            <div className="tab">
                <div className="tab_info">
                    <div className="hd tab_title">
                        <ul>
                            <li className="on"><h3>全部交易记录</h3></li>
                            <li><h3>投资记录</h3></li>
                            <li><h3>充值记录</h3></li>
                            <li><h3>提现记录</h3></li>
                            <li><h3>借款记录</h3></li>
                        </ul>
                    </div>
                    <div className="bd tab_content">
                        <ul className="intro">
                            <li>
                                <p className="info"><strong>提示：</strong>资金历史记录了您各种交易产生的支出和收入的明细，请选择事件类型和时间。</p>
                                <div className="query">
                                    <strong>交易时间：</strong>
                                    <input type="text" id="from-date1" className="input-date" readOnly />--
                                    <input type="text" id="to-date1" className="input-date" readOnly />
                                    <strong>状态：</strong>
                                    <select id="status" className="select">
                                        <option value="">请选择</option>
                                        <option value="1">成功</option>
                                        <option value="0">失败</option>
                                    </select>
                                    <input type="button" value="查询" readOnly className="btn search" />
                                </div>
                                <div className="record">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th scope="col" className="time">交易时间</th>
                                            <th scope="col" className="type">交易类型</th>
                                            <th scope="col" className="money">交易金额 <em>(元)</em></th>
                                            <th scope="col" className="remarks">状态</th>
                                        </tr>
                                        </thead>
                                        <tbody id="list">
                                        <tr>
                                            <td>2016-10-04 16:12:12</td>
                                            <td>充值</td>
                                            <td>10000000.78</td>
                                            <td>成功</td>
                                        </tr>
                                        <tr>
                                            <td>2016-10-04 16:12:12</td>
                                            <td>充值</td>
                                            <td>10000.78</td>
                                            <td>成功</td>
                                        </tr>
                                        <tr>
                                            <td>2016-10-04 16:12:12</td>
                                            <td>充值</td>
                                            <td>1000.78</td>
                                            <td>成功</td>
                                        </tr>
                                        <tr>
                                            <td>2016-10-04 16:12:12</td>
                                            <td>提现</td>
                                            <td>0.78</td>
                                            <td>成功</td>
                                        </tr>
                                        <tr>
                                            <td>2016-10-04 16:12:12</td>
                                            <td>充值</td>
                                            <td>700.78</td>
                                            <td>成功</td>
                                        </tr>
                                        <tr>
                                            <td>2016-10-04 16:12:12</td>
                                            <td>提现</td>
                                            <td>500.00</td>
                                            <td>成功</td>
                                        </tr>
                                        <tr>
                                            <td>2016-10-04 16:12:12</td>
                                            <td>充值</td>
                                            <td>1100.00</td>
                                            <td>成功</td>
                                        </tr>
                                        <tr>
                                            <td>2016-10-04 16:12:12</td>
                                            <td>充值</td>
                                            <td>100000.78</td>
                                            <td>成功</td>
                                        </tr>
                                        <tr>
                                            <td>2016-10-04 16:12:12</td>
                                            <td>提现</td>
                                            <td>100000.78</td>
                                            <td>成功</td>
                                        </tr>
                                        <tr>
                                            <td>2016-10-04 16:12:12</td>
                                            <td>充值</td>
                                            <td>100000.78</td>
                                            <td>成功</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div className="pagination" id="pagecount">
                                        <ul>
                                            <li className="first"><a href="javascript:void(0)" className="iconfont">&#xe61e;</a></li>
                                            <li className="previous"><a href="javascript:void(0)"  className="iconfont">&#xe61f;</a></li>
                                            <li className="active"><a href="javascript:void(0)" rel="1">1</a></li>
                                            <li><a href="javascript:void(0)" rel="2">2</a></li>
                                            <li><a href="javascript:void(0)" rel="3">3</a></li>
                                            <li><a href="javascript:void(0)" rel="4">4</a></li>
                                            <li><a href="javascript:void(0)" rel="5">5</a></li>
                                            <li className="next"><a href="javascript:void(0)" className="iconfont">&#xe61d;</a></li>
                                            <li className="last"><a href="javascript:void(0)" rel="'+totalPage+'" className="iconfont">&#xe61c;</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
    );
};
