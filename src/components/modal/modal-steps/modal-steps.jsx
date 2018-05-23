import React from 'react';
import ModalTradePassword from '../../../components/modal/modal-tradePassword/modal-tradePassword';
import ModalCertification from '../../../components/modal/modal-certification/modal-certification';
import ModalBindCard from '../../../components/modal/modal-bindCard/modal-bindCard';
import { Steps,Icon } from 'antd';
import { connect } from 'react-redux';
import  {accountAc}  from '../../../actions/account';


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
        let {accountsInfo}=this.props.account;
        let {isCertification}=accountsInfo;
        if(isCertification==='0'){
            this.setState({
                current:0,
            });
        }else if(isCertification==='1'){
            this.setState({
                current:1,
            });

        }
    }


    modalClose(){
        let {callback}=this.props;
        callback();
    }

    ck_certification_success(){
        let {dispatch}=this.props;
        dispatch(accountAc.dummyModifyAccount({isCertification:'1'}));  //虚拟
        dispatch(accountAc.clear());
        this.setState({
            current:1
        })
    }

    ck_tradePassword_success(){
        console.log('交易密码成功跳转下一步');
        this.setState({
            current:2
        })
    }
    ck_bindCard_success(){
        console.log('第三步关闭弹框');
        let {onSuccess,dispatch}=this.props;
        onSuccess();
    }


    render() {

        let {account,auth,stepslength}=this.props;
        let {accountsInfo,isPosting}=account;
        let {postResult,isCertification,isOpenAccount,isSetTradepassword}=accountsInfo;

        const { current } = this.state;
        let steps = [
            {
                title: '实名认证',
                content:<ModalCertification onSuccess={() => {this.ck_certification_success();}}  />,
                icon:<Icon type="idcard" />
            },
            {
                title: '设置交易密码',
                content: <ModalTradePassword onSuccess={() => {this.ck_tradePassword_success();}} attach={'steps'} />,
                icon:<Icon type="lock" />
            },
            {
                title: '绑定银行卡',
                content: <ModalBindCard onSuccess={() => {this.ck_bindCard_success();}} />,
                icon:<Icon type="credit-card" />
            }
        ];
        if(isSetTradepassword==='1' || stepslength===2){
            steps.splice(1, 1);
        }

        return(
            <div  className="pop_steps">
                <Steps  current={current}>
                    {steps.map(item => <Step key={item.title} title={item.title} icon={item.icon}  />)}
                </Steps>
                <div className="steps-content">{steps[this.state.current].content}</div>
            </div>
        )

    }
}

function mapStateToProps(state) {
    const { auth,account} = state.toJS();
    return {
        auth,
        account
    };
}
export default connect(mapStateToProps)(ModalSteps);