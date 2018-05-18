import React from 'react';
import PropTypes from 'prop-types';
import Crumbs from '../../../components/crumbs/crumbs';
import Tab from '../../../components/tab/tab';
import { connect } from 'react-redux';
import {accountAc} from '../../../actions/account';
import {toMoney,addCommas} from '../../../utils/famatData';
import {checkMoney, income} from '../../../utils/cost';
import {formItemLayout, noop} from "../../../utils/formSetting";
import { Form,Row,Input,Button,Select,Checkbox,Col,Alert,Icon,Collapse  } from 'antd';
import {tradePasswordRegExp,amountExp } from '../../../utils/regExp';
import {hex_md5} from "../../../utils/md5";
import './withdrawals.less';
import investDetailActions from "../../../actions/invest-detail";
import {Loading,NoRecord,Posting} from '../../../components/bbhAlert/bbhAlert';

const Panel = Collapse.Panel;
const createForm = Form.create;
const FormItem = Form.Item;

class Withdrawals extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            value:'',
            tips:'',
            disabled:true,
        }
        this.withdrawals= this.withdrawals.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {
        //this.props.dispatch(memberAc.getInfo());
    }
    handleSubmit = (e) => {
       // e.preventDefault();
        const { dispatch, form, } = this.props;


        /*form.validateFields((errors) => {
            if (errors) {
                return false;
            }

            let appInfo={
                //tradePassword:hex_md5(form.getFieldsValue().newPassword),
                value:1000
            }
            console.log('即将提交的充值信息');
            //this.props.dispatch(accountAc.withdrawals(value));
        });*/

        this.props.dispatch(accountAc.getFuyouInfo({type:'Withdrawals',transAmt:1000})); //获取提现需携带的信息
        //3 下一步
        //this.modalClose();

    }
    componentDidUpdate() {
        let {dispatch, account} = this.props;
        let {isPosting,isFetching,accountsInfo,toOthersInfo,postResult,isOpenOthers}=account;

        if(toOthersInfo.code===406  ){
            console.log('不能请求');

        }else if(toOthersInfo!=``){
            console.log('富有信息是：');
            console.log(toOthersInfo);
            //document.getElementById('webReg').action=toOthersInfo.url;
            console.log('可以自动提交了');
            document.getElementById('FuiouCash').submit();
            //dispatch(investDetailActions.postInvest(appInfo,postResult.times));

        }
    }
    withdrawals(value){
        value=this.refs.amount.value;
        this.setState({
            disabled:true
        }); //还原按钮不可点击
        this.props.dispatch(accountAc.withdrawals(value));
    }
    handleChange(event){
        console.log(event);
        let result=checkMoney({
            'value':event.target.value,
            'type':0,
            'min_v':1,
            'max_v':this.props.account.accountsInfo.accountBalance,
            'label':'提现金额',
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
    render(){

        //let {openAccountStatus,amount,dummyResult}=this.props.member.accountsInfo;
        let {isPosting,isFetching,accountsInfo,toOthersInfo,postResult}=this.props.account;
        let {isCertification,isOpenAccount,bankName,bankNo,accountBalance}=accountsInfo;
        console.log()
        /*if(dummyResult.code==='0'){
            this.props.dispatch(accountAc.modifyState({dummyResult:''}));
            this.refs.amount.value='';
            this.props.dispatch(accountAc.getInfo());
        }*/
        const { getFieldDecorator,getFieldValue } = this.props.form;
/*        const newPasswordProps = getFieldDecorator('newPassword', {
            validate: [{
                rules: [
                    { required: true, pattern: tradePasswordRegExp, message: '密码长度为6-16位，必须包含数字、字母、符号' }

                ],
                trigger: ['onBlur', 'onChange']
            }]
        });*/
        /*const usernameProps = getFieldDecorator('username', {
            validate: [{
                rules: [
                    { required: true, pattern: amountExp, message: '请输入正确的金额' }
                ],
                trigger: 'onBlur'
            }]
        });*/
        console.log('结果');
        console.log(postResult);
        console.log(toOthersInfo);
        return (
            <div className="member__main withdrawals">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="提现">
                            <div className="tab_content" style={{width:'500px'}}>
                                {
                                    (isOpenAccount===`0`)?
                                        <p className="info"><strong>提示：</strong>亲爱的用户，您还没有绑定银行卡，请先
                                            <a to="/my-account/bank-card" style={{color: '#31aaf5'}}> 绑定银行卡！</a>
                                        </p>
                                        :
                                        <div className="form__wrapper">
                                            <dl className="form__bar">
                                                <dt><label>可用余额:</label></dt>
                                                <dd><i>{toMoney(accountsInfo.availableBalance)}</i>元</dd>
                                            </dl>
                                            <dl className="form__bar">
                                                <dt><label>提现金额:</label></dt>
                                                <dd>
                                                    <input  maxLength={8} type="text" className="textInput moneyInput" ref="amount" onChange={this.handleChange}　/>
                                                    <span className="unit">元</span>
                                                    <a href="">银行卡充值上限说明</a>
                                                </dd>
                                            </dl>
                                            <div className="form__bar">
                                                {
                                                    (toOthersInfo!=`` && toOthersInfo.code==406)? <div className="errorMessages">{toOthersInfo.message}</div>
                                                        :``
                                                }
                                                {(this.state.tips!='')?
                                                    <div className="errorMessages">
                                                        {this.state.tips}
                                                    </div>:``
                                                }
                                            </div>
                                            <div className="form__bar">
                                                {isFetching ?
                                                    <Button type="primary" htmlType="submit" className='pop__large' disabled={true}>
                                                        <Posting isShow={isFetching}/>
                                                    </Button>
                                                    :
                                                    <Button type="primary" htmlType="submit" className="pop__large"
                                                            onClick={this.handleSubmit}
                                                            disabled={this.state.disabled}>
                                                        确认
                                                    </Button>
                                                }
                                            </div>
                                            <form name="FuiouCash" id="FuiouCash" method="post" action={toOthersInfo.url} >
                                                mchnt_cd：<input type="text" name="mchnt_cd" value={toOthersInfo.mchnt_cd} /><br/>
                                                mchnt_txn_ssn：<input type="text" name="mchnt_txn_ssn" value={toOthersInfo.mchnt_txn_ssn} /><br/>
                                                login_id：<input type="text" name="login_id" value={toOthersInfo.login_id} /><br/>
                                                amt：<input type="text" name="amt" value={toOthersInfo.amt} /><br/>
                                                page_notify_url：<input type="text" name="page_notify_url" value={toOthersInfo.page_notify_url} /><br/>
                                                back_notify_url：<input type="text" name="back_notify_url" value={toOthersInfo.back_notify_url}/><br/>
                                                signature：<input type="text" name="signature" value={toOthersInfo.signature} /><br/>

                                            </form>
                                        </div>
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