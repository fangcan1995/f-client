import React from 'react';
import PropTypes from 'prop-types';
import {addCommas} from "../../../utils/famatData";
import { Button } from 'antd';
import { connect } from 'react-redux';
import {accountAc} from "../../../actions/account";
import {Loading,NoRecord,Posting,BbhAlert,WaitThirdParty} from '../../../components/bbhAlert/bbhAlert';

class ModalRecharge extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            tips:``
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }
    componentDidMount () {
        let {investAmount,account}=this.props;
        let {availableBalance}=account.accountsInfo;
        if(investAmount>availableBalance){
            this.props.dispatch(accountAc.getFuyouInfo({type:'reCharge',value:(investAmount-availableBalance)})); //获取开户需携带的信息
        }
    }
    handleSubmit(e){
        let {toOthersInfo}=this.props.account;
        console.log('切换状态');
        console.log(toOthersInfo);
        document.getElementById('webReg').action=toOthersInfo.url;
        document.getElementById('webReg').submit();
        this.props.dispatch(accountAc.change_goOutState(true));
        return false;
        //console.log(document.getElementById('webReg').action);

    }
    modalClose(){
        //this.props.dispatch(accountAc.getAccountInfo()); //获取会员帐户信息,暂时注释掉
        this.props.dispatch(accountAc.dummyModifyAccount({availableBalance:investAmount}));  //虚拟

        console.log('充值成功回调');
        this.props.dispatch(accountAc.change_goOutState(false));
        let {investAmount,onSuccess,dispatch,account}=this.props;
        let {availableBalance,bankName,bankNo}=account.accountsInfo;

        console.log('比较金额');
        console.log(investAmount);
        console.log(this.props.account.accountsInfo.availableBalance);
        if(1<1){
            this.setState({
                tips:`请核实账户余额是否充足`
            });
        }else{
            this.setState({
                tips:``
            });
            dispatch(accountAc.clear());
            onSuccess();
        }

    }
    render() {
        console.log(this.props);
        let {investAmount,account,onFail,onSuccess}=this.props;
        let {isPosting,accountsInfo,toOthersInfo,postResult,isOpenOthers}=account;
        let {availableBalance,bankName,bankNo}=accountsInfo;
        console.log('去富友充值携带的信息');
        console.log(toOthersInfo);
            return (
                <div>
                    {(isOpenOthers) ? <WaitThirdParty isShow={true} title='充值' callback={()=>{this.modalClose()}} />
                        : <div className="form__wrapper" id="area">
                            <form name="webReg" id="webReg" method="post"  target="_blank" >
                                <input type="hidden" name="mchnt_cd" value={toOthersInfo.mchnt_cd} />
                                <input type="hidden" name="mchnt_txn_ssn" value={toOthersInfo.mchnt_txn_ssn} />
                                <input type="hidden" name="login_id" value={toOthersInfo.login_id} />
                                <input type="hidden" name="amt" value={toOthersInfo.amt} />
                                <input type="hidden" name="page_notify_url" value={toOthersInfo.page_notify_url} />
                                <input type="hidden" name="back_notify_url" value={toOthersInfo.back_notify_url} />
                                <input type="hidden" name="signature" value={toOthersInfo.signature} />

                            <dl className="form__bar">
                                <dt><label>投资金额:</label></dt>
                                <dd>
                                    {addCommas(parseFloat(investAmount))}元
                                </dd>
                            </dl>
                            <dl className="form__bar">
                                <dt><label>可用余额:</label></dt>
                                <dd>
                                    {addCommas(parseFloat(availableBalance))}元
                                </dd>
                            </dl>
                            {
                                (parseFloat(investAmount) >availableBalance) ?
                                    <div>
                                    <dl className="form__bar">
                                        <dt><label>需充值:</label></dt>
                                        <dd>
                                            {addCommas(parseFloat(parseFloat(investAmount) - availableBalance))}元
                                        </dd>
                                    </dl>
                                        <dl className="form__bar">
                                            <dt><label>银行:</label></dt>
                                            <dd>{bankName}</dd>
                                        </dl>
                                        <dl className="form__bar">
                                            <dt><label>卡号:</label></dt>
                                            <dd>{bankNo}</dd>
                                        </dl>
                                    </div>
                                    : ``
                            }
                            <dl className="form__bar">
                                <div className="tips__area">
                                    <p><strong>提示：</strong>您的充值金额将会在10-15分钟内到账，请耐心等候</p>
                                </div>
                            </dl>
                                <dl className="form__bar">
                                    <div className='tips'>{this.state.tips}</div>
                                </dl>
                            <dl className="form__bar" style={{marginTop: '30px'}}>
                                <div className="center">
                                    <Button type="primary"  className="pop__large"
                                            onClick={() => onFail()}>返回详情</Button>
                                    {
                                        (parseFloat(investAmount) <= availableBalance) ?<Button type="primary"  className="pop__large" onClick={()=>this.modalClose()}>下一步</Button>
                                            :toOthersInfo==``?<Button type="primary" htmlType="submit" className="pop__large" disabled={true}>余额不足，去充值</Button>
                                            :<Button type="primary" htmlType="submit" className="pop__large" onClick={()=>this.handleSubmit()}>余额不足，去充值</Button>
                                    }

                                </div>
                            </dl>
                            </form>
                        </div>
                    }
                </div>
            );

    }
};

function mapStateToProps(state) {
    const { auth,investDetail,account } = state.toJS();
    return {
        auth,
        investDetail,
        account
    };
}
export default connect(mapStateToProps)(ModalRecharge);


