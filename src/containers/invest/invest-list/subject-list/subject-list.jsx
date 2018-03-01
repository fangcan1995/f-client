import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../../../assets/stylesheets/filter.less';
import '../../../../components/table/table.less';
import Pagination from '../../../../components/pagination/pagination';

export default class SubjectList extends Component {
    constructor(props) {
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
        /*if((typeof this.state.dataSetting.list[0][propertyName]) != "number"){
        }*/
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
    }
    render(){
        const {list,pageNum,pageSize,total}=this.state.dataSetting;
        const totalPage=Math.ceil(total/pageSize);
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
                                    <p className={this.switchFilterStyle('greenHand',0)} onClick={() => {
                                        this.filter('greenHand',0)
                                    }}>全部</p>
                                </div>
                                <div className="filter__cell">
                                    <p className={this.switchFilterStyle('greenHand',2)} onClick={() => {
                                        this.filter('greenHand',2)
                                    }}>新手</p>
                                </div>
                                <div className="filter__cell">
                                    <p className={this.switchFilterStyle('greenHand',1)} onClick={() => {
                                        this.filter('greenHand',1)
                                    }}>普通</p>
                                </div>
                            </div>

                            <div className="filter__row">
                                <div className="filter__cell">
                                    <h5 className="filter__tit">投资期限</h5>
                                </div>
                                <div className="filter__cell">
                                    <p className={this.switchFilterStyle('loanApplyExpiry',0)} onClick={() => {
                                        this.filter('loanApplyExpiry',0)
                                    }}>全部</p>
                                </div>
                                <div className="filter__cell">
                                    <p className={this.switchFilterStyle('loanApplyExpiry',3)} onClick={() => {
                                        this.filter('loanApplyExpiry',3)
                                    }}>3个月</p>
                                </div>
                                <div className="filter__cell">
                                    <p className={this.switchFilterStyle('loanApplyExpiry',6)} onClick={() => {
                                        this.filter('loanApplyExpiry',6)
                                    }}>6个月</p>
                                </div>
                                <div className="filter__cell">
                                    <p className={this.switchFilterStyle('loanApplyExpiry',12)} onClick={() => {
                                        this.filter('loanApplyExpiry',12)
                                    }}>12个月</p>
                                </div>
                            </div>

                            <div className="filter__row">
                                <div className="filter__cell">
                                    <h5 className="filter__tit">预期年化收益率</h5>
                                </div>
                                <div className="filter__cell">
                                    <p className={this.switchFilterStyle('rateGroup',0)} onClick={() => {
                                        this.filter('rateGroup',0)
                                    }}>全部</p>
                                </div>
                                <div className="filter__cell">
                                    <p className={this.switchFilterStyle('rateGroup',1)} onClick={() => {
                                        this.filter('rateGroup',1)
                                    }}>6%~8%</p>
                                </div>
                                <div className="filter__cell">
                                    <p className={this.switchFilterStyle('rateGroup',2)} onClick={() => {
                                        this.filter('rateGroup',2)
                                    }}>8%~10%</p>
                                </div>
                                <div className="filter__cell">
                                    <p className={this.switchFilterStyle('rateGroup',3)} onClick={() => {
                                        this.filter('rateGroup',3)
                                    }}>10%~12%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    JSON.stringify(this.state.dataSetting) == "{}"? <div>loading...</div>
                        :
                        list.length>0 ?
                            <div className="table__wrapper">
                                <table className="tableList">
                                    <thead>
                                    <tr>
                                        <th>项目名称</th>
                                        <th>投资总额</th>

                                        <th className={this.switchSortStyle('rate')} onClick={() => {
                                            this.sort('rate')
                                        }}>预期年化收益率<i></i></th>
                                        <th className={this.switchSortStyle('loanApplyExpiry')} onClick={() => {
                                            this.sort('loanApplyExpiry')
                                        }}>投资期限<i></i></th>
                                        <th className={this.switchSortStyle('publishTime')} onClick={() => {
                                            this.sort('publishTime')
                                        }}>发布时间<i></i></th>
                                        <th className={this.switchSortStyle('syje')} onClick={() => {
                                            this.sort('syje')
                                        }}>剩余金额<i></i></th>
                                        <th>投资人数</th>
                                        <th className={this.switchSortStyle('tzjd')} onClick={() => {
                                            this.sort('tzjd')
                                        }}>投资进度<i></i></th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        list.map((entry, rowIndex) => (
                                            <tr key={`row-${rowIndex}`}>
                                                <td className="t_table"><p><a href={"/invest/invest-detail/" + entry['id']}  title=" 汇车贷-HCD201708180004">{entry['projectCode']}</a></p></td>
                                                <td className="rtxt">{entry['applyAmt']}元</td>
                                                <td><em className="redTxt">{entry['rate']}%</em></td>
                                                <td>{entry['loanApplyExpiry']}个月</td>
                                                <td>{entry['publishTime']}</td>
                                                <td className="rtxt">{entry['syje']}元</td>
                                                <td>{entry['loanApplyExpiry']}人</td>
                                                <td><dl className="progressbar">
                                                    <dt><div className="finished" style={{ width:`${entry['tzjd']}%`}}></div></dt>
                                                    <dd><strong>{entry['tzjd']}%</strong></dd>
                                                </dl></td>
                                                <td>
                                                    {entry['projectStatus']==50?
                                                        <a  href={"/invest/invest-detail/" + entry['id']} className="btn start">
                                                            立即加入
                                                        </a> :''}
                                                    {entry['projectStatus']==60?
                                                        <a  href={"/invest/invest-detail/" + entry['id']} className="btn end">
                                                            满标待划转
                                                        </a> :''}
                                                    {entry['projectStatus']==70?
                                                        <a  href={"/invest/invest-detail/" + entry['id']} className="btn end">
                                                            还款中
                                                        </a> :''}
                                                    {entry['projectStatus']==90?
                                                        <a  href={"/invest/invest-detail/" + entry['id']} className="btn end">
                                                            已流标
                                                        </a> :''}
                                                    {entry['projectStatus']==100?
                                                        <a  href={"/invest/invest-detail/" + entry['id']} className="btn end">
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
                                        currentPage:pageNum,
                                        pageSize:pageSize,
                                        totalPage:totalPage,
                                        paging:(obj)=>{
                                            this.loadData(obj.currentPage,obj.pageCount,this.state.dataSetting.filter);
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