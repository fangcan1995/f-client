import React from 'react';
import PropTypes from 'prop-types';
import './invest-index.less';

export default ({ location, match, history }) => {
  return (
    <main className="main invest-index" id="invest-index">
        <div className="wrapper">
            <div className="title">
                <h2><i className="iconfont icon_xm"></i>投资项目</h2>
            </div>

            <div className="viewBlock greenhandBlock">
                <div className="viewTitle">
                    <div>
                        <i className="iconfont icon-hua"></i>
                        <h3>新手专享</h3>
                        <p>100元起投 随时可退</p>
                    </div>
                </div>
                <div className="viewContent">
                    <ul className="infoList">
                        <li><em>1</em>100元起投</li>
                        <li><em>2</em>按日计算利息</li>
                        <li><em>3</em>匹配标的透明披露，资产更安心</li>
                    </ul>
                    <div className="loan_list">
                        <div className="loan">
                            <div className="item1">
                                <div><span>8</span>.0%+4.0%</div>
                                <div>预期年化回报率</div>
                            </div>
                            <div className="item2">
                                <div><span>3</span>个月</div>
                                <div>锁定期</div>
                            </div>
                            <div className="btnWrap">
                                <a href="" className="btnWrap__btn">立即加入</a>{/*btnWrap__btn--end 已完结*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="viewBlock yhbBlock">
                <div className="viewTitle">
                    <div>
                        <i className="iconfont icon-hua"></i>
                        <h3>月汇宝</h3>
                        <p>1000元起投 随时可退</p>
                    </div>
                </div>
                <div className="viewContent">
                    <ul className="infoList">
                        <li><em>1</em>100元起投</li>
                        <li><em>2</em>按日计算利息</li>
                        <li><em>3</em>匹配标的透明披露，资产更安心</li>
                        <li><em>4</em>锁定期后不退出，可继续享受收益</li>
                        <li><em>5</em>锁定期越长的服务计划年化结算利率越高</li>
                        <li><em>6</em>匹配标的透明披露，资产更安心</li>
                    </ul>
                    <div className="loan_list">
                        <div className="loan">
                            <div className="item1">
                                <div><span>8</span>.0%+4.0%</div>
                                <div>预期年化回报率</div>
                            </div>
                            <div className="item2">
                                <div><span>3</span>个月</div>
                                <div>锁定期</div>
                            </div>
                            <div className="btnWrap">
                                <a href="" className="btnWrap__btn">立即加入</a>{/*btnWrap__btn--end 已完结*/}
                            </div>
                        </div>
                        <div className="loan">
                            <div className="item1">
                                <div><span>8</span>.0%+4.0%</div>
                                <div>预期年化回报率</div>
                            </div>
                            <div className="item2">
                                <div><span>3</span>个月</div>
                                <div>锁定期</div>
                            </div>
                            <div className="btnWrap">
                                <a href="" className="btnWrap__btn">立即加入</a>
                            </div>
                        </div>
                        <div className="loan">
                            <div className="item1">
                                <div><span>8</span>.0%+4.0%</div>
                                <div>预期年化回报率</div>
                            </div>
                            <div className="item2">
                                <div><span>3</span>个月</div>
                                <div>锁定期</div>
                            </div>
                            <div className="btnWrap">
                                <a href="" className="btnWrap__btn">立即加入</a>{/*btnWrap__btn--end 已完结*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="viewBlock sbBlock greenhandBlock">
                <div className="viewTitle">
                    <div>
                        <i className="iconfont icon-hua"></i>
                        <h3>散标</h3>
                        <p>1000元起投 随时可退</p>
                    </div>

                </div>
                <div className="viewContent">
                    <ul className="infoList">
                        <li><em>1</em>1000元起投</li>
                        <li><em>2</em>按日计算利息</li>
                        <li><em>3</em>匹配标的透明披露</li>
                    </ul>
                    <div className="loan_list">
                        <div className="loan">
                            <div className="item1">
                                <div><span>8</span>.0%+4.0%</div>
                                <div>预期年化回报率</div>
                            </div>
                            <div className="item2">
                                <div><span>3</span>个月</div>
                                <div>锁定期</div>
                            </div>
                            <div className="btnWrap">
                                <a href="" className="btnWrap__btn">立即加入</a>{/*btnWrap__btn--end 已完结*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    );
};
