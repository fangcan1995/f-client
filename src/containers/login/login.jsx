import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Form, Input, Checkbox, Button, Tabs, Row, Col, message } from 'antd';

import { loginUser } from '../../actions/auth';
import { sendVerifyCode, getImageCode, setVerifyCodeCd,setSignup } from '../../actions/login';

import { hex_md5 } from '../../utils/md5';
import readBlobAsDataURL from '../../utils/readBlobAsDataURL';
import parseJson2URL from '../../utils/parseJson2URL';
import parseQueryString from '../../utils/parseQueryString';

import Card from '../../components/login-card/login-card';
import Signup from '../signup/signup'
import './login.less';

const createForm = Form.create;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
/*const phoneNumberRegExp = /^(\+|00){0,2}(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/*/
const phoneNumberRegExp = /^1[3|4|5|7|8]\d{9}$/;
const params = {
  client_id: 'member',
  client_secret: 'secret',
  grant_type: 'password',
  send_terminal: 'web',
}

function noop() {
  return false;
}
let login_ip = null
const SignupWithRouter = withRouter(Signup)
class Login extends Component {
  state={
    signup:true
  }
  
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getImageCode());
    login_ip=localStorage.getItem('configIp')
  }
  handleSignupClick(){
    const { dispatch } = this.props;
    dispatch(setSignup(this.state.signup))
  }
  render() {
    const {login}=this.props;
    console.log(this.props)
    if(login.signup){
       return (
      <main className="main login">
        <div className='w1180'>
          <div className="wrapper">
            <Card
              tit="登录"
              tip={ <span>没有账号？<Link to="/signup">立即注册</Link></span> }
              >
              <Tabs defaultActiveKey="1">
                <TabPane tab="密码登录" key="1">
                  <PasswordForm />
                </TabPane>
                <TabPane tab="短信登录" key="2">
                  <VCodeForm />
                </TabPane>
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
      //<span>没有账号？<a onClick={this.handleSignupClick.bind(this)}>立即注册</a></span>
    );
    }else{
      return (
        <SignupWithRouter/>
      )
    }
   
  }
}
var timeInt;
class PasswordForm extends Component {
  state={
    postResult:''
  }
  static propTypes = {
    form: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }
  handleImageCodeImgClick = e => {
    const { dispatch } = this.props;
    dispatch(getImageCode());
  }
  handleSubmit = e => {
    e.preventDefault();
    
    const { dispatch, form } = this.props;
    form.validateFields((errors) => {

      if (errors) return false;

      let creds = form.getFieldsValue();
      creds.password = hex_md5(creds.password);
      creds = {...creds,login_ip}
      creds = `?${parseJson2URL({...creds, ...params})}`;
      dispatch(loginUser(creds))
      .then(res => {
        const { history, location } = this.props;
        const { redirect } = parseQueryString(location.search);
        history.push(redirect ? decodeURIComponent(redirect) : '/')
        dispatch(getImageCode());
      })
      .catch(err => {
        // 根据错误类型做更多判断，这里先把超时处理成弹message
        console.log(err)
        if ( err.statusCode == -1 ) {
          message.error(err.msg, 2.5);
        } else {
          this.loginFaileCallback(err)
        }
        dispatch(getImageCode());   //临时注释
      });
    });
  }
  loginFaileCallback = (reason) => {
    const message = reason.message;
    const { setFields, getFieldValue } = this.props.form;
    const newValue = {
      image_code: {
        name: 'image_code',
        validating: false,
        value: '',
        // errors: [message]
      }
    };
    setFields(newValue);
    this.setState({
      postResult:message
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { imageCodeImg } = this.props.login;
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
        { required: true, min: 6, message: '密码至少为 6 个字符' }
      ]
    });
    const imageCodeProps = getFieldDecorator('image_code', {
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
                      maxLength={10}
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
        <FormItem className='tips'>
            {
                (!this.state.postResult)?``
                    :<p className="errorMessages text-center">
                        {this.state.postResult}
                    </p>
            }
        </FormItem>
        <FormItem>
          {
            rememberProps(
              <Checkbox>记住用户名</Checkbox>
            )
          }
          {/* <a className="login-form-forgot" href="">忘记密码</a> */}
          <Link className="login-form-forgot"  to="/forget">忘记密码</Link>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </FormItem>
      </Form>
      )
  }
}


class VCodeForm extends Component {
  constructor() {
    super();
    this.state={
      verifyCodeCd:'',
      postResult:''
    }
    this.verifyCodeInputRef;
  }
  static propTypes = {
    form: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }
  handleImageCodeImgClick = e => {
    const { dispatch } = this.props;
    dispatch(getImageCode());
  }
  setTime(){
    let time=180;
    timeInt= setInterval(()=>{ 
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
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form, login } = this.props;
    form.validateFields((errors) => {

      if (errors) return false;

      let fullCreds = form.getFieldsValue();
      let { imageCode, ...creds } = fullCreds;
      creds = `?${parseJson2URL({...creds, ...params, verify_token: login.verifyCode.token })}`;
      dispatch(loginUser(creds))
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
      });;
    });
  }
  handleSendVerifyCodeBtnClick = e => {

    const { dispatch, form } = this.props;
    const entries = ['username', 'image_code'];
    form.validateFields(entries, (errors) => {
      if (errors) return false;

      let creds = form.getFieldsValue(entries);
      const { send_terminal } = params
      creds = `?${parseJson2URL({...creds, send_terminal: send_terminal})}`;
      dispatch(sendVerifyCode(creds))
      .then(res => {
        this.verifyCodeInputRef.focus();
        this.setState({
          postResult:''
        })
        return res;
      })
      .then(() => this.setTime())
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
        // validating: false,
        value: '',
        // errors: [message]
      }
    };
    this.setState({
      postResult:message
    })
    setFields(newValue);
  }
  loginFaileCallback = (reason) => {
    const message = reason.message;
    const { setFields, getFieldValue } = this.props.form;
    const newValue = {
      verify_code: {
        name: 'verify_code',
        // validating: false,
        value: '',
        // errors: [message]
      }
    };
    setFields(newValue);
    const newValue2 = {
      image_code: {
        name: 'image_code',
        // validating: false,
        value: '',
        // errors: [message]
      }
    };
    setFields(newValue2);
    this.setState({
      postResult:message
    })
  }
  handleChange(){
    console.log(this.state.verifyCodeCd)
    this.setState({
      verifyCodeCd:''
    })
    clearInterval(timeInt)
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { imageCodeImg, verifyCodeCd } = this.props.login;
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
    const imageCodeProps = getFieldDecorator('image_code', {
      rules: [
        { required: true, min: 4, message: '验证码至少为4个字符' }
      ]
    });
    const verifyCodeProps = getFieldDecorator('verify_code', {
      rules: [
        { required: true, min: 6, message: '验证码至少为6个字符' }
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
              onChange={this.handleChange.bind(this)}
            />
          )}
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
                    maxLength={10}
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
                verifyCodeProps(
                  <Input
                    type="text"
                    size="large"
                    autoComplete="off"
                    maxLength={10}
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
        <FormItem className='tips'>
            {
                (!this.state.postResult)?``
                    :<p className="errorMessages text-center">
                        {this.state.postResult}
                    </p>
            }
        </FormItem>
        <FormItem>
          {
            rememberProps(
              <Checkbox>记住用户名</Checkbox>
            )
          }
          {/* <a className="login-form-forgot" href="/forget">忘记密码</a> */}
          <Link className="login-form-forgot"  to="/forget">忘记密码</Link>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </FormItem>
      </Form>
      )
  }
}

function select(state) {
  const { auth, login } = state.toJS();
  return {
    auth,
    login,
  };
}
PasswordForm = connect(select)(withRouter(createForm()(PasswordForm)))
VCodeForm = connect(select)(withRouter(createForm()(VCodeForm)))

export default connect(select)(Login);