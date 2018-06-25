import React from 'react';
import PropTypes from 'prop-types';
import Crumbs from '../../../components/crumbs/crumbs';
import Tab from '../../../components/tab/tab';
import { connect } from 'react-redux';
import {accountAc} from '../../../actions/account';
import {toMoney,addCommas} from '../../../utils/famatData';
import {formItemLayout, hasErrors, noop} from "../../../utils/formSetting";
import { Form,Input,Button} from 'antd';
import {hex_md5} from "../../../utils/md5";
import './withdrawals.less';
import investDetailActions from "../../../actions/invest-detail";
import {Loading,NoRecord,Posting} from '../../../components/bbhAlert/bbhAlert';
import PriceInput from "../../../components/price-input/price-input";
import { Link, withRouter } from 'react-router-dom';
const createForm = Form.create;
const FormItem = Form.Item;

class Withdrawals extends React.Component{
    constructor(props) {
        super(props);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    componentWillMount() {
        window.scrollTo(0,0);
        this.props.dispatch(accountAc.clear());
        this.props.dispatch(accountAc.getAccountInfo());
    }
    componentDidMount() {
        //this.props.dispatch(accountAc.getAccountInfo());
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
                tradePwd: hex_md5(form.getFieldsValue().password),
            }
            dispatch(accountAc.getFuyouInfo(getInfo))
                .then((res) => {
                    toOthersInfo = res.value;
                    if (toOthersInfo.code == 406) {
                    } else if (toOthersInfo != ``) {
                        document.getElementById('FuiouCash').submit();
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
        const {availableBalance}=this.props.account.accountsInfo;
        this.setState({
            amount:value.number
        });
        if(parseFloat(value.number) < 10){
            callback('提现金额不能小于10元');
            return false;
        }
        if(parseFloat(value.number) > parseFloat(availableBalance)){
            callback(`提现金额不能超过${addCommas(availableBalance)}元`);
            return false;
        }
        callback();
        return;
    }
    render(){
        let {isPosting,isFetching,accountsInfo,toOthersInfo,postResult}=this.props.account;
        let {isOpenAccount,availableBalance}=accountsInfo;
        const { getFieldDecorator,getFieldsError } = this.props.form;
        const passwordProps = getFieldDecorator('password', {
            rules: [
                { required: true, min: 6, message: '交易密码至少为 6 个字符' }
            ]
        });
        return (
            <div className="member__main withdrawals">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="提现">
                            <div className="tab_content" style={{width:'400px'}}>
                                {
                                    (isOpenAccount===`0`)?
                                        <p className="info"><strong>提示：</strong>亲爱的用户，您还没有绑定银行卡，请先
                                            <Link to="/my-account/bank-card" style={{color: '#31aaf5'}}> 绑定银行卡！</Link>
                                        </p>
                                        :
                                        (isOpenAccount===`1`)?
                                        <div className="form__wrapper">
                                            <Form layout="horizontal" onSubmit={this.handleSubmit}>
                                                <FormItem
                                                    { ...formItemLayout }
                                                    label="可用余额"
                                                >
                                                    {toMoney(availableBalance)}元
                                                </FormItem>
                                                <FormItem className='price'
                                                    { ...formItemLayout }
                                                    label="提现金额"
                                                    required
                                                >
                                                    {getFieldDecorator('price', {
                                                        initialValue: { number: `` },
                                                        rules: [{ validator: this.checkPrice }],
                                                    })(<PriceInput  />)}
                                                </FormItem>
                                                <FormItem
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
                                                </FormItem>
                                            {/*<dl className="form__bar">
                                                <dt><label>提现金额:</label></dt>
                                                <dd>
                                                    <input  maxLength={8} type="text" className="textInput moneyInput" ref="amount" onChange={this.handleChange}　/>
                                                    <span className="unit">元</span>
                                                    <a href="">银行卡充值上限说明</a>
                                                </dd>
                                            </dl>*/}
                                                <FormItem className='tips'>
                                                    {
                                                        (toOthersInfo!=`` && toOthersInfo.code==406)?
                                                            <div className="errorMessages">{toOthersInfo.message}</div>
                                                            :``
                                                    }
                                                </FormItem>
                                                <FormItem className='center'>
                                                    {(isPosting) ? <Button type="primary" htmlType="submit" className="pop__large" disabled={true}>
                                                            <Posting isShow={isPosting}/>
                                                        </Button>
                                                        :
                                                        <Button type="primary" htmlType="submit" className="pop__large" disabled={ hasErrors(getFieldsError())  }>确认</Button>
                                                    }
                                                </FormItem>

                                            </Form>
                                            <form name="FuiouCash" id="FuiouCash" method="post" action={toOthersInfo.url} >
                                                <input type="hidden" name="mchnt_cd" value={toOthersInfo.mchnt_cd} />
                                                <input type="hidden" name="mchnt_txn_ssn" value={toOthersInfo.mchnt_txn_ssn} />
                                                <input type="hidden" name="login_id" value={toOthersInfo.login_id} />
                                                <input type="hidden" name="amt" value={toOthersInfo.amt} />
                                                <input type="hidden" name="page_notify_url" value={toOthersInfo.page_notify_url} />
                                                <input type="hidden" name="back_notify_url" value={toOthersInfo.back_notify_url}/>
                                                <input type="hidden" name="signature" value={toOthersInfo.signature} />
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