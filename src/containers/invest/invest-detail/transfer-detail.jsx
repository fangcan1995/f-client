import React from 'react';
import PropTypes from 'prop-types';
import Tab from '../../../components/tab/tab';
import TransferDetailMaster from './master/transferMaster';
import BorrowerInfo from './borrowerInfo/borrowerInfo';
import InvestRecords from './investRecords/investRecords';
import RepayRecords from './repayRecords/repayRecords';
import TransferInvestRecords from './transferInvestRecords/transferInvestRecords';
import RiskNotice from './riskNotice/riskNotice';
import './invest-detail.less';
import { connect } from 'react-redux';
import  investDetailActions  from '../../../actions/invest-detail';

class TransferDetail extends React.Component{
    constructor(props) {
        super(props);
    }
    componentDidMount () {
        const pathSnippets = this.props.location.pathname.split('/').filter(i => i);
        let proId=pathSnippets[2];
        let transferId=pathSnippets[1];
        let {dispatch}=this.props;
        //this.props.dispatch(investDetailActions.getTransferData(proId,transferId));
        //dispatch(investDetailActions.getInvestInfo(transferId));
        dispatch(investDetailActions.getLoanInfo(proId));
        dispatch(investDetailActions.getInvestRecords(proId));
        dispatch(investDetailActions.getTransferInvestRecords(transferId));
        dispatch(investDetailActions.getRepayRecords(proId));
    }
    render(){
        console.log('---------------债转标----------');
        console.log(this.props);
        const pathSnippets = this.props.location.pathname.split('/').filter(i => i);
        let transferId=pathSnippets[1];
        let {investDetail}=this.props;
        let {investInfo,memberInfo,loanInfo,investRecords,investTransferRecords,repayRecords}=investDetail;
        return (
            <main className="main sbDetail">
                <div className="wrapper">
                    <TransferDetailMaster id={transferId}/>
                    <div className="tab_info">
                        <Tab>
                            <div name="项目信息">
                                <BorrowerInfo/>
                            </div>
                            <div name="转让投标记录" style={{marginBottom:'30px'}}>
                                <TransferInvestRecords pageSize={10}/>
                            </div>
                            <div name="原项目投标记录" style={{marginBottom:'30px'}}>
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
    const { auth,investDetail } = state.toJS();
    return {
        auth,
        investDetail
    };
}
export default connect(mapStateToProps)(TransferDetail);