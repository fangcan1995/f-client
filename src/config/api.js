let host;

/*if(process.env.NODE_ENV == "test"){
  host = "http://localhost:4000";
}else{
  host = location.origin;
}*/

//host = 'http://172.16.7.4:8020';
import {urls,urls_auth,token} from './../utils/url';
host = urls_auth;



const baseUri = host + '/';
export const API_CONFIG = {
  host: host,
  baseUri: baseUri,
  
  auth: 'uaa/login',
  logout: 'uaa/oauth/logout',
  user: 'uaa/oauth/member/info',

  imageCode: 'uaa/code/image',
  loginVerifyCode: 'uaa/code/sms/login',

  checkUserExist: 'uaa/register/check/mobile',
  signup: 'uaa/register',
  forgetSignup:'uaa/oauth/forget/password',
  signupVerifyCode: 'uaa/code/sms/register',
  forgetVerifyCode: 'uaa/code/sms/forget/password',
    setTradePasswordVerifyCode:  '/uaa/code/sms/trade/password', //设置交易密码
};