import React from 'react';
import PropTypes from 'prop-types';
import PieChart from '../../../../components/charts/pie';
import {addCommas} from '../../../../assets/js/cost';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import Pagination from '../../../../components/pagination/pagination';
import  {getData}  from '../../../../assets/js/getData';
import './receiving.less';
export default class Receiving extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dataSetting:{},  //项目数据
            charts:{
                totalInvestment:{},
                accumulatedIncome:{},
            },  //统计数据
        };
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
                            {value:totalInvestment.proMoneyBidding, name:'已回利息',instruction:`${addCommas(totalInvestment.proMoneyBidding)}元`},
                            {value:totalInvestment.proMoneyInBack, name:'已回本金',instruction:`${addCommas(totalInvestment.proMoneyInBack)}元`},
                            {value:totalInvestment.proMoneyBacked, name:'已回罚息',instruction:`${addCommas(totalInvestment.proMoneyBacked)}元`},
                        ]
                    },
                    accumulatedIncome:{
                        data:[
                            {value:accumulatedIncome.earnMoneyInBack, name:'未回利息',instruction:`${addCommas(accumulatedIncome.earnMoneyInBack)}元`},
                            {value:accumulatedIncome.earnMoneyBacked, name:'未回本金',instruction:`${addCommas(accumulatedIncome.earnMoneyBacked)}元`},
                            {value:accumulatedIncome.earnMoneyOut, name:'未回罚息',instruction:`${addCommas(accumulatedIncome.earnMoneyOut)}元`},
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
            <div className="member__main receiving">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="回款统计" className="chart">
                            <Tab>
                                <div name="已回金额">
                                    {
                                        JSON.stringify(this.state.charts.totalInvestment) != "{}"?
                                            <PieChart
                                                data={this.state.charts.totalInvestment.data}
                                                style={{height: '300px', width: '930px'}}
                                                totalTitle="已回金额"
                                            >
                                            </PieChart>
                                            :''
                                    }
                                </div>
                                <div name="未回金额">
                                    {
                                        JSON.stringify(this.state.charts.accumulatedIncome) != "{}"?
                                            <PieChart
                                                data={this.state.charts.accumulatedIncome.data}
                                                style={{height: '300px', width: '930px'}}
                                                totalTitle="未回金额"
                                            >
                                            </PieChart>
                                            :''
                                    }
                                </div>
                            </Tab>
                        </div>
                    </Tab>
                </div>
                <div className="member__cbox" style={{ padding:'20px 30px' }}>

                    {
                        JSON.stringify(this.state.dataSetting) == "{}"? <div>连接错误,请稍后再试</div>
                            :
                            list.length>0 ?
                                <div className="table__wrapper">
                                    {
                                        list.map((item, rowIndex) => (
                                    <dl key={`row-${rowIndex}`}>
                                        <dt><p><a href="#">汇车贷-HCD201704170003</a></p><strong>回款中</strong></dt>
                                        <dd>投资金额：10000元</dd>
                                        <dd>投资日期：2018-02-06</dd>
                                        <dd>收益率：12%</dd>
                                        <dd>下期回款日：2018-02-06</dd>
                                        <dd>结清日期：2018-06-06</dd>
                                        <dd>奖励金额：100.00元</dd>
                                        <dd>预估收益：1000.00元</dd>
                                        <dd>已回本金：0.00元</dd>
                                        <dd>已回利息：100.00元</dd>
                                        <dd>已回罚息：0.00元</dd>

                                    </dl>
                                        ))
                                    }

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

            </div>

        )

    }
}