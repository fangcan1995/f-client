import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import {getEchartPie} from '../../../../assets/js/getEchart';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import Pagination from '../../../../components/pagination/pagination';
import  {getData}  from '../../../../assets/js/getData';
import { Modal } from 'antd';
import ModalPlan from './modalPlan';
import ModalTransfer from './modalTransfer';
import './investments.less';
export default class Investments extends React.Component{
    constructor(props){
        super(props);
        this.state={
            modalPlan: false,
            modalTransfer: false,
            currentId:'',
            dataSetting:{},  //项目数据
            charts:{
                totalInvestment:{
                    legend:{},
                    series_data:{}
                },
                accumulatedIncome:{
                    legend:{},
                    series_data:{}
                },

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
                        legend:{data:['招标中','回款中','已回款','已转出']},
                        series_data:{
                            data:[
                                {value:totalInvestment.proMoneyBidding, name:'招标中'},
                                {value:totalInvestment.proMoneyInBack, name:'回款中'},
                                {value:totalInvestment.proMoneyBacked, name:'已回款'},
                                {value:totalInvestment.proMoneyOut, name:'已转出'}
                            ]
                        }
                    },
                    accumulatedIncome:{
                        legend:{data:['回款中','已回款','已转出']},
                        series_data:{
                            data:[
                                {value:accumulatedIncome.earnMoneyInBack, name:'回款中'},
                                {value:accumulatedIncome.earnMoneyBacked, name:'已回款'},
                                {value:accumulatedIncome.earnMoneyOut, name:'已转出'},
                            ]
                        }
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
                        <div name="我的投资" className="chart">
                            <Tab>
                                <div name="投资总额">
                                    <ReactEcharts
                                        option={getEchartPie(this.state.charts.totalInvestment)}
                                        style={{height: '300px', width: '100%'}}
                                        opts={{renderer: 'svg'}}
                                        className='react_for_echarts' />
                                </div>
                                <div name="累计收益">
                                    <ReactEcharts
                                        option={getEchartPie(this.state.charts.accumulatedIncome)}
                                        style={{height: '300px', width: '930px'}}
                                        opts={{renderer: 'svg'}}
                                        className='react_for_echarts' />
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
                                        <p className={ this.switchFilterStyle('status',1) } onClick={ () => { this.filter('status',1) } }>招标中</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={  this.switchFilterStyle('status',2) } onClick={ () => { this.filter('status',2) } }>回款中</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={  this.switchFilterStyle('status',3)  } onClick={ () => { this.filter('status',3) } }>已回款</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={  this.switchFilterStyle('status',4) } onClick={ () => { this.filter('status',4) } }>转让申请</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={  this.switchFilterStyle('status',5) } onClick={ () => { this.filter('status',5) } }>转让中</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={  this.switchFilterStyle('status',6) } onClick={ () => { this.filter('status',6) } }>已转出</p>
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
                                            {(this.state.status==4||this.state.status==5||this.state.status==6)? <th>原始项目名称</th>:''}
                                            {(this.state.status==1||this.state.status==2||this.state.status==3)? <th>投资总额(元)</th>:''}
                                            {(this.state.status==1||this.state.status==2||this.state.status==3)? <th>锁定期限</th> :''}
                                            {(this.state.status==1)? <th>还款方式</th> :''}
                                            {(this.state.status==1||this.state.status==2||this.state.status==3||this.state.status==4)? <th>投资金额(元)</th>:''}
                                            {(this.state.status==4||this.state.status==5||this.state.status==6)? <th>转让金额（元）</th>:''}
                                            {(this.state.status==4)? <th>手续费（元）</th>:''}
                                            {(this.state.status==4)? <th>转让申请日期</th>:''}
                                            {(this.state.status==5)? <th>当前投资额（元）</th>:''}
                                            {(this.state.status==5)? <th>投资进度</th>:''}
                                            {(this.state.status==5)? <th>转让日期</th>:''}
                                            {(this.state.status==6)? <th>转让成功日期</th>:''}
                                            {(this.state.status==4||this.state.status==5)? <th>状态</th>:''}


                                            {(this.state.status==1||this.state.status==2||this.state.status==3)? <th>投资时间</th>:''}
                                            {(this.state.status==1)? <th>投资进度(%)</th>:''}
                                            {(this.state.status==2)? <th>下期回款日期</th> :''}
                                            {(this.state.status==2)? <th>下期回款金额(元)</th> :''}
                                            {(this.state.status==3)? <th>回款金额(元)</th> :''}
                                            {(this.state.status==3)? <th>结清时间</th> :''}
                                            {(this.state.status==2||this.state.status==3||this.state.status==6)? <th>操作</th> :''}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            list.map((item, rowIndex) => (
                                                <tr key={`row-${rowIndex}`}>
                                            {(this.state.status==1||this.state.status==2||this.state.status==3)?
                                                <td>
                                                    <p><a href="#">{item.proName}{/*债转标项目名称*/}</a></p>
                                                </td> :
                                                <td>
                                                    <p>{item.transNo}{/*项目名称*/}</p>
                                                </td>
                                            }
                                            {(this.state.status==4||this.state.status==5||this.state.status==6)?
                                                <td>
                                                    <p><a href="">
                                                        {item.proName}{/*项目名称*/}</a>
                                                    </p>
                                                </td>:''}
                                            {(this.state.status==1||this.state.status==2||this.state.status==3)? <td>{item.proMoney}{/*投资总额*/}</td>:''}
                                            {(this.state.status==1||this.state.status==2||this.state.status==3)? <td>{item.loanExpiry}{/*锁定期限*/}</td> :''}
                                            {this.state.status==1? <th>{item.loanRefundWay}{/*还款方式*/}</th> :''}
                                            {(this.state.status==1||this.state.status==2||this.state.status==3||this.state.status==4)? <td>{item.proMoneyEnd}{/*投资金额*/}</td>:''}
                                            {(this.state.status==4||this.state.status==5||this.state.status==6)? <td>{item.transAmt}{/*转让金额*/}</td>:''}
                                            {(this.state.status==4)? <td>{item.transFee}{/*手续费*/}</td>:''}
                                            {(this.state.status==4)? <td>{item.transApplyTime}{/*转让申请日期*/}</td>:''}
                                            {(this.state.status==5)? <td>{item.transFinanced}{/*当前投资额*/}</td>:''}
                                            {(this.state.status==5)? <td>{item.transSchedule}{/*转让进度*/}</td>:''}
                                            {(this.state.status==5)? <td>{item.transPutDate}{/*转让日期*/}</td>:''}
                                            {(this.state.status==6)? <td>{item.transferDate}{/*转让成功日期*/}</td>:''}
                                            {(this.state.status==4||this.state.status==5)? <td>{item.transStatus}{/*状态*/}</td>:''}
                                            {(this.state.status==1||this.state.status==2||this.state.status==3)? <td>{item.inveCreateTime}{/*投资时间*/}</td>:''}
                                            {(this.state.status==1)? <td>{item.proMoneyPercent}{/*投资进度*/}</td>:''}
                                            {(this.state.status==2)? <td>{item.earnShdEarnDate}{/*下期回款日期*/}</td> :''}
                                            {(this.state.status==2)? <td>{item.earnShdEarnAmou}{/*下期回款金额*/}</td> :''}
                                            {(this.state.status==3)? <td>{item.earnRemittancAmou}{/*回款金额*/}</td> :''}
                                            {(this.state.status==3)? <td>{item.earnRealEarnDate}{/*结清时间*/}</td> :''}
                                            {(this.state.status==2||this.state.status==3||this.state.status==6)?
                                                <td>
                                                    {(this.state.status==2||this.state.status==3)? <a onClick={() => this.toggleModal(`modalPlan`,true,item.proId)} >回款计划</a>:''}
                                                    {(this.state.status==2)? <a onClick={() => this.toggleModal(`modalTransfer`,true,item.proId)}>债权转让</a>:''}
                                                    {(this.state.status==2||this.state.status==3)? <a href="">投资合同</a>:''}
                                                    {(this.state.status==6)? <a href="">转让合同</a>:''}
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
                    title="回款计划"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.modalPlan}
                    width="680px"
                    footer={null}
                    onCancel={() => this.toggleModal(`modalPlan`,false,'')}
                >
                    {this.state.modalPlan===true?
                        <ModalPlan proId={this.state.currentId} />:''
                    }
                </Modal>
                <Modal
                    title="转让申请"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.modalTransfer}
                    width="520px"
                    footer={null}
                    onCancel={() => this.toggleModal(`modalTransfer`,false,'')}
                >
                    {this.state.modalTransfer===true?
                        <ModalTransfer proId={this.state.currentId} />:''
                    }
                </Modal>
            </div>

        )

    }
}