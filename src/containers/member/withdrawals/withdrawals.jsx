import React from 'react';
import PropTypes from 'prop-types';
import Crumbs from '../../../components/crumbs/crumbs';
import Tab from '../../../components/tab/tab';
import { connect } from 'react-redux';
import {accountAc} from '../../../actions/account';
import {toMoney, addCommas, getTips} from '../../../utils/famatData';
import {formItemLayout, hasErrors, noop} from "../../../utils/formSetting";
import { Form,Input,Button,Radio } from 'antd';
import BohaiInfo from '../../../components/bohai-info/bohai-info';
import PriceInput from "../../../components/price-input/price-input";
import './withdrawals.less';
/*import investDetailActions from "../../../actions/invest-detail";
import {Loading,NoRecord,Posting} from '../../../components/bbhAlert/bbhAlert';
import {hex_md5} from "../../../utils/md5";
import { Link, withRouter } from 'react-router-dom';
import {authBank} from '../../../utils/url';
import {modal_config} from "../../../utils/modal_config";*/

const createForm = Form.create;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class Withdrawals extends React.Component{
    state = {
        value: 0,
        amount:``,
        MerFeeAmt:``,
    }

    componentWillMount() {
        window.scrollTo(0,0);
        this.props.dispatch(accountAc.clear());
        this.props.dispatch(accountAc.getAccountInfo());
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
                type: 'Withdrawals',
                url: 'my-account_withdrawals',
                value: form.getFieldsValue().price.number,
                FastFlag:this.state.value,  //到账方式 0:T+1 1:T+0
                MerFeeAmt:0  //手续费
                /*tradePwd: hex_md5(form.getFieldsValue().password),*/
            }
            dispatch(accountAc.getBohaiInfo(getInfo))
                .then((res) => {
                    toOthersInfo = res.value;
                    if (toOthersInfo.code == 406) {
                    } else if (toOthersInfo != ``) {
                        document.getElementById('form1').submit();
                    }
                })
                .catch(() => {
                    //没获取到
                    console.log('没获取到');
                });
            ;



        });
    }
    checkPrice = (rule, value, callback) => {
        const {availableBalance,bohaiConfig}=this.props.account.accountsInfo;
        const { withdrawalsHandFeePer,withdrawalsHandFeeMin}=bohaiConfig;
        let handFree=0;
        if((value.number*withdrawalsHandFeePer*0.01)>withdrawalsHandFeeMin){
            handFree=value.number*withdrawalsHandFeePer*0.01
        }else{
            handFree=withdrawalsHandFeeMin;
        }
        this.setState({
            amount:value.number,
            MerFeeAmt:handFree
        });
        if(parseFloat(value.number) < parseFloat(bohaiConfig.withdrawalsMin)){
            callback(`提现金额不能小于${bohaiConfig.withdrawalsMin}元`);
            return false;
        }
        let max=0;
        parseFloat(availableBalance)>parseFloat(bohaiConfig.withdrawalsMax)?max=parseFloat(bohaiConfig.withdrawalsMax):max=parseFloat(availableBalance)
        if(parseFloat(value.number) > max){
            callback(`提现金额不能超过${addCommas(max)}元`);
            return false;
        }
        callback();
        return;
    }
    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }
    render(){
        let {isPosting,isFetching,accountsInfo,toOthersInfo,postResult}=this.props.account;
        console.log('去提现需要携带的信息');
        console.log(toOthersInfo);
        let {isOpenAccount,availableBalance,bankCode,bankNo,bohaiConfig}=accountsInfo;
        const { getFieldDecorator,getFieldsError } = this.props.form;

        /*let { withdrawalsHandFeePer,withdrawalsHandFeeMin}=bohaiConfig;
        if((form.getFieldsValue().price.number*withdrawalsHandFeePer*0.01)>withdrawalsHandFeeMin){
            handFree=form.getFieldsValue().price.number*withdrawalsHandFeePer*0.01
        }else{
            handFree=withdrawalsHandFeeMin;
        }*/

        /*const passwordProps = getFieldDecorator('password', {
            rules: [
                { required: true, min: 6, message: '交易密码至少为 6 个字符' }
            ]
        });*/
        return (
            <div className="member__main withdrawals">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="提现">
                            <div className="tab_content" style={{width:'400px'}}>

                                {
                                    (isOpenAccount===`0`)?
                                        <div className="info"><strong>提示：</strong>您还没有开通渤海银行存管账户，请先
                                            <BohaiInfo type={`bindCard`} url={`my-account_withdrawals`}>开通存管账户</BohaiInfo>
                                        </div>
                                        :
                                        (isOpenAccount===`1`)?
                                        <div className="form__wrapper">


                                            <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>

                                                {/*<FormItem
                                                    { ...formItemLayout }
                                                    label="到账银行卡"
                                                >
                                                    <div className='member_card'>
                                                        <img src={require(`../../../assets/images/bank/logo_${bankCode}.jpg`)} alt=""/>
                                                        <span>{bankNo}</span>
                                                    </div>
                                                </FormItem>*/}
                                                <FormItem
                                                    { ...formItemLayout }
                                                    label="可用余额"
                                                >
                                                    <span className='text-primary m-text-size'>{toMoney(availableBalance)}</span> 元
                                                </FormItem>
                                                <FormItem className='price'
                                                    { ...formItemLayout }
                                                    label="提现金额"
                                                    required
                                                >
                                                    {getFieldDecorator('price', {
                                                        initialValue: { number: `0` },
                                                        rules: [{ validator: this.checkPrice }],
                                                    })(<PriceInput  />)}
                                                </FormItem>
                                                <FormItem
                                                    { ...formItemLayout }
                                                    label="提现方式"
                                                >
                                                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                                                        <Radio value={0}><span className='m-text-size'>普通提现 | </span>下一个工作日到账，节假日顺延 | 单笔限额300000.00元。限当日 00:10至23:00 申请</Radio>
                                                        <Radio value={1}><span className='m-text-size'>快速提现 | </span>预计当日到账 | 当日剩余额度50000.00元。限工作日 08:00至17:00 申请</Radio>
                                                    </RadioGroup>
                                                </FormItem>
                                                <FormItem
                                                    { ...formItemLayout }
                                                    label="待付手续费"
                                                >
                                                    <span className='text-primary m-text-size'>
                                                        {
                                                            hasErrors(getFieldsError())? `0.00`:toMoney(this.state.MerFeeAmt)
                                                        }
                                                        </span> 元
                                                </FormItem>
                                                <FormItem
                                                    { ...formItemLayout }
                                                    label="实际到账"
                                                >
                                                    <span className='text-primary m-text-size'>

                                                        {
                                                            hasErrors(getFieldsError())? `0.00` : toMoney(this.state.amount-this.state.MerFeeAmt)
                                                        }
                                                        </span>
                                                    元
                                                </FormItem>


                                                {/*<FormItem
                                                    { ...formItemLayout }
                                                    label="交易密码"
                                                    required
                                                >
                                                    {
                                                        passwordProps(
                                                            <Input
                                                                type="password"
                                                                autoComplete="off"
                                                                placeholder="请输入6-16位的交易密码"
                                                                onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                                            />
                                                        )
                                                    }
                                                </FormItem>*/}
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
                                            <form name="form1" id="form1" method="post" acceptCharset="GBK" action={toOthersInfo.url} >
                                                <input type="input" name="char_set" value={toOthersInfo.char_set} />
                                                <input type="input" name="partner_id" value={toOthersInfo.partner_id} />
                                                <input type="input" name="version_no" value={toOthersInfo.version_no} />
                                                <input type="input" name="biz_type" value={toOthersInfo.biz_type} />
                                                <input type="input" name="sign_type" value={toOthersInfo.sign_type} />
                                                <input type="input" name="MerBillNo" value={toOthersInfo.MerBillNo} />
                                                <input type="input" name="PlaCustId" value={toOthersInfo.PlaCustId} />
                                                <input type="input" name="TransAmt" value={toOthersInfo.TransAmt} />
                                                <input type="input" name="MerFeeAmt" value={toOthersInfo.MerFeeAmt} />
                                                <input type="input" name="FeeType" value={toOthersInfo.FeeType} />
                                                <input type="input" name="OpenType" value={toOthersInfo.OpenType} />
                                                <input type="input" name="MobileNo" value={toOthersInfo.MobileNo} />
                                                <input type="input" name="PageReturnUrl" value={toOthersInfo.PageReturnUrl} />
                                                <input type="input" name="BgRetUrl" value={toOthersInfo.BgRetUrl} />
                                                <input type="input" name="TransTyp" value={toOthersInfo.TransTyp} />
                                                <input type="input" name="FastFlag" value={toOthersInfo.FastFlag} />
                                                <input type="input" name="MerPriv" value={toOthersInfo.MerPriv} />
                                                <input type="input" name="mac" value={toOthersInfo.mac} />

                                            </form>

                                        </div>
                                            :``
                                }


                            </div>
                        </div>
                    </Tab>
                </div>
                <div className="member__cbox m-wxts">
                    <Tab>
                        <div name="温馨提示">
                            <div className="tab_content">
                                <div className="m-wxts">
                                    <p> 1. 需完成实名认证并绑定提现银行卡后，才能进行提现操作；<br/>
                                        2. 提现银行卡仅支持借记卡，不支持信用卡、存折提现；<br/>
                                        3. 提现金额单笔上限为50万元，单日提现总额无上限；<br/>
                                        4. 提现申请成功后，资金预计T+3日到账，工作日最快2小时到账，实际以富友支付处理时效为准；<br/>
                                        5. 当单笔提现金额>5万元，可能会出现多笔到账记录，具体以富友支付风控为准；<br/>
                                        6. 提现过程遇到问题时，请（工作日9:00-18:00）咨询
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
        auth,
        account
    };
}

Withdrawals = connect(mapStateToProps)(createForm()(Withdrawals));
export default connect(mapStateToProps)(Withdrawals);