import React from 'react';
import PropTypes from 'prop-types';
import { Form,Row,Input,Button,Col } from 'antd';
import { connect } from 'react-redux';
import {accountAc,sendMemberVerifyCode} from "../../../actions/account";
import {Posting,BbhAlert} from '../../../components/bbhAlert/bbhAlert';
import {tradePasswordRegExp } from '../../../utils/regExp';
import {formItemLayout,noop,countDownTime } from '../../../utils/formSetting';
import {hex_md5} from "../../../utils/md5";
import "./modal-tradePassword.less"


const createForm = Form.create;
const FormItem = Form.Item;

let timer = 1;

class ModalTradePassword extends React.Component {
    constructor(props) {
        super(props);
        this.verifyCodeInputRef;
        this.state = {
            verifyCodeCd:countDownTime+1,
            errMessages:``,
            isReset:false
        }

    }
    static propTypes = {
        form: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newPassword')) {

            if(value.length<form.getFieldValue('newPassword').length){
                callback('请确认密码');
            }else{
                callback('两次输入的密码不一致');
            }
        } else {
            callback();
        }
    }
    //提交
    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch, form,account } = this.props;
        form.validateFields((errors) => {
            if (errors) {
                return false;
            }
            let appInfo={
                username:this.props.auth.user.userName,
                send_terminal:`web`,
                trade_password:hex_md5(form.getFieldsValue().newPassword),
                trade_password_code:form.getFieldsValue().verify_code,
                trade_password_token:account.verifyCode.token
            }
            console.log('清除定时器');
            window.clearTimeout(timer);
            dispatch(accountAc.setTradePassword(appInfo)).then(()=>{
                console.log('提交了');

            });


        });
    }
    handleSendVerifyCodeBtnClick = e => {
        const { dispatch, form } = this.props;
        const entries = ['newPassword','confirm'];
        form.validateFields(entries, (errors) => {
            if (errors) return false;
            let creds=`?username=`+this.props.auth.user.userName+`&send_terminal=web`;
            dispatch(sendMemberVerifyCode(creds))
                .then(res => {
                    this.verifyCodeInputRef.focus();
                    return res;
                })
                .then(
                    () => this.startCd()

                )
                .catch(err => {

                        this.setState({
                            errMessages:err.message
                        });

                });
        });
    }
    startCd = () => new Promise((resolve, reject) => {
        //let timer = null;
        const cd = () => {
            if(this.state.verifyCodeCd>0){
                this.setState({
                    verifyCodeCd:this.state.verifyCodeCd-1,
                },()=>{
                    timer = setTimeout(cd, 1000)
                });
            }else{
                timer && clearTimeout(timer), timer = null;
                this.setState({
                    verifyCodeCd:countDownTime+1,
                })
            }
        }
        cd();
    })
    //重新设置交易密码
    reset(){
        this.setState({
            isReset:true,
        });
    }
    //回调
    modalClose(){
        /*this.setState({
            isReset:true,
        },()=>{
            let {onSuccess,dispatch}=this.props;
            dispatch(accountAc.getAccountInfo());  //真实
            onSuccess();
        });*/
        console.log('点击确认了');
        let {onSuccess,dispatch}=this.props;
        //dispatch(accountAc.getAccountInfo());  //真实
        onSuccess();
    }
    render(){
        let {onSuccess,onFail,attach,repeat}=this.props;
        let {isPosting,postResult,accountsInfo}=this.props.account;
        let {isSetTradepassword}=accountsInfo;
        const { getFieldDecorator,getFieldValue } = this.props.form;
        const verifyCodeProps = getFieldDecorator('verify_code', {
            rules: [
                { required: true, min: 6, message: '验证码至少为6个字符' }
            ]
        });
        const newPasswordProps = getFieldDecorator('newPassword', {
            validate: [{
                rules: [
                    { required: true, pattern: tradePasswordRegExp, message: '请输入6-16位交易密码，可以为数字、字母、英文符号' }

                ],
                trigger: ['onBlur', 'onChange']
            }]
        });
        //console.log('提交后的结果-----------');
        //console.log(postResult);
        if(postResult.type!=`success`){
            return(
                <div className="pop__password pop">
                    <div className="form__wrapper">
                        <Form layout="horizontal" onSubmit={this.handleSubmit} id='frm'>
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
                            <FormItem
                                {...formItemLayout}
                                label="确认密码"
                            >
                                {getFieldDecorator('confirm', {
                                    rules: [{
                                        required: true, message: '请确认密码',
                                    }, {
                                        validator: this.compareToFirstPassword,
                                    },{
                                        trigger:[`onBlur`]
                                    }
                                    ],
                                })(
                                    <Input
                                        type="password"
                                        autoComplete="off"
                                        placeholder=""
                                        onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                { ...formItemLayout }
                                label="短信验证码"
                                required
                            >
                                <Row gutter={12}>
                                    <Col span={14}>
                                        <FormItem
                                            hasFeedback
                                        >
                                            {
                                                verifyCodeProps(
                                                    <Input
                                                        type="text"
                                                        size="large"
                                                        autoComplete="off"
                                                        placeholder="请输入短信验证码"
                                                        onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                                        ref={ c => this.verifyCodeInputRef = c }
                                                    />
                                                )
                                            }
                                        </FormItem>
                                    </Col>
                                    <Col span={10}>
                                        <Button
                                            className="verifyCode__btn"
                                            size="large"
                                            type="dashed"
                                            htmlType="button"
                                            disabled={ !!(this.state.verifyCodeCd<=countDownTime) }
                                            onClick={ this.handleSendVerifyCodeBtnClick }
                                        >
                                            {
                                                (this.state.verifyCodeCd<=countDownTime)? this.state.verifyCodeCd
                                                    :'获取验证码'
                                            }
                                        </Button>
                                    </Col>
                                </Row>
                            </FormItem>
                            <div className='tips'>{postResult.message}</div>
                            <FormItem className='center'>
                                {(isPosting) ? <Button type="primary" htmlType="submit" className="pop__large" disabled={true}>
                                        <Posting isShow={isPosting}/>
                                    </Button>
                                    :
                                    <Button type="primary" htmlType="submit" className="pop__large" >确认</Button>
                                }
                            </FormItem>

                        </Form>
                    </div>
                </div>
            )
        }else{
            //成功
            return(
                <div className="pop__password pop">
                    <BbhAlert
                        info={{
                            type:postResult.type,
                            message:postResult.message,
                            description:postResult.description,

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
    const { auth, account} = state.toJS();
    return {
        auth,
        account,
    };
}
ModalTradePassword = connect(mapStateToProps)(createForm()(ModalTradePassword));
export default connect(mapStateToProps)(ModalTradePassword);