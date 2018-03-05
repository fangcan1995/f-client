import React from 'react';
import PropTypes from 'prop-types';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import Pagination from '../../../../components/pagination/pagination';
import './rateCoupons.less';
import moment from "moment";
import { connect } from 'react-redux';
import actionsRateCoupons from './actions_rateCoupons';
class MyRateCoupons extends React.Component{
    componentDidMount () {
        this.props.dispatch(actionsRateCoupons.getData());
    }
    render(){
        let {myRateCoupons, dispatch} = this.props;
        let {rcStatus,data,loaded}=myRateCoupons;
        return(
            <div className="member__main">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="我的加息券">
                            <div className="filter">
                                <div className="filter__outer">
                                    <div className="filter__inner">
                                        <div className="filter__row">
                                            <div className="filter__cell">
                                                <h5>类型:</h5>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={(rcStatus===0)?'filter__opt filter__opt--active':'filter__opt'}
                                                   onClick={() => {dispatch(actionsRateCoupons.filter(0))}}>全部
                                                </p>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={(rcStatus===1)?'filter__opt filter__opt--active':'filter__opt'}
                                                   onClick={() => {dispatch(actionsRateCoupons.filter(1))}}>未使用
                                                </p>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={(rcStatus===2)?'filter__opt filter__opt--active':'filter__opt'}
                                                   onClick={() => {dispatch(actionsRateCoupons.filter(2))}}>已使用
                                                </p>
                                            </div>
                                            <div className="filter__cell">
                                                <p className={(rcStatus===3)?'filter__opt filter__opt--active':'filter__opt'}
                                                   onClick={() => {dispatch(actionsRateCoupons.filter(3))}}>已过期
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                        <div>
                                            <ul className="couponList">
                                                {
                                                    data.list.map((item, index) => (

                                                        <li className={`reStatus-${item.rcStatus}`} key={`row-${index}`}>
                                                            <div className='img'>
                                                                <p className="denomination">{item.rcAmount}</p>
                                                                <p className="remark"></p>
                                                            </div>
                                                            <div className="txt">
                                                                <p>
                                                                    <strong>使用规则：</strong>{item.productCategoryName}满{item.useMinAmount}元可用
                                                                </p>
                                                                <p><strong>有效期：</strong>
                                                                    {
                                                                        !item.beginTime?'' :moment(item.beginTime).format('YYYY-MM-DD')
                                                                    }
                                                                    --
                                                                    {
                                                                        !item.endTime?'' :moment(item.endTime).format('YYYY-MM-DD')
                                                                    }
                                                                </p>
                                                            </div>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                            <Pagination config = {
                                                {
                                                    currentPage:data.pageNum,
                                                    pageSize:data.pageSize,
                                                    totalPage: Math.ceil(data.total/data.pageSize),
                                                    paging:(obj)=>{
                                                        dispatch(actionsRateCoupons.getData(obj.currentPage,obj.pageCount,{reStatus: reStatus}))
                                                    }
                                                }
                                            } >
                                            </Pagination>
                                        </div>
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
    const { auth,myRateCoupons } = state.toJS();
    return {
        auth,
        myRateCoupons,
    };
}

export default connect(mapStateToProps)(MyRateCoupons);