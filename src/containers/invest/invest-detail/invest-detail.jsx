import React from 'react';
import PropTypes from 'prop-types';
import Tab from '../../../components/tab/tab';
import InvestDetailMaster from './master/master';
import BorrowerInfo from './borrowerInfo/borrowerInfo';
import InvestRecords from './investRecords/investRecords';
import RepayRecords from './repayRecords/repayRecords';
import RiskNotice from './riskNotice/riskNotice';
import  investDetailActions  from '../../../actions/invest-detail';
import { connect } from 'react-redux';
import './invest-detail.less';

class InvestDetail extends React.Component{
    constructor(props) {
        super(props);
    }
    componentDidMount () {
        const pathSnippets = this.props.location.pathname.split('/').filter(i => i);
        let proId=pathSnippets[1];
        let {dispatch}=this.props;
        dispatch(investDetailActions.clearData()); //先清空数据
        dispatch(investDetailActions.getLoanInfo(proId)); //借款人信息披露
        dispatch(investDetailActions.getInvestRecords(proId));//投资记录
        dispatch(investDetailActions.getRepayRecords(proId)); //还款记录

    }
    render(){
        const pathSnippets = this.props.location.pathname.split('/').filter(i => i);
        let proId=pathSnippets[1];
        let {investDetail}=this.props;
        let {investInfo,memberInfo,loanInfo,investRecords,repayRecords,isFetching}=investDetail;
        //let project=investInfo.data;
        return (
            <main className="main sbDetail">
                <div className="wrapper">
                    <InvestDetailMaster id={proId} />
                    <div className="tab_info">
                        <Tab>
                            <div name="项目信息" >
                                <BorrowerInfo loanInfo={loanInfo} isFetching={isFetching} />
                            </div>
                            <div name="投标记录" style={{marginBottom:'30px'}}>
                                <InvestRecords pageSize={10}/>
                            </div>
                            <div name="还款记录" style={{marginBottom:'30px'}}>
                                <RepayRecords pageSize={10}/>
                            </div>
                            <div name="风险信息">
                                <RiskNotice />
                            </div>
                        </Tab>
                    </div>
                </div>
            </main>
        )
    }
}
function mapStateToProps(state) {
    const { auth,investDetail,member,special } = state.toJS();
    return {
        auth,
        investDetail,
        member,
        special
    };
}
export default connect(mapStateToProps)(InvestDetail);