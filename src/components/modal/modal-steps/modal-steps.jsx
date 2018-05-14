import React from 'react';
import PropTypes from 'prop-types';
import { Alert,Steps,Button,Form,Row,Input, } from 'antd';
import './modal-steps.less'
import { connect } from 'react-redux';
import {memberAc} from "../../../actions/member";
import {BbhAlert} from '../../../components/bbhAlert/bbhAlert';
import {Loading,NoRecord,Posting } from '../../../components/bbhAlert/bbhAlert';
import ModalTradePassword from '../../../components/modal/modal-tradePassword/modal-tradePassword';
import ModalCertification from '../../../components/modal/modal-certification/modal-certification';
import ModalBindCard from '../../../components/modal/modal-bindCard/modal-bindCard';
const Step = Steps.Step;

class ModalSteps extends React.Component {
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
    ck_certification_success(){
        console.log('实名认证成功回调');
        this.setState({
            current:1
        })
    }
    ck_certification_fail(){
        console.log('实名认证失败回调');
        this.setState({
            current:1
        })
    }
    ck_tradePassword_success(){
        console.log('交易密码成功回调');
        this.setState({
            current:2
        })
    }
    ck_tradePassword_fail(){
        console.log('交易密码失败回调');
        this.setState({
            current:2
        })
    }
    render() {
        let {member,auth}=this.props;
        let {accountsInfo,isPosting}=member;
        let {dummyResult}=accountsInfo;
        const { current } = this.state;const steps = [{
            title: '实名认证',
            content:<ModalCertification onSuccess={() => {this.ck_certification_success();}}  onFail={() => {this.ck_certification_fail();}}/>
        }, {
            title: '设置交易密码',
            content: <ModalTradePassword
                onSuccess={() => {this.ck_tradePassword_success();}}
                onFail={() => {this.ck_tradePassword_fail();}}
                attach={'steps'}
            />
        }, {
            title: '绑定银行卡',
            content: <ModalBindCard onSuccess={() => {this.ck_tradePassword_success();}}  onFail={() => {this.ck_tradePassword_fail();}}/>
        }];

        if(dummyResult===``) {
            return (
                <div  className="pop pop_steps">
                    <Steps  current={current}>
                        {steps.map(item => <Step key={item.title} title={item.title} />)}
                    </Steps>
                    <div className="steps-content">{steps[this.state.current].content}</div>
                </div>
            );
        }else{
            return(
                <div className="pop">
                    <BbhAlert
                        info={{message:dummyResult.message,description:dummyResult.description,type:dummyResult.type,
                            callback:()=>{
                                this.modalClose()
                            }
                        }}
                    />
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    const { auth,member } = state.toJS();
    return {
        auth,
        member
    };
}
export default connect(mapStateToProps)(ModalSteps);