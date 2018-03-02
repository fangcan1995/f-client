import React from 'react';
import PropTypes from 'prop-types';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import Pagination from '../../../../components/pagination/pagination';
import './redEnvelopes.less';
import moment from "moment";
import { connect } from 'react-redux';
import actionsRedEnvelopes from './actions_redEnvelopes';

class MyRedEnvelopes extends React.Component {
    render() {

        console.log('---------------myRedEnvelopes-----------------');
        let {myRedEnvelopes, dispatch} = this.props;
        console.log(myRedEnvelopes);
        let {reStatus,data,loaded}=myRedEnvelopes;
        if (!loaded) {
            dispatch(actionsRedEnvelopes.getData())
        }
        return (
            <div className="member__main">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="我的红包">
                            <div className="filter">
                                <div className="filter__outer">
                                    <div className="filter__inner">
                                        <div className="filter__row">
                                            <div className="filter__cell">
                                                <h5>类型:</h5>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={(reStatus===0)?'filter__opt filter__opt--active':'filter__opt'}
                                                   onClick={() => {dispatch(actionsRedEnvelopes.filter(0))}}>全部
                                                </p>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={(reStatus===1)?'filter__opt filter__opt--active':'filter__opt'}
                                                   onClick={() => {dispatch(actionsRedEnvelopes.filter(1))}}>未使用
                                                </p>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={(reStatus===2)?'filter__opt filter__opt--active':'filter__opt'}
                                                   onClick={() => {dispatch(actionsRedEnvelopes.filter(2))}}>已使用
                                                </p>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={(reStatus===3)?'filter__opt filter__opt--active':'filter__opt'}
                                                   onClick={() => {dispatch(actionsRedEnvelopes.filter(3))}}>已过期
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {loaded ? (
                                    <div>
                                        {data.total>0?(<div>
                                                <ul className="redBagList">
                                                    {
                                                        data.list.map((l, i) => (
                                                            <li className={`reStatus-${l.reStatus}`} key={`row-${i}`}>
                                                                <div className=
                                                                         {
                                                                             l.reTypeName == '返现红包' ?
                                                                                 'img fxhb'
                                                                                 : 'img xjhb'
                                                                         }
                                                                >
                                                                    <p className="denomination">{l.reAmount}</p>
                                                                    <p className="remark"></p>
                                                                </div>
                                                                <div className="txt">
                                                                    <p>
                                                                        <strong>使用规则：</strong>{l.productCategoryName}满{l.useMinAmount}元可用
                                                                    </p>
                                                                    <p><strong>有效期：</strong>
                                                                        {
                                                                            !l.beginTime ? '' : moment(l.beginTime).format('YYYY-MM-DD')
                                                                        }
                                                                        --
                                                                        {
                                                                            !l.endTime ? '' : moment(l.endTime).format('YYYY-MM-DD')
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                                <Pagination config={
                                                    {
                                                        currentPage: data.pageNum,
                                                        pageSize: data.pageSize,
                                                        totalPage: Math.ceil(data.total/data.pageSize),
                                                        paging: (obj) => {
                                                            dispatch(actionsRedEnvelopes.getData(obj.currentPage,obj.pageCount,{reStatus: reStatus}))
                                                        }
                                                    }
                                                }>
                                                </Pagination>
                                            </div>)
                                            :(<div>暂无记录</div>)}
                                    </div>)
                                : (<div>正在加载数据...</div>)
                            }
                        </div>
                    </Tab>
                </div>
                <div className="member__cbox">
                    <Tab>
                        <div name="温馨提示">
                            <div className="m-wxts">
                                <p> 1. 投资时需满足红包使用规则，才可使用；<br/>
                                    2. 使用过程遇到问题时，请（工作日9:00-20:00）咨询客服<br/>
                                </p>
                            </div>
                        </div>
                    </Tab>
                </div>
            </div>
        )
    }


}

function mapStateToProps(state) {
    const { auth,myRedEnvelopes } = state.toJS();
    return {
        auth,
        myRedEnvelopes,
    };
}

export default connect(mapStateToProps)(MyRedEnvelopes);

