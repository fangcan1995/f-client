import React from 'react';
import PropTypes from 'prop-types';
import { Alert,Steps,Button,Form,Row,Input, } from 'antd';
import { connect } from 'react-redux';
import {memberAc} from "../../../actions/member";
import {BbhAlert} from '../../../components/bbhAlert/bbhAlert';

import ModalInvest from '../../../components/modal/modal-invest/modalInvest';
import ModalRecharge from '../../../components/modal/modal-recharge/modaRecharge'

const Step = Steps.Step;

class ModalInvestSteps extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.modalClose= this.modalClose.bind(this);
        this.state = {
            tips: '',  //错误提示
            current: 0,  //开户进度
        }
    }

    componentDidMount () {
       //获取会员信息
        if(this.props.auth.isAuthenticated) {
            this.props.dispatch(memberAc.getInfo());
        }
    }

    handleSubmit(e) {
        let info={
            trueName:this.refs.trueName.value,
            idNumber:this.refs.idNumber.value,
            bankNo:this.refs.bankNo.value,
        }
        this.props.dispatch(memberAc.postOpenAccount(info));  //绑卡

        //this.props.dispatch(memberAc.getInfo()); //重新获取用户信息

    }
    modalClose(){
        //清空postResult
        this.props.dispatch(memberAc.modifyState({'dummyResult':``}));
        let {callback}=this.props.info;
        callback();
    }
    ck_recharge_success(){
        console.log('充值成功回调');
        this.setState({
            current:1
        })
    }
    ck_recharge_fail(){
        console.log('充值失败回调');
        this.setState({
            current:1
        })
    }
    ck_investApp_success(){
        console.log('投资请求发送成功回调');
        this.setState({
            current:2
        })
    }
    ck_investApp_fail(){
        console.log('投资请求发送失败回调');
        this.setState({
            current:2
        })
    }
    ck_invest_success(){
        console.log('投资成功回调');
        this.setState({
            current:3
        })
    }
    ck_invest_fail(){
        console.log('投资失败回调');
        this.setState({
            current:3
        })
    }
    render() {
        let {account,auth}=this.props;
        let {accountsInfo,isPosting}=account;
        let {postResult}=accountsInfo;
        const { current } = this.state;const steps = [{
            title: '金额确认',
            content:<ModalRecharge onSuccess={() => {this.ck_recharge_success();}}  onFail={() => {this.ck_recharge_fail();}}/>
        }, {
            title: '投资确认',
            content: <ModalInvest onSuccess={() => {this.ck_tradePassword_success();}}  onFail={() => {this.ck_tradePassword_fail();}}/>
        }, {
            title: '投资完成',
            content: <div>投资完成</div>
        }];

        if(postResult===``) {
            return (
                <div  className="pop_steps">
                    <Steps current={current}>
                        {steps.map(item => <Step key={item.title} title={item.title} />)}
                    </Steps>
                    <div className="steps-content">{steps[this.state.current].content}</div>
                </div>
            );
        }else{
            return(
                <div className="pop_steps">

                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    const { auth,account } = state.toJS();
    return {
        auth,
        account
    };
}
export default connect(mapStateToProps)(ModalInvestSteps);