export  function getEchartPie(json){
    return{
        color:['#79b9e8', '#f69494','#72c59e','#f6ba7b','#8b9dbc'],
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c}元 ({d}%)"
        },
        legend: {
            show:true,
            orient : 'vertical',
            x : 'left',
            textStyle:{
                fontSize : '14'
            },
            padding:20,
            itemGap:20,
            selectedMode:false,
            //data:['招标中','回款中','已回款','已转出',]
            data:json.legend.data  //数据

        },
        series: [
            {
                name:'数据统计',
                type:'pie',
                radius: ['50%', '68%'],
                itemStyle : {
                    normal : {
                        label : {
                            show : true,
                            formatter: "{b}",
                            //formatter: "{b} : {c}元 ({d}%)",
                            textStyle : {
                                fontSize : '14',

                            }
                        },
                        labelLine : {
                            show : true
                        }
                    },
                    emphasis : {
                        label : {
                            show : false,
                            position : 'center',
                            textStyle : {
                                fontSize : '30',
                                fontWeight : 'bold'
                            }
                        }
                    }
                },
                avoidLabelOverlap: false,
                itemStyle : {
                    normal : {
                        label : {
                            show : true,
                            formatter: "{b}",
                            //formatter: "{b} : {c}元 ({d}%)",
                            textStyle : {
                                fontSize : '14',

                            }
                        },
                        labelLine : {
                            show : true
                        }
                    },
                    emphasis : {
                        label : {
                            show : false,
                            position : 'center',
                            textStyle : {
                                fontSize : '30',
                                fontWeight : 'bold'
                            }
                        }
                    }
                },
                /*data:[
                    {value:335.00, name:'招标中'},
                    {value:310.45, name:'回款中'},
                    {value:234, name:'已回款'},
                    {value:135, name:'已转出'}
                ]*/
                data:json.series_data.data  //数据
            }
        ]
    }
}

export  function getEchartLine(json) {
    return {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
        }]
    }
}

export  function getEchartBar(json) {
    return{
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                data:[10, 52, 200, 334, 390, 330, 220]
            }
        ]
    }
}