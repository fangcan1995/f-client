import React from 'react';
import Crumbs from '../../../components/crumbs/crumbs';
import Tab from '../../../components/tab/tab';
import Pagination from '../../../components/pagination/pagination';

export default ({ location, match, history }) => {
    return(
        <div>
            <Crumbs/>
            <div className="about__box">
                <Tab>
                    <div name="荣誉资质">
                        <ul className="imglist">
                            <li>
                                <a href="" target="_blank">
                                    <img src={require('../../../assets/images/about/zs_temp.jpg')} />
                                    <p>巴巴汇获评“3•15诚信品牌企业”</p>
                                </a>
                            </li>
                            <li>
                                <a href="" target="_blank">
                                    <img src={require('../../../assets/images/about/zs_temp.jpg')} />
                                    <p>巴巴汇金服荣获“全国互联网金融最佳风控平台奖”</p>
                                </a>
                            </li>
                            <li>
                                <a href="" target="_blank">
                                    <img src={require('../../../assets/images/about/zs_temp.jpg')} />
                                    <p>巴巴汇金服荣获“全国互联网金融最佳风控平台奖”</p>
                                </a>
                            </li>
                            <li>
                                <a href="" target="_blank">
                                    <img src={require('../../../assets/images/about/zs_temp.jpg')} />
                                    <p>巴巴汇金服荣获“全国互联网金融最佳风控平台奖”</p>
                                </a>
                            </li>
                            <li>
                                <a href="" target="_blank">
                                    <img src={require('../../../assets/images/about/zs_temp.jpg')} />
                                    <p>巴巴汇金服荣获“全国互融最佳平台奖”</p>
                                </a>
                            </li>
                            <li>
                                <a href="" target="_blank">
                                    <img src={require('../../../assets/images/about/zs_temp.jpg')} />
                                    <p>巴巴汇金服荣获“全国互联网佳风控平台奖”</p>
                                </a>
                            </li>
                            <li>
                                <a href="" target="_blank">
                                    <img src={require('../../../assets/images/about/zs_temp.jpg')} />
                                    <p>巴巴汇金服荣获“全国互联融最佳风控平台奖”</p>
                                </a>
                            </li>
                            <li>
                                <a href="" target="_blank">
                                    <img src={require('../../../assets/images/about/zs_temp.jpg')} />
                                    <p>巴巴汇金服荣获“全国互联网金融最平台奖”</p>
                                </a>
                            </li>
                            <li>
                                <a href="" target="_blank">
                                    <img src={require('../../../assets/images/about/zs_temp.jpg')} />
                                    <p>巴巴汇金服荣获“全国互联网佳风控平台奖”</p>
                                </a>
                            </li>
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