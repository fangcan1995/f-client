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
        let {investAmount} = props.config;
        //console.log(props.config);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            value: investAmount,  //投资金额
            tips: '',  //错误提示
            isRead: false,
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

    loadData() {
        let data = getData(`http://localhost:9002/members/investments/transfer/id`);
        if (data) {
        } else {
            let mockDate = {
                data: {
                    pId: 1,
                    redEnvelopes: [
                        {id: '5', title: '100元返现红包'},
                        {id: '7', title: '58元返现红包'},
                    ]
                    ,
                    rateCoupons: [
                        {id: '4', title: '1%加息券'},
                        {id: '2', title: '0.8%加息券'},
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
                info: mockDate.data
            }, () => {
                console.log(this.state.info);
            });
        }
    }

    componentDidMount() {
        //this.loadData();
    }

    render() {
        console.log('-----this.props.project-------');
        let {postResult}=this.props.investDetail;
        let project = this.props.investDetail.investInfo.data;
        console.log(project);
        let {minInvestAmount, maxInvestAmount, surplusAmount, increaseAmount, annualRate, loanApplyExpiry} = project;
        /*let {redEnvelopes,rateCoupons}=this.state.info;
        let {proMinInvestAmount,proMaxInvestAmount,proIncreaseAmount,rate,loanApplyExpiry,callback}=this.props.config;*/
        if(postResult.code==0) {
            return (
                <div className="pop__invest">
                    <div className="form__wrapper" id="area" >
                        <dl className="form__bar">
                            <dt><label>投资金额:</label></dt>
                            <dd>
                                <span id="money" className="money">{addCommas(this.state.value)}</span>元
                            </dd>
                        </dl>
                        <dl className="form__bar">
                            <dt><label>使用红包:</label></dt>
                            <dd>
                                {/*<Select
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
                                        </Select>*/}
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
                            </dd>
                        </dl>
                        <dl className="form__bar">
                            <dt><label>预期赚取：</label></dt>
                            <dd>
                                <span id="money"
                                      className="money">{income(this.state.value, annualRate, loanApplyExpiry, 'm')}</span>元
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
                <div className="pop__invest">error</div>
            )
        }
    }
}

function mapStateToProps(state) {
    const { auth,investDetail } = state.toJS();
    return {
        auth,
        investDetail
    };
}
export default connect(mapStateToProps)(ModalInvest);