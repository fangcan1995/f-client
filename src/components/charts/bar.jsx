import React,{ Component } from "react";
import ReactEcharts from 'echarts-for-react';

export default class BarChart extends Component{
    render(){
        let {data,style,color,unit}=this.props;
        if(!color){
            color=['#79b9e8', '#f69494','#72c59e','#f6ba7b','#8b9dbc'];
        }
        if(!unit){
            unit='元'
        }
        let opts=[];
        for (var key in data.series_data) {
            let opt={
                name:'',
                type:'bar',
                barWidth:30,
                data:data.series_data[key].data,
                itemStyle:{
                    normal:{
                        color:color[key],  //柱体颜色
                        label: {
                            show:false,
                            position:'top',
                            formatter: "{c}"+unit
                        }
                    }
                },

            }
            opts.push(opt);
        }
        let option = {
            title : {
                show:false,
                text: '',
                subtext: ''
            },
            tooltip : {
                show:true,
                trigger: 'axis',
                formatter: "{b} : {c}" + unit
            },
            legend: {
                show:false,
                data:[]
            },
            toolbox: {
                show : false,
            },
            calculable : false,
            xAxis : [
                {
                    type : 'category',
                    data : data.xAxis_data   //横轴
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLabel : {
                        formatter: '{value}'+unit
                    }
                }
            ],
            series :opts
        };
        return(
            <ReactEcharts
                option={option}
                style={style}
                opts={{renderer: 'svg'}}
                className='react_for_echarts'
            />
        )
    }
}