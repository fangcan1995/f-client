import React from 'react';
import PropTypes from 'prop-types';
import {addCommas} from "../../../utils/famatData";
import { Button } from 'antd';
import './modaRecharge.less'
import { connect } from 'react-redux';
import {accountAc} from "../../../actions/account";
import {Loading,NoRecord,Posting,BbhAlert,WaitThirdParty} from '../../../components/bbhAlert/bbhAlert';
class ModalRecharge extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }
    componentDidMount () {
        let {investAmount}=this.props;
        //this.props.dispatch(accountAc.getFuyouInfo({type:'reCharge',value:investAmount})); //获取开户需携带的信息
    }
    handleSubmit(e){
        console.log('切换状态');
        let {isOpenOthers}=this.props.account;
        document.getElementById('webReg').action=isOpenOthers.url;
        document.getElementById('webReg').submit();
        this.props.dispatch(accountAc.change_goOutState(true));
        return false;
        //console.log(document.getElementById('webReg').action);

    }
    modalClose(){
        //清空
        /*let {dummyResult}=this.props.member.accountsInfo;
        if(dummyResult.code==0){
            this.props.dispatch(memberAc.getInfo());  //成功重新获取新户信息
        }*/
        console.log('充值成功回调');
        let {investAmount,account,onFail,onSuccess}=this.props;
        this.props.dispatch(accountAc.modifyState({'availableBalance':investAmount}));  //模拟
        onSuccess();
    }
    render() {
        console.log(this.props);
        let {investAmount,account,onFail,onSuccess}=this.props;
        let {isPosting,accountsInfo,toOthersInfo,postResult,isOpenOthers}=account;
        let {availableBalance}=accountsInfo;
        console.log('去富有开户携带的信息');
        console.log(typeof toOthersInfo);
            return (
                <div>
                    {(isOpenOthers) ? <WaitThirdParty isShow={true} title='充值' callback={()=>{this.modalClose()}} />
                        : <div className="form__wrapper" id="area">
                            <form name="webReg" id="webReg" method="post"   target="_blank" >
                                <input type="hidden" name="amount" value={investAmount} />
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
                                (parseFloat(investAmount) >= availableBalance) ?

                                    <dl className="form__bar">
                                        <dt><label>需充值:</label></dt>
                                        <dd>
                                            {addCommas(parseFloat(parseFloat(investAmount) - availableBalance))}元
                                        </dd>
                                    </dl>
                                    : ``
                            }
                            <dl className="form__bar">
                                <div className="tips__area">
                                    <p><strong>提示：</strong>您的充值金额将会在10-15分钟内到账，请耐心等候</p>
                                </div>
                            </dl>
                            <dl className="form__bar" style={{marginTop: '30px'}}>
                                <div className="center">
                                    <Button type="primary"  className="pop__large"
                                            onClick={() => onFail()}>返回详情</Button>
                                    {
                                        toOthersInfo == `` ?
                                            <Button type="primary" htmlType="submit" className="pop__large"
                                                    disabled={false} onClick={()=>this.handleSubmit()}>余额不足，去充值</Button>
                                            : <Button type="primary" htmlType="submit"
                                                      className="pop__large">余额不足，去充值</Button>
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


