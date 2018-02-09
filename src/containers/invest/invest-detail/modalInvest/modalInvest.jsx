import React from 'react';
import PropTypes from 'prop-types';
import  {getData}  from '../../../../assets/js/getData';
import  {poundage,addCommas,checkMoney}  from '../../../../assets/js/cost';
import StepperInput from '../../../../components/stepperInput/stepperInput';
import { Checkbox,message,Select } from 'antd';
import './modalInvest.less'
import {income} from "../../../../assets/js/cost"
export default class ModalInvest extends React.Component {
    constructor(props) {
        super(props);
        let {investAmount,proMinInvestAmount,proMaxInvestAmount,proIncreaseAmount,restMoney,rate,loanApplyExpiry}=props.config;
        console.log(props.config);
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            value:investAmount,  //投资金额
            tips:'',  //错误提示
            info:{},  //详情
            isRead:false
        }
    }
    handleSubmit(e){
        //const {callback,investAmount} = this.props.config;
        //1 验证输入是否正确
        let result=checkMoney({
            'value':this.state.value,
            'type':0,
            'min_v':this.proMinInvestAmount,
            'max_v':this.proMaxInvestAmount,
            'label':'投资金额',
            'interval':this.proIncreaseAmount
        });
        if(!result[0]){
            this.setState({
                tips:`${result[2]}`
            });
            return false;
        }
        //2 验证是否同意协议
        if(!this.state.isRead){
            this.setState({
                tips:`请阅读并同意《投资协议》`
            });
            return false;
        }
        //3 提交后台

        fetch(`http://172.16.4.5:8084/test.php`, {
            method: "POST",
            mode:'cors',
            cache: 'default',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({projectId: this.props.config.proId,moneyEnd:this.state.value})
        }).then(function (response){
            if (response.status == 200){
                return response;
            }
        })
            .then((data) => data.json())
            .then((data) => {
                    if(data.code==='0'){
                        message.success('您的申请已经提交');
                        callback({});
                    }else{
                        message.error('err,申请不通过');
                    }

             })
            .catch((err)=>{
                message.error('连接失败，请重试');
        });
        //4 关闭弹窗
    }
    onChange(e) {
        this.setState({
            isRead: e.target.checked
        });
        if(this.state.tips===`请阅读并同意《投资协议》`){
            this.setState({
                tips: ``
            });
        }
    }
    //改变转让金额
    handleChange(event) {
        let result=checkMoney({
            'value':event.target.value,
            'type':0,
            'min_v':this.state.transferInfo.proMinInvestAmount,
            'max_v':this.state.transferInfo.transFinanced,
            'label':'转让金额',
            'interval':this.state.transferInfo.proIncreaseAmount
        });
        if(result[0]==false){
            if(result[1]==1){
                this.setState({
                    value: event.target.value,
                    tips:`${result[2]}`
                });
            }else{
                this.setState({
                    value: 0,
                    tips:`${result[2]}`
                });
            }

        }else {
            this.setState(
                {
                    value: event.target.value,
                    tips: ``
                });
        }
    }
    loadData(){
        let data=getData(`http://localhost:9002/members/investments/transfer/id`);
        if (data){
        }else{
            let mockDate={
                data: {
                    pId:1,
                    redEnvelopes: [
                        {id:'5',title:'100元返现红包'},
                        {id:'7',title:'58元返现红包'},
                    ]
                    ,
                    rateCoupons:[
                        {id:'4',title:'1%加息券'},
                        {id:'2',title:'0.8%加息券'},
                    ],
                    /*proMinInvestAmount:1000,
                    proMaxInvestAmount:10000, //标的投资上限制
                    proIncreaseAmount:100,
                    restMoney:5000,//标的剩余金额*/


                },
                code: "0",
                message: "SUCCESS",
            };

            this.setState({
                info:mockDate.data
            },()=>{
                console.log(this.state.info);
            });
        }
    }
    componentDidMount () {
        this.loadData();
    }
    render() {
        let {redEnvelopes,rateCoupons}=this.state.info;
        let {proMinInvestAmount,proMaxInvestAmount,proIncreaseAmount,rate,loanApplyExpiry}=this.props.config;
        return (
            <div className="pop__invest">
                {
                    JSON.stringify(this.state.info) != "{}" ?
                        <div className="form__wrapper" id="area">
                            <dl className="form_bar">
                                <dt><label>投资金额:</label></dt>
                                <dd>
                                    <StepperInput config = {
                                        {
                                            defaultValue:this.state.value,
                                            min:proMinInvestAmount,
                                            max:proMaxInvestAmount,
                                            step:proIncreaseAmount,
                                            callback:(obj)=>{
                                                console.log(obj);
                                                //1去后台获取可用红包列表
                                                //2去后台获取可用加息券列表
                                                //3计算标的收益
                                                this.setState({
                                                    value:obj.value,
                                                    tips:obj.tips
                                                });
                                            }
                                        }
                                    }
                                    >
                                    </StepperInput>
                                </dd>
                            </dl>
                            <dl className="form_bar">
                                <dt><label>使用红包:</label></dt>
                                <dd>
                                    <Select
                                        defaultValue={redEnvelopes[0].id}
                                        style={{ width: 300 }}
                                        onChange={this.handleChange}
                                        getPopupContainer={() => document.getElementById('area')}
                                    >
                                        <Option value="0">不使用红包</Option>
                                        {
                                            redEnvelopes.map((item, index) => (
                                                <Option value={`${item.id}`} key={`row-${index}`}>{item.title}</Option>
                                            ))
                                        }
                                    </Select>
                                </dd>
                            </dl>
                            <dl className="form_bar">
                                <dt><label>使用加息券:</label></dt>
                                <dd>
                                    <Select
                                        defaultValue={rateCoupons[0].id}
                                        style={{ width: 300 }}
                                        onChange={this.handleChange}
                                        getPopupContainer={() => document.getElementById('area')}
                                    >
                                        <Option value="0">不使用加息券</Option>
                                        {
                                            rateCoupons.map((item, index) => (
                                                <Option value={`${item.id}`} key={`row-${index}`}>{item.title}</Option>
                                            ))
                                        }
                                    </Select>
                                </dd>
                            </dl>
                            <dl className="form_bar short">
                                <dt><label>预期赚取：</label></dt>
                                <dd><i id="money" className="money">
                                    {income(this.state.value,rate,loanApplyExpiry,'m')}
                                </i>元
                                </dd>
                            </dl>
                            <div className="ps">
                                <p>
                                    <Checkbox onChange={this.onChange}>我已阅读并同意<a href="agreement_tzsb.html" target="_blank">《投资协议》</a></Checkbox>
                                </p>
                            </div>
                            <div className="tips__area">
                                {this.state.tips!=''?
                                    <span className="tips error">{this.state.tips}</span>
                                    :''
                                }
                            </div>
                            <div className="form_bar">
                                <button  className="btn"　onClick={this.handleSubmit}>确认投资</button>
                            </div>
                        </div>
                        :''
                }
            </div>
        );
    }
};