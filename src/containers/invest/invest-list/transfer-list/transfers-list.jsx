import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Progress } from 'antd';
import { connect } from 'react-redux';
import moment from "moment";
import {tranferListAc} from "../../../../actions/invest-list"
import Pagination from '../../../../components/pagination/pagination';
import {Loading,NoRecord} from '../../../../components/bbhAlert/bbhAlert';
import {InvestTab,ProgressBar,TransferInvestButton} from '../investComponents';
import '../invest-list.less';
let orderBy={};
class TransferList extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount () {

        this.props.dispatch(tranferListAc.stateRepaymentPlanModify({list:``,sort:{
                annualRate:0,
                transferPeriod:0,
                putDate:0,
                surplusAmount:0,
                investmentProgress:0,
            }})); //清空
        this.props.dispatch(tranferListAc.getList({status:``}));
    }
    sort(type){
        let transferList=this.props.investList.transferList;
        let sort=transferList.sort;
        let newSort=Object.assign({},sort);
        for(var i in sort){
            newSort[i]=0;
        };
        switch (sort[type]){
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


        //
        this.props.dispatch(tranferListAc.stateRepaymentPlanModify({list:``,sort:newSort}));
        let prams=Object.assign({pageNum:1,pageSize:10},orderBy);
        this.props.dispatch(tranferListAc.getList(prams));
    }
    render(){
        let {dispatch}=this.props;
        let {transferList,isFetching}=this.props.investList;
        let {list,sort}=transferList;
        return (
            <main className="main transfer-list">
            <div className="wrapper" id='mask'>
                <InvestTab isTransfer={true} />
                {
                    list ===''? <Loading isShow={isFetching} />
                        :
                            <div className="table__wrapper" id='mask'>
                                {(list.total) > 0 ?
                                <div>
                                    <table className="tableList">
                                        <thead>
                                        <tr>
                                            <th>项目名称</th>
                                            <th>投资总额</th>
                                            <th className={`order${sort.annualRate}`} onClick={() => {this.sort('annualRate')}}>预期年化收益率<i></i></th>
                                            <th className={`order${sort.transferPeriod}`} onClick={() => {this.sort('transferPeriod')}}>投资期限<i></i></th>
                                            <th className={`order${sort.putDate}`} onClick={() => {this.sort('putDate')}}>发布时间<i></i></th>
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
                                                        <p><a href={"/transfer-detail/" + l['id']+'/'+ l['projectId']}  title="longText">{l.transNo}</a></p>
                                                    </td>
                                                    <td className="rtxt">{l.transAmt}元</td>
                                                    <td><em className="redTxt">{l.annualRate+l.raiseRate}%</em></td>
                                                    <td>{l.transferPeriod}个月</td>
                                                    <td>{moment(l.putDate).format('YYYY-MM-DD')}</td>
                                                    <td className="rtxt">{l.surplusAmount}元</td>
                                                    <td>{l.investNumber}人</td>
                                                    <td style={{ width: 170}}>
                                                        <ProgressBar value={l.investmentProgress} />
                                                    </td>
                                                    <td>
                                                        <TransferInvestButton status={l.transStatus} id={l.id} projectId={l.projectId} />
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
                                                dispatch(tranferListAc.stateRepaymentPlanModify({list:``,sort:sort}));
                                                let parms=Object.assign({pageNum:obj.currentPage,pageSize:obj.pageCount},orderBy)
                                                dispatch(tranferListAc.getList(parms));
                                            }
                                        }
                                    } ></Pagination>
                                </div>
                                : <NoRecord isShow={true} title={`暂无标的`} />
                                }
                            </div>
                }
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
export default connect(mapStateToProps)(TransferList);

