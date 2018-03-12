import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'antd';
import { connect } from 'react-redux';
import moment from "moment";
import  investListActions  from '../../../../actions/invest-list';
import Pagination from '../../../../components/pagination/pagination';
class SubjectList extends Component {
    /*constructor(props) {
        super(props);
        this.state = {
            dataSetting:{},
            greenHand:0,  //是否新手 0全部 2新手 1普通
            loanApplyExpiry:0,
            rateGroup:0,
            sort:{
                loanApplyExpiry:'',
                publishTime:'',
                rate:'',
                tzjd:'',//投资进度
                syje:''//剩余金额
            }

        }
    }
    loadData(currentPage, pageSize, filter) {
        let conditions = "";
        if ( filter ) {
            for(var item in filter){
                conditions += "&"+item+"="+filter[item];
            }
        }
        let url = `http://172.16.1.221:9090?pageNum=${currentPage}&pageSize=${pageSize}${conditions}`;
        fetch(url,{
            method:"get"
        })
        .then(function (response){
            if (response.status == 200){
                return response;
            }
        })
        .then((data) => data.json())
        .then((data) => {
                this.setState({ dataSetting:data.data });
            }
        ).catch(function(err){
        console.log("Fetch错误:"+err);
        });
        let mockDate={
            code: "0",
            data:{
                list:[
                    {id:1,projectStatus:50,projectCode:'汇车贷-HCD20180116005',applyAmt:'200000.00',loanApplyExpiry:'3',
                        rate:'12','publishTime':'2017-08-16',syje:'100000.00','tzrs':'3','tzjd':'50'},
                    {id:2,projectStatus:60,projectCode:'汇车贷-HCD20180116004',applyAmt:'10000.00',loanApplyExpiry:'3',
                        rate:'8','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100'},
                    {id:7,projectStatus:70,projectCode:'汇车贷-HCD20180116003',applyAmt:'100000.00',loanApplyExpiry:'12',
                        rate:'8','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100'},
                    {id:3,projectStatus:90,projectCode:'汇车贷-HCD20180116002',applyAmt:'100000.00',loanApplyExpiry:'3',
                        rate:'10','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100'},
                    {id:4,projectStatus:100,projectCode:'汇车贷-HCD20180116001',applyAmt:'100000.00',loanApplyExpiry:'6',
                        rate:'12','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100'},
                    {id:1,projectStatus:50,projectCode:'汇车贷-HCD20180116005',applyAmt:'200000.00',loanApplyExpiry:'3',
                        rate:'12','publishTime':'2017-08-16',syje:'100000.00','tzrs':'3','tzjd':'50'},
                    {id:2,projectStatus:60,projectCode:'汇车贷-HCD20180116004',applyAmt:'10000.00',loanApplyExpiry:'3',
                        rate:'8','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100'},
                    {id:7,projectStatus:70,projectCode:'汇车贷-HCD20180116003',applyAmt:'100000.00',loanApplyExpiry:'12',
                        rate:'8','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100'},
                    {id:3,projectStatus:90,projectCode:'汇车贷-HCD20180116002',applyAmt:'100000.00',loanApplyExpiry:'3',
                        rate:'10','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100'},
                    {id:4,projectStatus:100,projectCode:'汇车贷-HCD20180116001',applyAmt:'100000.00',loanApplyExpiry:'6',
                        rate:'12','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100'},
                ],
                pageNum: 1,
                pageSize: 10,
                total:13
            },
            message: "SUCCESS",
            time: "2018-01-17 11:49:39"
        }
        this.setState({
            dataSetting:mockDate.data
        });
    }
    componentDidMount () {
        this.loadData(1,10);
    }
    upSort(propertyName) {
        //判断第一条数据对应字段的类型,
        /!*if((typeof this.state.dataSetting.list[0][propertyName]) != "number"){
        }*!/
        if ((typeof this.state.dataSetting.list[0][propertyName]) != "number") {
            return function(object1, object2) {
                var value1 = object1[propertyName];
                var value2 = object2[propertyName];
                return value1.localeCompare(value2);
            }
        }
        else {
            return function(object1, object2) {
                var value1 = object1[propertyName];
                var value2 = object2[propertyName];
                return value1 - value2;
            }
        }
    }
    downSort(propertyName) {
        console.log('-----------');
        console.log(typeof this.state.dataSetting.list[0][propertyName]);
        if ((typeof this.state.dataSetting.list[0][propertyName]) != "number") {
            return function(object1, object2) {
                var value1 = object1[propertyName];
                var value2 = object2[propertyName];
                return value2.localeCompare(value1);
            }
        }
        else {
            return function(object1, object2) {
                var value1 = object1[propertyName];
                var value2 = object2[propertyName];
                return value2 - value1;

            }
        }
        console.log('---------------------');
    }
    switchFilterStyle = (item,index) => {
        return index === this.state[item] ? "filter__opt filter__opt--active" : "filter__opt"
    }
    switchSortStyle = (item) => {
        //return index === this.state[item] ? "order desc" : "order"

        switch (this.state.sort[item]){
            case 'desc':
                return "order desc"
            case 'asc':
                return "order asc"
            default:
                return "order"
        }
    }
    filter=(item,index) => {
        this.setState({
            [item]: index
        }, () => {
            let rateBegin,rateEnd,filter;
            switch (this.state.rateGroup){
                case 1:
                    rateBegin=6;
                    rateEnd=8;
                    break;
                case 2:
                    rateBegin=8;
                    rateEnd=10;
                    break;
                case 3:
                    rateBegin=10;
                    rateEnd=12;
                    break;
                case 0:
                    rateBegin='';
                    rateEnd='';
                    break;
            }
            filter={
                greenHand:this.state.greenHand,
                loanApplyExpiry:this.state.loanApplyExpiry,
                rateBegin:rateBegin,
                rateEnd:rateEnd
            }
            this.state.sort={};
            this.loadData(1,10,filter);
        });

    }
    sort = item => {
        switch (this.state.sort[item]){
            case 'desc':
                this.setState({
                    sort:{
                        [item]: 'asc'
                    }
                }, () => {
                    //正序
                    //console.log(this.state.dataSetting.downSort(item));
                    this.state.dataSetting.list=this.state.dataSetting.list.sort(this.upSort(item));
                });
                break;
            case 'asc':
                this.setState({
                    sort:{
                        [item]: 'desc'
                    }
                }, () => {
                    //倒序
                    this.state.dataSetting.list=this.state.dataSetting.list.sort(this.downSort(item));
                });
                break;
            default:
                this.setState({
                    sort:{
                        [item]: 'desc'
                    }
                }, () => {
                    //倒序
                    this.state.dataSetting.list=this.state.dataSetting.list.sort(this.downSort(item));
                });
                break;
        }
    }*/
    constructor(props) {
        super(props);
        this.multiFilter = this.multiFilter.bind(this);
    }
    switchSortStyle = (item) => {
        /*switch (this.state.sort[item]){
            case 'desc':
                return "order desc"
            case 'asc':
                return "order asc"
            default:
                return "order"
        }*/
        return "order desc"
    }
    componentDidMount () {
        this.props.dispatch(investListActions.getData(1));
    }
    multiFilter(type,value){
        let newState={};
        newState[type]=value;
        this.props.dispatch(investListActions.stateSbModify({filter:newState}));
        this.props.dispatch(investListActions.filter(this.props.investList.sbList.filter));
    }
    sort(type){
        let sbList=this.props.investList.sbList
        let {pageNum,pageSize}=sbList.list.data;
        let sort=sbList.sort;
        for(var i in sort){
            sort[i]=0;
        }
        let filter=sbList.filter;
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
        this.props.dispatch(investListActions.stateSbModify({sort:sort}));
        this.props.dispatch(investListActions.sort(pageNum,pageSize,filter,sbList.sort));
    }
    render(){
        console.log('-------myLoans--------');
        console.log(this.props);
        let {dispatch}=this.props;
        let {sbList}=this.props.investList;
        let {list,filter,sort}=sbList;
        let {type,loanApplyExpiry,rateGroup}=filter;

        return (
            <div>
                <div className="filter">
                    <div className="filter__outer">
                        <div className="filter__inner">
                            <div className="filter__row">
                                <div className="filter__cell">
                                    <h5 className="filter__tit">标的类型</h5>
                                </div>
                                <div className="filter__cell">
                                    <p className={(type===0)?'filter__opt filter__opt--active':'filter__opt'}
                                       onClick={ ()=>{this.multiFilter('type',0)}}>全部</p>
                                </div>
                                <div className="filter__cell">
                                    <p className={(type===2)?'filter__opt filter__opt--active':'filter__opt'}
                                       onClick={ ()=>{this.multiFilter('type',2)} }>新手</p>
                                </div>
                                <div className="filter__cell">
                                    <p className={(type===1)?'filter__opt filter__opt--active':'filter__opt'}
                                       onClick={ ()=>{this.multiFilter('type',1)}}>普通</p>
                                </div>
                            </div>
                            <div className="filter__row">
                                <div className="filter__cell">
                                    <h5 className="filter__tit">投资期限</h5>
                                </div>
                                <div className="filter__cell">
                                    <p className={(loanApplyExpiry===0)?'filter__opt filter__opt--active':'filter__opt'}
                                       onClick={ () => { this.multiFilter('loanApplyExpiry',0) } }>全部</p>
                                </div>
                                <div className="filter__cell">
                                    <p className={(loanApplyExpiry===3)?'filter__opt filter__opt--active':'filter__opt'}
                                       onClick={ () => { this.multiFilter('loanApplyExpiry',3)}  }>3个月</p>
                                </div>
                                <div className="filter__cell">
                                    <p className={(loanApplyExpiry===6)?'filter__opt filter__opt--active':'filter__opt'}
                                       onClick={ () => { this.multiFilter('loanApplyExpiry',6)}  } >6个月</p>
                                </div>
                                <div className="filter__cell">
                                    <p className={(loanApplyExpiry===12)?'filter__opt filter__opt--active':'filter__opt'}
                                       onClick={ () => { this.multiFilter('loanApplyExpiry',12)}  } >12个月</p>
                                </div>
                            </div>

                            <div className="filter__row">
                                <div className="filter__cell">
                                    <h5 className="filter__tit">预期年化收益率</h5>
                                </div>
                                <div className="filter__cell">
                                    <p className={(rateGroup===0)?'filter__opt filter__opt--active':'filter__opt'}
                                       onClick={ () => { this.multiFilter('rateGroup',0)}  } >全部</p>
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
                                                    <p><a href={"/invest/invest-detail/" + l['proId']}  title="longText">{l.longText}</a></p>
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
                                                    {l.projectStatus==50?
                                                        <a  href={"/invest/invest-detail/" + l.proId} className="btn start">
                                                            立即加入
                                                        </a> :''}
                                                    {l.projectStatus==60?
                                                        <a  href={"/invest/invest-detail/" + l.proId} className="btn end">
                                                            满标待划转
                                                        </a> :''}
                                                    {l.projectStatus==70?
                                                        <a  href={"/invest/invest-detail/" + l.proId} className="btn end">
                                                            还款中
                                                        </a> :''}
                                                    {l.projectStatus==90?
                                                        <a  href={"/invest/invest-detail/" + l.proId} className="btn end">
                                                            已流标
                                                        </a> :''}
                                                    {l.projectStatus==100?
                                                        <a  href={"/invest/invest-detail/" + l.proId} className="btn end">
                                                            已结清
                                                        </a> :''}
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
                                            dispatch(investListActions.getList(obj.currentPage,obj.pageCount,filter));
                                        }
                                    }
                                } ></Pagination>
                            </div>
                            : <div>暂无标的</div>
                }
            </div>
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