import React from 'react';
import Pagination from '../../../components/pagination/pagination';
import Crumbs from '../../../components/crumbs/crumbs';
import Tab from '../../../components/tab/tab';
export default ({ location, match, history }) => {
    return(
        <div>
            <Crumbs/>
            <div className="about__box">
                <Tab>
                    <div name="媒体报道">
                        <ul className="list">
                            <li><a href="#" target="_blank">聚焦智能金融巴巴汇金服获中国金融服务行业十大领先品牌聚焦智能金融巴巴汇金服获中国金融服务行业十大领先品牌聚焦智能金融巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-12-8</span></li>
                            <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
                            <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
                            <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
                            <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
                            <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
                            <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
                            <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
                            <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
                            <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
                        </ul>
                        <Pagination config = {
                            {
                                currentPage:1,
                                pageSize:10,
                                totalPage:25,
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