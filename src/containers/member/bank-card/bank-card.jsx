import React from 'react';
import PropTypes from 'prop-types';
import Tab from '../../../components/tab/tab';
import Crumbs from '../../../components/crumbs/crumbs';
import { connect } from 'react-redux';
import {accountAc} from '../../../actions/account';
import { Button  } from 'antd';
import {message} from "antd/lib/index";
import './bank-card.less';

class BankCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            disabled:true,
        }
    }
    componentDidMount() {
        window.scrollTo(0,0);
        this.props.dispatch(accountAc.getAccountInfo()); //获取会员帐户信息
    }
    bindCard(){
        let {dispatch, account} = this.props;
        let {toOthersInfo}=account;
        //先获取绑卡需携带的信息，正确的话提交表单
        dispatch(accountAc.getBohaiInfo({type:'OpenAccount',url:`bank-card`}))
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
                        //dispatch(accountAc.change_goOutState(true));
                    }
                }
            )
            .catch();
    }
    changeCard(){
        let {dispatch, account} = this.props;
        let {toOthersInfo}=account;
        //先获取换卡需携带的信息，正确的话提交表单
        dispatch(accountAc.getBohaiInfo({type:'ReOpenAccount',url:`bank-card`}))
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
                    }
                }
            )
            .catch();
    }
    render(){
        let {account}=this.props;
        let {postResult,accountsInfo,toOthersInfo}=account;
        let {isCertification,isOpenAccount,bankName,bankNo,trueName,isSetTradepassword}=account.accountsInfo;
        return (
            <div className="member__main">
                <Crumbs />
                <div className="member__cbox">
                    <Tab>
                        <div name="我的银行卡">
                            <div className="tab_content">
                                {
                                    (isOpenAccount === `0`) ?<div className="addCard">
                                            <p>为保证账户资金安全，请绑定本人的银行卡</p>
                                            <div className="grayCard">
                                                <a href="javascript:void(0);" onClick={this.bindCard.bind(this)}>
                                                    <i className="iconfont add"></i>
                                                    <p>绑定银行卡！</p>
                                                </a>
                                            </div>
                                        </div>
                                        :(isOpenAccount === `1`) ?
                                        <div className="editCard">
                                            <div className="form__wrapper">
                                                <div className="card">
                                                    <p><strong>用户名</strong>{trueName}</p>
                                                    <p><strong>银行账号</strong>{bankNo}</p>
                                                    <p><strong>开户行</strong>{bankName}</p>
                                                </div>
                                                <div className="form__bar">
                                                    {toOthersInfo.code==`406`?<div className="errorMessages">{toOthersInfo.message}</div>
                                                        :``
                                                    }
                                                </div>
                                                <div className="form__bar">
                                                    <Button type="primary"  className="pop__large" onClick={this.changeCard.bind(this)}>更换银行卡</Button>
                                                </div>
                                            </div>
                                        </div>
                                        :``
                                }

                            </div>
                            <div>开户信息</div>
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
                            <div>换银行卡信息</div>
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

                </div>
                <div className="member__cbox m-wxts">
                    <Tab>
                        <div name="温馨提示">
                            <div className="tab_content">
                                <p>1、目前只支持储蓄卡<br/>2、不支持信用卡<br/>3、目前只能支持一张银行卡，可以修改</p>
                            </div>
                        </div>
                    </Tab>
                </div>
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
export default connect(mapStateToProps)(BankCard);

