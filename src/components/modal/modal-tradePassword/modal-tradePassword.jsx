import React from 'react';
import PropTypes from 'prop-types';
import { Form,Row,Input,Button,Checkbox,Col,Alert,Icon } from 'antd';
import { connect } from 'react-redux';
import {accountAc,sendMemberVerifyCode,setMemberVerifyCodeCd} from "../../../actions/account";
import {Loading,NoRecord,Posting,BbhAlert} from '../../../components/bbhAlert/bbhAlert';
import {tradePasswordRegExp } from '../../../utils/regExp';
import {formItemLayout,noop } from '../../../utils/formSetting';
import {hex_md5} from "../../../utils/md5";
//import { sendVerifyCode, setVerifyCodeCd } from '../../../actions/login';
import "./modal-tradePassword.less"
import parseJson2URL from "../../../utils/parseJson2URL";

const createForm = Form.create;
const FormItem = Form.Item;

class ModalTradePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errMessages:``,
            isReset:false
        }
        //this.bindCard = this.bindCard.bind(this);
    }
    static propTypes = {
        form: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newPassword')) {
            callback('两次输入的密码不一致');
        } else {
            callback();
        }
    }
    //提交
    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch, form } = this.props;
        form.validateFields((errors) => {
            if (errors) {
                return false;
            }
            let appInfo={
                type:`member`,
                username:this.props.auth.user.userName,
                new_password:hex_md5(form.getFieldsValue().newPassword),
                verify_code:form.getFieldsValue().verify_code,
            }
            dispatch(accountAc.setTradePassword(appInfo));

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
                .then(() => this.startCd(180))
                .catch(err => {
                    //if(err.code==406){
                        this.setState({
                            errMessages:err.message
                        });
                    //}
                });
        });
    }
    startCd = (secs) => new Promise((resolve, reject) => {
        let timer = null;
        const { dispatch } = this.props;

        const cd = () => {
            if ( secs < 0 ) {
                timer && clearTimeout(timer), timer = null;
                secs = 0;
                resolve(secs);
            } else {
                dispatch(setMemberVerifyCodeCd(secs));//读秒
                secs -= 1;
                timer = setTimeout(cd, 1000)
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
        let {onSuccess,onFail,dispatch}=this.props;
        //清空postResult
        dispatch(accountAc.clear());
        onSuccess();
    }
    render(){
        console.log('-------------设置交易密码模块---------------');
        console.log(this.props);
        let {onSuccess,onFail,attach}=this.props;
        let {isPosting,postResult,accountsInfo,verifyCodeCd}=this.props.account;
        let {isCertification,isOpenAccount,isSetTradepassword}=accountsInfo;
        const { getFieldDecorator,getFieldValue } = this.props.form;
        const verifyCodeProps = getFieldDecorator('verify_code', {
            rules: [
                { required: true, min: 6, message: '验证码至少为6个字符' }
            ]
        });
        const newPasswordProps = getFieldDecorator('newPassword', {
            validate: [{
                rules: [
                    { required: true, pattern: tradePasswordRegExp, message: '密码长度为6-16位，必须包含数字、字母、符号' }

                ],
                trigger: ['onBlur', 'onChange']
            }]
        });
        if(isSetTradepassword==='1'&& !this.state.isReset){
            return(
                <div className="pop__password pop">
                    <div className="form__wrapper">
                        <div className='center'>
                            <p className='result_tips'>您已经设置了交易密码</p>
                        </div>
                        <div className='center'>
                            <Button type="primary" htmlType="submit" className="pop__large" onClick={()=>onFail()}>下一步</Button>
                            <Button type="primary" htmlType="submit" className="pop__large" onClick={()=> this.reset()}>重新设置</Button>
                        </div>
                    </div>
                </div>
            )
        }else{
            //未成功
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
                                        }],
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
                                    <Row gutter={8}>
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
                                                disabled={ !!verifyCodeCd }
                                                onClick={ this.handleSendVerifyCodeBtnClick }
                                            >{ verifyCodeCd || '获取验证码' }</Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <div className='tips'>{postResult.message}{this.state.errMessages}</div>
                                <FormItem className='center'>
                                    {(isPosting) ? <Button type="primary" htmlType="submit" className="pop__large" disabled={true}>
                                            <Posting isShow={isPosting}/>
                                        </Button>
                                        :
                                        <Button type="primary" htmlType="submit" className="pop__large">确认</Button>
                                    }
                                </FormItem>

                            </Form>
                            <button onClick={()=>onFail()}>下一步</button>
                        </div>
                    </div>
                )
            }else{
                //成功
                return(
                    <div className="pop__password pop">
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