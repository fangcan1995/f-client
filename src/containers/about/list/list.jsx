import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from '../../../components/pagination/pagination';
import Crumbs from '../../../components/crumbs/crumbs';
import Tab from '../../../components/tab/tab';
import { Route, Link } from 'react-router-dom';
import { articalListAction } from '../../../actions/about';


const setTitle = (typeText) => {
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
}


class articalList extends Component {

    constructor (props) {
        super(props);
        this.state = {
            typeTitle: ''
        }
    }

    componentDidMount () {
        const { dispatch, match } = this.props;
        dispatch(articalListAction());

    }

    render () {

        //数据
        console.log(this.props.aboutData);
        const { list } = this.props.aboutData.pageInfo;
        const { pageInfo } = this.props.aboutData;
        console.log(pageInfo);

        const listData = list ? list : [];
        console.log(list);

        //路由
        const { match } = this.props;
        const urlToArray = match.url.split('/');
        const typeText = urlToArray[urlToArray.length -1];
        const typeTitle = setTitle(typeText);
        

        return(
            <div>
                <Crumbs />
                <div className="about__box">
                    <Tab>
                        <div name={typeTitle}>
                            <ul className="list">
                                {
                                    listData.map((item, i) => {
                                        return (
                                            <li key={i}>
                                                <Link to="/">{item.affContent}</Link>
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
                            <Pagination config = {
                                {
                                    currentPage: pageInfo.pageNum,
                                    pageSize: pageInfo.pageSize,
                                    totalPage: pageInfo.pages,
                                    paging:(obj)=>{
                                        this.loadData(obj.currentPage,obj.pageCount);
                                    }
                                }
                            } ></Pagination>
                        </div>
                    </Tab>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    console.log(state.toJS());
    console.log(state.toJS().aboutReducer);
    return {
        aboutData: state.toJS().aboutReducer
    }
}

articalList = connect(mapStateToProps)(articalList);

export default articalList;

