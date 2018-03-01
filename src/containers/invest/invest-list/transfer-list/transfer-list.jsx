import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '../../../../components/pagination/pagination';

export default class TransferList extends React.Component{
    constructor(props){
        super(props);
        this.state={
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
    loadData(currentPage,pageSize){
        let url = `http://172.16.1.221:9090?pageNum=${currentPage}&pageSize=${pageSize}`;
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
                    {id:1,projectStatus:50,projectCode:'债转-ZZ201712171355',applyAmt:'200000.00',loanApplyExpiry:'1',
                        rate:'12','publishTime':'2017-08-16',syje:'100000.00','tzrs':'3','tzjd':'50'},
                    {id:2,projectStatus:60,projectCode:'债转-ZZ201712171354',applyAmt:'10000.00',loanApplyExpiry:'5',
                        rate:'8','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100'},
                    {id:7,projectStatus:70,projectCode:'债转-ZZ201712171353',applyAmt:'100000.00',loanApplyExpiry:'10',
                        rate:'8','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100'},
                    {id:3,projectStatus:90,projectCode:'债转-ZZ201712171352',applyAmt:'100000.00',loanApplyExpiry:'3',
                        rate:'10','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100'},
                    {id:4,projectStatus:100,projectCode:'债转-ZZ201712171351',applyAmt:'100000.00',loanApplyExpiry:'2',
                        rate:'12','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100'},
                    {id:1,projectStatus:50,projectCode:'债转-ZZ201712171355',applyAmt:'200000.00',loanApplyExpiry:'1',
                        rate:'12','publishTime':'2017-08-16',syje:'100000.00','tzrs':'3','tzjd':'50'},
                    {id:2,projectStatus:60,projectCode:'债转-ZZ201712171354',applyAmt:'10000.00',loanApplyExpiry:'5',
                        rate:'8','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100'},
                    {id:7,projectStatus:70,projectCode:'债转-ZZ201712171353',applyAmt:'100000.00',loanApplyExpiry:'10',
                        rate:'8','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100'},
                    {id:3,projectStatus:90,projectCode:'债转-ZZ201712171352',applyAmt:'100000.00',loanApplyExpiry:'3',
                        rate:'10','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100'},
                    {id:4,projectStatus:100,projectCode:'债转-ZZ201712171351',applyAmt:'100000.00',loanApplyExpiry:'2',
                        rate:'12','publishTime':'2017-08-16',syje:'0.00','tzrs':'3','tzjd':'100'}
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
    sort=(item)=>{
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
                                                <td className="t_table">
                                                    <p><a href={"/invest/transfer-detail/" + entry['id']}  title=" 汇车贷-HCD201708180004">{entry['projectCode']}</a>
                                                    </p>
                                                </td>
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
                                            this.loadData(obj.currentPage,obj.pageCount);
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