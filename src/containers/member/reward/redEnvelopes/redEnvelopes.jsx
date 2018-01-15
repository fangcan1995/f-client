import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '../../../../components/pagination/pagination';
import './redEnvelopes.less';

export default ({ location, match, history }) => {
    return (
        <div className="member__main">
            <div className="crumb">
                <div>
                    <b>您所在的位置：</b>
                    <a href="/">首页</a>&nbsp;&gt;
                    奖励管理&nbsp;&gt;
                    <a  className="actice">我的红包</a>
                </div>
            </div>
            <div className="member__cbox">
                <div className="tab">
                    <div className="tab_title">
                        <ul>
                            <li className="on"><h3>我的红包</h3></li>
                        </ul>
                    </div>
                    <div className="tab_content">
                        <div className="query">
                            <p className="status">
                                <strong>类型：</strong><mark className="active" >全部</mark>
                                <mark >未使用</mark>
                                <mark >已使用</mark>
                                <mark >已过期</mark>
                            </p>
                        </div>
                        <ul className="redBagList">
                            <li className="expired">
                                <div className="img">
                                    <p className="denomination">8</p>
                                    <p className="remark"></p>
                                </div>
                                <div className="txt">

                                    <p><strong>使用规则：</strong>3个月定期产品满1000元可用</p>

                                    <p><strong>有效期：</strong>2017.01.22—2017.02.06</p>
                                </div>
                            </li>
                            <li className="notActive">
                                <div className="img">
                                    <p className="denomination">46</p>
                                    <p className="remark"></p>
                                </div>
                                <div className="txt">

                                    <p><strong>使用规则：</strong>所有产品满10000元可用</p>

                                    <p><strong>有效期：</strong>2017.01.22—2017.02.06</p>
                                </div>
                            </li>
                            <li className="used">
                                <div className="img">
                                    <p className="denomination">46</p>
                                    <p className="remark"></p>
                                </div>
                                <div className="txt">

                                    <p><strong>使用规则：</strong>所有产品满10000元可用</p>

                                    <p><strong>有效期：</strong>2017.01.22—2017.02.06</p>
                                </div>
                            </li>
                            <li className="notused">
                                <div className="img">
                                    <p className="denomination">236</p>
                                    <p className="remark"></p>
                                </div>
                                <div className="txt">

                                    <p><strong>使用规则：</strong>所有产品满10000元可用</p>

                                    <p><strong>有效期：</strong>2017.01.22—2017.02.06</p>
                                </div>
                            </li>
                            <li className="notused">
                                <div className="img">
                                    <p className="denomination">1000</p>
                                    <p className="remark"></p>
                                </div>
                                <div className="txt">

                                    <p><strong>使用规则：</strong>所有产品满10000元可用</p>

                                    <p><strong>有效期：</strong>2017.01.22—2017.02.06</p>
                                </div>
                            </li>
                        </ul>
                        <Pagination config = {
                            {
                                currentPage:1,
                                pageSize:10,
                                totalPage:3,
                                paging:(obj)=>{
                                    this.loadData(obj.currentPage,obj.pageCount);
                                }
                            }
                        } ></Pagination>
                    </div>
                </div>
            </div>

        </div>
    );
};
