import React from 'react';
import PropTypes from 'prop-types';
import  {checkMoney}  from '../../../utils/cost';
import {addCommas} from "../../../utils/famatData";
import { Button } from 'antd';
import './modaRecharge.less'
import { connect } from 'react-redux';
import  {memberAc}  from '../../../actions/member';
import {Loading,NoRecord,Posting} from '../../../components/bbhAlert/bbhAlert';
import {BbhAlert} from '../../../components/bbhAlert/bbhAlert';
import {accountAc} from "../../../actions/account";

class ModalRecharge extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            value:'',  //充值金额
            tips:'',  //错误提示
        }
    }
    handleSubmit(e){
        //1 验证输入是否正确
        let result=checkMoney({
            'value':this.state.value,
            'type':0,
            'min_v':1,
            'max_v':100000000,
            'label':'充值金额',
            'interval':1
        });
        if(!result[0]){
            this.setState({
                tips:`${result[2]}`
            });
            return false;
        }

        //3 提交后台
        this.props.dispatch(memberAc.recharge(this.state.value));
        let {postResult}=this.props.member.accountsInfo;

    }
    //改变金额
    handleChange(event) {
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
                    tips:`${result[2]}`
                });
            }else{
                this.setState({
                    value: 0,
                    tips:`${result[2]}`
                });
            }

        }else {
            this.setState(
                {
                    value: event.target.value,
                    tips: ``
                });
        }
    }
    modalClose(){
        //清空
        /*let {dummyResult}=this.props.member.accountsInfo;
        if(dummyResult.code==0){
            this.props.dispatch(memberAc.getInfo());  //成功重新获取新户信息
        }*/
        this.props.dispatch(accountAc.modifyState({'postResult':``}));
        let {callback}=this.props.config;
        callback();
    }
    render() {
        let {isPosting}=this.props.account;
        let {accountBalance,callback}=this.props.config;
        let {postResult}=this.props.account.accountsInfo;

        if(postResult==='') {
            return (
                <div className="pop__invest">
                    {
                        JSON.stringify(this.state.info) != "{}" ?
                            <div className="form__wrapper" id="area">
                                <dl className="form__bar">
                                    <p><label
                                        style={{textAlign: 'center', color: '#f00', fontSize: '14px'}}>(虚拟充值)</label>
                                    </p>
                                </dl>
                                <dl className="form__bar">
                                    <dt><label>我的可用余额:</label></dt>
                                    <dd>
                                        {addCommas(parseFloat(accountBalance))}元
                                    </dd>
                                </dl>

                                <dl className="form__bar">
                                    <dt><label>充值金额:</label></dt>
                                    <dd>
                                        <input type="text" className="textInput moneyInput" autoComplete="off"
                                               maxLength="8" onChange={this.handleChange} ref="amount"/>
                                    </dd>
                                </dl>

                                <dl className="form__bar short">
                                    <dt><label>充值后可用余额：</label></dt>
                                    <dd><i id="money" className="money">
                                        {(this.state.value == '') ? addCommas(parseFloat(accountBalance))
                                            : addCommas(parseFloat(this.state.value) + parseFloat(accountBalance))
                                        }

                                    </i>元
                                    </dd>
                                </dl>

                                <div className="form__bar">
                                    {(this.state.tips != '') ?
                                        <div className="errorMessages">
                                            {this.state.tips}
                                        </div> : ``
                                    }
                                </div>
                                <div className="tips__area">
                                    <p><strong>提示：</strong>您的充值金额将会在10-15分钟内到账，请耐心等候</p>
                                </div>
                                <div className="form__wrapper">
                                    {isPosting ?
                                        <Button className="button unable" style={{marginTop: '30px'}}><Posting
                                            isShow={isPosting}/></Button>
                                        :
                                        <Button className="button able" style={{marginTop: '30px'}}
                                                onClick={this.handleSubmit}>确定</Button>
                                    }

                                </div>
                            </div>
                            : ''
                    }
                </div>
            );
        }else{
            return(
                <div className="pop__invest">
                    <BbhAlert
                        info={{message:postResult.message,description:postResult.description,type:postResult.type,
                            callback:()=>{
                                this.modalClose()
                            }
                        }}
                    />
                </div>
            )
        }
    }
};

function mapStateToProps(state) {
    const { auth,investDetail,account } = state.toJS();
    return {
        auth,
        investDetail,
        account
    };
}
export default connect(mapStateToProps)(ModalRecharge);


