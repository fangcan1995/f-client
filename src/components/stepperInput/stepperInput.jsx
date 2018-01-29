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
            tips:''
        }

    }
    handleChange(event) {
        const {min,max,cost} = this.props.config;
        this.setState({value: event.target.value}, () =>{
            let result=this.checkMoney(this.state.value);
            this.setState({
                tips:`${result.tips}`
            },()=>{
                if(result.value>1){
                    cost({
                        value:this.state.value
                    })
                }
            })
        });
    }
    checkMoney(value){
        const {min,max,step} = this.props.config;
        if(value.length<=0){
            return {value:0,tips:'请输入投资金额'};
        }else {
            let reg=/^\+?[1-9][0-9]*$/;
            if(reg.test(value)){
                if(value<min){
                    return {value:2,tips: `最低可投${min}元`};
                }else if(value>max){
                    return {value:3,tips: `最高可投${max}元`};
                }else{
                    if(value%step!=0){
                        return {value:4,tips: `必须是${step}的倍数`};
                    }
                    return {value:100,tips: ``};
                }
            }else{
                return {value:1,tips: `金额格式不正确`};
            };
        };
    }
    add() {
        const {cost} = this.props.config;
        let step=this.props.config.step;
        let result=this.checkMoney(parseInt(this.state.value)+step);
        if(result.value>1 ){
            (result.value==3)?step=0:step=step;
            this.setState({
                value: (parseInt(this.state.value) + step),
                tips:result.tips
            },()=>{
                cost({
                    value:this.state.value
                });
            });
        }
    }
    minus(){
        const {cost} = this.props.config;
        let step=this.props.config.step;
        let result=this.checkMoney(parseInt(this.state.value)-step);
        if(result.value>1 ){
            (result.value==2)?step=0:step=step;
            this.setState({
                value: (parseInt(this.state.value) - step),
                tips:result.tips
            },()=>{
                cost({
                    value:this.state.value
                });
            });
        }
    }
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
                <div className="tips__area">
                    {this.state.tips!=''?
                        <span className="tips">{this.state.tips}</span>
                        :''
                    }
                </div>
            </div>
        );
    }
}