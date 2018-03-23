import React from 'react';
import PropTypes from 'prop-types';
import  {getData}  from '../../../../assets/js/getData';
import  {poundage,addCommas,checkMoney,income}  from '../../../../assets/js/cost';
import StepperInput from '../../../../components/stepperInput/stepperInput';
import { Checkbox,message,Select } from 'antd';
import { Alert } from 'antd';
import './modalInvest.less'
import { connect } from 'react-redux';
import  investDetailActions  from '../../../../actions/invest-detail';
class ModalInvest extends React.Component {
    constructor(props) {
        super(props);

        //console.log(props.config);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            //value: investAmount,  //投资金额
            tips: '',  //错误提示
            isRead: false,
        }
    }
    componentDidMount () {
        //console.log(this.props);
        this.props.dispatch(investDetailActions.getRedEnvelopes(this.props.id));
        this.props.dispatch(investDetailActions.getRateCoupons(this.props.id));
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
        const {callback, investAmount} = this.props.config;
        //1 验证是否同意协议
        if (!this.state.isRead) {
            this.setState({
                tips: `请阅读并同意《投资协议》`
            });
            return false;
        }
        //2 提交后台
        console.log('提交投资申请');
        this.props.dispatch(investDetailActions.postInvest({Amount:1000}));
    }

    render() {
        let {investAmount} = this.props.config;
        console.log('-----this.props.project-------');
        let {postResult}=this.props.investDetail;
        let project = this.props.investDetail.investInfo;
        let {redEnvelopes,rateCoupons}=this.props.investDetail;
        console.log('红本本');
        console.log(redEnvelopes);
        let {minInvestAmount, maxInvestAmount, surplusAmount, increaseAmount, annualRate, loanExpiry} = project;
        /*let {redEnvelopes,rateCoupons}=this.state.info;
        let {proMinInvestAmount,proMaxInvestAmount,proIncreaseAmount,rate,loanApplyExpiry,callback}=this.props.config;*/
        if(postResult===``) {
            return (
                <div className="pop__invest">
                    <div className="form__wrapper" id="area" >
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
                                :<Select
                                        defaultValue={redEnvelopes[0].reAmount}
                                        style={{ width: 300 }}
                                        onChange={this.handleChange}
                                        getPopupContainer={() => document.getElementById('area')}
                                    >
                                        <Option value="0">不使用红包</Option>
                                        {
                                            redEnvelopes.map((item, index) => (
                                                <Option value={`${item.reAmount}`} key={`row-${index}`}>{item.reAmount}元 {item.reTypeName}</Option>
                                            ))
                                        }
                                    </Select>
                                }

                            </dd>
                        </dl>
                        <dl className="form__bar">
                            <dt><label>使用加息券:</label></dt>
                            <dd>
                                {/*<Select
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
                                        </Select>*/}
                                {(rateCoupons==='')?``
                                    :<Select
                                        defaultValue={rateCoupons[0].rcAmount}
                                        style={{ width: 300 }}
                                        onChange={this.handleChange}
                                        getPopupContainer={() => document.getElementById('area')}
                                    >
                                        <Option value="0">不使用加息券</Option>
                                        {
                                            rateCoupons.map((item, index) => (
                                                <Option value={`${item.rcAmount}`} key={`row-${index}`}>{item.rcAmount}% 加息券</Option>
                                            ))
                                        }
                                    </Select>
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
                            {this.state.tips != '' ?
                                <span className="errorMessages">{this.state.tips}</span>
                                : ''
                            }
                        </div>
                        <div className="form__bar">
                            <button className="button able" onClick={this.handleSubmit}>确认投资
                            </button>
                        </div>
                    </div>
                </div>
            );
        }else if(postResult.code==1 || postResult.code==2){
            return(
                <div className="pop__invest">
                    <Alert
                        message={postResult.message}
                        description={postResult.description}
                        type={postResult.type}
                        showIcon
                    />
                    <div className="form__wrapper">
                        <button className="button able" style={{marginTop:'30px'}} onClick={() => callback()}>确定</button>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="pop__invest">等待开发</div>
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