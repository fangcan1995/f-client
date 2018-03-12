import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Row, Col, message } from 'antd';
import { signupUser, sendVerifyCode, getImageCode } from '../../actions/signup';
import { loginUser } from '../../actions/auth';
import { hex_md5 } from '../../utils/md5';
import parseJson2URL from '../../utils/parseJson2URL';
import parseQueryString from '../../utils/parseQueryString';

import Card from '../../components/login-card/login-card';
import './signup.less';

const createForm = Form.create;
const FormItem = Form.Item;
const phoneNumberRegExp = /^1[3|4|5|7|8]\d{9}$/;
const passwordRegExp = /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*?_., ]).*$/;
const params = {
  client_id: 'member',
  client_secret: 'secret',
  grant_type: 'password',
  send_terminal: 'web',
}
function noop() {
  return false;
}

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Signup extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getImageCode());
    this.props.form.validateFields();
  }
  handleImageCodeImgClick = e => {
    const { dispatch } = this.props;
    dispatch(getImageCode());
  }
  handleSubmit = e => {
    e.preventDefault();

    const { dispatch, form, signup } = this.props;
    form.validateFields((errors) => {
      
      if (errors) return false;
      
      let fullCreds = form.getFieldsValue();
      let { imageCode, ...creds } = fullCreds;
      const { send_terminal } = params

      creds.password = hex_md5(creds.password);
      const queryParams = `?${parseJson2URL({...creds, sendTerminal: send_terminal, registerToken: signup.verifyCode.token })}`;
      dispatch(signupUser(queryParams))
      .then(res => {
        const { value: imageCodeValueObj = {} } = res;
        const image_code = Object.keys(imageCodeValueObj).map(key=> imageCodeValueObj[key]).join('');
        const { username, password } = creds;
        const queryParams = `?${parseJson2URL({username, password, image_code, ...params })}`;
        console.log(queryParams)
        return dispatch(loginUser(queryParams))
      })
      .then(res => {
        const { history, location } = this.props;
        const { redirect } = parseQueryString(location.search);
        history.push(redirect ? decodeURIComponent(redirect) : '/')
        dispatch(getImageCode());
      })
      .catch(err => {
        // 根据错误类型做更多判断，这里先把超时处理成弹message
        if ( err.statusCode == -1 ) {
          message.error(err.msg, 2.5);
        } else {
          this.loginFaileCallback(err)
        }
        dispatch(getImageCode());
      });
    });
  }
  handleUsernameChange = e => {
    const { dispatch, form } = this.props;
    form.validateFields(['username'], errors => {
      if (errors) return false;
      let username = form.getFieldValue('username');

    })
  }
  handleSendVerifyCodeBtnClick = e => {
    const { dispatch, form } = this.props;
    const entries = ['username', 'imageCode'];
    form.validateFields(entries, errors => {
      if (errors) return false;
      let creds = form.getFieldsValue(entries);
      const { send_terminal } = params
      creds = `?${parseJson2URL({...creds, sendTerminal: send_terminal})}`;
      dispatch(sendVerifyCode(creds))
      .then(res => {
        // todo
      })
      .catch(err => {
        // 根据错误类型做更多判断，这里先把超时处理成弹message
        if ( err.statusCode == -1 ) {
          message.error(err.msg, 2.5);
        } else {
          this.sendVerifyFaileCallback(err);
        }
        dispatch(getImageCode());
      });
    });
  }

  sendVerifyFaileCallback = (reason) => {
    const message = reason.msg;
    const { setFields, getFieldValue } = this.props.form;
    const newValue = {
      username: {
        name: 'username',
        validating: false,
        value: getFieldValue('username'),
        errors: [message]
      }
    };
    setFields(newValue);
  }

  loginFaileCallback = (reason) => {
    const message = reason.msg;
    const { setFields, getFieldValue } = this.props.form;
    const newValue = {
      username: {
        name: 'username',
        validating: false,
        value: getFieldValue('username'),
        errors: [message]
      }
    };
    setFields(newValue);
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;
    const { imageCodeImg } = this.props.signup;
    const usernameProps = getFieldDecorator('username', {
      validate: [{
        rules: [
          { required: true, message: '手机号不能为空' }
        ],
        trigger: 'onBlur'
      }, {
        rules: [
          { pattern: phoneNumberRegExp, message: '请输入正确的手机号码' }
        ],
        trigger: ['onBlur', 'onChange']
      }]
    });
    const passwordProps = getFieldDecorator('password', {
      validate: [{
        rules: [
          { required: true, pattern: passwordRegExp, message: '密码长度为6-16位，必须包含数字、字母、符号' }
          
        ],
        trigger: ['onBlur', 'onChange']
      }]
    });
    const imageCodeProps = getFieldDecorator('imageCode', {
      validate: [{
        rules: [
          { required: true, min: 4, message: '验证码至少为4个字符' }
        ],
        trigger: ['onBlur', 'onChange']
      }]
    });
    const registerCodeProps = getFieldDecorator('registerCode', {
      validate: [{
        rules: [
          { required: true, min: 6, message: '验证码至少为6个字符' }
        ],
        trigger: ['onBlur', 'onChange']
      }]
    });
    const inviteCodeProps = getFieldDecorator('inviteCode', {
    });

    const agreementProps = getFieldDecorator('isRead', {
      valuePropName: 'checked',
      initialValue: false,
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


    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const imageCodeError = isFieldTouched('imageCode') && getFieldError('imageCode');
    const registerCodeError = isFieldTouched('registerCode') && getFieldError('registerCode')
    return (
      <main className="main signup">
        <div className="wrapper">
          <Card
            tit="注册"
            tip={ <span>已有账号？<Link to="/login">立即登录</Link></span> }
            >
            <Form layout="horizontal" onSubmit={this.handleSubmit}>
              <FormItem
                { ...formItemLayout }
                label="手机号"
                validateStatus={usernameError ? 'error' : ''}
                help={usernameError || ''}
                hasFeedback
                >
                {usernameProps(
                  <Input
                    placeholder="请输入手机号"
                    type="text"
                    onChange={ this.handleUsernameChange }
                  />
                )}
              </FormItem>
              <FormItem
                { ...formItemLayout }
                label="验证码"
                required
                >
                <Row gutter={8}>
                  <Col span={12}>
                    <FormItem
                      validateStatus={imageCodeError ? 'error' : ''}
                      help={imageCodeError || ''}
                      hasFeedback
                      >
                      {
                        imageCodeProps(
                          <Input
                            size="large"
                            type="text"
                            autoComplete="off"
                            placeholder="验证码"
                            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                          />
                        )
                      }
                    </FormItem>
                  
                  </Col>
                  <Col span={12}>
                    <img
                      className="imageCode__img"
                      src={ imageCodeImg }
                      onClick={ this.handleImageCodeImgClick }
                      />
                  </Col>
                </Row>
              </FormItem>
              <FormItem
                { ...formItemLayout }
                label="验证码"
                required
                >
                <Row gutter={8}>
                  <Col span={12}>
                    <FormItem
                      validateStatus={registerCodeError ? 'error' : ''}
                      help={registerCodeError || ''}
                      hasFeedback
                      >
                      {
                        registerCodeProps(
                          <Input
                            type="text"
                            size="large"
                            autoComplete="off"
                            placeholder="请输入短信验证码"
                            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                          />
                        )
                      }
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <Button size="large" type="dashed" htmlType="button"  onClick={ this.handleSendVerifyCodeBtnClick }>获取验证码</Button>
                  </Col>
                </Row>
              </FormItem>
              <FormItem
                { ...formItemLayout }
                label="密码"
                hasFeedback
                validateStatus={passwordError ? 'error' : ''}
                help={passwordError || ''}
                >
                {
                  passwordProps(
                    <Input
                      type="password"
                      autoComplete="off"
                      placeholder="设置6-16位的登录密码"
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    />
                  )
                }
              </FormItem>
              <FormItem
                { ...formItemLayout }
                label="邀请码"
                hasFeedback
                >
                {
                  inviteCodeProps(
                    <Input
                      type="text"
                      autoComplete="off"
                      placeholder="邀请人的邀请码（选填）"
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    />
                  )
                }
              </FormItem>
              <FormItem>
                {
                  agreementProps(
                    <Checkbox> 我已阅读并同意<NavLink to="/login">《用户注册及服务协议》</NavLink></Checkbox>
                  )
                }
              </FormItem>
              <FormItem>
                <Button
                  className="ant-col-24"
                  type="primary"
                  htmlType="submit"
                  disabled={ hasErrors(getFieldsError()) || !getFieldValue('isRead') }
                  >注册</Button>
              </FormItem>
            </Form>
          </Card>
        </div>
      </main>
      
    );
  }
}

function select(state) {
  const { auth, signup } = state.toJS();
  return {
    auth,
    signup,
  };
}

export default connect(select)(createForm()(Signup));