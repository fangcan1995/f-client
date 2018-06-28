import React from 'react';
import PropTypes from 'prop-types';
import Crumbs from '../../../components/crumbs/crumbs';
import Tab from '../../../components/tab/tab';
import { connect } from 'react-redux';
import {accountAc} from '../../../actions/account';
import {toMoney,addCommas,toNumber,getTips} from '../../../utils/famatData';
import {Loading,NoRecord,Posting} from '../../../components/bbhAlert/bbhAlert';
import { Link, withRouter } from 'react-router-dom';
import {formItemLayout, hasErrors, noop} from "../../../utils/formSetting";
import PriceInput from "../../../components/price-input/price-input";
import { Form,Input,Button  } from 'antd';
import './recharge.less';
import {hex_md5} from "../../../utils/md5";

const createForm = Form.create;
const FormItem = Form.Item;

class Recharge extends React.Component{
    constructor(props) {
        super(props);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    componentWillMount() {
        window.scrollTo(0,0);
        this.props.dispatch(accountAc.clear());
        this.props.dispatch(accountAc.getAccountInfo());  //????
    }
    componentDidMount() {
        //this.props.dispatch(accountAc.getAccountInfo());  //????
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
            dispatch(accountAc.getFuyouInfo(getInfo))
                .then((res) => {
                    //console.log('给富有的');
                    //console.log(toOthersInfo);
                    toOthersInfo = res.value;
                    if (toOthersInfo.code == 406) {
                    } else if (toOthersInfo != ``) {
                        document.getElementById('webReg').submit();
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
            callback('充值金额不能小于10元');
            return false;
        }
        if(parseFloat(value.number) >= 100000000){
            callback(`充值金额必须小于100,000,000元`);
            return false;
        }
        callback();
        return;
    }
    render(){
        let {isPosting,isFetching,accountsInfo,toOthersInfo,postResult}=this.props.account;
        let {isCertification,isOpenAccount,bankName,bankNo,availableBalance}=accountsInfo;
        const { getFieldDecorator,getFieldsError } = this.props.form;
        return (
            <div className="member__main recharge">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="快速充值">
                            <div className="tab_content" style={{width:'400px'}}>
                                {
                                    (isOpenAccount ===`0` ) ?
                                        <p className="info"><strong>提示：</strong>亲爱的用户，您还没有绑定银行卡，请先
                                            <Link to="/my-account/bank-card" style={{color: '#31aaf5'}}> 绑定银行卡！</Link>
                                        </p>
                                        : (isOpenAccount===`1`)?
                                            <div className="form__wrapper">
                                                <Form layout="horizontal" onSubmit={this.handleSubmit}>
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
                                                            initialValue: { number: `` },
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
                                                        {(isPosting) ? <Button type="primary" htmlType="submit" className="pop__large" disabled={true}>
                                                                <Posting isShow={isPosting}/>
                                                            </Button>
                                                            :
                                                            <Button type="primary" htmlType="submit" className="pop__large" disabled={ hasErrors(getFieldsError())  }>确认</Button>
                                                        }
                                                    </FormItem>

                                                </Form>

                                                {/*<dl className="form__bar">
                                                    <dt><label>充值金额:</label></dt>
                                                    <dd>
                                                        <input  maxLength={8} type="text" className="textInput moneyInput" ref="amount" onChange={this.handleChange}　/>
                                                        <span className="unit">元</span>
                                                        <a href="">银行卡充值上限说明</a>
                                                    </dd>
                                                </dl>*/}

                                                {/*<div className="form__bar">
                                                    <p>充值后可用余额: <i id="money">1,000.00</i>元</p>
                                                </div>*/}
                                                {/*<div className="form__bar">
                                                    {
                                                        (toOthersInfo!=`` && toOthersInfo.code==406)? <div className="errorMessages">{toOthersInfo.message}</div>
                                                            :``
                                                    }
                                                    {(this.state.tips!='')?
                                                        <div className="errorMessages">
                                                            {this.state.tips}
                                                        </div>:``
                                                    }
                                                </div>*/}
                                                {/*<div className="form__bar">
                                                    {isPosting ?
                                                        <Button type="primary" htmlType="submit" className='pop__large' disabled={true}>
                                                            <Posting isShow={isPosting}/>
                                                        </Button>
                                                        :
                                                        <Button type="primary" htmlType="submit" className="pop__large"
                                                                onClick={this.recharge}
                                                                disabled={this.state.disabled}>
                                                            确认
                                                        </Button>
                                                    }
                                                </div>*/}
                                            </div>
                                        :``
                                }
                            </div>
                            <form name="webReg" id="webReg" method="post"  action={toOthersInfo.url}>
                                <input type="hidden" name="mchnt_cd" value={toOthersInfo.mchnt_cd} />
                                <input type="hidden" name="mchnt_txn_ssn" value={toOthersInfo.mchnt_txn_ssn} />
                                <input type="hidden" name="login_id" value={toOthersInfo.login_id} />
                                <input type="hidden" name="amt" value={toOthersInfo.amt} />
                                <input type="hidden" name="page_notify_url" value={toOthersInfo.page_notify_url} />
                                <input type="hidden" name="back_notify_url" value={toOthersInfo.back_notify_url} />
                                <input type="hidden" name="signature" value={toOthersInfo.signature} />
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