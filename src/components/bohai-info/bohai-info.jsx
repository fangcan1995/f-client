import React, { Component } from 'react';
import { connect } from 'react-redux';
import {accountAc} from "../../actions/account";
import {message} from "antd/lib/index";

class BohaiInfo extends Component {
    constructor(props) {
        super(props);
    }

    /*componentWillMount() {
        this.props.dispatch(accountAc.clear()); //清空数据
        this.props.dispatch(accountAc.getAccountInfo());  //获取会员帐户信息
    }*/

    bindCard(){
        const {dispatch, account,url} = this.props;
        let {toOthersInfo}=account;
        //先获取换卡需携带的信息，正确的话提交表单
        dispatch(accountAc.getBohaiInfo({type:'OpenAccount',url:url}))
            .then(
                (res)=>{
                    console.log(res);
                    toOthersInfo=res.value;
                    if(toOthersInfo.code==406  ){
                        this.setState({
                            disabled:false
                        });
                        //message.info(toOthersInfo.message);
                    }else if(toOthersInfo!=``){
                        document.getElementById('form_bindCard').submit();
                        dispatch(accountAc.change_goOutState(true));
                    }
                }
            )
            .catch();
    }
    changeCard(){

        let {dispatch, account,url} = this.props;
        let {isPosting,isFetching,accountsInfo,toOthersInfo,postResult,isOpenOthers}=account;
        //先获取换卡需携带的信息，正确的话提交表单
        dispatch(accountAc.getBohaiInfo({type:'ReOpenAccount',url:url}))
            .then(
                (res)=>{
                    toOthersInfo=res.value;
                    if(toOthersInfo.code==406  ){
                        this.setState({
                            disabled:false
                        });
                        message.info(toOthersInfo.message);
                    }else if(toOthersInfo!=``){
                        document.getElementById('form_changeCard').submit();
                        dispatch(accountAc.change_goOutState(true));
                    }
                }
            )
            .catch();
    }
    changePhone(){
        let {dispatch, account} = this.props;
        let {isPosting,isFetching,accountsInfo,toOthersInfo,postResult,isOpenOthers}=account;
        //先获取换手机号需携带的信息，正确的话提交表单
        dispatch(accountAc.getBohaiInfo({type:'changePhone',url:`my-settings_my-authInfo`}))
            .then(
                (res)=>{
                    toOthersInfo=res.value;
                    if(toOthersInfo.code==406  ){
                        this.setState({
                            disabled:false
                        });
                        message.info(toOthersInfo.message);
                    }else if(toOthersInfo!=``){
                        document.getElementById('form_changePhone').submit();
                        dispatch(accountAc.change_goOutState(true));
                    }
                }
            )
            .catch();
    }
    setTradePass(){
        let {dispatch, account} = this.props;
        let {isPosting,isFetching,accountsInfo,toOthersInfo,postResult,isOpenOthers}=account;
        //先获取换卡需携带的信息，正确的话提交表单
        dispatch(accountAc.getBohaiInfo({type:'changeTradePwd',url:`my-settings_my-authInfo`}))
            .then(
                (res)=>{
                    toOthersInfo=res.value;
                    if(toOthersInfo.code==406  ){
                        this.setState({
                            disabled:false
                        });
                        message.info(toOthersInfo.message);
                    }else if(toOthersInfo!=``){
                        document.getElementById('form_changeCard').submit();
                        dispatch(accountAc.change_goOutState(true));
                    }
                }
            )
            .catch();
    }
    render(){
        const {account,type}=this.props;
        const {toOthersInfo}=account;
        console.log(type+'操作'+'需要提交给银行的数据');
        console.log(toOthersInfo);
        console.log('/*');
        return (
            <div className='bank-info'>
                {
                    (type=='bindCard')?
                    <div>
                        <a href="javascript:void(0);" onClick={this.bindCard.bind(this)}>{this.props.children}</a>
                        <form name="form_bindCard" id="form_bindCard" method="post" acceptCharset="GBK" action={toOthersInfo.url} >
                            <input type="hidden" name="char_set" value={toOthersInfo.char_set} />
                            <input type="hidden" name="partner_id" value={toOthersInfo.partner_id} />
                            <input type="hidden" name="version_no" value={toOthersInfo.version_no} />
                            <input type="hidden" name="biz_type" value={toOthersInfo.biz_type} />
                            <input type="hidden" name="sign_type" value={toOthersInfo.sign_type} />
                            <input type="hidden" name="MerBillNo" value={toOthersInfo.MerBillNo} />
                            <input type="hidden" name="OpenType" value={toOthersInfo.OpenType} />
                            <input type="hidden" name="MobileNo" value={toOthersInfo.MobileNo} />
                            <input type="hidden" name="PageReturnUrl" value={toOthersInfo.PageReturnUrl} />
                            <input type="hidden" name="BgRetUrl" value={toOthersInfo.BgRetUrl} />
                            <input type="hidden" name="TransTyp" value={toOthersInfo.TransTyp} />
                            <input type="hidden" name="MerPriv" value={toOthersInfo.MerPriv} />
                            <input type="hidden" name="mac" value={toOthersInfo.mac} />
                        </form>
                    </div>
                    :(type=='changeCard')?
                        <div>
                            <a href="javascript:void(0);" onClick={this.changeCard.bind(this)}>{this.props.children}</a>
                            <form name="form_changeCard" id="form_changeCard" method="post" acceptCharset="GBK" action={toOthersInfo.url} >
                                <input type="hidden" name="char_set" value={toOthersInfo.char_set} />
                                <input type="hidden" name="partner_id" value={toOthersInfo.partner_id} />
                                <input type="hidden" name="version_no" value={toOthersInfo.version_no} />
                                <input type="hidden" name="biz_type" value={toOthersInfo.biz_type} />
                                <input type="hidden" name="sign_type" value={toOthersInfo.sign_type} />
                                <input type="hidden" name="MerBillNo" value={toOthersInfo.MerBillNo} />
                                <input type="hidden" name="PlaCustId" value={toOthersInfo.PlaCustId} />
                                <input type="hidden" name="PageReturnUrl" value={toOthersInfo.PageReturnUrl} />
                                <input type="hidden" name="BgRetUrl" value={toOthersInfo.BgRetUrl} />
                                <input type="hidden" name="MerPriv" value={toOthersInfo.MerPriv} />
                                <input type="hidden" name="TransTyp" value={toOthersInfo.TransTyp} />
                                <input type="hidden" name="mac" value={toOthersInfo.mac} />
                            </form>
                        </div>
                        :(type=='changePhone')?
                            <div>
                                <a href="javascript:void(0);" onClick={this.changePhone.bind(this)}>{this.props.children}</a>
                                <form name="form_changePhone" id="form_changePhone" method="post" acceptCharset="GBK" action={toOthersInfo.url} >
                                    <input type="hidden" name="char_set" value={toOthersInfo.char_set} />
                                    <input type="hidden" name="partner_id" value={toOthersInfo.partner_id} />
                                    <input type="hidden" name="version_no" value={toOthersInfo.version_no} />
                                    <input type="hidden" name="biz_type" value={toOthersInfo.biz_type} />
                                    <input type="hidden" name="sign_type" value={toOthersInfo.sign_type} />
                                    <input type="hidden" name="MerBillNo" value={toOthersInfo.MerBillNo} />
                                    <input type="hidden" name="PlaCustId" value={toOthersInfo.PlaCustId} />
                                    <input type="hidden" name="MobileNo" value={toOthersInfo.MobileNo} />
                                    <input type="hidden" name="PageReturnUrl" value={toOthersInfo.PageReturnUrl} />
                                    <input type="hidden" name="BgRetUrl" value={toOthersInfo.BgRetUrl} />
                                    <input type="hidden" name="TransTyp" value={toOthersInfo.TransTyp} />
                                    <input type="hidden" name="MerPriv" value={toOthersInfo.MerPriv} />
                                    <input type="hidden" name="mac" value={toOthersInfo.mac} />
                                </form>
                            </div>
                            :(type=='setTradePass')?
                                <div>
                                    <a href="javascript:void(0);" onClick={this.setTradePass.bind(this)}>{this.props.children}</a>
                                    <form name="form_setTradeCode" id="form_setTradeCode" method="post" acceptCharset="GBK" action={toOthersInfo.url} >
                                        <input type="input" name="char_set" value={toOthersInfo.char_set} />
                                        <input type="input" name="partner_id" value={toOthersInfo.partner_id} />
                                        <input type="input" name="version_no" value={toOthersInfo.version_no} />
                                        <input type="input" name="biz_type" value={toOthersInfo.biz_type} />
                                        <input type="input" name="sign_type" value={toOthersInfo.sign_type} />
                                        <input type="input" name="MerBillNo" value={toOthersInfo.MerBillNo} />
                                        <input type="input" name="PlaCustId" value={toOthersInfo.PlaCustId} />
                                        <input type="input" name="PageReturnUrl" value={toOthersInfo.PageReturnUrl} />
                                        <input type="input" name="BgRetUrl" value={toOthersInfo.BgRetUrl} />
                                        <input type="input" name="TransTyp" value={toOthersInfo.TransTyp} />
                                        <input type="input" name="mac" value={toOthersInfo.mac} />
                                    </form>
                                </div>
                    :``
                }



            </div>
        );
    }
}
function mapStateToProps(state) {
    const { auth,account } = state.toJS();
    return {
        auth,
        account
    };
}
export default connect(mapStateToProps)(BohaiInfo);

