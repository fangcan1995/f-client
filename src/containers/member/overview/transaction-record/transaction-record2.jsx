import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './transaction-record.less';
import Table from '../../../../components/table/table';
import jQuery from 'jquery';
import Pagination from '../../../../components/pagination/pagination';

export default class Trade extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        var tableSetting={
            columnOpts:[
                { key: 'time', name: '交易时间',type:'date-time' },
                { key: 'type', name: '交易类型',type:'tradeType' },
                { key: 'money', name: '交易金额 (元)',type:'money' },
                { key: 'status', name: '状态' },
            ],
            showSeach:true, // 是否显示搜索过滤，为什么不直接用下面的，这里也是设计上的一个优化点
            /*onSearch: function(keyword) {
                doSearch(keyword)
            }, // 搜索时的回调*/
            showPager: true, // 是否显示分页
            /*onPagerChange:(currentPage,pageSize)=>{
                this.loadData(currentPage,pageSize);
            }*/
        }
        return(
            <div className="member__main">
                <div className="member__cbox">
                   <Table
                       source='http://localhost:9002'
                       tableSetting={tableSetting}
                   >
                   </Table>
                </div>
            </div>
        )
    }
}