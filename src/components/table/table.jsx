import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '../pagination/pagination'
import jQuery from 'jquery';
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
    loadData(currentPage=1,pageSize=10){

        console.log('后台获取第'+currentPage+'页数据，每页'+pageSize+'条');
        jQuery.ajax({
            url:`${this.props.source}/currentPage/${currentPage}/pageSize/${pageSize}`,
            type:'GET',
            data:{},
            dataType:'json',
            cache: false
        }).done(function (data){
            if(data){
                console.log('成功');
            }
            else{
                console.log('错误');
            }
        }).catch(()=>{
            //以下是获取假数据
            console.log('数据获取失败，使用假数据');
            let data=[];
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
            };
            let dataSetting={
                data:data,
                currentPage: currentPage, // 当前页数
                totalCount: 80, // 总条数
                pageSize:pageSize,//每页记录数
            }
            this.setState({
                dataSetting:dataSetting
            });
        })
    }
    componentDidMount () {
        //var dataSetting={};

        this.loadData();
    }
    render(){
        const columnOpts=this.columnOpts;
        const data=this.state.dataSetting.data;
        const currentPage=this.state.dataSetting.currentPage;
        const totalCount=this.state.dataSetting.totalCount;
        const pageSize=this.state.dataSetting.pageSize;
        const totalPage=Math.ceil(totalCount/pageSize);
        if(!this.state.dataSetting.data){
            return(
                <div>loading</div>
            )
        }else if(this.state.dataSetting.data.length>0){
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
                            data.map((entry, rowIndex) => (
                                    <tr key={`row-${rowIndex}`}>
                                        {
                                            columnOpts.map((opt, colIndex) => (
                                                <td key={`col-${colIndex}`}>{entry[opt.key]}</td>
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
                                    currentPage:this.state.dataSetting.currentPage,
                                    pageSize:this.state.dataSetting.pageSize,
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