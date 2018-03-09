import React from 'react';
import PropTypes from 'prop-types';
import  {getData}  from '../../../../assets/js/getData';
import  {poundage,addCommas,checkMoney}  from '../../../../assets/js/cost';
import { Form,Row,Input,Button,Checkbox,message,Col } from 'antd';
import { connect } from 'react-redux';
import  memberLoansActions  from '../../../../actions/member-loans';
const createForm = Form.create;
const FormItem = Form.Item;
function noop() {
    return false;
}
class ModalRepaymentApp extends React.Component {
    constructor(props) {
        super(props);
        //this.handleChange = this.handleChange.bind(this);
        this.state={
            value:0,  //
            tips:'',  //错误提示
        }
    }

    componentWillMount () {
        this.props.dispatch(memberLoansActions.getRepayment(this.props.info.currentId));
    }

    //
    static propTypes = {
        form: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch, form } = this.props;
        form.validateFields((errors) => {
            if (errors) {
                return false;
            }
            let creds = form.getFieldsValue();
            creds.password = hex_md5(creds.password);
            const opts = {
                client_id: 'member',
                client_secret: 'secret',
                grant_type: 'password',
                send_terminal: 'web',
            }
            creds = `?${parseJson2URL({...creds, ...opts})}`;
            dispatch(loginUser(creds, this.loginFaileCallback));
        });
    }
    loginFaileCallback = (reason) => {
        const message = reason.msg;
        const { setFields } = this.props.form;
        const newValue = {
            username: {
                name: "username",
                validating: false,
                value: this.props.form.getFieldValue('username'),
                errors: [message]
            }
        };
        setFields(newValue);
    }
    //

    render() {
        let {callback}=this.props.info;
        let {postResult}=this.props.memberLoans.myLoans;
        let {repaymentData}=this.props.memberLoans.myLoans.repaymentInfo;
        let {amount,tips,isRead} =this.state;

        /*const verifyCodeProps = getFieldDecorator('verify_code', {
            rules: [
                { required: true, min: 4, message: '验证码至少为4个字符' }
            ]
        });
        const rememberProps = getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
        })*/
        //
        const { getFieldDecorator } = this.props.form;
        const passwordProps = getFieldDecorator('password', {
            rules: [
                { required: true, min: 4, message: '密码至少为 4 个字符' }
            ]
        });
        const verifyCodeProps = getFieldDecorator('verify_code', {
            rules: [
                { required: true, min: 4, message: '验证码至少为4个字符' }
            ]
        });
        const rememberProps = getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
        })
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        //
        return (
            <div className="pop__repayment">
                {
                    (postResult === 0) ?
                        (JSON.stringify(repaymentData) == '{}') ? ('')
                            :
                                <div className="form__wrapper">
                                <dl className="form__bar">
                                    <dt><label>项目名称：</label></dt>
                                    <dd>{repaymentData.a}</dd>
                                </dl>
                                <dl className="form__bar">
                                    <dt><label>已还期数：</label></dt>
                                    <dd>{repaymentData.b} 期</dd>
                                </dl>
                                <dl className="form__bar">
                                    <dt><label>到期日期：</label></dt>
                                    <dd>{repaymentData.c}</dd>
                                </dl>
                                <dl className="form__bar">
                                    <dt><label>应还本金：</label></dt>
                                    <dd><p>{repaymentData.d} 元</p></dd>
                                </dl>
                                <dl className="form__bar">
                                    <dt><label>应还利息：</label></dt>
                                    <dd>{repaymentData.e} 元</dd>
                                </dl>
                                <dl className="form__bar">
                                    <dt><label>还款总额：</label></dt>
                                    <dd>{repaymentData.f} 元</dd>
                                </dl>
                                    <Form layout="horizontal" onSubmit={this.handleSubmit}>
                                        <FormItem
                                            { ...formItemLayout }
                                            label="交易密码"
                                            hasFeedback
                                        >
                                            {
                                                passwordProps(
                                                    <Input
                                                        type="password"
                                                        autoComplete="off"
                                                        placeholder="请输入6-16位的交易密码"
                                                        onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                                    />
                                                )
                                            }
                                        </FormItem>
                                        <FormItem
                                            { ...formItemLayout }
                                            label="验证码"
                                            hasFeedback
                                        >
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    {
                                                        verifyCodeProps(
                                                            <Input
                                                                size="large"
                                                                type="text"
                                                                autoComplete="off"
                                                                placeholder="验证码"
                                                                onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                                            />
                                                        )
                                                    }
                                                </Col>
                                                <Col span={12}>
                                                    <img className="verifyCode__img" src="http://172.16.1.234:8060/uaa/code/image" />
                                                </Col>
                                            </Row>
                                        </FormItem>
                                        <FormItem>
                                            {
                                                rememberProps(
                                                    <Checkbox>我已阅读并同意<a href="#" target="_blank">《提前还款规则》</a></Checkbox>
                                                )
                                            }
                                        </FormItem>
                                        <FormItem>
                                            <Button type="primary" htmlType="submit" className="login-form-button">
                                                确认
                                            </Button>
                                        </FormItem>
                                    </Form>
                            </div>
                        : '加载中'
                }
                {
                    (postResult===1)?
                        <div className="form__wrapper">
                            <Alert
                                message='失败'
                                description='连接失败，请重试'
                                type='success'
                                showIcon
                            />
                            <button className="button able" style={{marginTop:'30px'}} onClick={() => callback() }>确定</button>
                        </div>
                        :''
                }
                {
                    (postResult===2)?
                        <div className="form__wrapper">
                            <Alert
                                message='成功'
                                description='您的申请已经提交'
                                type='success'
                                showIcon
                            />
                            <button className="button able" style={{marginTop:'30px'}} onClick={() => callback() }>确定</button>
                        </div>
                        :''
                }

            </div>

        );
    }
};

class PasswordLogin extends React.Component {
    static propTypes = {
        form: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch, form } = this.props;
        form.validateFields((errors) => {
            if (errors) {
                return false;
            }
            let creds = form.getFieldsValue();
            creds.password = hex_md5(creds.password);
            const opts = {
                client_id: 'member',
                client_secret: 'secret',
                grant_type: 'password',
                send_terminal: 'web',
            }
            creds = `?${parseJson2URL({...creds, ...opts})}`;
            dispatch(loginUser(creds, this.loginFaileCallback));
        });
    }
    loginFaileCallback = (reason) => {
        const message = reason.msg;
        const { setFields } = this.props.form;
        const newValue = {
            username: {
                name: "username",
                validating: false,
                value: this.props.form.getFieldValue('username'),
                errors: [message]
            }
        };
        setFields(newValue);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const passwordProps = getFieldDecorator('password', {
            rules: [
                { required: true, min: 4, message: '密码至少为 4 个字符' }
            ]
        });
        const verifyCodeProps = getFieldDecorator('verify_code', {
            rules: [
                { required: true, min: 4, message: '验证码至少为4个字符' }
            ]
        });
        const rememberProps = getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
        })
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        return (
            <Form layout="horizontal" onSubmit={this.handleSubmit}>
                <FormItem
                    { ...formItemLayout }
                    label="交易密码"
                    hasFeedback
                >
                    {
                        passwordProps(
                            <Input
                                type="password"
                                autoComplete="off"
                                placeholder="请输入6-16位的交易密码"
                                onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                            />
                        )
                    }
                </FormItem>
                <FormItem
                    { ...formItemLayout }
                    label="验证码"
                    hasFeedback
                >
                    <Row gutter={8}>
                        <Col span={12}>
                            {
                                verifyCodeProps(
                                    <Input
                                        size="large"
                                        type="text"
                                        autoComplete="off"
                                        placeholder="验证码"
                                        onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                    />
                                )
                            }
                        </Col>
                        <Col span={12}>
                            <img className="verifyCode__img" src="http://172.16.1.234:8060/uaa/code/image" />
                        </Col>
                    </Row>
                </FormItem>
                <FormItem>
                    {
                        rememberProps(
                            <Checkbox>我已阅读并同意<a href="#" target="_blank">《提前还款规则》</a></Checkbox></Checkbox>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        确认
                    </Button>
                </FormItem>
            </Form>
        )
    }
}


function mapStateToProps(state) {
    const { auth,memberLoans } = state.toJS();
    return {
        auth,
        memberLoans,
    };
}
//PasswordLogin = connect(mapStateToProps)(createForm()(PasswordLogin));
ModalRepaymentApp = connect(mapStateToProps)(createForm()(ModalRepaymentApp));
export default connect(mapStateToProps)(ModalRepaymentApp);