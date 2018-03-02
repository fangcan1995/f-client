import React, { Component } from 'react';
import './constant.less';
import { connect } from 'react-redux';


import fetch from 'isomorphic-fetch';
import { actionTest } from '../../../actions/constant';


// const constantTable = ({ location, match, history }) => {
class constantTable extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount () {
        this.props.dispatch(actionTest());
        console.log(this.props.testReducer);
    }

    render () {
        console.log(this.props)
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
                                        <h3>99,999</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>累计撮合交易笔数</p>
                                        <h3>873</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>累计为用户赚取（元）</p>
                                        <h3>961,750</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>累计服务用户数</p>
                                        <h3>984</h3>
                                    </div>
                                </div>
                                <div className="detailLine">
                                    <div className="detailCell">
                                        <p>借贷剩余金额（元）</p>
                                        <h3>61,750</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>借贷剩余笔数</p>
                                        <h3>9,961,750</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>逾期金额（元）</p>
                                        <h3>1,750</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>逾期笔数</p>
                                        <h3>9,961,750</h3>
                                    </div>
                                </div>
                                <div className="detailLine">
                                    <div className="detailCell">
                                        <p>累计借款人数</p>
                                        <h3>1750</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>当前借款人数</p>
                                        <h3>9120</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>累计出借人数</p>
                                        <h3>98</h3>
                                    </div>
                                    <div className="detailCell">
                                        <p>当前出借人数</p>
                                        <h3>750</h3>
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
                                    <h4>借款笔数</h4>
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
                            </div>
                        </div>
                        <div className="viewBlock investInfo">
                            <div className="viewTitle">
                                <h3>投资情况</h3>
                            </div>
                            <div className="investDetails">
                                <div className="investLine">
                                    <h4>出借人数</h4>
                                    <div className="form"></div>
                                    <select name="" id="">
                                        <option>2016</option>
                                        <option>2017</option>
                                    </select>
                                </div>
                                <div className="investLine">
                                    <div className="pieChartCell">
                                        <h4>性别分布</h4>
                                        <div className="pieChart">
                                            <div className="pie"></div>
                                            <div className="pieChartInfo">
                                                <p><span>男</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>35</span>%</p>
                                                <p><span>女</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>65</span>%</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pieChartCell">
                                        <h4>年龄分布</h4>
                                        <div className="pieChart">
                                            <div className="pie"></div>
                                            <div className="pieChartInfo">
                                                <p><span>25岁以下</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>10</span>%</p>
                                                <p><span>25-35岁</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>40</span>%</p>
                                                <p><span>35-50岁</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>25</span>%</p>
                                                <p><span>50岁以上</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>25</span>%</p>
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
}
    



function mapStateToProps (state) {
    console.log(state);
    return {
        constantData: state.testReducer
    }
}

constantTable = connect(mapStateToProps)(constantTable);

export default constantTable;




