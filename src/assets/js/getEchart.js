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
            formatter: function (name) {
                return name;
            }
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
                data:json  //数据
            }
        ]
    }
}

/*export  function getEchartPie(json){
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
            formatter:function(a){
                var relVal = a+"元";
                /!*var relVal = "";
                relVal += a[1]+":";
                relVal += a[2].toFixed(2)+"元 ";
                relVal += a[3]+"%";*!/
                return relVal;
            },  //格式化显示的数据，小数点后两位
            data:json.series_data.data  //数据

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
                data:json.series_data.data  //数据
            }
        ]
    }
}*/

export  function getEchartLine(json) {
    return {
        title : {
            show:false,
            text: '',
            subtext: ''
        },
        tooltip : {
            show:true,
            trigger: 'axis',
            formatter: "{b} : {c}元"
        },
        legend: {
            show:false,
            data:json.legend.data  //统计项目
        },
        toolbox: {
            show : false,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : false,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : json.xAxis_data   //横轴标尺
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    formatter: '{value} 元'
                }
            }
        ],
        series : json.series_data   //数据
    }
}

export  function getEchartBar(json) {
    return{
        title : {
            show:false,
            text: '',  //标题
            subtext: ''//副标题
        },

        tooltip : {
            show:false,
            trigger: 'axis',
            //formatter: "{b} : {c}元"
        },
        legend: {
            show:false,
            data:json.legend.data  //统计项目
        },
        toolbox: {
            show : false,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : false,
        xAxis : [
            {
                type : 'category',
                data : json.xAxis_data   //横轴标尺
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : json.series_data   //数据
    }
}