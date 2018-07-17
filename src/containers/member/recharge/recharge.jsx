import React from 'react';
import PropTypes from 'prop-types';
import Crumbs from '../../../components/crumbs/crumbs';
import Tab from '../../../components/tab/tab';
import { connect } from 'react-redux';
import {accountAc} from '../../../actions/account';
import {toMoney,getTips} from '../../../utils/famatData';
import {formItemLayout, hasErrors, noop} from "../../../utils/formSetting";
import PriceInput from "../../../components/price-input/price-input";
import { Form,Input,Button  } from 'antd';
import BohaiInfo from '../../../components/bohai-info/bohai-info';
import './recharge.less';
/*import {Loading,NoRecord,Posting} from '../../../components/bbhAlert/bbhAlert';
import { Link, withRouter } from 'react-router-dom';
import {authBank} from '../../../utils/url';
import {modal_config} from "../../../utils/modal_config";
import {hex_md5} from "../../../utils/md5";*/


const createForm = Form.create;
const FormItem = Form.Item;

class Recharge extends React.Component{

    componentWillMount() {
        window.scrollTo(0,0);
        this.props.dispatch(accountAc.clear());
        this.props.dispatch(accountAc.getAccountInfo());  //获取账户信息
    }
    handleSubmit= (e) => {
        e.preventDefault();
        const {dispatch, form, account} = this.props;
        let {isPosting, isFetching, accountsInfo, toOthersInfo, postResult, isOpenOthers} = account;
        form.validateFields((errors) => {
            if (errors) {
                return false;
            }
            let getInfo = {
                type: 'reCharge',
                url: 'my-account_recharge',
                value: form.getFieldsValue().price.number,
            }
            dispatch(accountAc.getBohaiInfo(getInfo)).then(
                (res) => {
                    toOthersInfo = res.value;
                    if (toOthersInfo.code == 406) {

                    } else if (toOthersInfo != ``) {
                        document.getElementById('form1').submit();
                    }
                }
            ).catch(

            )
        });
    }
    checkPrice = (rule, value, callback) => {
        const {availableBalance,bohaiConfig}=this.props.account.accountsInfo;
        this.setState({
            amount:value.number
        });
        if(parseFloat(value.number) < parseFloat(bohaiConfig.rechargeMin)){
            callback(`充值金额不能小于${bohaiConfig.rechargeMin}元`);
            return false;
        }
        if(parseFloat(value.number) >= parseFloat(bohaiConfig.rechargeMax)){
            callback(`充值金额不能大于${bohaiConfig.rechargeMax}元`);
            return false;
        }
        callback();
        return;
    }
    render(){
        let {isPosting,isFetching,accountsInfo,toOthersInfo,postResult}=this.props.account;
        console.log('去充值需要携带的信息');
        console.log(toOthersInfo);
        let {isCertification,isOpenAccount,bankName,bankNo,bankCode,availableBalance,bohaiConfig}=accountsInfo;
        const { getFieldDecorator,getFieldsError } = this.props.form;
        return (
            <div className="member__main recharge">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="快速充值">
                            <div className="tab_content" >
                                {
                                    (isOpenAccount ===`0` ) ?
                                        <div className="info"><strong>提示：</strong>您还没有开通渤海银行存管账户，请先
                                            <BohaiInfo type={`bindCard`} url={`my-account_recharge`}>开通存管账户</BohaiInfo>
                                        </div>
                                        : (isOpenAccount===`1`)?
                                            <div className="form__wrapper">
                                                {/*<div className='about_bankCard'>
                                                    <div className='member_card'>
                                                        <img src={require(`../../../assets/images/bank/logo_${bankCode}.jpg`)} alt=""/>
                                                        <span>{bankNo}</span>
                                                    </div>
                                                    <div className='member_card'>
                                                        <img src={require(`../../../assets/images/bank/logo_${bankCode}.jpg`)} alt=""/>
                                                        <span>{bankNo}</span>
                                                    </div>
                                                    <p>充值限额：单笔限额<span className='text-primary'>￥50000.00</span>、
                                                        每日限额<span className='text-primary'>￥200000.00</span>、
                                                        每月限额<span className='text-primary'>￥6000000.00</span></p>
                                                </div>*/}
                                                <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)} style={{width:'400px'}}>
                                                    <FormItem
                                                        { ...formItemLayout }
                                                        label="可用余额"
                                                    >
                                                        {(availableBalance>=0)?`${toMoney(availableBalance)}元`:``}
                                                    </FormItem>
                                                    <FormItem className='price'
                                                        { ...formItemLayout }
                                                        label="充值金额"
                                                        required
                                                    >
                                                        {getFieldDecorator('price', {
                                                            initialValue: { number: `0` },
                                                            rules: [{ validator: this.checkPrice }],
                                                        })(<PriceInput />)}
                                                    </FormItem>
                                                    <FormItem className='tips'>
                                                        {
                                                            (toOthersInfo!=`` && toOthersInfo.code==406)?
                                                                <div className="errorMessages">{getTips(toOthersInfo.message).message}</div>
                                                                :``
                                                        }
                                                    </FormItem>
                                                    <FormItem className='center'>
                                                        <Button type="primary" htmlType="submit" className="pop__large" disabled={ hasErrors(getFieldsError())  }>确认</Button>
                                                    </FormItem>

                                                </Form>

                                            </div>
                                        :``
                                }
                            </div>
                            <form name="form1" id="form1" method="post" acceptCharset="GBK" action={toOthersInfo.url} >
                                <input type="hidden" name="char_set" value={toOthersInfo.char_set} />
                                <input type="hidden" name="partner_id" value={toOthersInfo.partner_id} />
                                <input type="hidden" name="version_no" value={toOthersInfo.version_no} />
                                <input type="hidden" name="biz_type" value={toOthersInfo.biz_type} />
                                <input type="hidden" name="sign_type" value={toOthersInfo.sign_type} />
                                <input type="hidden" name="MerBillNo" value={toOthersInfo.MerBillNo} />
                                <input type="hidden" name="PlaCustId" value={toOthersInfo.PlaCustId} />
                                <input type="hidden" name="TransAmt" value={toOthersInfo.TransAmt} />
                                <input type="hidden" name="MerFeeAmt" value={toOthersInfo.MerFeeAmt} />
                                <input type="hidden" name="FeeType" value={toOthersInfo.FeeType} />
                                <input type="hidden" name="OpenType" value={toOthersInfo.OpenType} />
                                <input type="hidden" name="MobileNo" value={toOthersInfo.MobileNo} />
                                <input type="hidden" name="PageReturnUrl" value={toOthersInfo.PageReturnUrl} />
                                <input type="hidden" name="BgRetUrl" value={toOthersInfo.BgRetUrl} />
                                <input type="hidden" name="TransTyp" value={toOthersInfo.TransTyp} />
                                <input type="hidden" name="MerPriv" value={toOthersInfo.MerPriv} />
                                <input type="hidden" name="mac" value={toOthersInfo.mac} />
                            </form>
                        </div>
                    </Tab>
                </div>
                <div className="member__cbox">
                    <Tab>
                        <div name="温馨提示">
                            <div className="tab_content">
                                <div className="m-wxts">
                                    <p> 1. 需完成实名认证并绑定银行卡后，才能进行充值操作；<br/>
                                        2. 请使用借记卡充值，信用卡无法充值；<br/>
                                        3. 充值服务手续费0元<br/>
                                        4. 充值金额将会在充值成功后10-15分钟内到账，请耐心等候；<br/>
                                        5. 单笔充值金额需大于或等于10元；<br/>
                                        6. 单笔充值如果超出银行卡支付限额，可以拆分金额多次充值；<br/>
                                        7. 每日的充值限额依据各银行限额为准，请注意您的银行卡充值限制，以免造成不便；<br/>
                                        8. 如果在充值过程中遇到问题请联系客服：400-024-0909，我们将竭诚为您服务。
                                    </p>
                                </div>
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
        auth,account
    };
}
export default connect(mapStateToProps)(createForm()(Recharge));