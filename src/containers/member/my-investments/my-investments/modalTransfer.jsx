import React from 'react';
import PropTypes from 'prop-types';
import  {getData}  from '../../../../assets/js/getData';
import  {poundage,addCommas,checkMoney}  from '../../../../assets/js/cost';
import { Checkbox,message,Alert } from 'antd';
import { connect } from 'react-redux';
import {memberInvestAc} from "../../../../actions/member-investments";
import {BbhAlert} from '../../../../components/bbhAlert/bbhAlert';
import {Loading,NoRecord} from '../../../../components/bbhAlert/bbhAlert';
class ModalTransfer extends React.Component {
    constructor(props) {
        super(props);
        this.changeAmount = this.changeAmount.bind(this);
        this.onChange = this.onChange.bind(this);
        this.checkAmount = this.checkAmount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            tips:'',
            isRead:false,
            amount:0,
            postSwitch:false,
            alertInfo:{
                show:false,
                message:'',
                description:'',
                type:''
            }
        }
    }
    componentDidMount () {
        this.props.dispatch(memberInvestAc.getTransfer(this.props.info.currentId));
    }
    onChange(e) {
        this.setState({
            isRead: e.target.checked
        });
        if(this.state.tips===`请同意债权转让服务协议！`){
            this.setState({
                tips: ``
            });
        }
    }
    //改变转让金额
    changeAmount(event) {
        let result=this.checkAmount(event.target.value);
        if(!result[0]){
            this.setState({
                tips:result[2],
                amount:result[1],
            });
            return false;
        }else{
            this.setState({
                tips:'',
                amount:result[1],
            })
        }
    }
    checkAmount(pram){
        //1 验证输入是否正确
        let {transferData}=this.props.memberInvestments.myInvestments.transferInfo;
        let result=checkMoney({
            'value':pram,
            'type':0,
            'min_v':parseInt(transferData.proMinInvestAmount),//
            'max_v':parseInt(transferData.transFinanced), //
            'label':'转让金额',
            'interval':parseInt(transferData.proIncreaseAmount)  //
        });
        return result;
    }
    handleSubmit(){
        //1 验证输入是否正确
        let result=this.checkAmount(this.state.amount);
        if(!result[0]){
            this.setState({
                tips:result[2],
                amount:result[1],
            });
            return false;
        }else{
            this.setState({
                tips:'',
                amount:result[1],
            },()=>{
                //2 验证是否同意协议
                if( !this.state.isRead){
                    this.setState({
                        tips:'请同意债权转让服务协议！',
                    })
                    return false;
                }
            })
        }
        // 提交后台
        let json={investId: this.props.info.currentId,moneyEnd:this.state.amount};
        this.props.dispatch(memberInvestAc.postTransfer(json),()=>{
            console.log(1);
        });


    }

    message(message,description,type){
        this.setState({
            formHide:true,
            alertInfo:{
                show:true,
                message:message,
                description:description,
                type:type
            }
        });
    }
    render() {
        console.log(this.props);
        let {callback}=this.props.info;
        let {isFetching}=this.props.memberInvestments;
        let {postResult,transferInfo}=this.props.memberInvestments.myInvestments;
        let {amount,tips,isRead,postSwitch} =this.state;
        return (
            <div className="pop__transfer">
                {
                    (postResult === ``) ?
                        (transferInfo===``)?<Loading isShow={isFetching}/>
                        :(<div className="form__wrapper">
                                <dl className="form__bar">
                                    <dt><label>实际投资金额:</label></dt>
                                    <dd><i id="Accountbalance" className="money">{transferInfo.transFinanced}</i> 元</dd>
                                </dl>
                                <dl className="form__bar">
                                    <dt><label>转让金额:</label></dt>
                                    <dd>
                                        <input type="text" className="textInput moneyInput" autoComplete="off"
                                               maxLength="13" onChange={this.changeAmount} ref="amount"/>
                                        <span className="unit">元</span>
                                    </dd>
                                </dl>
                                <dl className="form__bar">
                                    <dt><label>手续费：</label></dt>
                                    <dd>
                                        <i id="cost"
                                           className="money">{addCommas(poundage(amount, transferInfo.proTransferFee))}</i>
                                        元
                                    </dd>
                                </dl>
                                <dl className="form__bar">
                                    <dt><label>预期到账金额：</label></dt>
                                    <dd><i id="money" className="money">
                                        {amount != 0 ?
                                            addCommas(amount - poundage(amount, transferInfo.proTransferFee))
                                            : `0.00`
                                        }
                                    </i>元
                                    </dd>
                                </dl>
                                <dl className="form__bar"></dl>
                                <dl className="form__bar">
                                    <p>
                                        <Checkbox onChange={this.onChange}>我已阅读并同意<a href="/transfer.html" target="_blank">《巴巴汇债权转让服务协议》</a></Checkbox>
                                    </p>
                                </dl>
                                <div className="form__bar">
                                    {(tips != '') ? (<span className="errorMessages">{tips}</span>)
                                        : ('')
                                    }
                                </div>
                                <div className="form__bar">
                                    {isPosting ?
                                        <button className="button unable" style={{marginTop: '30px'}}><Posting
                                            isShow={isPosting}/></button>
                                        :
                                        <button className="button able" style={{marginTop: '30px'}}
                                                onClick={this.handleSubmit}>确定</button>
                                    }
                                    {/*<button className="button able" onClick={this.handleSubmit}>确认</button>*/}
                                </div>
                            </div>)
                        :
                        <div>
                            <BbhAlert
                                info={{
                                    message:'失败',
                                    description:'连接失败，请重试',
                                    type:'error',
                                    callback:(obj)=>{
                                        callback();
                                    }
                                }}
                            />
                            <BbhAlert
                                info={{
                                    message:'成功',
                                    description:'您的申请已经提交',
                                    type:'success',
                                    callback:(obj)=>{
                                        callback();
                                    }
                                }}
                            />
                        </div>
                }
            </div>
        );
    }
};
function mapStateToProps(state) {
    const { auth,memberInvestments } = state.toJS();
    return {
        auth,
        memberInvestments,
    };
}
export default connect(mapStateToProps)(ModalTransfer);
