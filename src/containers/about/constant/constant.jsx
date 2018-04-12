import React, { Component } from 'react';
import './constant.less';
import { connect } from 'react-redux';


import fetch from 'isomorphic-fetch';
import { 
    actionTest,
    actionUpdateLoanMoney,
    actionUpdateLoanCount,
    actionUpdateLoanMemberCount,
    actionUpdateInvestInfo
} from '../../../actions/constant';


import ReactEcharts from 'echarts-for-react';
import {getEchartLine,getEchartBar} from '../../../assets/js/getEchart';
import PieChart from '../../../components/charts/pie';
import BarChart from '../../../components/charts/bar';
import {addCommas} from '../../../assets/js/cost';





class constantTable extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data: null
        }
    }

    handleSelect (e) {
        const year = e.target.value;
        const { dispatch } = this.props;
        let id = e.target.getAttribute('id');
        switch (id) {
            case 'loanMoney': 
                dispatch(actionUpdateLoanMoney(year));
                return;
            case 'loanCount': 
                dispatch(actionUpdateLoanCount(year));
                console.log(2);
                return;
            case 'loanMemberCount': 
                dispatch(actionUpdateLoanMemberCount(year));
                console.log(3);
                return;
            case 'investValue': 
                dispatch(actionUpdateInvestInfo(year));
                console.log(4);
                return;
        }
    }

    componentDidMount () {
        this.props.dispatch(actionTest());
        console.log(this.props);
    }

    render () {
        const { constantData } = this.props;
        console.log(constantData);
        //柱状图数据
        /*let loanMoneyData = {
            xAxis_data:['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            legend:{data:['']},
            series_data:[
                {
                    name:"",
                    type:'bar',
                    barWidth:30,
                    itemStyle:{
                        normal:{
                            color:'#668bc1',  //柱体颜色
                            label: {
                                show:true,
                                formatter: "{c}万",
                                position:'top'
                            }
                        }
                    },
                    data:constantData.borrowInfo.loanMoney
                }
            ]
        }
        let loanCountData = {
            xAxis_data:['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            legend:{data:['']},
            series_data:[
                {
                    name:"",
                    type:'bar',
                    barWidth:30,
                    /!*itemStyle:{
                        normal:{
                            color:'#668bc1',  //柱体颜色
                            label: {
                                show:true,
                                formatter: "{c}笔",
                                position:'top'
                            }
                        }
                    },*!/
                    data:constantData.borrowInfo.loanCount
                }
            ]
        }
        let loanMemberCountData = {
            xAxis_data:['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            legend:{data:['']},
            series_data:[
                {
                    name:"",
                    type:'bar',
                    barWidth:40,
                    /!*itemStyle:{
                        normal:{
                            color:'#668bc1',  //柱体颜色
                            label: {
                                show:true,
                                formatter: "{c}笔",
                                position:'top'
                            }
                        }
                    },*!/
                    data:constantData.borrowInfo.loanMemberCount
                }
            ]
        }
        let investValueData =  {
            xAxis_data:['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            legend:{data:['']},
            series_data:[
                {
                    name:"",
                    type:'bar',
                    barWidth:40,
                    /!*itemStyle:{
                        normal:{
                            color:'#668bc1',  //柱体颜色
                            label: {
                                show:true,
                                formatter: "{c}笔",
                                position:'top'
                            }
                        }
                    },*!/
                    data:constantData.investInfo.investValue
                }
            ]
        }*/

        /*饼图数据*/
        const { sexDistribute } = constantData.investInfo;
        const { ageDistribute } = constantData.investInfo;
        let sexData = [
            {
                name:`男`,
                value: sexDistribute[0],
            },
            {
                name:'女',
                value: sexDistribute[1],
            },
        ];
        let ageData = [
            {
                name:`25以下`,
                value: ageDistribute[0],
            },
            {
                name:'25~35',
                value: ageDistribute[1],
            },
            {
                name:`35~50`,
                value: ageDistribute[2],
            },
            {
                name:'50以上',
                value: ageDistribute[3],
            },
        ]

        return(
            <div>

                <div className="title__list">
                    <div className="content">
                        <div className="viewBlock platformInfo">
                            <div className="viewTitle">
                                <h3>平台运营情况</h3>
                            </div>
                            <div className="platformDetails">
                                <div className="detailLine">
                                    <div className="detailCell">
                                        <p>累计撮合交易额（元）</p>
                                        <h3>{constantData.totalData.detailAmountSum}</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>累计撮合交易笔数</p>
                                        <h3>{constantData.totalData.detailCount }</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>累计为用户赚取（元）</p>
                                        <h3>{constantData.totalData.earnAmountSum}</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>累计服务用户数</p>
                                        <h3>{constantData.totalData.memberCount}</h3>
                                    </div>
                                </div>
                                <div className="detailLine">
                                    <div className="detailCell">
                                        <p>借贷剩余金额（元）</p>
                                        <h3>{constantData.totalData.surplusRpmtAmountSum}</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>借贷剩余笔数</p>
                                        <h3>{constantData.totalData.surplusRpmtCount}</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>逾期金额（元）</p>
                                        <h3>{constantData.totalData.lateRpmtAmountSum}</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>逾期笔数</p>
                                        <h3>{constantData.totalData.lateRpmtCount}</h3>
                                    </div>
                                </div>
                                <div className="detailLine">
                                    <div className="detailCell">
                                        <p>累计借款人数</p>
                                        <h3>{constantData.totalData.rpmtCount}</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>当前借款人数</p>
                                        <h3>{constantData.totalData.nowRpmtCount}</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>累计出借人数</p>
                                        <h3>{constantData.totalData.earnCount}</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>当前出借人数</p>
                                        <h3>{constantData.totalData.nowEarnCount}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="viewBlock borrowInfo">
                            <div className="viewTitle">
                                <h3>借款情况</h3>
                            </div>
                            <div className="borrowDetails">
                                <div className="borrowLine">
                                    <h4>借款金额</h4>
                                    <div className="form">
                                        {/*<ReactEcharts
                                            option={getEchartBar(loanMoneyData)}
                                            style={{height: '300px', width: '100%'}}
                                            opts={{renderer: 'svg'}}
                                            className='react_for_echarts'
                                        />*/}

                                        <BarChart
                                            data={{
                                                xAxis_data:['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                                                series_data:[{data:constantData.borrowInfo.loanMoney}]
                                            }}
                                            style={{height: '300px', width: '100%'}}
                                        >
                                        </BarChart>
                                    </div>
                                    <select name="" id="loanMoney" onChange={this.handleSelect.bind(this)} defaultValue="2018">
                                        <option value="2016">2016</option>
                                        <option value="2017">2017</option>
                                        <option value="2018">2018</option>
                                    </select>
                                </div>
                                <div className="borrowLine">
                                    <h4>借款笔数</h4>
                                    <div className="form">
                                        {/*<ReactEcharts
                                            option={getEchartBar(loanCountData)}
                                            style={{height: '300px', width: '100%'}}
                                            opts={{renderer: 'svg'}}
                                            className='react_for_echarts'
                                        />*/}
                                        <BarChart
                                            data={{
                                                xAxis_data:['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                                                series_data:[{data:constantData.borrowInfo.loanCount}]

                                            }}
                                            style={{height: '300px', width: '100%'}}
                                        >
                                        </BarChart>
                                    </div>
                                    <select name="" id="loanCount" onChange={this.handleSelect.bind(this)} defaultValue="2018">
                                        <option value="2016">2016</option>
                                        <option value="2017">2017</option>
                                        <option value="2018">2018</option>
                                    </select>
                                </div>
                                <div className="borrowLine">
                                    <h4>借款人数</h4>
                                    <div className="form">
                                        {/*<ReactEcharts
                                            option={getEchartBar(loanMemberCountData)}
                                            style={{height: '300px', width: '100%'}}
                                            opts={{renderer: 'svg'}}
                                            className='react_for_echarts'
                                        />*/}
                                        <BarChart
                                            data={{
                                                xAxis_data:['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                                                series_data:[{data:constantData.borrowInfo.loanMemberCount}]

                                            }}
                                            style={{height: '300px', width: '100%'}}
                                        >
                                        </BarChart>
                                    </div>
                                    <select name="" id="loanMemberCount" onChange={this.handleSelect.bind(this)} defaultValue="2018">
                                        <option value="2016">2016</option>
                                        <option value="2017">2017</option>
                                        <option value="2018">2018</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="viewBlock investInfo">
                            <div className="viewTitle">
                                <h3>投资情况</h3>
                            </div>
                            <div className="investDetails">
                                <div className="investLine">
                                    <h4>出借人数</h4>
                                    <div className="form">
                                        {/*<ReactEcharts
                                            option={getEchartBar(investValueData)}
                                            style={{height: '300px', width: '100%'}}
                                            opts={{renderer: 'svg'}}
                                            className='react_for_echarts'
                                        />*/}
                                        <BarChart
                                            data={{
                                                xAxis_data:['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                                                series_data:[{data:constantData.investInfo.investValue}]

                                            }}
                                            style={{height: '300px', width: '100%'}}
                                        >
                                        </BarChart>
                                    </div>
                                    <select name="" id="investValue" onChange={this.handleSelect.bind(this)} defaultValue="2018">
                                        <option value="2016">2016</option>
                                        <option value="2017">2017</option>
                                        <option value="2018">2018</option>
                                    </select>
                                </div>
                                <div className="investLine">
                                    <div className="pieChartCell">
                                        <h4>性别分布</h4>
                                        <div className="pieChart">
                                            <PieChart
                                                data={sexData}
                                                style={{height: '240px', width: '404px'}}
                                                //totalTitle="说明"
                                                showUserLegend='false'
                                                showLegend='false'
                                                unit='人'
                                                labelLine='false'
                                                /* color={['#e32323', '#498911']} */
                                            />
                                        </div>
                                    </div>
                                    <div className="pieChartCell">
                                        <h4>年龄分布</h4>
                                        <div className="pieChart">
                                            <PieChart
                                                data={ageData}
                                                style={{height: '240px', width: '404px'}}
                                                showUserLegend='false'
                                                showLegend='false'
                                                unit='人'
                                                labelLine='false'
                                            />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
    



function mapStateToProps (state) {
    console.log(state.toJS());
    return {
        constantData: state.toJS().constantReducer
    }
}

constantTable = connect(mapStateToProps)(constantTable);

export default constantTable;




