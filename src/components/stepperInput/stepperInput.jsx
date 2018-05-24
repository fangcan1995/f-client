import React,{ Component } from "react";
import './stepperInput.less';
export default class StepperInput extends Component{
    constructor(props){
        super(props);
        this.add = this.add.bind(this);
        this.minus = this.minus.bind(this);
        this.cutClick = this.cutClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value:props.config.defaultValue,
            //tips:''
        }
    }
    handleChange(event) {
        const {min,max,callback} = this.props.config;
        this.setState({value: event.target.value}, () =>{
            let result=this.checkMoney(this.state.value);
           if(result.code>1){
                callback({
                    code:result.code,
                    value:this.state.value,
                    tips:`${result.tips}`,
                })
            }else{
                callback({
                    code:result.code,
                    value:'0',
                    tips:`${result.tips}`,
                })
            }
        });
    }
    checkMoney(value){
        const {min,max,step} = this.props.config;
        console.log('金额分别是：')
        console.log(value);
        console.log(min);
        console.log(max);
        if(value.length<=0){
            return {code:0,tips:'请输入投资金额'};
        }else {
            let reg=/^\+?[1-9][0-9]*$/;
            if(reg.test(value)){
                if(value<min){
                    return {code:2,tips: `最低可投${min}元`};
                }else if(value>max){
                    return {code:3,tips: `最高可投${max}元`};
                }else{
                    if((max-value)<min && max!=value){
                        return {code:4,tips: `投资后剩余金额不能小于起投金额，请投满剩余金额或留出最小投资金额`};
                    }
                    if(value%step!=0 && max!=value){
                        return {code:4,tips: `必须是${step}的倍数`};
                    }
                    return {code:100,tips: ``};
                }
            }else{
                return {code:1,tips: `金额格式不正确`};
            };
        };
    }
    add() {
        const {callback} = this.props.config;
        let step=this.props.config.step;
        let result=this.checkMoney(parseInt(this.state.value)+step);  //验证增加后是否合法
        if(result.code>1 ){
            (result.code==3)?step=0:step=step;
            this.setState({
                code:result.code,
                value: (parseInt(this.state.value) + step),
                //tips:result.tips
            },()=>{
                let code=this.checkMoney(parseInt(this.state.value)).code;
                callback({
                    code:code,
                    value:this.state.value,
                    tips:`${result.tips}`,

                });
            });
        }
    }
    minus(){
        const {callback} = this.props.config;
        let step=this.props.config.step;
        let result=this.checkMoney(parseInt(this.state.value)-step);
        if(result.code>1 ){
            (result.code==2)?step=0:step=step;
            this.setState({
                code:result.code,
                value: (parseInt(this.state.value) - step),
                //tips:result.tips
            },()=>{
                let code=this.checkMoney(parseInt(this.state.value)).code;
                callback({
                    code:code,
                    value:this.state.value,
                    tips:`${result.tips}`
                });
            });

        }
    }
    //获取焦点即全部选中
    cutClick(){
        this.refs.amount.select();
    };
    render(){
        return(
            <div className="stepperInput">
                <div className="input__area">
                    <button  className="btn_minus" onClick={this.minus}>-</button>
                    <input type="text"  value={this.state.value} ref="amount" maxLength={9} onClick={this.cutClick} onChange={this.handleChange}   />
                    <button className="btn_add" onClick={this.add}>+</button>
                    <span className="unit">元</span>
                </div>
            </div>
        );
    }
}