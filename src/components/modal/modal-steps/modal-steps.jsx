import React from 'react';
import PropTypes from 'prop-types';
import { Steps } from 'antd';
import { connect } from 'react-redux';
import {BbhAlert} from '../../../components/bbhAlert/bbhAlert';
import ModalTradePassword from '../../../components/modal/modal-tradePassword/modal-tradePassword';
import ModalCertification from '../../../components/modal/modal-certification/modal-certification';
import ModalBindCard from '../../../components/modal/modal-bindCard/modal-bindCard';
import './modal-steps.less'

const Step = Steps.Step;

class ModalSteps extends React.Component {
    constructor(props) {
        super(props);
        this.modalClose= this.modalClose.bind(this);
        this.state = {
            tips: '',  //错误提示
            current: 0,  //开户进度
        }
    }

    componentWillMount () {
       //获取会员信息
        /*if(this.props.auth.isAuthenticated) {
            this.props.dispatch(memberAc.getInfo());
        }*/
        let {accountsInfo}=this.props.account;
        let {isCertification,isOpenAccount,isSetTradepassword}=accountsInfo;
        if(isCertification==='0'){
            this.setState({
                current:0,
            });
        }else if(isCertification==='1'){
            this.setState({
                current:1,
            });

        }else{
            //没有获取到实名认证信息
        }

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
        let {account,auth}=this.props;
        let {accountsInfo,isPosting}=account;
        let {postResult}=accountsInfo;
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
        return(
            <div  className="pop pop_steps">
                <Steps  current={current}>
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <div className="steps-content">{steps[this.state.current].content}</div>
            </div>
        )

    }
}

function mapStateToProps(state) {
    const { auth,account } = state.toJS();
    return {
        auth,
        account
    };
}
export default connect(mapStateToProps)(ModalSteps);