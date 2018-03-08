import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from 'antd';
import { loginUser } from '../../actions/auth';

import { hex_md5 } from '../../utils/md5';
import parseJson2URL from '../../utils/parseJson2URL';

import './signup.less';

const createForm = Form.create;
const FormItem = Form.Item;
const phoneNumberRegExp = /^1[3|4|5|7|8]\d{9}$/;
function noop() {
  return false;
}

class Signup extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    this.props.form.validateFields((errors) => {
      if (errors) {
        return false;
      }
      let creds = this.props.form.getFieldsValue();
      creds.password = hex_md5(creds.password);
      const opts = {
        client_id: 'system',
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

    const passwordProps = getFieldDecorator('password', {
      rules: [
        { required: true, min: 6, max: 16, message: '密码应该由6-16位字母、数字或者特殊符号组成' }
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
      <main className="main signup">
        <div className="wrapper">
          <div className="login__card">
            <div className="card__header">
              <h3 className="card__tit">注册</h3>
              <span className="card__tip">已有账号？<Link to="/login">立即登录</Link></span>
            </div>
            <div className="card__body">
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
                        placeholder="设置6-16位的登录密码"
                        onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      />
                    )
                  }
                </FormItem>
                <FormItem>
                  <Button className="ant-col-24" type="primary" htmlType="submit">登录</Button>
                </FormItem>
              </Form>
            </div>
            
          </div>
          
        </div>
        
      </main>
      
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  return {
    auth
  };
}

export default connect(mapStateToProps)(createForm()(Signup));