import React from 'react';
import PropTypes from 'prop-types';
import Crumbs from '../../../components/crumbs/crumbs';
import Tab from '../../../components/tab/tab';

import { connect } from 'react-redux';
import {accountAc} from '../../../actions/account';
import {toMoney,addCommas,toNumber} from '../../../utils/famatData';
import  {checkMoney}  from '../../../utils/cost';
import {Loading,NoRecord,Posting} from '../../../components/bbhAlert/bbhAlert';
import { Link, withRouter } from 'react-router-dom';
import {Button} from 'antd';
import './recharge.less';

class Recharge extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            value:'',
            tips:'',
            disabled:true,
        };
        this.recharge= this.recharge.bind(this);
        this.handleChange= this.handleChange.bind(this);
    }
    componentDidMount() {
        window.scrollTo(0,0);
        //this.props.dispatch(memberAc.getInfo());
    }

    handleChange(event){
        //console.log('修改金额');
        let result=checkMoney({
            'value':event.target.value,
            'type':0,
            'min_v':10,
            'max_v':100000000,

            'label':'充值金额',
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
    recharge(value){
        value=this.refs.amount.value;
        this.setState({
            disabled:true
        });
        this.props.dispatch(accountAc.getFuyouInfo({type:'reCharge',value:value})); //获取充值需携带的信息
    }
    componentDidUpdate() {
        let {dispatch, account} = this.props;
        let {isPosting,isFetching,accountsInfo,toOthersInfo,postResult,isOpenOthers}=account;

        if(toOthersInfo.code===406  ){
            this.setState({
                disabled:false
            });
        }else if(toOthersInfo!=``){
            document.getElementById('webReg').submit();
        }
    }
    render(){
        let {isPosting,isFetching,accountsInfo,toOthersInfo,postResult}=this.props.account;
        let {isCertification,isOpenAccount,bankName,bankNo,availableBalance}=accountsInfo;
        /*if(dummyResult.code==='0'){
            this.props.dispatch(memberAc.modifyState({dummyResult:''}));
            this.refs.amount.value='';
            this.props.dispatch(memberAc.getInfo());
        }*/
        return (
            <div className="member__main recharge">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="快速充值">
                            <div className="tab_content" style={{width:'500px'}}>
                                <form name="webReg" id="webReg" method="post"  action={toOthersInfo.url}>
                                    <input type="hidden" name="mchnt_cd" value={toOthersInfo.mchnt_cd} />
                                    <input type="hidden" name="mchnt_txn_ssn" value={toOthersInfo.mchnt_txn_ssn} />
                                    <input type="hidden" name="login_id" value={toOthersInfo.login_id} />
                                    <input type="hidden" name="amt" value={toOthersInfo.amt} />
                                    <input type="hidden" name="page_notify_url" value={toOthersInfo.page_notify_url} />
                                    <input type="hidden" name="back_notify_url" value={toOthersInfo.back_notify_url} />
                                    <input type="hidden" name="signature" value={toOthersInfo.signature} />
                                </form>
                                {
                                    (isOpenAccount ===`0` ) ?
                                        <p className="info"><strong>提示：</strong>亲爱的用户，您还没有绑定银行卡，请先
                                            <Link to="/my-account/bank-card" style={{color: '#31aaf5'}}> 绑定银行卡！</Link>
                                        </p>
                                        : <div className="form__wrapper">
                                            <dl className="form__bar">
                                                <dt><label>可用余额:</label></dt>
                                                <dd><i>{toMoney(availableBalance)}</i>元</dd>
                                            </dl>
                                            <dl className="form__bar">
                                                <dt><label>充值金额:</label></dt>
                                                <dd>
                                                    <input  maxLength={8} type="text" className="textInput moneyInput" ref="amount" onChange={this.handleChange}　/>
                                                    <span className="unit">元</span>
                                                    {/*<a href="">银行卡充值上限说明</a>*/}
                                                </dd>
                                            </dl>

                                            {/*<div className="form__bar">
                                                <p>充值后可用余额: <i id="money">1,000.00</i>元</p>
                                            </div>*/}
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
                                                            onClick={this.recharge}
                                                            disabled={this.state.disabled}>
                                                        确认
                                                    </Button>
                                                }
                                            </div>
                                        </div>
                                }
                            </div>
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
export default connect(mapStateToProps)(Recharge);