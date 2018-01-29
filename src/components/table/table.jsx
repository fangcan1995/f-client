import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '../pagination/pagination';
import moment from "moment";
import './table.less';
class Table extends React.Component{
    constructor(props){
        super(props);
        const { config } = this.props;
        this.config=config;
        this.columnOpts=config.columnOpts;
        this.state={
            dataSetting:{}
        }
    }
    //装载完成后获取数据
    //获取数据
    loadData(currentPage=1,pageSize=10,filter){
        let conditions = "";
        if(filter){
            for(var item in filter){
                conditions += "&"+item+"="+filter[item];
            }
        }
        let url = `${this.props.source}?pageNum=${currentPage}&pageSize=${pageSize}${conditions}`;
        fetch(url,{
            method:"get"
        })
            .then(function (response){
                if (response.status == 200){
                    return response;
                }
            })
            .then((data) => data.json())
            .then((data) => {
                    this.setState({ dataSetting:data.data });
                }
            )
            .catch(function(err){
                console.log("Fetch错误:"+err);

            });
        let mockDate={
            code: "0",
            data:{
                list:[
                    {id:1,col1:'aaabbb',col2:'2017-12-18 16:00:00',col3:'2017-12-18 16:00:00',col4:'3',col5:''},
                    {id:1,col1:'ccc',col2:'汇车贷-HCD20180116005',col3:'200000.00',col4:'3',col5:''},
                    {id:1,col1:'ddd',col2:'汇车贷-HCD20180116005',col3:'200000.00',col4:'3',col5:''},
                    {id:1,col1:50,col2:'汇车贷-HCD20180116005',col3:'200000.00',col4:'3',col5:''},
                    {id:1,col1:50,col2:'汇车贷-HCD20180116005',col3:'200000.00',col4:'3',col5:''},
                    {id:1,col1:50,col2:'汇车贷-HCD20180116005',col3:'200000.00',col4:'3',col5:''},
                    {id:1,col1:50,col2:'汇车贷-HCD20180116005',col3:'200000.00',col4:'3',col5:''},
                    {id:1,col1:50,col2:'汇车贷-HCD20180116005',col3:'200000.00',col4:'3',col5:''},
                    {id:1,col1:50,col2:'汇车贷-HCD20180116005',col3:'200000.00',col4:'3',col5:''},
                    {id:1,col1:50,col2:'汇车贷-HCD20180116005',col3:'200000.00',col4:'3',col5:''},
                ],
                pageNum: 1,
                pageSize: 10,
                total:13
            },
            message: "SUCCESS",
            time: "2018-01-17 11:49:39"
        }
        this.setState({
            dataSetting:mockDate.data
        });
        console.log(this.state);
        /*let data=[];
        let dataPart={};
        this.columnOpts.map((opt, colIndex) => {
                //Object.assign(dataPart,{[opt.key]:opt.name});
                switch (opt.type) {
                    case 'date':
                        Object.assign(dataPart,{[opt.key]:'2017-12-12'});
                        break;
                    case 'date-time':
                        Object.assign(dataPart,{[opt.key]:'2017-12-12 18:00:00'});
                        break;
                    case 'money':
                        Object.assign(dataPart,{[opt.key]:'10,000.00'});
                        break;
                    case 'tradeType':
                        var tradeType = ['充值','提现','投资'];
                        Object.assign(dataPart,{[opt.key]:tradeType[Math.floor(Math.random()*(tradeType.length+1))]});
                        break;
                    default:
                        Object.assign(dataPart,{[opt.key]:opt.name});
                        break;
                }
            }
        );
        for(let i=1;i<=pageSize;i++){
            let target = {key:`${pageSize*(currentPage-1)+i}`};
            data.push(
                Object.assign(target,dataPart)
            )
        };*/
        /*let dataSetting={
            data:data,
            currentPage: currentPage, // 当前页数
            totalCount: 80, // 总条数
            pageSize:pageSize,//每页记录数
        }
        this.setState({
            dataSetting:dataSetting
        });*/

    }
    componentDidMount () {
        this.loadData();
    }
    render(){
        const columnOpts=this.columnOpts;
        const {list,pageNum,total,pageSize}=this.state.dataSetting;
        const totalPage=Math.ceil(total/pageSize);

        if(JSON.stringify(this.state.dataSetting) == "{}"){
            return(
                <div>loading</div>
            )
        }else if(list.length>0){
            return(
                <div>
                    <table  className="tableList">
                        <thead>
                        <tr>
                            {
                                columnOpts.map((opt, colIndex) => (
                                    <th key={`col-${colIndex}`}>{opt.name}</th>
                                ))
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            list.map((entry, rowIndex) => (
                                    <tr key={`row-${rowIndex}`}>
                                        {
                                            columnOpts.map((opt, colIndex) => (
                                                <td key={`col-${colIndex}`} className={`type-${opt.type}`}
                                                >
                                                    {opt.type=='date'? moment(entry[opt.key]).format('YYYY-MM-DD')
                                                         :entry[opt.key]}
                                                </td>
                                            ))
                                        }
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                    {
                        this.config.showPager?
                            <Pagination config = {
                                {
                                    currentPage:pageNum,
                                    pageSize:pageSize,
                                    totalPage:totalPage,
                                    paging:(obj)=>{
                                        this.loadData(obj.currentPage,obj.pageCount);
                                    }
                                }
                            } ></Pagination>
                            :''
                    }
                </div>
            )
        } else{
            return(
                <div>暂无记录</div>
            )
        }

    }


}
export default Table;