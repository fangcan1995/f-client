import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import BbhModal from "../../../../components/modal/bbh_modal";
import {modal_config} from "../../../../utils/modal_config";
import { message } from 'antd';
import  {accountAc}  from '../../../../actions/account';
import './authInfo.less';

class MyAuthInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bbhModal:false,
            currentModule:``,
            key:Math.random(),
            disabled:true,
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.bindCard= this.bindCard.bind(this);
        this.changeCard= this.changeCard.bind(this);
        this.setTradePass= this.setTradePass.bind(this);
        this.changePhone= this.changePhone.bind(this);
    }

    //模态框开启关闭
    toggleModal=(modal,visile)=>{
        if(visile){
            this.setState({
                bbhModal:true,
                currentModule: modal,

            });
        }else{
            this.setState({
                bbhModal:false,
                currentModule: ``,
                key:Math.random()
            });
        }
    };
    componentDidMount() {
        window.scrollTo(0,0);
        this.props.dispatch(accountAc.getAccountInfo());  //获取会员帐户信息
        this.props.dispatch(accountAc.getFuyouInfo({type:'ReOpenAccount'})); //获取换卡需携带的信息

    }
    bindCard(){
        let {dispatch, account} = this.props;
        let {isPosting,isFetching,accountsInfo,toOthersInfo,postResult,isOpenOthers}=account;
        //先获取换卡需携带的信息，正确的话提交表单
        dispatch(accountAc.getBohaiInfo({type:'OpenAccount',url:`my-settings_my-authInfo`}))
            .then(
                (res)=>{
                    toOthersInfo=res.value;
                    if(toOthersInfo.code==406  ){
                        this.setState({
                            disabled:false
                        });
                        message.info(toOthersInfo.message);
                    }else if(toOthersInfo!=``){
                        document.getElementById('form1').submit();
                        dispatch(accountAc.change_goOutState(true));
                    }
                }
            )
            .catch();
    }
    changeCard(){
        let {dispatch, account} = this.props;
        let {isPosting,isFetching,accountsInfo,toOthersInfo,postResult,isOpenOthers}=account;
        //先获取换卡需携带的信息，正确的话提交表单
        dispatch(accountAc.getBohaiInfo({type:'ReOpenAccount',url:`my-settings_my-authInfo`}))
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
    callback(status){
        this.props.dispatch(accountAc.clear()); //清空结果
        this.toggleModal('bbhModal',false);
    }
    closeModal(status){
        this.props.dispatch(accountAc.getAccountInfo());  //成功重载数据,暂时注释掉
        this.props.dispatch(accountAc.clear()); //清空结果
        this.toggleModal('bbhModal',false);
    }
    render(){
        let {dispatch,account,auth}=this.props;
        const {isFetching,accountsInfo,toOthersInfo}=account;
        const {postResult,isCertification,isPhoneNumber,isOpenAccount,isSetTradepassword,trueName,phoneNumber,idNumber,bankNo}=accountsInfo;
        return(
            <div className="member__main">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="基本信息">
                            {
                                (accountsInfo==``)?<div></div>
                                    :<table className="authInfo">
                                        <tbody>
                                        <tr className={(isOpenAccount==='1')? '' : 'no'}>
                                            <th><i className="iconfont icon-user"></i>真实姓名</th>
                                            <td className="Result">{(isOpenAccount==='1')? '已认证' : '未认证'}</td>
                                            <td className="detail">{(isOpenAccount==='1')? trueName : ''}</td>
                                            <td className="operate">
                                                {(isOpenAccount==='1')? ''
                                                    : <a href="javascript:void(0);"  onClick={() => this.toggleModal(`ModalCertification`,true)}>认证</a>
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><i className="iconfont icon-phone"></i>手机号</th>
                                            <td className="Result">已设置</td>
                                            <td className="detail">{phoneNumber}</td>
                                            <td className="operate"><a href="javascript:void(0);" onClick={this.changePhone}>更改</a></td>
                                        </tr>
                                        <tr className={(isOpenAccount==='1')? '' : 'no'}>
                                            <th><i className="iconfont icon-user"></i>实名认证</th>
                                            <td className="Result">{(isOpenAccount==='1')? '已认证' : '未认证'}</td>
                                            <td className="detail">{(isOpenAccount==='1')? trueName : ''}</td>
                                            <td className="operate">
                                                {(isOpenAccount==='1')? ''
                                                    : <a href="javascript:void(0);"  onClick={() => this.toggleModal(`ModalCertification`,true)}>认证</a>
                                                }
                                            </td>
                                        </tr>
                                        <tr className={(isOpenAccount==='1')? '' : 'no'}>
                                            <th><i className="iconfont icon-card"></i>银行卡</th>
                                            <td className="Result">{(isOpenAccount==='1')? '已开户' : '未开户'}</td>
                                            <td className="detail">{(isOpenAccount==='1')? bankNo : ''}</td>
                                            <td className="operate">
                                                {(isOpenAccount==='1')? <a href="javascript:void(0);" onClick={this.changeCard}>更换</a>
                                                    : <a href="javascript:void(0);" onClick={this.bindCard}>开户</a>
                                                }

                                            </td>
                                        </tr>
                                        <tr className={(isOpenAccount==='1')? '' : 'no'}>
                                            <th><i className="iconfont icon-card"></i>银行卡</th>
                                            <td className="Result">已开户</td>
                                            <td className="detail">123****123</td>
                                            <td className="operate">
                                                <a href="javascript:void(0);" onClick={this.changeCard}>更换</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><i className="iconfont icon-Pass"></i>登录密码</th>
                                            <td className="Result">已设置</td>
                                            <td className="detail">******</td>
                                            <td className="operate">
                                                <a href="javascript:void(0);"
                                                   onClick={() => this.toggleModal(`ModalLoginPassword`,true)}>
                                                    修改登录密码
                                                </a>
                                            </td>
                                        </tr>
                                        <tr className={(isOpenAccount==='1')? '' : 'no'}>
                                            <th><i className="iconfont icon-Pass"></i>交易密码</th>
                                            <td className="Result">{(isOpenAccount==='1')? '已设置' : '未设置'}</td>
                                            <td className="detail">{(isOpenAccount==='1')? '******' : ''}</td>
                                            <td className="operate">
                                                {(isOpenAccount==='1')? <a href="javascript:void(0);" onClick={this.setTradePass}>重新设置交易密码</a>
                                                    : <a href="javascript:void(0);" onClick={this.setTradePass}>设置交易密码</a>
                                                }
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                            }
                            {/*换手机号*/}
                            <Tab>
                                <div name="换手机号信息">
                                    <form name="form_changePhone" id="form_changePhone" method="post" acceptCharset="GBK" action='http://221.239.93.141:9080/bhdep/hipos/payTransaction' target='_blank'>
                                        <input type="input" name="char_set" value={toOthersInfo.char_set} />
                                        <input type="input" name="partner_id" value={toOthersInfo.partner_id} />
                                        <input type="input" name="version_no" value={toOthersInfo.version_no} />
                                        <input type="input" name="biz_type" value={toOthersInfo.biz_type} />
                                        <input type="input" name="sign_type" value={toOthersInfo.sign_type} />
                                        <input type="input" name="MerBillNo" value={toOthersInfo.MerBillNo} />
                                        <input type="input" name="PlaCustId" value={toOthersInfo.PlaCustId} />
                                        <input type="input" name="MobileNo" value={toOthersInfo.MobileNo} />
                                        <input type="input" name="PageReturnUrl" value={toOthersInfo.PageReturnUrl} />
                                        <input type="input" name="BgRetUrl" value={toOthersInfo.BgRetUrl} />
                                        <input type="input" name="TransTyp" value={toOthersInfo.TransTyp} />
                                        <input type="input" name="MerPriv" value={toOthersInfo.MerPriv} />
                                        <input type="input" name="mac" value={toOthersInfo.mac} />
                                    </form>
                                </div>
                            </Tab>
                            <Tab>
                                <div name="找回/设置交易密码">
                                    <form name="form_setTradeCode" id="form_setTradeCode" method="post" acceptCharset="GBK" action='http://221.239.93.141:9080/bhdep/hipos/payTransaction' target='_blank'>
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
                            </Tab>
                            <Tab>
                                <div name="修改绑定银行卡">
                                    <form name="form_changeCard" id="form_changeCard" method="post" acceptCharset="GBK" action='http://221.239.93.141:9080/bhdep/hipos/payTransaction' target='_blank'>
                                        <input type="input" name="char_set" value={toOthersInfo.char_set} />
                                        <input type="input" name="partner_id" value={toOthersInfo.partner_id} />
                                        <input type="input" name="version_no" value={toOthersInfo.version_no} />
                                        <input type="input" name="biz_type" value={toOthersInfo.biz_type} />
                                        <input type="input" name="sign_type" value={toOthersInfo.sign_type} />
                                        <input type="input" name="MerBillNo" value={toOthersInfo.MerBillNo} />
                                        <input type="input" name="PlaCustId" value={toOthersInfo.PlaCustId} />
                                        <input type="input" name="PageReturnUrl" value={toOthersInfo.PageReturnUrl} />
                                        <input type="input" name="BgRetUrl" value={toOthersInfo.BgRetUrl} />
                                        <input type="input" name="MerPriv" value={toOthersInfo.MerPriv} />
                                        <input type="input" name="TransTyp" value={toOthersInfo.TransTyp} />
                                        <input type="input" name="mac" value={toOthersInfo.mac} />
                                    </form>
                                </div>
                            </Tab>
                            <Tab>
                                <div name="开户">
                                    <form name="form1" id="form1" method="post" acceptCharset="GBK" action='http://221.239.93.141:9080/bhdep/hipos/payTransaction' target='_blank'>
                                        <input type="input" name="char_set" value={toOthersInfo.char_set} />
                                        <input type="input" name="partner_id" value={toOthersInfo.partner_id} />
                                        <input type="input" name="version_no" value={toOthersInfo.version_no} />
                                        <input type="input" name="biz_type" value={toOthersInfo.biz_type} />
                                        <input type="input" name="sign_type" value={toOthersInfo.sign_type} />
                                        <input type="input" name="MerBillNo" value={toOthersInfo.MerBillNo} />
                                        <input type="input" name="OpenType" value={toOthersInfo.OpenType} />
                                        <input type="input" name="MobileNo" value={toOthersInfo.MobileNo} />
                                        <input type="input" name="PageReturnUrl" value={toOthersInfo.PageReturnUrl} />
                                        <input type="input" name="BgRetUrl" value={toOthersInfo.BgRetUrl} />
                                        <input type="input" name="TransTyp" value={toOthersInfo.TransTyp} />
                                        <input type="input" name="MerPriv" value={toOthersInfo.MerPriv} />
                                        <input type="input" name="mac" value={toOthersInfo.mac} />

                                    </form>
                                </div>
                            </Tab>
                        </div>
                    </Tab>

                </div>
                {this.state.currentModule!=``?
                    <BbhModal
                        config={modal_config[this.state.currentModule]}
                        visible={this.state.bbhModal}
                        closeFunc={()=>this.closeModal()}
                        moduleName={this.state.currentModule}
                        repeat={true}
                        /*stepslength={2}*/
                        returnPage={`my-settings_my-authInfo`}
                        key={this.state.key}
                    >

                    </BbhModal>
                    :``
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { auth,account } = state.toJS();
    return {
        auth,
        account
    };
}
export default connect(mapStateToProps)(MyAuthInfo);

