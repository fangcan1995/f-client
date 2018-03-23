import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Progress } from 'antd';
import { connect } from 'react-redux';
import moment from "moment";
import {tranferListAc} from "../../../../actions/invest-list"
import Pagination from '../../../../components/pagination/pagination';
import {Loading,NoRecord} from '../../../../components/bbhAlert/bbhAlert';
import '../invest-list.less';
class TransferList extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount () {
        //this.props.dispatch(tranferListAc.getTransferList(1,10,{},{status:2}));
        this.props.dispatch(tranferListAc.getList({status:``}));
    }
    sort(type){
        let transferList=this.props.investList.transferList;
        let sort=transferList.sort;
        let newSort=Object.assign({},sort);
        for(var i in sort){
            newSort[i]=0;
        };
        let orderBy={};
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



        this.props.dispatch(tranferListAc.stateRepaymentPlanModify({sort:newSort}));
        this.props.dispatch(tranferListAc.getList(orderBy));
    }
    getStatusName(status,id,transferId){
        let investButton=``;
        switch(status){
            case 1:
                investButton=<Link to={`/transfer-detail/${transferId}/${id}`} className="btn end">待审核</Link>;
                break;
            case 2:
                investButton=<Link to={`/transfer-detail/${transferId}/${id}`} className="btn start">立即加入</Link>;
                break;
            case 3:
                investButton=<Link to={`/transfer-detail/${transferId}/${id}`} className="btn end">满标待划转</Link>;
                break;
            case 4:
                investButton=<Link to={`/transfer-detail/${transferId}/${id}`} className="btn end">还款中</Link>;
                break;
            case 6:
                investButton=<Link to={`/transfer-detail/${transferId}/${id}`} className="btn end">已流标</Link>;
                break;
            case 5:
                investButton=<Link to={`/transfer-detail/${transferId}/${id}`} className="btn end">已结清</Link>;
                break;

        }
        return investButton;
    }
    render(){
        let {dispatch}=this.props;
        let {transferList,isFetching}=this.props.investList;
        let {list,sort}=transferList;
        return (
            <main className="main transfer-list">
            <div className="wrapper">
                <div className="tablist">
                    <div className="tabs__nav">
                        <Link to="/invest-list" className="tab">散标</Link>
                        <Link to="/transfer-list" className="tab tab--active">债权</Link>
                    </div>
                </div>
                {
                    list ===''? <Loading isShow={isFetching} />
                        :
                            <div className="table__wrapper">
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
                                                        <p><a href={"/invest-detail/" + l['proId']}  title="longText">{l.transNo}</a></p>
                                                    </td>
                                                    <td className="rtxt">{l.transAmt}元</td>
                                                    <td><em className="redTxt">{l.annualRate}%</em></td>
                                                    <td>{l.transferPeriod}个月</td>
                                                    <td>{moment(l.putDate).format('YYYY-MM-DD')}</td>
                                                    <td className="rtxt">{l.surplusAmount}元</td>
                                                    <td>{l.investNumber}人</td>
                                                    <td style={{ width: 170}}>
                                                        <Progress percent={parseInt(l.investmentProgress)} size="small" />
                                                    </td>
                                                    <td>
                                                        {this.getStatusName(l.transStatus,l.projectId,l.id)}

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
                                                let parms=Object.assign({pageNum:obj.currentPage,pageSize:obj.pageSize},sort)
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

