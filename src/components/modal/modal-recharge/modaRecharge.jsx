import React from 'react';
import PropTypes from 'prop-types';
import {addCommas} from "../../../utils/famatData";
import { Button } from 'antd';
import { connect } from 'react-redux';
import {accountAc} from "../../../actions/account";
import {Loading,NoRecord,Posting,BbhAlert,WaitThirdParty} from '../../../components/bbhAlert/bbhAlert';
import {checkMoney} from "../../../utils/cost";

class ModalRecharge extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            value:``,
            tips:'',
            disabled:true,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount () {
        let {value,account,returnPage}=this.props;

        let {availableBalance}=account.accountsInfo;
        this.props.dispatch(accountAc.getFuyouInfo({type:'reCharge',value:((value-availableBalance).toFixed(2)),url:returnPage})); //获取开户需携带的信息

        this.setState({
            value:(value - availableBalance)
        })
    }
    handleSubmit(e){
        let {toOthersInfo}=this.props.account;
        //console.log('切换状态');
        //console.log(toOthersInfo);
        //document.getElementById('webReg').action=toOthersInfo.url;
        document.getElementById('webReg').submit();
        this.props.dispatch(accountAc.change_goOutState(true));

        return false;


    }
    handleChange(event){

        let result=checkMoney({
            'value':event.target.value,
            'type':0,
            'min_v':10,
            'max_v':100000000,
            'label':'充值金额',
            'interval':1
        });
        if(result[0]==false){
            if(result[1]==1){
                this.setState({
                    value: event.target.value,
                    tips:`${result[2]}`,
                    disabled:true
                });
            }else{
                this.setState({
                    value: 0,
                    tips:`${result[2]}`,
                    disabled:true
                });
            }

        }else {
            this.setState(
                {
                    value: event.target.value,
                    tips: ``,
                    disabled:false
                });
        }
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
        let {returnPage,value,onSuccess,account}=this.props;
        let {isPosting,accountsInfo,toOthersInfo,postResult,isOpenOthers}=account;
        let {availableBalance,bankName,bankNo}=accountsInfo;
        console.log('跳转信息----------------');
        console.log(account.toOthersInfo);
        console.log('/跳转信息----------------');
            return (
                <div>
                    {(isOpenOthers) ? ``
                        : <div className="pop__recharge form__wrapper" id="area">
                            <form name="webReg" id="webReg" method="post" action={toOthersInfo.url}>
                                <input type="hidden" name="mchnt_cd" value={toOthersInfo.mchnt_cd} />
                                <input type="hidden" name="mchnt_txn_ssn" value={toOthersInfo.mchnt_txn_ssn} />
                                <input type="hidden" name="login_id" value={toOthersInfo.login_id} />
                                <input type="hidden" name="amt" value={toOthersInfo.amt} />
                                <input type="hidden" name="page_notify_url" value={toOthersInfo.page_notify_url} />
                                <input type="hidden" name="back_notify_url" value={toOthersInfo.back_notify_url} />
                                <input type="hidden" name="signature" value={toOthersInfo.signature} />
                            <dl className="form__bar">
                                <dt><label>可用余额:</label></dt>
                                <dd>
                                    {addCommas(parseFloat(availableBalance))}元
                                </dd>
                            </dl>
                                {/*<dl className="form__bar">
                                    <dt><label>充值金额:</label></dt>
                                    <dd>
                                        <input
                                            maxLength={8} type="text" className="textInput moneyInput" ref="amount" onChange={this.handleChange}　
                                            value={this.state.value}
                                        />
                                        <span className="unit">元</span>
                                    </dd>
                                </dl>*/}
                                <dl className="form__bar">
                                    <dt><label>需充值:</label></dt>
                                    <dd>
                                        {addCommas(parseFloat(this.state.value))}元
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

                                <dl className="form__bar">
                                    {
                                        (toOthersInfo!=`` && toOthersInfo.code==406)? <div className="errorMessages">{toOthersInfo.message}</div>
                                            :``
                                    }
                                    {(this.state.tips!='')?
                                        <div className="errorMessages">
                                            {this.state.tips}
                                        </div>:``
                                    }
                                </dl>
                            <dl className="form__bar" style={{marginTop: '30px'}}>
                                <div className="center">
                                    <Button type="primary" htmlType="submit" className="pop__large" onClick={()=>this.handleSubmit()} disabled={(toOthersInfo==``)?true:false}>立即充值</Button>
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


