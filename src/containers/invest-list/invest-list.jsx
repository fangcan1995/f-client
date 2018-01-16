import React from 'react';
import PropTypes from 'prop-types';
import './invest-list.less';
import Tab from '../../components/tab/tab';
import Pagination from '../../components/pagination/pagination';

export default  class RedEnvelopes extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dataSetting:{
                "code": "0",
                "message": "SUCCESS",
                "data": {
                    "pageNum": 1,
                    "pageSize": 10,
                    "total": 23,
                    "list":[
                        { 'col1':'汇车贷-HCD201708180004','col2':'http://localhost:9002/invest-list/detail/5','col3':'200000.00','col4':'12','col5':'12',
                        'col6':'100000.00','col7':'3','col8':'50'},
                        { 'col1':'汇车贷-HCD201708180003','col2':'http://localhost:9002/invest-list/detail/4','col3':'200000.00','col4':'8','col5':'3',
                            'col6':'100000.00','col7':'3','col8':'50'}
                    ]
                },
            },  //红包数据
            bdlx: 0,
            tzqx: 0,
            yqnhsy: 0,
        }
    }
    //切换样式
    toggleClassName = (item,index) => {
        return index === this.state[item] ? "filter__opt filter__opt--active" : "filter__opt"
    }
    //条件过滤
    filter=(pram)=>{
        for(var key in pram){
            this.setState({
                key:pram[key]
            });
        }
        //this.loadData(this.dataSet.pageNum,this.dataSet.pageSize,pram);
    }
    /*filter(pram){


    }*/
    render(){
        const {list,pageNum,pageSize,total}=this.state.dataSetting.data;
        const totalPage=Math.ceil(total/pageSize);
        if(!this.state.dataSetting.data){
            return(
                <div>loading</div>
            )
        }else if(list.length>0){

            return(
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
                                                    <p className={ this.toggleClassName('bdlx',0) } onClick={ () => { this.filter({bdlx:0}) } }>全部</p>
                                                </div>
                                                <div className="filter__cell">
                                                    <p className={ this.toggleClassName('bdlx',1) } onClick={ () => { this.filter({bdlx:1}) } }>新手</p>
                                                </div>
                                                <div className="filter__cell">
                                                    <p className={ this.toggleClassName('bdlx',2) } onClick={ () => { this.filter({bdlx:2}) } }>普通</p>
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
                                        {
                                            list.map((entry, rowIndex) => (
                                        <tr>
                                            <td className="t_table"><p><a href="{entry['col2']}"  title="{entry['col1']}">{entry['col1']}</a></p></td>
                                            <td className="rtxt">{entry['col3']}元</td>
                                            <td><em className="redTxt">{entry['col4']}%</em></td>
                                            <td>{entry['col5']}个月</td>
                                            <td>{entry['col6']}</td>
                                            <td className="rtxt">{entry['col7']}元</td>
                                            <td>3人</td>
                                            <td><dl className="progressbar">
                                                <dt><div className="finished" style={{width: '{entry[\'col8\']}%'}}></div></dt>
                                                <dd><strong>{entry['col8']}%</strong></dd>
                                            </dl></td>
                                            <td>
                                                <a href="#" className="btn start">立即加入</a>
                                            </td>
                                        </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>

                                    <Pagination config = {
                                        {
                                            currentPage:pageNum,
                                            pageSize:pageSize,
                                            totalPage:totalPage,
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
                                            currentPage:pageNum,
                                            pageSize:pageSize,
                                            totalPage:totalPage,
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
            )
        }
    }
}