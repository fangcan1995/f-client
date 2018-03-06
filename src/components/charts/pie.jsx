import React,{ Component } from "react";
import ReactEcharts from 'echarts-for-react';
import {getEchartPie} from '../../assets/js/getEchart';
import {addCommas} from '../../assets/js/cost';
import './pie.less';
export default class PieChart extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        let {data,style,showLegend,totalTitle,color,showUserLegend,unit}=this.props;

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

        return(
            <div className="peiChart">
                {showUserLegend?
                    <div className="pei__legend">
                        <h3 className="pei__title"><strong>{totalTitle}</strong><br/>{addCommas(total)}元</h3>
                        <ul>
                            {
                                data.map((item, rowIndex) => (
                                    <li key={`row-${rowIndex}`}><i style={{backgroundColor:`${color[rowIndex]}`}}></i><strong>{item.name}:</strong>{item.instruction}</li>
                                ))
                            }
                        </ul>
                    </div>
                    :''}

                <ReactEcharts
                    option={getEchartPie(data, color,showLegend,unit)}
                    style={style}
                    opts={{renderer: 'svg'}}
                    className='react_for_echarts'
                />
            </div>
        )
    }
}