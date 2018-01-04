import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { loginUser } from '../../actions/auth';

import { hex_md5 } from '../../utils/md5';
import parseJson2URL from '../../utils/parseJson2URL';

import './login.less';

const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
  return false;
}

class Login extends Component {
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
          { required: true }
        ],
        trigger: 'onBlur'
      }, {
        rules: [
          //{ type: 'email', message: '请输入正确的邮箱地址' }
        ],
        trigger: ['onBlur', 'onChange']
      }]
    });
    const passwordProps = getFieldDecorator('password', {
      rules: [
        { required: true, min: 4, message: '密码至少为 4 个字符' }
      ]
    });

    return (
      <div className="login-container">
        <div className="login-mask"/>
        <Form className="login-content" layout="horizontal" onSubmit={this.handleSubmit}>
          <h2>React Redux Demo</h2>
          <FormItem label="账号" hasFeedback>
            {usernameProps(
              <Input
                placeholder="请输入账号"
                type="text"
              />
            )}
          </FormItem>
          <FormItem label="密码" hasFeedback>
            {
              passwordProps(
                <Input
                  type="password"
                  autoComplete="off"
                  placeholder="请输入密码"
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
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  return {
    auth
  };
}

export default connect(mapStateToProps)(createForm()(Login));