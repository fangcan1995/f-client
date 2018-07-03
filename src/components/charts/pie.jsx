import React,{ Component } from "react";
import ReactEcharts from 'echarts-for-react';
import {getEchartPie} from '../../utils/getEchart';
import {toMoney,toNumber,addCommas} from '../../utils/famatData';
import './pie.less';
import { Tooltip } from 'antd';
export default class PieChart extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        let {data,style,showLegend,totalTitle,color,showUserLegend,unit,labelLine}=this.props;
        if(!color){
            color=['#79b9e8', '#f69494','#72c59e','#f6ba7b','#8b9dbc'];
        }
        (!showLegend)?showLegend=false:showLegend=true;
        let total=0;
        if(data){
            data.forEach((key) => {
                total+=parseFloat(key.value);
            });
        }

        if(!showUserLegend){
            showUserLegend=true;
        }else{
            if(showUserLegend==='false'){
                showUserLegend=false;
            }else{
                showUserLegend=true;
            }
        }
        if(!unit){
            unit='元'
        }
        if(!labelLine){
            labelLine=false
        }else{
            if(labelLine==='false'){
                labelLine=false;
            }else{
                labelLine=true;
            }
        }

        return(
            <div className="peiChart">
                {showUserLegend?
                    <div className="pei__legend">
                        <h3 className="pei__title"><strong>{totalTitle}</strong><br/><span className='money'>{addCommas(total)}</span>{unit}</h3>
                        <ul>
                            {
                                data.map((item, rowIndex) => (
                                    <li key={`row-${rowIndex}`}>
                                        <i style={{backgroundColor:`${color[rowIndex]}`}}></i>
                                        <strong>{item.name}:</strong>
                                        <span className='money'>{item.instruction}</span>
                                        {item.readMe?
                                        <Tooltip
                                            placement="topLeft"
                                            title={item.readMe}
                                            arrowPointAtCenter overlayClassName='myTooltip'
                                        >
                                            <span style={{cursor:'default'}} className='readme'>?</span>
                                        </Tooltip>
                                            :``
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    :''}

                <ReactEcharts
                    option={getEchartPie(data, color,showLegend,unit,labelLine)}
                    style={style}
                    opts={{renderer: 'svg'}}
                    className='react_for_echarts'
                />
            </div>
        )
    }
}