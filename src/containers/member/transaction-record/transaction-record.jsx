import React,{Component} from 'react';
import PropTypes from 'prop-types';
import './transaction-record.less';

import Crumbs from '../../../components/crumbs/crumbs';
import Tab from '../../../components/tab/tab';
import Table from '../../../components/table/table';

var tableSetting={
    columnOpts:[
        { key: 'col1', name: '交易时间',type:'date-time' },
        { key: 'col2', name: '交易类型',type:'tradeType' },
        { key: 'col3', name: '交易金额 (元)',type:'money' },
        { key: 'col4', name: '状态' },
    ],
    hasFilter:true, // 是否显示搜索过滤，为什么不直接用下面的，这里也是设计上的一个优化点
    /*onSearch: function(keyword) {
        doSearch(keyword)
    }, // 搜索时的回调*/
    showPager: true, // 是否显示分页
}

export default ({ location, match, history }) => {
    return (
        <div className="member__main">
            <Crumbs/>
            <div className="member__cbox">
                <Tab>
                    <div name="交易记录">
                        <div className="query">
                            <p className="info">
                                <strong>提示：</strong>资金历史记录了您各种交易产生的支出和收入的明细，请选择事件类型和时间。
                            </p>
                            <strong>交易类型：</strong>
                            <select id="tradeType" className="select">
                                <option value="">全部</option>
                                <option value="1">充值</option>
                                <option value="2">提现</option>
                                <option value="3">投资</option>
                                <option value="4">回款</option>
                                <option value="5">费用</option>
                                <option value="5">奖励</option>
                            </select>
                            <strong>状态：</strong>
                            <select id="status" className="select">
                                <option value="">全部</option>
                            </select>
                            <strong>交易时间：</strong>
                            <input type="text" id="from-date1" className="input-date" />--<input type="text" id="to-date1" className="input-date" />
                        </div>
                        <div className="table__wrapper">
                            <Table
                                source='http://localhost:9002'
                                config={tableSetting}
                            />
                        </div>
                    </div>
                </Tab>

            </div>
        </div>
    );
};