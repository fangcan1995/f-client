import React from 'react';
import './constant.less'


export default ({ location, match, history }) => {
    return(
        <div>
            <div className="title__list">
                <div className="content">
                        <div className="viewBlock platformInfo">
                            <div className="viewTitle">
                                <h3>平台运营情况</h3>
                            </div>
                            <div className="platformDetails">
                                <div className="detailLine">
                                    <div className="detailCell">
                                        <p>累计撮合交易额（元）</p>
                                        <h3>9,961,750</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>累计撮合交易额（元）</p>
                                        <h3>9,961,750</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>累计撮合交易额（元）</p>
                                        <h3>9,961,750</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>累计撮合交易额（元）</p>
                                        <h3>9,961,750</h3>
                                    </div>
                                </div>
                                <div className="detailLine">
                                    <div className="detailCell">
                                        <p>累计撮合交易额（元）</p>
                                        <h3>9,961,750</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>累计撮合交易额（元）</p>
                                        <h3>9,961,750</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>累计撮合交易额（元）</p>
                                        <h3>9,961,750</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>累计撮合交易额（元）</p>
                                        <h3>9,961,750</h3>
                                    </div>
                                </div>
                                <div className="detailLine">
                                    <div className="detailCell">
                                        <p>累计撮合交易额（元）</p>
                                        <h3>9,961,750</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>累计撮合交易额（元）</p>
                                        <h3>9,961,750</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>累计撮合交易额（元）</p>
                                        <h3>9,961,750</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>累计撮合交易额（元）</p>
                                        <h3>9,961,750</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="viewBlock borrowInfo">
                            <div className="viewTitle">
                                <h3>借款情况</h3>
                            </div>
                            <div className="borrowDetails">
                                <div className="borrowLine">
                                    <h4>借款金额</h4>
                                    <div className="form"></div>
                                    <select name="" id="">
                                        <option>2016</option>
                                        <option>2017</option>
                                    </select>
                                </div>
                                <div className="borrowLine">
                                    <h4>借款人数</h4>
                                    <div className="form"></div>
                                    <select name="" id="">
                                        <option>2016</option>
                                        <option>2017</option>
                                    </select>
                                </div>
                                <div className="borrowLine">
                                    <h4>借款笔数</h4>
                                    <div className="form"></div>
                                    <select name="" id="">
                                        <option>2016</option>
                                        <option>2017</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="viewBlock investInfo">
                            <div className="viewTitle">
                                <h3>投资情况</h3>
                            </div>
                            <div className="investDetails">
                                <div className="investLine">
                                    <h4>借款金额</h4>
                                    <div className="form"></div>
                                    <select name="" id="">
                                        <option>2016</option>
                                        <option>2017</option>
                                    </select>
                                </div>
                                <div className="investLine">
                                    <div className="pieChartCell">
                                        <h4>金额分布</h4>
                                        <div className="pieChart">
                                            <div className="pie"></div>
                                            <div className="pieChartInfo">
                                                <p><span>男</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>35</span>%</p>
                                                <p><span>女</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>65</span>%</p>
                                                <p><span>男</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>2653</span>人</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pieChartCell">
                                        <h4>渠道分布</h4>
                                        <div className="pieChart">
                                            <div className="pie"></div>
                                            <div className="pieChartInfo">
                                                <p><span>男</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>35</span>%</p>
                                                <p><span>女</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>65</span>%</p>
                                                <p><span>男</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>2653</span>人</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="investLine">
                                    <div className="pieChartCell">
                                        <h4>年龄分布</h4>
                                        <div className="pieChart">
                                            <div className="pie"></div>
                                            <div className="pieChartInfo">
                                                <p><span>男</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>35</span>%</p>
                                                <p><span>女</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>65</span>%</p>
                                                <p><span>男</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>2653</span>人</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pieChartCell">
                                        <h4>性别分布</h4>
                                        <div className="pieChart">
                                            <div className="pie"></div>
                                            <div className="pieChartInfo">
                                                <p><span>男</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>35</span>%</p>
                                                <p><span>女</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>65</span>%</p>
                                                <p><span>男</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>2653</span>人</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                </div>
            </div>
        </div>
    )
}