import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import {getEchartPie,getEchartLine,getEchartBar} from '../../../../assets/js/getEchart';
import './account-overview.less';
/*import Crumbs from '../../../../components/crumbs/crumbs.jsx';*/
//折线图数据
let data_Chart1={
    xAxis_data:['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    legend:{data:['累计收益1','累计收益2']},
    series_data:[
        {
            name:"累计收益1",
            type:'line',
            data:[5.6, 4.9, 89, 23.2, 25.6, 76.7, 6.6, 162.2, 32.6, 20, 5.4, 3.3]
        }
    ]
};
//柱状图数据
let data_Chart2={
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
            data:[5.6, 4.9, 89, 23.2, 25.6, 76.7, 6.6, 162.2, 32.6, 20, 5.4, 3.3]
        }
    ]
};
/*饼图数据*/
let data_Chart3=[
        {name:'图例1',value:10000.00 },
        {name:'图例2',value:500.00 },
];
export default ({ location, match, history }) => {
  return (
    <div className="member__main">
        <div className="crumb">
            <div>
                <b>您所在的位置：</b>
                <a href="">首页</a>&nbsp;&gt;
                <a href="" className="actice">我的账户</a>
            </div>
        </div>
        <a className="adver" href=""></a>

        <div className="accountDetails">
            <div className="accountInfo">
                <div className="infoLine">
                    <div>账户余额: <span>0.00</span>&nbsp;元<em>?</em></div>
                    <div>账户余额: <span>0.00</span>&nbsp;元<em>?</em></div>
                </div>
                <div className="infoLine">
                    <div>账户余额: <span>0.00</span>&nbsp;元<em>?</em></div>
                    <div>账户余额: <span>0.00</span>&nbsp;元<em>?</em></div>
                </div>
            </div>
            <div className="accountRedbag">
                <i className="iconfont icon-hongbao"></i>
                <div className="numInfo">
                    <div className="topM">可用红包</div>
                    <div><span>1</span>个</div>
                </div>
                <div className="accountControl">
                    <a className="topF" href="">立即使用</a>
                    <a href="">查看明细</a>
                </div>
            </div>
            <div className="accountInterests">
                <i className="iconfont icon-icongao"></i>
                <div className="numInfo">
                    <div className="topM">加息券</div>
                    <div><span>0</span>个</div>
                </div>
                <div className="accountControl">
                    <a className="topF" href="">立即使用</a>
                    <a href="">查看明细</a>
                </div>
            </div>
        </div>

        <div className="accountTotal">
            <div className="blockTitle">
              <h3 className="blockTitle__name">账户总资产</h3>
            </div>
            <div className="blockContent">
                <div className="contentLeft">
                    <div className="totalInfo">
                        <div className="totalInfo__details">
                            <span className="details__color details__color--blue"></span>
                            <span className="detials__name">散标资产</span>：
                            <span className="details__number">2854.00<em>元</em></span>
                        </div>
                        <div className="totalInfo__details">
                            <span className="details__color details__color--green"></span>
                            <span className="detials__name">可用余额</span>：
                            <span className="details__number">12653.00<em>元</em></span>
                        </div>
                        <div className="totalInfo__details">
                            <span className="details__color details__color--gray"></span>
                            <span className="detials__name">冻结金额</span>：
                            <span className="details__number">1256.00<em>元</em></span>
                        </div>
                        <button className="totalInfo__button">赚取收益</button>
                    </div>
                </div>
                <div className="contentRight"></div>
            </div>
        </div>

        <div className="incomeState">
            <div className="blockTitle">
                <h3 className="blockTitle__name">收益情况</h3>
            </div>
            <div className="incomeContent">
                <div className="incomeButtonLine">
                    <div className="incomeButton">
                        <button className="incomeButton__button incomeButton__button--active">累计收益</button>
                        <button className="incomeButton__button">每日收益</button>
                    </div>
                </div>
                <div className="incomeForm"></div>
            </div>
        </div>
        <div className="incomeState">
            <ReactEcharts
                option={getEchartLine(data_Chart1)}
                style={{height: '300px', width: '100%'}}
                opts={{renderer: 'svg'}}
                className='react_for_echarts'
            />
            <ReactEcharts
                option={getEchartBar(data_Chart2)}
                style={{height: '300px', width: '100%'}}
                opts={{renderer: 'svg'}}
                className='react_for_echarts'
            />
            <ReactEcharts
                option={getEchartPie(data_Chart3)}
                style={{height: '300px', width: '100%'}}
                opts={{renderer: 'svg'}}
                className='react_for_echarts'
            />
        </div>
    </div>
    );
};
