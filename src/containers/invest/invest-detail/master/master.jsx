import React from 'react';
import PropTypes from 'prop-types';
import {toMoney,toNumber,addCommas} from '../../../../utils/famatData';
import { connect } from 'react-redux';
import  investDetailActions  from '../../../../actions/invest-detail';
//import  {accountAc}  from '../../../../actions/account';
import InvestBox from "./investBox"
import moment from "moment";

class InvestDetailMaster extends React.Component {
    componentDidMount () {
        /*if(this.props.auth.isAuthenticated){
            this.props.dispatch(accountAc.getAccountInfo());  //获取会员帐户信息
        }*/
        this.props.dispatch(investDetailActions.getInvestInfo(this.props.id));
    }
    render(){
        const {investInfo}=this.props.investDetail;
        const {minInvestAmount,maxInvestAmount,surplusAmount}=investInfo;
        let min,max;
        ((surplusAmount-minInvestAmount)< minInvestAmount)? min=surplusAmount:min=minInvestAmount;
        (maxInvestAmount<surplusAmount)?max=maxInvestAmount:max=surplusAmount;
        console.log('//////////');
        console.log(investInfo);
        return (
            <div>
                <div>
                    <div className="master">
                        <dl className="info">
                            <dt className="title">
                                <h2>抵押标</h2>
                                <p>{investInfo.name||``}</p>
                            </dt>
                            <dd className="content">
                                <dl className="item1">
                                    <dt className="subtitle">预期年化回报率</dt>
                                    <dd>
                                        <i>{investInfo.annualRate}</i>%
                                        {(investInfo.noviceLoan=='1') ?
                                            <div className="addtips"><strong>新手</strong></div>
                                            :''
                                        }
                                    </dd>
                                </dl>
                                <dl className="item2">
                                    <dt className="subtitle">锁定期限</dt>
                                    <dd><i>{investInfo.loanExpiry}</i>个月</dd>
                                </dl>
                                <dl className="item3">
                                    <dt className="subtitle">起投金额</dt>
                                    <dd><i>{addCommas(toMoney(investInfo.minInvestAmount))}</i>元</dd>
                                </dl>
                                <dl className="progressbar">
                                    <dt><div className="finished" style={{ width:`${investInfo.investmentProgress}%`}}><i className="iconfont">&#xe64d;</i></div></dt>
                                    <dd><strong>投资进度：<em>{investInfo.investmentProgress}%</em></strong></dd>
                                </dl>
                                <ul className="safe">
                                    <li><i className="iconfont icon-star"></i>国企背景</li>
                                    <li><i className="iconfont icon-user"></i>真实借款</li>
                                    <li><i className="iconfont icon-heart"></i>实物抵押</li>
                                    <li><i className="iconfont icon-money"></i>{investInfo.refundWayString}</li>
                                </ul>
                            </dd>
                        </dl>
                        {/*投资区域*/}
                        <div className="m-invest">
                            {(investInfo !=``)?
                                <InvestBox type={0}
                                           investInfo={{
                                               id:investInfo.id,
                                               status:investInfo.status,
                                               money:investInfo.money,
                                               surplusAmount:investInfo.surplusAmount,
                                               min:min,
                                               max:max,
                                               //step:investInfo.increaseAmount,  //递增金额
                                               step:100,  //递增金额
                                               rate:investInfo.annualRate,
                                               loanExpiry:investInfo.loanExpiry,
                                               noviceLoan:investInfo.noviceLoan //'1'新手标
                                           }}
                                />
                            :``}
                        </div>
                    </div>
                    <ul className="detail steps">
                        <li className="step1"><i className="iconfont icon-1"></i>
                            <dl>
                                <dt>项目上线</dt>
                                <dd>上线日期：
                                    {(investInfo.putTime)?
                                        moment(investInfo.putTime).format('YYYY-MM-DD')
                                        :``
                                    }
                                </dd>
                            </dl>
                        </li>
                        <li className="step2"><i className="iconfont icon-2"></i>
                            <dl>
                                <dt>项目募集<em>(募集总时间:{investInfo.collectDays}天)</em></dt>
                                <dd>结束日期：
                                    {(investInfo.endDate)?
                                        moment(investInfo.endDate).format('YYYY-MM-DD')
                                        :``
                                    }
                                </dd>
                            </dl>
                        </li>
                        <li className="step3"><i className="iconfont icon-3"></i>
                            <dl>
                                <dt>项目放款</dt>
                                <dd>放款日期：
                                    {(investInfo.transferTime)?
                                        moment(investInfo.transferTime).format('YYYY-MM-DD')
                                        :`— —`
                                    }
                                </dd>
                            </dl>
                        </li>
                        <li className="step4"><i className="iconfont icon-4"></i>
                            <dl>
                                <dt>项目还款</dt>
                                <dd>还款日期：
                                    {(investInfo.repaymentDateString)?
                                        (investInfo.repaymentDateString!='')?
                                            `${investInfo.repaymentDateString} `
                                            :`— —`
                                        :``
                                    }
                                </dd>
                            </dl>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { auth,investDetail } = state.toJS();
    return {
        auth,
        investDetail,

    };
}
export default connect(mapStateToProps)(InvestDetailMaster);




