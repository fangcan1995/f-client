import React from 'react';
import PropTypes from 'prop-types';
import PieChart from '../../../../components/charts/pie';
import {addCommas} from '../../../../assets/js/cost';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import Pagination from '../../../../components/pagination/pagination';
import  {getData}  from '../../../../assets/js/getData';
import { Modal } from 'antd';
import ModalRepaymentApp from './modalRepaymentApp';
import './myLoans.less';
export default class MyLoans extends React.Component{
    constructor(props){
        super(props);
        this.state={
            modalRepaymentApp: false,
            currentId:'',
            dataSetting:{},  //项目数据
            charts:{
                totalInvestment:{},
                accumulatedIncome:{},
            },  //统计数据
            status: 1,
        };
    }
    toggleModal=(modal,visile,id)=>{
        if(visile){
            this.setState({
                [modal]: true,
                currentId:id,
            });
        }else{
            this.setState({
                [modal]: false,
                currentId:'',
            });
        }
    };
    switchFilterStyle = (item,index) => {
        return index === this.state[item] ? "filter__opt filter__opt--active" : "filter__opt"
    }
    filter=(item,index)=>{
        this.setState({
            [item]: index,
        },()=>{
            let filter={
                status:this.state.status,
            }
            this.loadData(1,10,filter);
        })
    }
    loadData(currentPage,pageSize,filter){
        let data=getData(`http://localhost:9002/members`,currentPage,pageSize,filter);
        if (data){
            this.setState({
                dataSetting:data.data
            });
        }else{
            let mockDate={
                code: "0",
                data:{
                    list:[
                        {
                            proId:'1',proStatus:'项目状态',proName:'项目名称',proMoney:'投资总额',proMoneyEnd:'投资金额',
                            inveCreateTime:'投资时间',proAnnualRate:'预期年化收益率',loanExpiry:'锁定期限',loanRefundWay:'还款方式',
                            proMoneyPercent:'投资进度',earnShdEarnDate:'下期回款日期',earnShdEarnDate:'下期回款日期',earnShdEarnAmou:'下期回款金额',
                            earnRemittancAmou:'回款金额',earnRealEarnDate:'结清时间',transNo:'债转标项目名称',transApplyTime:'转让申请日期',
                            transStatus:'结果',transFinanced:'当前投资额',transSchedule:'债转投资进度',transPutDate:'转让日期',
                            transferDate:'转让成功日期',transAmt:'转让金额',transFee:'手续费'
                        },
                        {
                            proId:'2',proStatus:'项目状态',proName:'汇车贷-HCD201704170001',proMoney:'投资总额',proMoneyEnd:'投资金额',
                            inveCreateTime:'投资时间',proAnnualRate:'预期年化收益率',loanExpiry:'锁定期限',loanRefundWay:'还款方式',
                            proMoneyPercent:'投资进度',earnShdEarnDate:'下期回款日期',earnShdEarnDate:'下期回款日期',earnShdEarnAmou:'下期回款金额',
                            earnRemittancAmou:'回款金额',earnRealEarnDate:'结清时间',transNo:'债转标项目名称',transApplyTime:'转让申请日期',
                            transStatus:'结果',transFinanced:'当前投资额',transSchedule:'债转投资进度',transPutDate:'转让日期',
                            transferDate:'转让成功日期',transAmt:'转让金额',transFee:'手续费'
                        },
                        {
                            proId:'3',proStatus:'项目状态',proName:'汇车贷-HCD201704170002',proMoney:'投资总额',proMoneyEnd:'投资金额',
                            inveCreateTime:'投资时间',proAnnualRate:'预期年化收益率',loanExpiry:'锁定期限',loanRefundWay:'还款方式',
                            proMoneyPercent:'投资进度',earnShdEarnDate:'下期回款日期',earnShdEarnDate:'下期回款日期',earnShdEarnAmou:'下期回款金额',
                            earnRemittancAmou:'回款金额',earnRealEarnDate:'结清时间',transNo:'债转标项目名称',transApplyTime:'转让申请日期',
                            transStatus:'结果',transFinanced:'当前投资额',transSchedule:'债转投资进度',transPutDate:'转让日期',
                            transferDate:'转让成功日期',transAmt:'转让金额',transFee:'手续费'
                        },
                        {
                            proId:'4',proStatus:'项目状态',proName:'汇车贷-HCD201704170003',proMoney:'100000.00',proMoneyEnd:'50000.00',
                            inveCreateTime:'2016-12-12',proAnnualRate:'12%',loanExpiry:'3个月',loanRefundWay:'还款方式',
                            proMoneyPercent:'投资进度',earnShdEarnDate:'下期回款日期',earnShdEarnDate:'下期回款日期',earnShdEarnAmou:'下期回款金额',
                            earnRemittancAmou:'回款金额',earnRealEarnDate:'结清时间',transNo:'巴20170426字00061号',transApplyTime:'转让申请日期',
                            transStatus:'结果',transFinanced:'7000.00',transSchedule:'70%',transPutDate:'2017-06-06',
                            transferDate:'转让成功日期',transAmt:'10000.00',transFee:'手续费'
                        },
                    ],
                    pageNum: 1,
                    pageSize: 10,
                    total:13
                },
                message: "SUCCESS",
                time: "2018-01-17 11:49:39"
            };
            this.setState({
                dataSetting:mockDate.data
            });
        }

    }
    loadChartsData(){
        let data=getData(`http://localhost:9002/members`);
        if (data){
            /*this.setState({
                charts:{
                    totalInvestment:{
                        legend:{data:['招标中','回款中','已回款','已转出']},
                        series_data:{
                            data:[
                                {value:data.data.totalInvestment.proMoneyBidding, name:'招标中'},
                                {value:data.data.totalInvestment.proMoneyInBack, name:'回款中'},
                                {value:data.data.totalInvestment.proMoneyBacked, name:'已回款'},
                                {value:data.data.totalInvestment.proMoneyOut, name:'已转出'}
                            ]
                        }
                    },
                    accumulatedIncome:{
                        legend:{data:['招标中','回款中','已回款','已转出']},
                        series_data:{
                            data:[
                                {value:data.data.totalInvestment.proMoneyBidding, name:'招标中'},
                                {value:data.data.totalInvestment.proMoneyInBack, name:'回款中'},
                                {value:data.data.totalInvestment.proMoneyBacked, name:'已回款'},
                                {value:data.data.totalInvestment.proMoneyOut, name:'已转出'}
                            ]
                        }
                    }
                }
            });*/
        }else{
            let mockDate={
                data: {
                    totalInvestment: {
                        proMoneyBidding:5000.00,
                        proMoneyInBack:2000.00,
                        proMoneyBacked:3000.00,
                        proMoneyOut:1000.00,
                    },  //投资总额
                    accumulatedIncome: {
                        earnMoneyInBack:5000.00,
                        earnMoneyBacked:5000.00,
                        earnMoneyOut:2000.00,
                    },  //累计收益
                },
                code: "0",
                message: "SUCCESS",
            };
            let {totalInvestment,accumulatedIncome}=mockDate.data;
            this.setState({
                charts:{
                    totalInvestment:{
                        data:[
                            {name:'申请中',value:totalInvestment.proMoneyBidding,instruction:`${addCommas(totalInvestment.proMoneyBidding)}元`  },
                            {name:'招标中',value:totalInvestment.proMoneyInBack,instruction:`${addCommas(totalInvestment.proMoneyInBack)}元`},
                            {name:'还款中',value:totalInvestment.proMoneyBacked,instruction:`${addCommas(totalInvestment.proMoneyBacked)}元`},
                            {name:'已结清',value:totalInvestment.proMoneyOut,instruction:`${addCommas(totalInvestment.proMoneyOut)}元`}
                        ]
                    },
                    accumulatedIncome:{
                            data:[
                                {name:'还款中',value:accumulatedIncome.earnMoneyInBack,instruction:`${addCommas(accumulatedIncome.earnMoneyInBack)}元`  },
                                {name:'已结清',value:accumulatedIncome.earnMoneyBacked,instruction:`${addCommas(accumulatedIncome.earnMoneyBacked)}元`  },
                            ]
                    },
                }
            },()=>{


            });
        }
    }
    componentDidMount () {
        this.loadChartsData();
        this.loadData(1,10,{status:1});

    }
    render(){
        const {list,pageNum,total,pageSize}=this.state.dataSetting;
        const totalPage=Math.ceil(total/pageSize);
        return(
            <div className="member__main">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="我的借款" className="chart">
                            <Tab>
                                <div name="借款总额">
                                    {
                                        JSON.stringify(this.state.charts.totalInvestment) != "{}"?
                                            <PieChart
                                                data={this.state.charts.totalInvestment.data}
                                                style={{height: '300px', width: '930px'}}
                                                totalTitle="借款总额"
                                            >
                                            </PieChart>
                                            :''
                                    }
                                </div>
                                <div name="累计利息">
                                    {
                                        JSON.stringify(this.state.charts.accumulatedIncome) != "{}"?
                                            <PieChart
                                                data={this.state.charts.accumulatedIncome.data}
                                                style={{height: '300px', width: '930px'}}
                                                totalTitle="累计利息"
                                            >
                                            </PieChart>
                                            :''
                                    }
                                </div>
                            </Tab>
                        </div>
                    </Tab>
                </div>
                <div className="member__cbox">
                    <div className="filter">
                        <div className="filter__outer">
                            <div className="filter__inner">
                                <div className="filter__row">
                                    <div className="filter__cell">
                                        <h5>类型:</h5>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={ this.switchFilterStyle('status',1) } onClick={ () => { this.filter('status',1) } }>申请中</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={  this.switchFilterStyle('status',2) } onClick={ () => { this.filter('status',2) } }>招标中</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={  this.switchFilterStyle('status',3)  } onClick={ () => { this.filter('status',3) } }>还款中</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={  this.switchFilterStyle('status',4) } onClick={ () => { this.filter('status',4) } }>已结清</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        JSON.stringify(this.state.dataSetting) == "{}"? <div>连接错误,请稍后再试</div>
                            :
                            list.length>0 ?
                                <div className="table__wrapper">
                                    <table className={`tableList table${this.state.status}`}>
                                        <thead>
                                        <tr>
                                            <th>项目名称</th>
                                            {(this.state.status==1)? <th>项目类型</th>:''}
                                            <th>借款金额(元)</th>
                                            {(this.state.status==1)? <th>借款年利率(%)</th>:''}
                                            <th>借款期限</th>
                                            {(this.state.status==1)? <th>还款方式</th>:''}
                                            {(this.state.status==1)? <th>申请日期</th>:''}
                                            {(this.state.status==2)? <th>发布日期</th>:''}
                                            {(this.state.status==2)? <th>当前投资金额(元)</th>:''}
                                            {(this.state.status==2)? <th>投资进度(%)</th>:''}
                                            {(this.state.status==2)? <th>募集结束日期</th>:''}
                                            {(this.state.status==3||this.state.status==4)? <th>放款日期</th>:''}
                                            {(this.state.status==3)? <th>下期还款日期</th>:''}
                                            {(this.state.status==3)? <th>下期还款金额</th>:''}
                                            {(this.state.status==4)? <th>还款本金</th>:''}
                                            {(this.state.status==4)? <th>还款利息</th>:''}
                                            {(this.state.status==4)? <th>逾期罚金</th>:''}
                                            {(this.state.status==4)? <th>逾期罚息</th>:''}
                                            {(this.state.status==4)? <th>结清日期</th>:''}
                                            {(this.state.status==1||this.state.status==2)? <th>状态</th>:''}
                                            {(this.state.status==3||this.state.status==4)? <th>操作</th> :''}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            list.map((item, rowIndex) => (
                                                <tr key={`row-${rowIndex}`}>
                                                        <td>
                                                            <p>{item.transNo}{/*项目名称*/}</p>
                                                        </td>
                                                    {(this.state.status==1)? <td>项目类型</td>:''}
                                                    <td>借款金额</td>
                                                    {(this.state.status==1)? <td>5%</td>:''}
                                                    <td>借款期限</td>
                                                    {(this.state.status==1)? <td>还款方式</td>:''}
                                                    {(this.state.status==1)? <td>申请日期</td>:''}
                                                    {(this.state.status==2)? <td>发布日期</td>:''}
                                                    {(this.state.status==2)? <td>当前投资金额(元)</td>:''}
                                                    {(this.state.status==2)? <td>投资进度</td>:''}
                                                    {(this.state.status==2)? <td>募集结束日期</td>:''}
                                                    {(this.state.status==3||this.state.status==4)? <td>放款日期</td>:''}
                                                    {(this.state.status==3)? <td>下期还款日期</td>:''}
                                                    {(this.state.status==3)? <td>下期还款金额</td>:''}
                                                    {(this.state.status==4)? <td>还款本金</td>:''}
                                                    {(this.state.status==4)? <td>还款利息</td>:''}
                                                    {(this.state.status==4)? <td>逾期罚金</td>:''}
                                                    {(this.state.status==4)? <td>逾期罚息</td>:''}
                                                    {(this.state.status==4)? <td>结清日期</td>:''}
                                                    {(this.state.status==1||this.state.status==2)? <td>{item.transStatus}{/*状态*/}</td>:''}
                                                    {(this.state.status==3||this.state.status==4)?
                                                        <td>
                                                            {(this.state.status==3)? <a onClick={() => this.toggleModal(`modalRepaymentApp`,true,item.proId)}>提前还款</a>:''}
                                                            <a href="">借款合同</a>
                                                        </td>
                                                        :''
                                                    }
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                    <Pagination config = {
                                        {
                                            currentPage:1,
                                            pageSize:10,
                                            totalPage:2,
                                            filter:this.state.status,
                                            paging:(obj)=>{
                                                this.loadData(obj.currentPage,obj.pageCount,{re_status:obj.filter});
                                            }
                                        }
                                    } ></Pagination>
                                </div>
                                : <div>暂无记录</div>
                    }
                </div>
                <Modal
                    title="提前还款申请"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.modalRepaymentApp}
                    width="520px"
                    footer={null}
                    onCancel={() => this.toggleModal(`modalRepaymentApp`,false,'')}
                >
                    {this.state.modalRepaymentApp===true?
                        <ModalRepaymentApp proId={this.state.currentId} />:''
                    }
                </Modal>
            </div>

        )

    }
}