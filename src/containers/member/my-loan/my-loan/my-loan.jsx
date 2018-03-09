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
import { connect } from 'react-redux';
import  memberLoansActions  from '../../../../actions/member-loans';
import moment from "moment";
import './my-loan.less';
class MyLoans extends React.Component {
    /*constructor(props){
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
                            proId:'1',proStatus:'项目状态',shortText:'项目名称',proMoney:'投资总额',proMoneyEnd:'投资金额',
                            inveCreateTime:'投资时间',proAnnualRate:'预期年化收益率',loanExpiry:'锁定期限',loanRefundWay:'还款方式',
                            proMoneyPercent:'投资进度',earnShdEarnDate:'下期回款日期',earnShdEarnDate:'下期回款日期',earnShdEarnAmou:'下期回款金额',
                            earnRemittancAmou:'回款金额',earnRealEarnDate:'结清时间',transNo:'债转标项目名称',transApplyTime:'转让申请日期',
                            transStatus:'结果',transFinanced:'当前投资额',transSchedule:'债转投资进度',transPutDate:'转让日期',
                            transferDate:'转让成功日期',transAmt:'转让金额',transFee:'手续费'
                        },
                        {
                            proId:'2',proStatus:'项目状态',shortText:'汇车贷-HCD201704170001',proMoney:'投资总额',proMoneyEnd:'投资金额',
                            inveCreateTime:'投资时间',proAnnualRate:'预期年化收益率',loanExpiry:'锁定期限',loanRefundWay:'还款方式',
                            proMoneyPercent:'投资进度',earnShdEarnDate:'下期回款日期',earnShdEarnDate:'下期回款日期',earnShdEarnAmou:'下期回款金额',
                            earnRemittancAmou:'回款金额',earnRealEarnDate:'结清时间',transNo:'债转标项目名称',transApplyTime:'转让申请日期',
                            transStatus:'结果',transFinanced:'当前投资额',transSchedule:'债转投资进度',transPutDate:'转让日期',
                            transferDate:'转让成功日期',transAmt:'转让金额',transFee:'手续费'
                        },
                        {
                            proId:'3',proStatus:'项目状态',shortText:'汇车贷-HCD201704170002',proMoney:'投资总额',proMoneyEnd:'投资金额',
                            inveCreateTime:'投资时间',proAnnualRate:'预期年化收益率',loanExpiry:'锁定期限',loanRefundWay:'还款方式',
                            proMoneyPercent:'投资进度',earnShdEarnDate:'下期回款日期',earnShdEarnDate:'下期回款日期',earnShdEarnAmou:'下期回款金额',
                            earnRemittancAmou:'回款金额',earnRealEarnDate:'结清时间',transNo:'债转标项目名称',transApplyTime:'转让申请日期',
                            transStatus:'结果',transFinanced:'当前投资额',transSchedule:'债转投资进度',transPutDate:'转让日期',
                            transferDate:'转让成功日期',transAmt:'转让金额',transFee:'手续费'
                        },
                        {
                            proId:'4',proStatus:'项目状态',shortText:'汇车贷-HCD201704170003',proMoney:'100000.00',proMoneyEnd:'50000.00',
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
            /!*this.setState({
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
            });*!/
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

    }*/
    componentDidMount () {
        this.props.dispatch(memberLoansActions.getData(1));
    }
    repaymentCallback(){
        let {dispatch}=this.props;
        let newState= {
            postResult:0
        };
        dispatch(memberLoansActions.stateModify(newState));
        dispatch(memberLoansActions.toggleModal('modalRepaymentApp',false,''));
        dispatch(memberLoansActions.filter(3));
    }
    render(){
        console.log('-------myLoans--------');
        console.log(this.props);
        let {dispatch}=this.props;
        let {myLoans}=this.props.memberLoans;
        let {myList,charts,status,modalRepaymentApp,currentId}=myLoans;
        let tHead=[];
        tHead[0]=<tr><th>项目名称</th><th>项目类型</th><th>借款金额(元)</th><th>借款年利率(%)</th><th>借款期限</th><th>还款方式</th><th>申请日期</th><th>状态</th></tr>;
        tHead[1]=<tr><th>项目名称</th><th>借款总额(元)</th><th>借款期限</th><th>发布日期</th><th>当前投资金额(元)</th><th>投资进度(%)</th><th>募集结束日期</th><th>状态</th></tr>;
        tHead[2]=<tr><th>项目名称</th><th>借款总额(元)</th><th>借款期限</th><th>放款日期</th><th>下期还款日期</th><th>下期还款金额(元)</th><th>操作</th></tr>;
        tHead[3]=<tr><th>项目名称</th><th>借款金额(元)</th><th>借款期限</th><th>放款日期</th><th>还款本金(元)</th><th>还款利息(元)</th><th>逾期罚金(元)</th><th>逾期罚息(元)</th><th>结清日期</th><th>操作</th></tr>;
        return(
            <div className="member__main">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="我的借款" className="chart">
                            <Tab>
                                <div name="借款总额">
                                    {(JSON.stringify(charts.data)=='{}')?(<p>{charts.message}</p>)
                                        :(<PieChart
                                            data={charts.data.totalLoan.data}
                                            style={{height: '300px', width: '930px'}}
                                            totalTitle="借款总额"
                                        >
                                        </PieChart>)
                                    }
                                </div>
                                <div name="累计利息">
                                    {(JSON.stringify(charts.data)=='{}')?(<p>{charts.message}</p>)
                                        :(<PieChart
                                            data={charts.data.accumulatedInterest.data}
                                            style={{height: '300px', width: '930px'}}
                                            totalTitle="累计利息"
                                        >
                                        </PieChart>)
                                    }
                                </div>
                            </Tab>
                        </div>
                    </Tab>
                </div>
                <div className="member__cbox" style={{ padding:'20px 30px' }}>
                    <div className="filter">
                        <div className="filter__outer">
                            <div className="filter__inner">
                                <div className="filter__row">
                                    <div className="filter__cell">
                                        <h5>类型:</h5>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(status===1)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { dispatch(memberLoansActions.filter(1)) } }>申请中</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(status===2)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { dispatch(memberLoansActions.filter(2)) } }>招标中</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(status===3)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { dispatch(memberLoansActions.filter(3)) } }>还款中</p>
                                    </div>
                                    <div className="filter__cell">
                                        <p className={(status===4)?'filter__opt filter__opt--active':'filter__opt'}
                                           onClick={ () => { dispatch(memberLoansActions.filter(4)) } }>已结清</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {(JSON.stringify(myList.data) == '{}') ? (<p>{myList.message}</p>)
                        : (
                            <div className="table__wrapper">
                                <table className={`tableList table${status}`}>
                                    <thead>
                                    {tHead[status - 1]}
                                    </thead>

                                    {/*数据*/}
                                    {(myList.data.total > 0) ? (
                                            <tbody>
                                            {
                                                myList.data.list.map((l, i) => (
                                                    (status === 1) ? (
                                                        <tr key={`row-${i}`}>
                                                            <td>--</td>
                                                            <td>{l.shortText}</td>
                                                            <td>{l.money}</td>
                                                            <td>{l.num}</td>
                                                            <td>{l.num}</td>
                                                            <td>{l.shortText}</td>
                                                            <td>{moment(l.dateTime).format('YYYY-MM-DD')}</td>
                                                            <td>申请中</td>
                                                        </tr>
                                                    ) : ((status === 2) ? (
                                                        <tr key={`row-${i}`}>
                                                            <td><p><a href="#">{l.longText}</a></p></td>
                                                            <td>{l.shortText}</td>
                                                            <td>{l.shortText}</td>
                                                            <td>{moment(l.dateTime).format('YYYY-MM-DD')}</td>
                                                            <td>{l.shortText}</td>
                                                            <td>{l.shortText}</td>
                                                            <td>{moment(l.dateTime).format('YYYY-MM-DD')}</td>
                                                            <td>招标中</td>
                                                        </tr>
                                                    ) : ((status === 3) ? (
                                                        <tr key={`row-${i}`}>
                                                            <td><p><a href="#">{l.longText}</a></p></td>
                                                            <td>{l.money}</td>
                                                            <td>{l.num}</td>
                                                            <td>{moment(l.dateTime).format('YYYY-MM-DD')}</td>
                                                            <td>{moment(l.dateTime).format('YYYY-MM-DD')}</td>
                                                            <td>{l.money}</td>
                                                            <td>
                                                                {
                                                                    l.status=='0'?('提前还款申请中')
                                                                        :(
                                                                            <a onClick={() => dispatch(memberLoansActions.toggleModal('modalRepaymentApp', true, l.proId))}>提前还款</a>
                                                                        )
                                                                }
                                                                <a href="">借款合同</a>
                                                            </td>
                                                        </tr>
                                                    ) : ((status === 4) ? (
                                                        <tr key={`row-${i}`}>
                                                            <td><p><a href="#">{l.longText}</a></p></td>
                                                            <td>{l.shortText}</td>
                                                            <td>{l.shortText}</td>
                                                            <td>{moment(l.dateTime).format('YYYY-MM-DD')}</td>
                                                            <td>{l.shortText}</td>
                                                            <td>{l.shortText}</td>
                                                            <td>{l.shortText}</td>
                                                            <td>{l.shortText}</td>
                                                            <td>{moment(l.dateTime).format('YYYY-MM-DD')}</td>
                                                            <td><a href="">借款合同</a></td>
                                                        </tr>
                                                    ) : (''))))
                                                ))
                                            }
                                            </tbody>)
                                        : (<tbody><p className="noRecord">暂无记录</p></tbody>)
                                    }
                                    {/*/数据*/}
                                </table>
                                <Pagination config = {
                                    {
                                        currentPage:myList.data.pageNum,
                                        pageSize:myList.data.pageSize,
                                        totalPage:Math.ceil(myList.data.total/myList.data.pageSize),
                                        filter:status,
                                        paging:(obj)=>{
                                            dispatch(memberLoansActions.getList(obj.currentPage,obj.pageCount,{status:status}));
                                        }
                                    }
                                } ></Pagination>
                            </div>
                        )
                    }
                </div>
                <Modal
                    title="提前还款申请"
                    wrapClassName="vertical-center-modal"
                    //visible={this.state.modalRepaymentApp}
                    visible={modalRepaymentApp}
                    width="520px"
                    footer={null}
                    //onCancel={() => this.toggleModal(`modalRepaymentApp`,false,'')}
                    onCancel={() => this.repaymentCallback()}
                >
                    {/*{this.state.modalRepaymentApp===true?
                        <ModalRepaymentApp proId={this.state.currentId} />:''
                    }*/}
                    {modalRepaymentApp===true?
                        <ModalRepaymentApp info={
                            {
                                currentId:currentId,
                                callback:(obj)=>{
                                    this.repaymentCallback();
                                }
                            }
                        }
                        />:''
                    }
                </Modal>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { auth,memberLoans } = state.toJS();
    return {
        auth,
        memberLoans
    };
}

export default connect(mapStateToProps)(MyLoans);