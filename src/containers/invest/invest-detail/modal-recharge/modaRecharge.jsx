import React from 'react';
import PropTypes from 'prop-types';
import  {checkMoney,addCommas}  from '../../../../assets/js/cost';
import { Alert } from 'antd';
import './modaRecharge.less'
import { connect } from 'react-redux';
import  {memberAc}  from '../../../../actions/member';
import  investDetailActions  from '../../../../actions/invest-detail';
class ModalRecharge extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            value:'',  //充值金额
            tips:'',  //错误提示
        }
    }
    handleSubmit(e){
        //1 验证输入是否正确
        let result=checkMoney({
            'value':this.state.value,
            'type':0,
            'min_v':1,
            'max_v':100000000,
            'label':'充值金额',
            'interval':1
        });
        if(!result[0]){
            this.setState({
                tips:`${result[2]}`
            });
            return false;
        }

        //3 提交后台
        console.log('提交充值申请');
        //this.props.dispatch(investDetailActions.postRecharge({Amount:1000}));
        this.props.dispatch(memberAc.recharge(this.state.value));

    }
    //改变金额
    handleChange(event) {
        let result=checkMoney({
            'value':event.target.value,
            'type':0,
            'min_v':1,
            'max_v':100000000,
            'label':'充值金额',
            'interval':1
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
    render() {
        let {accountBalance,callback}=this.props.config;
        let {postResult}=this.props.investDetail;

            return (
                <div className="pop__invest">
                    {
                        JSON.stringify(this.state.info) != "{}" ?
                            <div className="form__wrapper" id="area">
                                <dl className="form__bar">
                                    <dt><label>我的可用余额:</label></dt>
                                    <dd>
                                        {addCommas(parseFloat(accountBalance))}元
                                    </dd>
                                </dl>

                                <dl className="form__bar">
                                    <dt><label>充值金额:</label></dt>
                                    <dd>
                                        <input type="text" className="textInput moneyInput" autoComplete="off"
                                               maxLength="8" onChange={this.handleChange} ref="amount"/>
                                    </dd>
                                </dl>

                                <dl className="form__bar short">
                                    <dt><label>充值后可用余额：</label></dt>
                                    <dd><i id="money" className="money">
                                        {(this.state.value=='')?addCommas(parseFloat(accountBalance))
                                            :addCommas(parseFloat(this.state.value)+parseFloat(accountBalance))
                                        }

                                    </i>元
                                    </dd>
                                </dl>

                                <div className="tips__area">
                                    {this.state.tips!=''?
                                        <span className="tips error">{this.state.tips}</span>
                                        :''
                                    }
                                </div>
                                <div className="tips__area">
                                    <p><strong>提示：</strong>您的充值金额将会在10-15分钟内到账，请耐心等候</p>
                                </div>

                                <div className="form__wrapper">
                                    <button className="button able" style={{marginTop:'30px'}} onClick={this.handleSubmit}>确定</button>
                                </div>
                            </div>
                            :''
                    }
                </div>
            );


    }
};

function mapStateToProps(state) {
    const { auth,investDetail } = state.toJS();
    return {
        auth,
        investDetail
    };
}
export default connect(mapStateToProps)(ModalRecharge);


