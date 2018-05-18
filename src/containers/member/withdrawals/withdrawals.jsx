import React from 'react';
import PropTypes from 'prop-types';
import Crumbs from '../../../components/crumbs/crumbs';
import Tab from '../../../components/tab/tab';
import { connect } from 'react-redux';
import {accountAc} from '../../../actions/account';
import {toMoney,addCommas} from '../../../utils/famatData';
import {checkMoney,  income} from '../../../utils/cost';
import {formItemLayout, noop} from "../../../utils/formSetting";
import { Form,Row,Input,Button,Select,Checkbox,Col,Alert,Icon,Collapse  } from 'antd';
import {tradePasswordRegExp } from '../../../utils/regExp';
import {hex_md5} from "../../../utils/md5";
import './withdrawals.less';

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

    }
    componentDidMount() {
        //this.props.dispatch(memberAc.getInfo());
    }

    withdrawals(value){
        value=this.refs.amount.value;
        this.setState({
            disabled:true
        }); //还原按钮不可点击
        this.props.dispatch(memberAc.withdrawals(value));
    }
    handleChange(event){
        let result=checkMoney({
            'value':event.target.value,
            'type':0,
            'min_v':1,
            'max_v':this.props.member.accountsInfo.amount.availableBalance,
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
        let {isPosting,accountsInfo,postResult}=this.props.account;
        //let {openAccountStatus,amount,dummyResult}=this.props.member.accountsInfo;
        let {isCertification,isOpenAccount,bankName,bankNo,accountBalance}=accountsInfo;
        /*if(dummyResult.code==='0'){
            this.props.dispatch(accountAc.modifyState({dummyResult:''}));
            this.refs.amount.value='';
            this.props.dispatch(accountAc.getInfo());
        }*/
        const { getFieldDecorator,getFieldValue } = this.props.form;
        const newPasswordProps = getFieldDecorator('newPassword', {
            validate: [{
                rules: [
                    { required: true, pattern: tradePasswordRegExp, message: '密码长度为6-16位，必须包含数字、字母、符号' }

                ],
                trigger: ['onBlur', 'onChange']
            }]
        });
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
                                        <Form layout="horizontal" onSubmit={this.handleSubmit} id='frm'>

                                            <FormItem
                                                { ...formItemLayout }
                                                label="可用余额"
                                            >
                                                <span id="money" className="money">{addCommas(parseFloat(accountBalance))}</span>元
                                            </FormItem>

                                            <FormItem
                                                { ...formItemLayout }
                                                label="提现金额"
                                            >
                                                <input name="transAmt" id="transAmt" maxLength={20} type="text" className="textInput moneyInput" ref="amount"
                                                       onChange={this.handleChange}
                                                />
                                                <i className="unit">元</i>

                                            </FormItem>
                                            <FormItem
                                                { ...formItemLayout }
                                                label="交易密码"
                                            >
                                                {
                                                    newPasswordProps(
                                                        <Input
                                                            type="password"
                                                            autoComplete="off"
                                                            placeholder="设置6-16位的交易密码"
                                                            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                                        />
                                                    )
                                                }
                                            </FormItem>
                                            <FormItem>
                                                <p>
                                                    <Checkbox onChange={this.onChange}>我已阅读并同意
                                                        <a href="agreement_tzsb.html" target="_blank">《投资协议》</a></Checkbox>
                                                </p>
                                            </FormItem>
                                            <FormItem>{postResult.message}
                                                {(this.state.tips!='')?
                                                    <div className="errorMessages">
                                                        {this.state.tips}
                                                    </div>:``
                                                }
                                            </FormItem>
                                            <FormItem className='center'>
                                                {
                                                    isPosting?
                                                        <Button type="primary"  className="pop__large"  disabled={true}>
                                                            <Posting isShow={isPosting}/>
                                                        </Button>
                                                        :
                                                        <Button type="primary"  htmlType="submit" className="pop__large" >
                                                            确定
                                                        </Button>
                                                }

                                            </FormItem>
                                        </Form>

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