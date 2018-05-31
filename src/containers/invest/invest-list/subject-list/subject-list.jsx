import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from "moment";
import {sbListAc} from "../../../../actions/invest-list";
import Pagination from '../../../../components/pagination/pagination';
import {Loading,NoRecord,WaitThirdParty} from '../../../../components/bbhAlert/bbhAlert';
import {InvestTab,ProgressBar,InvestButton} from '../investComponents';
import {toMoney,toNumber,addCommas} from '../../../../utils/famatData';
import '../invest-list.less';


let orderBy={};
class SubjectList extends Component {
    constructor(props) {
        super(props);
        this.multiFilter = this.multiFilter.bind(this);
    }
    componentDidMount () {
        //处理来自新手标的路由
        const pathSnippets = this.props.location.pathname.split('/').filter(i => i);
        if(pathSnippets[1]=='newNoviceLoan'){
            let filter={
                noviceLoan:1
            };
            this.props.dispatch(sbListAc.stateSbModify({filter:filter}));
            this.multiFilter('noviceLoan',1);
        }else{
            let filter={
                noviceLoan:'',
                loanExpiry:'',
                rateGroup:'',
            };
            this.props.dispatch(sbListAc.stateSbModify({filter:filter}));
            this.props.dispatch(sbListAc.getList({status:``}));
        }


    }
    //处理年化收益率的分组
    todoFilter(filter){
        for (var key in filter) {
            if(filter[key]==='') {
                delete filter[key];
            }else{
                if(key=='rateGroup'){
                    switch(filter[key]){
                        case '':
                            break;
                        case 1:
                            Object.assign(filter,{annualRateStart:6,annualRateEnd:8})
                            break;
                        case 2:
                            Object.assign(filter,{annualRateStart:8,annualRateEnd:10})
                            break;
                        case 3:
                            Object.assign(filter,{annualRateStart:10,annualRateEnd:12})
                            break;
                    }
                    delete filter[key];
                }

            }
        }
        //console.log(Object.assign({},filter));
        return Object.assign({},filter);
    }
    //多条件查询
    multiFilter(type,value){
        let filter=this.props.investList.sbList.filter;
        let sort=this.props.investList.sbList.sort;
        //修改
        filter[type]=value;
        this.props.dispatch(sbListAc.stateSbModify({list:``,filter:filter,sort:sort}));
        let prams=Object.assign({pageNum:1,pageSize:10},this.todoFilter(filter),orderBy);
        this.props.dispatch(sbListAc.getList(prams));
    }
    //排序
    sort(type){
        let sbList=this.props.investList.sbList;
        let sort=sbList.sort;
        let filter=sbList.filter;
        let newSort=Object.assign({},sort);
        for(var i in sort){
            newSort[i]=0;
        };
        switch(sort[type]){
            case 0:
                newSort[type]=1;
                orderBy={sortBy:`-${type}`}
                break;
            case 1:
                newSort[type]=2;
                orderBy={sortBy:`${type}`}
                break;
            case 2:
                newSort[type]=0;
                break;
        }

        this.props.dispatch(sbListAc.stateSbModify({list:``,filter:filter,sort:newSort}));
        let prams=Object.assign({pageNum:1,pageSize:10},this.todoFilter(filter),orderBy);
        this.props.dispatch(sbListAc.getList(prams));
    }
    render(){
        let {dispatch}=this.props;
        let {sbList,isFetching}=this.props.investList;
        let {list,filter,sort}=sbList;
        let {noviceLoan,loanExpiry,rateGroup}=filter;
        return (
            <main className="main invest-list">

                <div className="wrapper">
                    <InvestTab isTransfer={false} />
                    <div id='mask'>
                    <div className="filter">
                        <div className="filter__outer">
                            <div className="filter__inner">
                                <div className="filter__row">
                                    <div className="filter__cell">
                                        <h5 className="filter__tit">标的类型</h5>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(noviceLoan==='')?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ ()=>{this.multiFilter('noviceLoan','')}}>全部</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(noviceLoan===1)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ ()=>{this.multiFilter('noviceLoan',1)} }>新手</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(noviceLoan===0)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ ()=>{this.multiFilter('noviceLoan',0)}}>普通</p>
                                    </div>
                                </div>
                                <div className="filter__row">
                                    <div className="filter__cell">
                                        <h5 className="filter__tit">投资期限</h5>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(loanExpiry==='')?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { this.multiFilter('loanExpiry','') } }>全部</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(loanExpiry===3)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { this.multiFilter('loanExpiry',3)}  }>3个月</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(loanExpiry===6)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { this.multiFilter('loanExpiry',6)}  } >6个月</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(loanExpiry===12)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { this.multiFilter('loanExpiry',12)}  } >12个月</p>
                                    </div>
                                </div>

                                <div className="filter__row">
                                    <div className="filter__cell">
                                        <h5 className="filter__tit">预期年化收益率</h5>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(rateGroup==='')?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { this.multiFilter('rateGroup','')}  } >全部</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(rateGroup===1)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { this.multiFilter('rateGroup',1)}  } >6%~8%</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(rateGroup===2)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { this.multiFilter('rateGroup',2)}  } >8%~10%</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(rateGroup===3)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { this.multiFilter('rateGroup',3)}  } >10%~12%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        (list === '')? <Loading isShow={isFetching} />
                            :
                            <div className="table__wrapper">
                                { (list.total>0)?
                                    <div>
                                        <table className="tableList">
                                            <thead>
                                            <tr>
                                                <th>项目名称</th>
                                                <th>投资总额</th>
                                                <th className={`order${sort.annualRate}`} onClick={() => {this.sort('annualRate')}}>预期年化收益率<i></i></th>
                                                <th className={`order${sort.loanExpiry}`} onClick={() => {this.sort('loanExpiry')}}>投资期限<i></i></th>
                                                <th className={`order${sort.putTime}`} onClick={() => {this.sort('putTime')}}>发布时间<i></i></th>
                                                <th className={`order${sort.surplusAmount}`} onClick={() => {this.sort('surplusAmount')}}>剩余金额<i></i></th>
                                                <th>投资人数</th>
                                                <th className={`order${sort.investmentProgress}`} onClick={() => {this.sort('investmentProgress')}}>投资进度<i></i></th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                list.list.map((l, i) => (
                                                    <tr key={`row-${i}`}>
                                                        <td className="t_table">
                                                            <p><Link to={"/invest-detail/" + l['id']} title="longText">{l.name}</Link></p>
                                                        </td>
                                                        <td className="rtxt">{toMoney(l.money)}元</td>
                                                        <td><em className="redTxt">{l.annualRate}%</em></td>
                                                        <td>{l.loanExpiry}个月</td>
                                                        <td>
                                                            {
                                                                (l.putTime)?
                                                                    moment(l.putTime).format('YYYY-MM-DD')
                                                                    :``
                                                            }
                                                        </td>
                                                        <td className="rtxt">{toMoney(l.surplusAmount)}元</td>
                                                        <td>{l.investNumber}人</td>
                                                        <td style={{ width: 170}}>
                                                            <ProgressBar value={l.investmentProgress} />
                                                        </td>
                                                        <td>
                                                            <InvestButton status={l.status} id={l.id} />
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                            </tbody>
                                        </table>
                                        <Pagination config = {
                                            {
                                                currentPage:list.pageNum,
                                                pageSize:list.pageSize,
                                                totalPage:list.pages,
                                                paging:(obj)=>{
                                                    dispatch(sbListAc.stateSbModify({list:``,filter:filter,sort:sort}));
                                                    let prams=Object.assign({pageNum:obj.currentPage,pageSize:obj.pageCount},this.todoFilter(Object.assign({},filter)),orderBy);
                                                    dispatch(sbListAc.getList(prams));
                                                }
                                            }
                                        } ></Pagination>
                                    </div>
                                    :<NoRecord isShow={true} />
                                }
                            </div>
                    }
                    </div>
                </div>

            </main>
        )
    }
}
function mapStateToProps(state) {
    const { auth,investList } = state.toJS();
    return {
        auth,
        investList
    };
}
export default connect(mapStateToProps)(SubjectList);

