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
        window.scrollTo(0,0);
        const pathSnippets = this.props.location.pathname.split('/').filter(i => i);
        const transferId=pathSnippets[1];
        const proId=pathSnippets[2];

        const {dispatch}=this.props;
        dispatch(investDetailActions.clearData()); //先清空数据
        dispatch(investDetailActions.getLoanInfo(proId)); //借款人信息披露
        dispatch(investDetailActions.getInvestRecords(proId));//投资记录
        dispatch(investDetailActions.getRepayRecords(proId)); //还款记录
        dispatch(investDetailActions.getTransferInvestRecords(transferId)); //债转投资记录
    }

    render(){
        const pathSnippets = this.props.location.pathname.split('/').filter(i => i);
        const transferId=pathSnippets[1];
        const proId=pathSnippets[2];
        const returnAmount=pathSnippets[3];
        let {investDetail}=this.props;
        let {investInfo,memberInfo,loanInfo,investRecords,investTransferRecords,repayRecords,isFetching}=investDetail;
        return (
            <main className="main sbDetail">
                <div className="wrapper">
                    <TransferDetailMaster transferId={transferId} proId={proId} returnAmount={returnAmount} />
                    <div className="tab_info">
                        <Tab>
                            <div name="项目信息">
                                <BorrowerInfo loanInfo={loanInfo} isFetching={isFetching} />
                            </div>
                            <div name="转让出借记录" style={{marginBottom:'30px'}}>
                                <TransferInvestRecords pageSize={10}/>
                            </div>
                            <div name="原项目出借记录" style={{marginBottom:'30px'}}>
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