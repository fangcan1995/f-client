import React,{ Component } from 'react';
import { Button } from 'antd';
import './countDownButton.less'

export default class CountDownButton extends React.Component {
    constructor(props) {
        super(props);
        //let interval=props.interval||30;
        this.countDown = this.countDown.bind(this);
        this.state = {
            title:'获取验证码',
            s:props.interval,
            className:'btn1',
            disabled:false,
        };
    }
    countDown(){
        setTimeout(
            ()=>{
                this.setState({
                    s:this.state.s-1,
                    className:'btn2',
                    disabled:true
                },()=>{
                    if(this.state.s==0){
                        console.log('回调1');
                        this.setState({
                            s:this.props.interval,
                            className:'btn1',
                            disabled:false
                        })
                    }else{
                        this.countDown();
                    }
                });
            }, 1000);
    }
    sendCode() {
        console.log(this.props.phoneNumber);

        //调用短信借款
        this.countDown();
    };
    render() {
        //let disabled=this.props.disabled || true;
        return (
            <Button className={this.state.className} type="primary"
                    onClick={this.countDown} disabled={this.state.disabled}
            >
                {
                    (this.state.s==this.props.interval||this.state.s==0)?`获取验证码`
                        :`${this.state.s} s`
                }
            </Button>
        );
    }
}