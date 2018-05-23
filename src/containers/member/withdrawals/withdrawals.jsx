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
    }
    componentWillMount() {
        this.props.dispatch(accountAc.clear());
    }
    componentDidMount() {
        window.scrollTo(0,0);
        this.props.dispatch(accountAc.getAccountInfo());
    }

    withdrawals(value){
        let {dispatch, account} = this.props;
        let {isPosting,isFetching,accountsInfo,toOthersInfo,postResult,isOpenOthers}=account;
        value=this.refs.amount.value;
        this.setState({
            disabled:true
        });
        dispatch(accountAc.getFuyouInfo({type:'Withdrawals',url:'my-account_withdrawals',value:value}))
        //dispatch(accountAc.getFuyouInfo({type:'ReOpenAccount'}))

            .then((res)=>{
                console.log('给富有的')
                toOthersInfo=res.value;
                console.log(toOthersInfo);
                if(toOthersInfo.code==406  ){
                    this.setState({
                        disabled:false
                    });
                }else if(toOthersInfo!=``){
                    document.getElementById('FuiouCash').submit();
                }
            })
            .catch(()=>{
                //没获取到
            });
    }
    handleChange(event){
        let result=checkMoney({
            'value':event.target.value,
            'type':0,
            'min_v':1,
            'max_v':this.props.account.accountsInfo.availableBalance,
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
        let {isPosting,isFetching,accountsInfo,toOthersInfo,postResult}=this.props.account;
        let {isOpenAccount,bankName,bankNo,accountBalance}=accountsInfo;
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
                                                    {/*<a href="">银行卡充值上限说明</a>*/}
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
                                                {isPosting ?
                                                    <Button type="primary" htmlType="submit" className='pop__large' disabled={true}>
                                                        <Posting isShow={isPosting}/>
                                                    </Button>
                                                    :
                                                    <Button type="primary"  className="pop__large"
                                                            onClick={this.withdrawals}
                                                            disabled={this.state.disabled}>
                                                        确认
                                                    </Button>
                                                }
                                            </div>
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