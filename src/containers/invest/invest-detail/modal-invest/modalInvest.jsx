import React from 'react';
import PropTypes from 'prop-types';
import  {getData}  from '../../../../assets/js/getData';
import  {poundage,addCommas,checkMoney,income}  from '../../../../assets/js/cost';
import StepperInput from '../../../../components/stepperInput/stepperInput';
import { Checkbox,message,Select } from 'antd';
import { Alert } from 'antd';
import './modalInvest.less';
import {Loading,NoRecord,Posting} from '../../../../components/bbhAlert/bbhAlert';
import {BbhAlert} from '../../../../components/bbhAlert/bbhAlert';
import { connect } from 'react-redux';
import  investDetailActions  from '../../../../actions/invest-detail';
import {memberAc} from "../../../../actions/member";
class ModalInvest extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            tips: '',  //错误提示
            isRead: false,
        }
    }
    componentDidMount () {
        if(this.props.auth.isAuthenticated){
            this.props.dispatch(investDetailActions.getRedEnvelopes(this.props.config.id));
            this.props.dispatch(investDetailActions.getRateCoupons(this.props.config.id));
        }

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
    handleSubmit(e) {
        const {callback, investAmount,id} = this.props.config;
        //1 验证是否同意协议
        if (!this.state.isRead) {
            this.setState({
                tips: `请阅读并同意《投资协议》`
            });
            return false;
        }
        //2 提交后台
        //console.log('提交投资申请');
        this.props.dispatch(investDetailActions.postInvest(
            {
                projectId:id,
                investAmt:investAmount,
                ifTransfer:false,
                investWay:1,
                transfer:false
            }
            ));
    }
    modalClose(){
        //清空
        /*let {dummyResult}=this.props.member.accountsInfo;
        if(dummyResult.code==0){
            this.props.dispatch(memberAc.getInfo());  //成功重新获取新户信息
        }*/
        //this.props.dispatch(memberAc.modifyState({'postResult':``}));
        let {callback}=this.props.config;
        callback();
    }
    render() {
        console.log('props');
        console.log(this.props);
        let {investAmount} = this.props.config;
        let {postResult}=this.props.investDetail;
        let {redEnvelopes,rateCoupons}=this.props.investDetail;
        let {annualRate, loanExpiry} = this.props.investDetail.investInfo;
        if(postResult===``) {
            return (
                <div className="pop__invest">
                    <div className="form__wrapper" id="area" >
                        <dl className="form__bar">
                            <p><label style={{textAlign:'center',color:'#f00',fontSize:'14px'}}>(虚拟投资)</label></p>
                        </dl>
                        <dl className="form__bar">
                            <dt><label>投资金额:</label></dt>
                            <dd>
                                <span id="money" className="money">{investAmount}</span>元
                            </dd>
                        </dl>
                        <dl className="form__bar">
                            <dt><label>使用红包:</label></dt>
                            <dd>
                                {(redEnvelopes==='')?``
                                    :(redEnvelopes.length>0?
                                        <Select
                                            defaultValue={redEnvelopes[0].id}
                                            style={{ width: 300 }}
                                            onChange={this.handleChange}
                                            getPopupContainer={() => document.getElementById('area')}
                                        >
                                            <Option value="0">不使用红包</Option>
                                            {
                                                redEnvelopes.map((item, index) => (
                                                    <Option value={`${item.id}`} key={`row-${index}`}>{item.reAmount}元 {item.reTypeName}</Option>
                                                ))
                                            }
                                        </Select>:`无可用红包`
                                    )
                                }

                            </dd>
                        </dl>
                        <dl className="form__bar">
                            <dt><label>使用加息券:</label></dt>
                            <dd>
                                {(rateCoupons==='')?``
                                    :(rateCoupons.length>0?
                                        <Select
                                        defaultValue={rateCoupons[0].id}
                                        style={{ width: 300 }}
                                        onChange={this.handleChange}
                                        getPopupContainer={() => document.getElementById('area')}
                                    >
                                        <Option value="0">不使用加息券</Option>
                                        {
                                            rateCoupons.map((item, index) => (
                                                <Option value={`${item.id}`} key={`row-${index}`}>{item.rcAmount}% 加息券</Option>
                                            ))
                                        }
                                    </Select>:`无可用加息券`)
                                }
                            </dd>
                        </dl>
                        <dl className="form__bar">
                            <dt><label>预期赚取：</label></dt>
                            <dd>
                                <span id="money"
                                      className="money">{income(investAmount, annualRate, loanExpiry, 'm')}</span>元
                            </dd>
                        </dl>
                        <div className="form__bar">
                            <p>
                                <Checkbox onChange={this.onChange}>我已阅读并同意
                                    <a href="agreement_tzsb.html" target="_blank">《投资协议》</a></Checkbox>
                            </p>
                        </div>

                        <div className="form__bar">
                            {(this.state.tips!='')?
                                <div className="errorMessages">
                                    {this.state.tips}
                                </div>:``
                            }
                        </div>
                        <div className="form__bar">
                            <button className="button able" onClick={this.handleSubmit}>确认投资
                            </button>
                        </div>
                    </div>
                </div>
            );
        }else{
            return(
                <div className="pop__invest">
                    <BbhAlert
                        info={{message:postResult.message,description:postResult.description,type:postResult.type,
                            callback:()=>{
                                this.modalClose()
                            }
                        }}
                    />
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    const { auth,investDetail,member } = state.toJS();
    return {
        auth,
        investDetail,
        member
    };
}
export default connect(mapStateToProps)(ModalInvest);