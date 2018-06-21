import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Row, Col, message } from 'antd';
import { signupUser, sendVerifyCode, getImageCode, checkUserExist, sendForgetVerifyCode,setVerifyCodeCd, forgetSignupUser } from '../../actions/signup';
import { setSignup } from '../../actions/login';
import { loginUser } from '../../actions/auth';
import { hex_md5 } from '../../utils/md5';
import parseJson2URL from '../../utils/parseJson2URL';
import parseQueryString from '../../utils/parseQueryString';

import Card from '../../components/login-card/login-card';
import './forget.less';

const createForm = Form.create;
const FormItem = Form.Item;
const phoneNumberRegExp = /^1[3|4|5|7|8]\d{9}$/;
const passwordRegExp = /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*?_., ]).*$/;
let configPasswordRegExp = null
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

class Forget extends Component {
  constructor() {
    super();
    this.state={
      verifyCodeCd:''
    }
    this.verifyCodeInputRef;
  }
  static propTypes = {
    form: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  configPasswordRegExp = ()=>{  
    const { form } = this.props;
    let fullCreds = form.getFieldsValue();
    console.log(fullCreds.password)
    configPasswordRegExp = new RegExp (`^${fullCreds.password}$`);
    return configPasswordRegExp
  };
  setTime(){
    let time=180;
    var timeInt= setInterval(()=>{ 
        if(time>0){
            time--;
            if(this.mounted){
                this.setState({
                    verifyCodeCd:time
                })
            }  
        }else{                               
            if(this.mounted){
                this.setState({
                    verifyCodeCd:''
                })
            } 
            clearInterval(timeInt)
        }           
    },1000) 
}
componentWillMount(){
    this.mounted = true;
}
componentWillUnmount() {
    this.mounted = false;
}
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getImageCode());
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
      creds.config_password = hex_md5(creds.config_password)
      const queryParams = `?${parseJson2URL({...creds, send_terminal: send_terminal, forget_password_token: signup.verifyCode.token })}`;
      dispatch(forgetSignupUser(queryParams))
      .then(res => {
        console.log(res)
      //   const { value: imageCodeValueObj = {} } = res;
      //   const image_code = Object.keys(imageCodeValueObj).map(key=> imageCodeValueObj[key]).join('');
      //   const { username, password } = creds;
      //   const queryParams = `?${parseJson2URL({username, password, image_code, ...params })}`;
      //   return dispatch(loginUser(queryParams))
      // })
      // .then(res => {
      //   const { history, location } = this.props;
      //   const { redirect } = parseQueryString(location.search);
      //   history.push(redirect ? decodeURIComponent(redirect) : '/')
      //   dispatch(getImageCode());
      
        this.props.history.push('/login')
        message.success('修改密码成功') 
      })
      .catch(err => {
        console.log(err)
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

  handleSendVerifyCodeBtnClick = e => {
    const { dispatch, form, signup } = this.props;
    const entries = ['username', 'image_code'];
    form.validateFields(entries, errors => {
      if (errors) return false;
      let creds = form.getFieldsValue(entries);
      const { send_terminal } = params
      creds = `?${parseJson2URL({...creds, send_terminal: send_terminal})}`;
      
      dispatch(sendForgetVerifyCode(creds))
      .then(res => {
        this.verifyCodeInputRef.focus();
        return res;
      })
      .then(res => this.setTime())
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
  startCd = (secs) => new Promise((resolve, reject) => {
    let timer = null;
    const { dispatch } = this.props;
    
    const cd = () => {
      if ( secs < 0 ) {
        timer && clearTimeout(timer), timer = null;
        secs = 0;
        resolve(secs);
      } else {
        dispatch(setVerifyCodeCd(secs))
        secs -= 1;
        timer = setTimeout(cd, 1000)
      }
      
    }
    cd();
  })
  sendVerifyFaileCallback = (reason) => {
    const message = reason.message;
    const { setFields, getFieldValue } = this.props.form;
    const newValue = {
      image_code: {
        name: 'image_code',
        validating: false,
        value: getFieldValue('image_code'),
        errors: [message]
      }
    };
    setFields(newValue);
  }

  loginFaileCallback = (reason) => {
    const message = reason.message;
    const { setFields, getFieldValue } = this.props.form;
    const newValue = {
      forget_password_code: {
        name: 'forget_password_code',
        validating: false,
        value: getFieldValue('forget_password_code'),
        errors: [message]
      }
    };
    setFields(newValue);
  }
  state={
    signup:false
  }
  handleLoginClick(){
    const { dispatch } = this.props;
    dispatch(setSignup(this.state.signup))
    this.props.history.push('/login');
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;
    const { imageCodeImg, verifyCodeCd } = this.props.signup;
    const usernameProps = getFieldDecorator('username', {
      validate: [{
        rules: [
          { required: true, message: '手机号不能为空' },
          
        ],
        trigger: 'onBlur'
      }, {
        rules: [
          { pattern: phoneNumberRegExp, message: '请输入正确的手机号码' },
          {
            validator: (rule, value, callback) => {
              if ( !phoneNumberRegExp.test(value) ) {
                return callback()
              }
              // const params = `?${parseJson2URL({username: value || ''})}`;
              // this.props.dispatch(checkUserExist(params))
              // .then(res => {
              //   const { code, message } = res.value;
              //   console.log(res)
              //   if ( code == 0 ) {
              //     callback()
              //   } else {
              //     callback(message)
              //   }
                
              // })
              // .catch(err => {
              //   // 当请求失败的时候做更多判断
              //   callback(err.msg)
              // })
              else{
                return callback()
              }
            }
          }
          
        ],
        trigger: ['onBlur', 'onChange']
      }]
    });
    const passwordProps = getFieldDecorator('password', {
      validate: [{
        rules: [
          { required: true, pattern: passwordRegExp, message: '密码长度6-16位，包含数字、字母、符号。' }
          
        ],
        trigger: ['onBlur', 'onChange']
      }]
    });

    const configPasswordProps = getFieldDecorator('config_password', {
      validate: [{
        rules: [
          { required: true, pattern: configPasswordRegExp, message: '与第一次输入的密码不一致' }
          
        ],
        trigger: ['onBlur', 'onChange']
      }]
    });

    const imageCodeProps = getFieldDecorator('image_code', {
      validate: [{
        rules: [
          { required: true, min: 4, message: '验证码至少为4个字符' }
        ],
        trigger: ['onBlur', 'onChange']
      }]
    });
    const registerCodeProps = getFieldDecorator('forget_password_code', {
      validate: [{
        rules: [
          { required: true, min: 6, message: '验证码至少为6个字符' }
        ],
        trigger: ['onBlur', 'onChange']
      }]
    });

    
    const inviteCodeProps = getFieldDecorator('invite_code', {
    });

    // const agreementProps = getFieldDecorator('is_read', {
    //   valuePropName: 'checked',
    //   initialValue: false,
    // })


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
        <div className='w1180'>
          <Card
            tit="找回登录密码"
            >
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
                {/* <span>已有账号？<Link to="/login">立即登录</Link></span> */}
              </FormItem>
              <FormItem
                { ...formItemLayout }
                label="图形验证码"
                required
                >
                <Row gutter={8}>
                  <Col span={14}>
                    <FormItem
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
                  <Col span={10}>
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
                label="短信验证码"
                required
                >
                <Row gutter={8}>
                  <Col span={14}>
                    <FormItem
           
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
                      disabled={ this.state.verifyCodeCd }
                      onClick={ this.handleSendVerifyCodeBtnClick }
                      >{ this.state.verifyCodeCd || '获取验证码' }</Button>
                  </Col>
                </Row>
              </FormItem>
              <FormItem
                { ...formItemLayout }
                label="设置新密码"
                hasFeedback
                >
                {
                  passwordProps(
                    <Input
                      type="password"
                      autoComplete="off"
                      onBlur={this.configPasswordRegExp}
                      placeholder="设置6-16位的登录密码"
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    />
                  )
                }
              </FormItem>
              <FormItem
                { ...formItemLayout }
                label="确认新密码"
                hasFeedback
                >
                {
                  configPasswordProps(
                    <Input
                      type="password"
                      autoComplete="off"
                      placeholder="请再次输入新的登入密码"
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    />
                  )
                }
              </FormItem>
              {/* <FormItem
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
              <FormItem className="agreement">
                {
                  agreementProps(
                    <Checkbox> 我已阅读并同意<NavLink to="/login">《用户注册及服务协议》</NavLink></Checkbox>
                  )
                }
              </FormItem> */}
              <FormItem>
                <Button
                  className="ant-col-24"
                  type="primary"
                  htmlType="submit"
                  disabled={ hasErrors(getFieldsError()) }
                  >确定</Button>
              </FormItem>
            </Form>
          </Card>
          </div>
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

export default connect(select)(createForm()(Forget));