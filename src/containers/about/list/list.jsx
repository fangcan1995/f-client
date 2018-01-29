import React from 'react';
import Pagination from '../../../components/pagination/pagination';

export default ({ location, match, history }) => {
    return(

        <div>
            <div className="m-crumb">
                <div>您所在的位置： 栏目标题</div>
            </div>
            <div className="title__list">
                <div className="tab_title">
                    <ul>
                        <li className="on">
                            <h3>媒体报道</h3>
                        </li>
                    </ul>
                </div>
                <div className="tab_content">
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
            </div>
        </div>
    )
}