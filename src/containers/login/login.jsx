import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input, Checkbox, Button, Tabs, Row, Col } from 'antd';

import { loginUser } from '../../actions/auth';
import { hex_md5 } from '../../utils/md5';
import parseJson2URL from '../../utils/parseJson2URL';

import './login.less';

const createForm = Form.create;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
/*const phoneNumberRegExp = /^(\+|00){0,2}(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/*/
const phoneNumberRegExp = /^1[3|4|5|7|8]\d{9}$/;
function noop() {
  return false;
}

class Login extends Component {
  render() {
    return (
      <main className="main login">
        <div className="wrapper">
          <div className="login__card">
            <div className="card__header">
              <h3 className="card__tit">登录</h3>
              <span className="card__tip">没有账号？<Link to="/signup">立即注册</Link></span>
            </div>
            <div className="card__body">
              <Tabs defaultActiveKey="1">
                <TabPane tab="密码登录" key="1">
                  <PasswordLogin />
                </TabPane>
                <TabPane tab="短信登录" key="2">
                  <VCodeLogin />
                </TabPane>
              </Tabs>
              
            </div>
            
          </div>
          
        </div>
        
      </main>
      
    );
  }
}

class PasswordLogin extends Component {
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
          label="手机号"
          hasFeedback
          >
          {usernameProps(
            <Input
              placeholder="请输入手机号"
              type="text"
            />
          )}
        </FormItem>
        <FormItem
          { ...formItemLayout }
          label="密码"
          hasFeedback
          >
          {
            passwordProps(
              <Input
                type="password"
                autoComplete="off"
                placeholder="请输入6-16位的登录密码"
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
              <Checkbox>记住用户名</Checkbox>
            )
          }
          <a className="login-form-forgot" href="">忘记密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </FormItem>
      </Form>
      )
  }
}


class VCodeLogin extends Component {
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
    
    const verifyCodeProps = getFieldDecorator('verify_code', {
      rules: [
        { required: true, min: 4, message: '验证码至少为4个字符' }
      ]
    });

    const mobileCodeProps = getFieldDecorator('mobileCode', {
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
          label="手机号"
          hasFeedback
          >
          {usernameProps(
            <Input
              placeholder="请输入手机号"
              type="text"
            />
          )}
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
        <FormItem
          { ...formItemLayout }
          label="验证码"
          hasFeedback
          >
          <Row gutter={8}>
            <Col span={12}>
              {
                mobileCodeProps(
                  <Input
                    type="text"
                    size="large"
                    autoComplete="off"
                    placeholder="请输入短信验证码"
                    onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                  />
                )
              }
            </Col>
            <Col span={12}>
              <Button size="large" type="dashed" htmlType="submit">获取验证码</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          {
            rememberProps(
              <Checkbox>记住用户名</Checkbox>
            )
          }
          <a className="login-form-forgot" href="">忘记密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </FormItem>
      </Form>
      )
  }
}


function select(state) {
  const { auth } = state;
  return {
    auth,
  };
}
PasswordLogin = connect(select)(createForm()(PasswordLogin))
VCodeLogin = connect(select)(createForm()(VCodeLogin))
export default Login;