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
            reStatus: 0  //默认显示全部红包
        }

    }
    dataSet={
        "url":`http://172.16.1.221:9090/members/memberRedEnvelopes?access_token=af007d4f-0fe7-4781-b0a3-83917b519ca7&reStatus=0`,
        "pageNum":1,
        "pageSize":10,
        "filter":{
            reStatus:0,
        }
    };
    filterClassName = (index) => {
        return index === this.state.reStatus ? "filter__opt filter__opt--active" : "filter__opt"
    }
    loadData(currentPage,pageSize,filter){
        var jStr = "";
        for(var item in filter){
            jStr += "&"+item+"="+filter[item];
        }
        console.log(jStr);
        const _this = this;
        jQuery.ajax({
            url:`${this.dataSet.url}&pageNum=${currentPage}&pageSize=${pageSize}${jStr}`,
            type:'GET',
            data:{},
            dataType:'json',
            cache: false
        }).done(function (data){
            if(data){
                console.log('**************');
                console.log(data.data);
                let dataSetting={
                    data:data.data.list,
                    pageNum: data.data.pageNum, // 当前页数
                    totalCount: data.data.total, // 总条数
                    pageSize:data.data.pageSize,//每页记录数
                }

                _this.setState({
                    dataSetting:dataSetting
                });
            } else{
                console.log('错误');
            }
        }).catch(()=>{
            console.log('服务器连接错误');
            /*//以下是获取假数据
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
            });*/
        })
    }
    componentDidMount () {
        this.loadData(this.dataSet.pageNum,this.dataSet.pageSize,this.dataSet.filter);
    }
    filter(pram){
        this.setState({ reStatus: pram });
        this.loadData(this.dataSet.pageNum,this.dataSet.pageSize,{reStatus:pram});
    }
    render(){
        console.log('--------------------');
        console.log(this.state.dataSetting);
        const {data,pageNum,totalCount,pageSize}=this.state.dataSetting;
        const totalPage=Math.ceil(totalCount/pageSize);
        if(!data){
            return(
                <div>loading</div>
            )
        }else if(data.length>0) {
            return (
                <div className="member__main">
                    <div className="crumb">
                        <div>
                            <b>您所在的位置：</b>
                            <a href="/">首页</a>&nbsp;&gt;
                            奖励管理&nbsp;&gt;
                            <a className="actice">我的红包</a>
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
                                                    <p className={this.filterClassName(0)} onClick={() => {
                                                        this.filter(0)
                                                    }}>全部</p>
                                                </div>
                                                <div className="filter__cell">
                                                    <p className={this.filterClassName(1)} onClick={() => {
                                                        this.filter(1)
                                                    }}>未使用</p>
                                                </div>
                                                <div className="filter__cell">
                                                    <p className={this.filterClassName(2)} onClick={() => {
                                                        this.filter(2)
                                                    }}>已使用</p>
                                                </div>
                                                <div className="filter__cell">
                                                    <p className={this.filterClassName(3)} onClick={() => {
                                                        this.filter(3)
                                                    }}>已过期</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <ul className="redBagList">
                                    {
                                        data.map((entry, rowIndex) => (

                                            <li className={`reStatus-${entry['reStatus']}`} key={`row-${rowIndex}`}>
                                                <div className={`img`}>
                                                    <p className="denomination">{entry['reAmount']}</p>
                                                    <p className="remark"></p>
                                                </div>
                                                <div className="txt">
                                                    <p>
                                                        <strong>使用规则：</strong>{entry['productCategoryName']}满{entry['useMinAmount']}元可用
                                                    </p>
                                                    <p><strong>有效期：</strong>{entry['beginTime']}—{entry['endTime']}</p>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>


                                <Pagination config = {
                                            {
                                                currentPage:pageNum,
                                                pageSize:pageSize,
                                                totalPage:totalPage,
                                                filter:this.state.reStatus,
                                                paging:(obj)=>{
                                                    this.loadData(obj.currentPage,obj.pageCount,{reStatus:obj.filter});
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
        }


    }
}
export default RedEnvelopes;


