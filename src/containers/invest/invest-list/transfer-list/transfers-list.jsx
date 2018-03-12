import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Progress } from 'antd';
import { connect } from 'react-redux';
import moment from "moment";
import  investListActions  from '../../../../actions/invest-list';
import Pagination from '../../../../components/pagination/pagination';
import '../invest-list.less';
class TransferList extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount () {
        this.props.dispatch(investListActions.getTransferList(1,10));
    }
    sort(type){
        let transferList=this.props.investList.transferList;
        let sort=transferList.sort;
        for(var i in sort){
            sort[i]=0;
        }
        let filter=transferList.filter;
        switch (sort[type]){
            case 0:
                sort[type]=1;
                break;
            case 1:
                sort[type]=2;
                break;
            case 2:
                sort[type]=0;
                break;
        }
        let newSort={};
        newSort[type]=sort[type];
        this.props.dispatch(investListActions.stateSbModify({sort:sort}));
        this.props.dispatch(investListActions.getTransferList(1,10,filter,newSort));
    }
    getStatusName(status,id){
        let investButton=``;
        switch(status){
            case 50:
                investButton=<Link to={`/invest-detail/${id}`} className="btn start">立即加入</Link>;
                break;
            case 60:
                investButton=<Link to={`/invest-detail/${id}`} className="btn end">满标待划转</Link>;
                break;
            case 70:
                investButton=<Link to={`/invest-detail/${id}`} className="btn end">还款中</Link>;
                break;
            case 90:
                investButton=<Link to={`/invest-detail/${id}`} className="btn end">已流标</Link>;
                break;
            case 100:
                investButton=<Link to={`/invest-detail/${id}`} className="btn end">已结清</Link>;
                break;
        }
        return investButton;

    }
    render(){
        console.log('-------myLoans--------');
        console.log(this.props);
        let {dispatch}=this.props;
        let {transferList}=this.props.investList;
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
                    list == "{}"? <div></div>
                        :
                        list.data.total > 0 ?
                            <div className="table__wrapper">
                                <table className="tableList">
                                    <thead>
                                    <tr>
                                        <th>项目名称</th>
                                        <th>投资总额</th>
                                        <th className={`order${sort.rate}`} onClick={() => {this.sort('rate')}}>预期年化收益率<i></i></th>
                                        <th className={`order${sort.loanApplyExpiry}`} onClick={() => {this.sort('loanApplyExpiry')}}>投资期限<i></i></th>
                                        <th className={`order${sort.publishTime}`} onClick={() => {this.sort('publishTime')}}>发布时间<i></i></th>
                                        <th className={`order${sort.syje}`} onClick={() => {this.sort('syje')}}>剩余金额<i></i></th>
                                        <th>投资人数</th>
                                        <th className={`order${sort.tzjd}`} onClick={() => {this.sort('tzjd')}}>投资进度<i></i></th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        list.data.list.map((l, i) => (
                                            <tr key={`row-${i}`}>
                                                <td className="t_table">
                                                    <p><a href={"/invest-detail/" + l['proId']}  title="longText">{l.longText}</a></p>
                                                </td>
                                                <td className="rtxt">{l.money}元</td>
                                                <td><em className="redTxt">{l.num}%</em></td>
                                                <td>{l.num}个月</td>
                                                <td>{moment(l.dateTime).format('YYYY-MM-DD')}</td>
                                                <td className="rtxt">{l.money}元</td>
                                                <td>{l.num}人</td>
                                                <td style={{ width: 170}}>
                                                    <Progress percent={parseInt(l.num)} size="small" />
                                                </td>
                                                <td>
                                                    {this.getStatusName(l.projectStatus,l.proId)}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>

                                <Pagination config = {
                                    {
                                        currentPage:list.data.pageNum,
                                        pageSize:list.data.pageSize,
                                        totalPage:Math.ceil(list.data.total/list.data.pageSize),
                                        paging:(obj)=>{
                                            dispatch(investListActions.getTransferList(obj.currentPage,obj.pageCount,filter,sort));
                                        }
                                    }
                                } ></Pagination>
                            </div>
                            : <div>暂无标的</div>
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

