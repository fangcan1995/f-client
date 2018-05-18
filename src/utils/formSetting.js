import parseJson2URL from "./parseJson2URL";
import {message} from "antd/lib/index";
import {getImageCode, sendVerifyCode, setVerifyCodeCd} from "../actions/login";

export const formItemLayout = {
    labelCol: {
        span:6
    },  //label 标签布局
    wrapperCol: {
        span:18
    },  //为输入控件设置布局样式
    hasFeedback:true  //展示校验状态图标，配合 Input 组件使用
};

export function noop() {
    return false;
}
//获取post请求携带的参数
export function postContent (params){
    return{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(params),
    }
}

//获取put请求携带的参数
export function putContent (params){
    return{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(params),
    }
}



