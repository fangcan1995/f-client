import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from '../../../components/pagination/pagination';
import Crumbs from '../../../components/crumbs/crumbs';
import Tab from '../../../components/tab/tab';
import { Route, Link } from 'react-router-dom';
import { articalListAction } from '../../../actions/about';


/* const setTitle = (typeText) => {
    switch (typeText) {
        case 'mediaCompany':
            return '公司动态';
        case 'mediaReport':
            return '媒体报道';
        case 'mediaIndustry':
            return '行业新闻';
        case 'notice':
            return '网站公告';
        case 'report':
            return '运营报告';
        case 'laws':
            return '相关规则';
        case 'activeNotice':
            return '活动公告';
        case 'questions':
            return '常见问题';
        case '56':
            return '风控流程';
        case '57':
            return '风险提示';
        case '58':
            return '风险教育';
    }
} */


/* const articalList = (props) => {
    console.log(props);
    const { dispatch, aboutContent } = props;
    return (
        <div>
            123123123213423
            {<Pagination config={
                {
                    currentPage: aboutContent.pageInfo.pageNum,
                    pageSize: aboutContent.pageInfo.pageSize,
                    totalPage: aboutContent.pageInfo.pages,
                    paging: (obj) => {
                        console.log(obj);
                        dispatch(articalListAction(obj.currentPage,obj.pageCount))
                        //this.loadData(obj.currentPage,obj.pageCount);
                    }
                }
            } ></Pagination>}
        </div>
    );

} */





class articalList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            typeTitle: ''
        }
    }

    render() {

        //数据
        console.log(this.props);
        const { list } = this.props.data;

        const listData = list ? list : [];

        //路由
        const { match } = this.props;
        const urlToArray = match.url.split('/');
        const typeText = urlToArray[urlToArray.length - 1];
        //const typeTitle = setTitle(typeText);


        return (
            <ul className="list">
                {
                    listData.map((item, i) => {
                        return (
                            <li key={i}>
                                <Link to="/">{item.title}</Link>
                                <span>{item.updateTime.split(' ')[0]}</span>
                            </li>
                        );
                    })
                }
                {/* <li><a href="#" target="_blank">聚焦智能金融巴巴汇金服获中国金融服务行业十大领先品牌聚焦智能金融巴巴汇金服获中国金融服务行业十大领先品牌聚焦智能金融巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-12-8</span></li>
                                <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
                                <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
                                <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
                                <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
                                <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
                                <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
                                <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
                                <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
            <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li> */}
            </ul>

        )
    }
}


export default articalList;