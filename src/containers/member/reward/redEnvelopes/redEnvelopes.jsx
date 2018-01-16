import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '../../../../components/pagination/pagination';
import './redEnvelopes.less';
import jQuery from 'jquery';
import  {getData}  from '../../../../assets/js/getData'

class RedEnvelopes extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dataSetting:{},  //红包数据
            re_status: 0  //默认显示全部红包
        }

    }
    dataSet={
        "url":`http://localhost:9002/members/redEnvelopes`,
        "pageNum":1,
        "pageSize":10,
        "filter":{
            re_status:0,
        }
    };
    filterClassName = (index) => {
        return index === this.state.re_status ? "filter__opt filter__opt--active" : "filter__opt"
    }
    loadData(currentPage,pageSize,filter){

        var jStr = "";
        for(var item in filter){
            jStr += "&"+item+"="+filter[item];
        }
        console.log(jStr);
        jQuery.ajax({
            url:`${this.dataSet.url}?pageNum=${currentPage}&pageSize=${pageSize}${jStr}`,
            type:'GET',
            data:{},
            dataType:'json',
            cache: false
        }).done(function (data){
            if(data){
                console.log('成功');
            } else{
                console.log('错误');
            }
        }).catch(()=>{
            //以下是获取假数据
            console.log('数据获取失败，使用假数据');
            let resource={
                "code": "0",
                "message": "SUCCESS",
                "data": {
                    "pageNum": 1,
                    "pageSize": 10,
                    "total": 23,
                    "list":[
                        { 'col1':'现金红包','col2':'8','col3':'3个月定期产品满1000元可用','col4':'2017.01.22','col5':'2017.02.06'},
                        { 'col1':'现金红包','col2':'100','col3':'3个月定期产品满1000元可用','col4':'2017.01.22','col5':'2017.02.06'}
                    ]
                },
        }
            let data=resource.list;
            let dataSetting={
                data:resource.data.list,
                pageNum: currentPage, // 当前页数
                totalCount: resource.data.total, // 总条数
                pageSize:resource.data.pageSize,//每页记录数
            }
            this.setState({
                dataSetting:dataSetting
            });
        })
    }
    componentDidMount () {
        this.loadData(this.dataSet.pageNum,this.dataSet.pageSize,this.dataSet.filter);
    }
    filter(pram){
        this.setState({ re_status: pram });
        this.loadData(this.dataSet.pageNum,this.dataSet.pageSize,{re_status:pram});
    }
    render(){
        const data=this.state.dataSetting.data;
        const totalCount=this.state.dataSetting.totalCount;
        const pageSize=this.state.dataSetting.pageSize;
        const totalPage=Math.ceil(totalCount/pageSize);
        if(!this.state.dataSetting.data){
            return(
                <div>loading</div>
            )
        }else if(this.state.dataSetting.data.length>0){
            return(
                <div className="member__main">
                    <div className="crumb">
                        <div>
                            <b>您所在的位置：</b>
                            <a href="/">首页</a>&nbsp;&gt;
                            奖励管理&nbsp;&gt;
                            <a  className="actice">我的红包</a>
                        </div>
                    </div>
                    <div className="member__cbox">
                        <div className="tab">
                            <div className="tab_title">
                                <ul>
                                    <li className="on"><h3>我的红包</h3></li>
                                </ul>
                            </div>
                            <div className="tab_content">
                                <div className="filter">
                                    <div className="filter__outer">
                                        <div className="filter__inner">
                                            <div className="filter__row">
                                                <div className="filter__cell">
                                                    <h5>类型:</h5>
                                                </div>
                                                <div className="filter__cell">
                                                    <p className={ this.filterClassName(0) } onClick={ () => { this.filter(0) } }>全部</p>
                                                </div>
                                                <div className="filter__cell">
                                                    <p className={ this.filterClassName(1) } onClick={ () => { this.filter(1) } }>未使用</p>
                                                </div>
                                                <div className="filter__cell">
                                                    <p className={ this.filterClassName(2) } onClick={ () => { this.filter(2) } }>已使用</p>
                                                </div>
                                                <div className="filter__cell">
                                                    <p className={ this.filterClassName(3) } onClick={ () => { this.filter(3) } }>已过期</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ul className="redBagList">
                                {
                                    data.map((entry, rowIndex) => (
                                        <li className="expired" key={`row-${rowIndex}`} >
                                            <div className={`img`}>
                                                <p className="denomination">{entry['col2']}</p>
                                                <p className="remark"></p>
                                            </div>
                                            <div className="txt">
                                                <p><strong>使用规则：</strong>{entry['col3']}</p>
                                                <p><strong>有效期：</strong>{entry['col4']}—{entry['col5']}</p>
                                            </div>
                                        </li>
                                        ))
                                }
                                </ul>


                                        <Pagination config = {
                                            {
                                                currentPage:this.state.dataSetting.pageNum,
                                                pageSize:pageSize,
                                                totalPage:totalPage,
                                                filter:this.state.re_status,
                                                paging:(obj)=>{
                                                    this.loadData(obj.currentPage,obj.pageCount,{re_status:obj.filter});
                                                }
                                            }
                                        } ></Pagination>

                            </div>
                        </div>
                    </div>
                    <div className="member__cbox">
                        <div className="tab m-wxts">
                            <div className="tab_title">
                                <ul>
                                    <li className="on"><h3>温馨提示</h3></li>
                                </ul>
                            </div>
                            <p> 1. 投资时需满足红包使用规则，才可使用；<br/>
                                2. 使用过程遇到问题时，请（工作日9:00-20:00）咨询客服<br/>
                            </p>
                        </div>
                    </div>
                </div>
            )
        } {/*else{
            return(
                <div>暂无记录</div>
            )
        }*/}

    }
}
export default RedEnvelopes;


